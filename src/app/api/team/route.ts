import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';
import { getCurrentAdmin, recordAuditLog } from '@/lib/auth/session';
import { teamMemberSchema } from '@/lib/validation/schemas';
import { revalidatePath } from 'next/cache';
import { ContentStatus } from '@prisma/client';

export const dynamic = 'force-dynamic';

function formatTeamMember(member: any) {
  return {
    id: member.id,
    name: member.name,
    slug: member.slug,
    designation: member.role,
    role: member.role,
    image: member.profileImage || null,
    profileImage: member.profileImage || null,
    bio: member.shortBio,
    shortBio: member.shortBio,
    fullBio: member.fullBio || '',
    expertise: member.specialization,
    specialization: member.specialization,
    qualifications: member.qualifications,
    experienceYears: member.experienceYears,
    socialLinks: {
      instagram: member.instagramUrl || '',
      linkedin: member.linkedinUrl || '',
    },
    instagramUrl: member.instagramUrl || '',
    linkedinUrl: member.linkedinUrl || '',
    displayOrder: member.displayOrder,
    isActive: member.status === ContentStatus.PUBLISHED,
    status: member.status,
    isFeatured: member.isFeatured,
    email: member.email || null,
    createdAt: member.createdAt,
    updatedAt: member.updatedAt,
  };
}

/**
 * GET /api/team
 * Public: Returns active team members ordered by displayOrder asc
 * Admin (with ?all=true): Returns all team members (including drafts/inactive)
 */
export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const requestAll = searchParams.get('all') === 'true';

    let publishedOnly = true;

    if (requestAll) {
      const admin = await getCurrentAdmin();
      if (admin) {
        publishedOnly = false;
      }
    }

    const members = await db.teamMember.findMany({
      where: publishedOnly ? { status: ContentStatus.PUBLISHED } : undefined,
      orderBy: { displayOrder: 'asc' },
    });

    return NextResponse.json({
      success: true,
      count: members.length,
      data: members.map(formatTeamMember),
    });
  } catch (error: any) {
    console.error('GET /api/team error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch team members' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/team
 * Admin Only: Create a new team member
 */
export async function POST(req: NextRequest) {
  try {
    const admin = await getCurrentAdmin();
    if (!admin) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized: Admin privileges required' },
        { status: 401 }
      );
    }

    const body = await req.json();

    // Map alternative field names (e.g. designation -> role, image -> profileImage, bio -> shortBio)
    const rawRole = body.designation || body.role;
    const rawImage = body.image !== undefined ? body.image : body.profileImage;
    const rawBio = body.bio || body.shortBio;
    const rawExpertise = body.expertise || body.specialization;
    const rawInstagram =
      body.socialLinks?.instagram !== undefined ? body.socialLinks.instagram : body.instagramUrl;
    const rawLinkedin =
      body.socialLinks?.linkedin !== undefined ? body.socialLinks.linkedin : body.linkedinUrl;

    // Determine status from isActive or status
    let status: 'PUBLISHED' | 'DRAFT' = 'PUBLISHED';
    if (body.isActive === false || body.status === 'DRAFT') {
      status = 'DRAFT';
    }

    // Auto-generate slug if not provided
    let slug = body.slug ? body.slug.trim().toLowerCase() : '';
    if (!slug && body.name) {
      slug = body.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
    }

    // Ensure slug uniqueness
    let uniqueSlug = slug;
    let counter = 1;
    while (await db.teamMember.findUnique({ where: { slug: uniqueSlug } })) {
      uniqueSlug = `${slug}-${counter}`;
      counter++;
    }

    const payload = {
      name: body.name?.trim(),
      slug: uniqueSlug,
      role: rawRole?.trim(),
      experienceYears: body.experienceYears !== undefined ? Number(body.experienceYears) : 5,
      qualifications: body.qualifications?.trim() || 'Certified Squash Professional',
      specialization: rawExpertise?.trim() || 'Coaching & Player Development',
      shortBio: rawBio?.trim(),
      fullBio: body.fullBio?.trim() || rawBio?.trim() || '',
      profileImage: rawImage || '',
      status,
      displayOrder: body.displayOrder !== undefined ? Number(body.displayOrder) : 0,
      isFeatured: Boolean(body.isFeatured),
      email: body.email || '',
      instagramUrl: rawInstagram || '',
      linkedinUrl: rawLinkedin || '',
    };

    const parseResult = teamMemberSchema.safeParse(payload);
    if (!parseResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: parseResult.error.errors[0]?.message || 'Validation failed',
          details: parseResult.error.errors,
        },
        { status: 400 }
      );
    }

    const created = await db.teamMember.create({
      data: parseResult.data,
    });

    await recordAuditLog({
      action: 'CREATE',
      entity: 'TeamMember',
      entityId: created.id,
      details: `Created team member ${created.name}`,
      admin,
    });

    revalidatePath('/team');
    revalidatePath('/');

    return NextResponse.json(
      {
        success: true,
        message: 'Team member created successfully',
        data: formatTeamMember(created),
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('POST /api/team error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to create team member' },
      { status: 500 }
    );
  }
}
