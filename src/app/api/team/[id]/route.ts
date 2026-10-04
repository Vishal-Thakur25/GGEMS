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
 * GET /api/team/[id]
 * Fetch a specific team member by ID or slug
 */
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const member = await db.teamMember.findFirst({
      where: {
        OR: [{ id }, { slug: id }],
      },
    });

    if (!member) {
      return NextResponse.json(
        { success: false, error: 'Team member not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: formatTeamMember(member),
    });
  } catch (error: any) {
    console.error('GET /api/team/[id] error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch team member' },
      { status: 500 }
    );
  }
}

/**
 * PUT or PATCH /api/team/[id]
 * Admin Only: Update an existing team member
 */
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  return handleUpdate(req, params);
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  return handleUpdate(req, params);
}

async function handleUpdate(
  req: NextRequest,
  paramsPromise: Promise<{ id: string }>
) {
  try {
    const admin = await getCurrentAdmin();
    if (!admin) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized: Admin privileges required' },
        { status: 401 }
      );
    }

    const { id } = await paramsPromise;
    const existing = await db.teamMember.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json(
        { success: false, error: 'Team member not found' },
        { status: 404 }
      );
    }

    const body = await req.json();

    // Map alternate names
    const rawRole = body.designation !== undefined ? body.designation : body.role !== undefined ? body.role : existing.role;
    const rawImage = body.image !== undefined ? body.image : body.profileImage !== undefined ? body.profileImage : existing.profileImage;
    const rawBio = body.bio !== undefined ? body.bio : body.shortBio !== undefined ? body.shortBio : existing.shortBio;
    const rawFullBio = body.fullBio !== undefined ? body.fullBio : existing.fullBio;
    const rawExpertise = body.expertise !== undefined ? body.expertise : body.specialization !== undefined ? body.specialization : existing.specialization;
    const rawInstagram =
      body.socialLinks?.instagram !== undefined
        ? body.socialLinks.instagram
        : body.instagramUrl !== undefined
        ? body.instagramUrl
        : existing.instagramUrl;
    const rawLinkedin =
      body.socialLinks?.linkedin !== undefined
        ? body.socialLinks.linkedin
        : body.linkedinUrl !== undefined
        ? body.linkedinUrl
        : existing.linkedinUrl;

    let status = existing.status;
    if (body.isActive !== undefined) {
      status = body.isActive ? ContentStatus.PUBLISHED : ContentStatus.DRAFT;
    } else if (body.status !== undefined) {
      status = body.status === 'PUBLISHED' ? ContentStatus.PUBLISHED : ContentStatus.DRAFT;
    }

    const payload = {
      id,
      name: (body.name !== undefined ? body.name : existing.name).trim(),
      slug: (body.slug !== undefined ? body.slug : existing.slug).trim().toLowerCase(),
      role: rawRole.trim(),
      experienceYears: body.experienceYears !== undefined ? Number(body.experienceYears) : existing.experienceYears,
      qualifications: (body.qualifications !== undefined ? body.qualifications : existing.qualifications).trim(),
      specialization: rawExpertise.trim(),
      shortBio: rawBio.trim(),
      fullBio: rawFullBio?.trim() || rawBio.trim(),
      profileImage: rawImage || '',
      status,
      displayOrder: body.displayOrder !== undefined ? Number(body.displayOrder) : existing.displayOrder,
      isFeatured: body.isFeatured !== undefined ? Boolean(body.isFeatured) : existing.isFeatured,
      email: body.email !== undefined ? body.email : existing.email || '',
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

    const { id: _, ...updateData } = parseResult.data;

    const updated = await db.teamMember.update({
      where: { id },
      data: updateData,
    });

    await recordAuditLog({
      action: 'UPDATE',
      entity: 'TeamMember',
      entityId: id,
      details: `Updated team member ${updated.name}`,
      admin,
    });

    revalidatePath('/team');
    revalidatePath('/');

    return NextResponse.json({
      success: true,
      message: 'Team member updated successfully',
      data: formatTeamMember(updated),
    });
  } catch (error: any) {
    console.error('UPDATE /api/team/[id] error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to update team member' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/team/[id]
 * Admin Only: Permanently delete a team member
 */
export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const admin = await getCurrentAdmin();
    if (!admin) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized: Admin privileges required' },
        { status: 401 }
      );
    }

    const { id } = await params;
    const existing = await db.teamMember.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json(
        { success: false, error: 'Team member not found' },
        { status: 404 }
      );
    }

    await db.teamMember.delete({ where: { id } });

    await recordAuditLog({
      action: 'DELETE',
      entity: 'TeamMember',
      entityId: id,
      details: `Deleted team member ${existing.name}`,
      admin,
    });

    revalidatePath('/team');
    revalidatePath('/');

    return NextResponse.json({
      success: true,
      message: 'Team member deleted successfully',
    });
  } catch (error: any) {
    console.error('DELETE /api/team/[id] error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to delete team member' },
      { status: 500 }
    );
  }
}
