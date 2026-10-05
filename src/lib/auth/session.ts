import { SignJWT, jwtVerify } from 'jose';
import { cookies, headers } from 'next/headers';
import db from '../db';
import { AdminRole } from '@prisma/client';
import { hasPermission, Permission } from './rbac';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'ggems_super_secret_jwt_key_2026_enterprise_squash_academy_9fc5624e'
);

const COOKIE_NAME = process.env.SESSION_COOKIE_NAME || 'ggems_admin_session';

export interface SessionPayload {
  userId: string;
  email: string;
  role: AdminRole;
  name: string;
  sessionToken: string;
}

export async function createAdminSession(user: {
  id: string;
  email: string;
  role: AdminRole;
  name: string;
}): Promise<string> {
  const sessionToken = crypto.randomUUID();
  const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7); // 7 days

  const headersList = await headers();
  const userAgent = headersList.get('user-agent') || 'unknown';
  const ipAddress =
    headersList.get('x-forwarded-for')?.split(',')[0].trim() ||
    headersList.get('x-real-ip') ||
    '127.0.0.1';

  // Store in database
  await db.adminSession.create({
    data: {
      token: sessionToken,
      userId: user.id,
      expiresAt,
      userAgent,
      ipAddress,
    },
  });

  // Update user last login
  await db.adminUser.update({
    where: { id: user.id },
    data: { lastLoginAt: new Date() },
  });

  // Create signed JWT
  const jwt = await new SignJWT({
    userId: user.id,
    email: user.email,
    role: user.role,
    name: user.name,
    sessionToken,
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(JWT_SECRET);

  const isHttps =
    headersList.get('x-forwarded-proto') === 'https' ||
    headersList.get('x-forwarded-ssl') === 'on' ||
    Boolean(headersList.get('referer')?.startsWith('https://'));

  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, jwt, {
    httpOnly: true,
    secure: isHttps,
    sameSite: 'lax',
    path: '/',
    expires: expiresAt,
  });

  return jwt;
}

export async function getCurrentAdmin(): Promise<SessionPayload | null> {
  try {
    const cookieStore = await cookies();
    const tokenCookie = cookieStore.get(COOKIE_NAME);

    if (!tokenCookie?.value) {
      return null;
    }

    const { payload } = await jwtVerify(tokenCookie.value, JWT_SECRET);
    const data = payload as unknown as SessionPayload;

    if (!data.userId || !data.sessionToken) {
      return null;
    }

    // Verify against DB session to allow immediate server-side revocation
    const dbSession = await db.adminSession.findUnique({
      where: { token: data.sessionToken },
      include: {
        user: {
          select: { id: true, email: true, name: true, role: true, isActive: true },
        },
      },
    });

    if (!dbSession || dbSession.expiresAt < new Date() || !dbSession.user.isActive) {
      return null;
    }

    return {
      userId: dbSession.user.id,
      email: dbSession.user.email,
      role: dbSession.user.role,
      name: dbSession.user.name,
      sessionToken: dbSession.token,
    };
  } catch {
    return null;
  }
}

export async function requireAdmin(requiredPermission?: Permission): Promise<SessionPayload> {
  const admin = await getCurrentAdmin();
  if (!admin) {
    throw new Error('UNAUTHORIZED: Authentication required to access this resource.');
  }

  if (requiredPermission && !hasPermission(admin.role, requiredPermission)) {
    throw new Error(`FORBIDDEN: Insufficient permissions for ${requiredPermission}.`);
  }

  return admin;
}

export async function destroyAdminSession(): Promise<void> {
  try {
    const cookieStore = await cookies();
    const tokenCookie = cookieStore.get(COOKIE_NAME);

    if (tokenCookie?.value) {
      try {
        const { payload } = await jwtVerify(tokenCookie.value, JWT_SECRET);
        const data = payload as unknown as SessionPayload;
        if (data.sessionToken) {
          await db.adminSession.deleteMany({
            where: { token: data.sessionToken },
          });
        }
      } catch {
        // ignore jwt decode errors on logout
      }
    }

    cookieStore.delete(COOKIE_NAME);
  } catch {
    // no-op
  }
}

export async function recordAuditLog(params: {
  action: string;
  entity: string;
  entityId?: string;
  details?: string;
  status?: string;
  admin?: SessionPayload | null;
}) {
  try {
    const headersList = await headers();
    const userAgent = headersList.get('user-agent') || 'unknown';
    const ipAddress =
      headersList.get('x-forwarded-for')?.split(',')[0].trim() ||
      headersList.get('x-real-ip') ||
      '127.0.0.1';

    await db.auditLog.create({
      data: {
        userId: params.admin?.userId || null,
        userEmail: params.admin?.email || 'system@ggemssquash.com',
        action: params.action,
        entity: params.entity,
        entityId: params.entityId,
        details: params.details,
        ipAddress,
        userAgent,
        status: params.status || 'SUCCESS',
      },
    });
  } catch (error) {
    console.error('Failed to write audit log:', error);
  }
}
