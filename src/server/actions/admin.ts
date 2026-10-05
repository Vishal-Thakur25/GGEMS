'use server';

import db from '@/lib/db';
import bcrypt from 'bcryptjs';
import { revalidatePath } from 'next/cache';
import {
  createAdminSession,
  destroyAdminSession,
  requireAdmin,
  recordAuditLog,
} from '@/lib/auth/session';
import {
  loginSchema,
  themeSettingsSchema,
  siteSettingsSchema,
  seoSettingsSchema,
  heroSectionSchema,
  programSchema,
  teamMemberSchema,
  centerSchema,
  statisticSchema,
  achievementSchema,
  navigationItemSchema,
  testimonialSchema,
  ggemsVerticalSchema,
  contactPhoneSchema,
  contactEmailSchema,
  contactAddressSchema,
} from '@/lib/validation/schemas';
import { checkRateLimit } from '@/lib/rate-limit/rate-limiter';
import { headers } from 'next/headers';

/**
 * Admin Login Action
 */
export async function loginAdminAction(formData: unknown) {
  try {
    const headersList = await headers();
    const ipAddress =
      headersList.get('x-forwarded-for')?.split(',')[0].trim() ||
      headersList.get('x-real-ip') ||
      '127.0.0.1';

    // Rate Limiting: 5 attempts per 10 minutes
    const rateLimit = checkRateLimit(`login:${ipAddress}`, { limit: 5, windowMs: 600000 });
    if (!rateLimit.success) {
      return {
        success: false,
        error: {
          code: 'RATE_LIMIT_EXCEEDED',
          message: 'Too many failed attempts. Account login throttled. Please try again later.',
        },
      };
    }

    const parseResult = loginSchema.safeParse(formData);
    if (!parseResult.success) {
      return {
        success: false,
        error: { code: 'VALIDATION_FAILED', message: 'Invalid email or password format.' },
      };
    }

    const { email, password } = parseResult.data;
    const user = await db.adminUser.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (!user || !user.isActive) {
      return {
        success: false,
        error: { code: 'INVALID_CREDENTIALS', message: 'Invalid email or password.' },
      };
    }

    const isValidPassword = await bcrypt.compare(password, user.passwordHash);
    if (!isValidPassword) {
      await recordAuditLog({
        action: 'LOGIN_FAILURE',
        entity: 'AdminUser',
        entityId: user.id,
        details: 'Incorrect password attempt',
        status: 'FAILURE',
      });
      return {
        success: false,
        error: { code: 'INVALID_CREDENTIALS', message: 'Invalid email or password.' },
      };
    }

    // Create session & HTTP-only cookie
    await createAdminSession({
      id: user.id,
      email: user.email,
      role: user.role,
      name: user.name,
    });

    await recordAuditLog({
      action: 'LOGIN',
      entity: 'AdminUser',
      entityId: user.id,
      details: 'Successful administrative login',
      status: 'SUCCESS',
      admin: {
        userId: user.id,
        email: user.email,
        role: user.role,
        name: user.name,
        sessionToken: '',
      },
    });

    return { success: true };
  } catch (error) {
    console.error('Admin login error:', error);
    return {
      success: false,
      error: { code: 'INTERNAL_ERROR', message: 'Authentication failed due to a server error.' },
    };
  }
}

/**
 * Admin Logout Action
 */
export async function logoutAdminAction() {
  try {
    const admin = await requireAdmin();
    await recordAuditLog({
      action: 'LOGOUT',
      entity: 'AdminUser',
      entityId: admin.userId,
      details: 'Admin logged out',
      admin,
    });
    await destroyAdminSession();
    return { success: true };
  } catch {
    await destroyAdminSession();
    return { success: true };
  }
}

/**
 * Update Theme Settings
 */
export async function updateThemeSettingsAction(formData: unknown) {
  try {
    const admin = await requireAdmin('MANAGE_THEME');
    const parseResult = themeSettingsSchema.safeParse(formData);

    if (!parseResult.success) {
      return {
        success: false,
        error: { code: 'VALIDATION_FAILED', message: parseResult.error.errors[0]?.message },
      };
    }

    const data = parseResult.data;
    await db.themeSettings.upsert({
      where: { id: 1 },
      update: data,
      create: { id: 1, ...data },
    });

    await recordAuditLog({
      action: 'THEME_CHANGE',
      entity: 'ThemeSettings',
      entityId: '1',
      details: 'Updated global design tokens and typography',
      admin,
    });

    revalidatePath('/', 'layout');
    revalidatePath('/');
    revalidatePath('/about');
    revalidatePath('/programs');
    revalidatePath('/team');
    revalidatePath('/centers');
    revalidatePath('/school-partnership');
    revalidatePath('/achievements');
    revalidatePath('/gallery');
    revalidatePath('/news');
    revalidatePath('/contact');
    revalidatePath('/admin/theme');
    return { success: true, message: 'Theme settings updated successfully.' };
  } catch (err: any) {
    return { success: false, error: { code: 'ACTION_FAILED', message: err.message } };
  }
}

/**
 * Update Hero Section
 */
export async function updateHeroSectionAction(formData: unknown) {
  try {
    const admin = await requireAdmin('MANAGE_PAGES');
    const parseResult = heroSectionSchema.safeParse(formData);

    if (!parseResult.success) {
      return {
        success: false,
        error: { code: 'VALIDATION_FAILED', message: parseResult.error.errors[0]?.message },
      };
    }

    const data = parseResult.data;
    await db.heroSection.upsert({
      where: { id: 1 },
      update: data,
      create: { id: 1, ...data },
    });

    await recordAuditLog({
      action: 'UPDATE',
      entity: 'HeroSection',
      entityId: '1',
      details: 'Updated Homepage Hero banner & media',
      admin,
    });

    revalidatePath('/');
    return { success: true, message: 'Hero banner updated successfully.' };
  } catch (err: any) {
    return { success: false, error: { code: 'ACTION_FAILED', message: err.message } };
  }
}

/**
 * Reorder Homepage Sections
 */
export async function reorderHomepageSectionsAction(
  sections: Array<{ id: string; displayOrder: number; isVisible: boolean }>
) {
  try {
    const admin = await requireAdmin('MANAGE_PAGES');

    await db.$transaction(
      sections.map((s) =>
        db.pageSection.update({
          where: { id: s.id },
          data: {
            displayOrder: s.displayOrder,
            isVisible: s.isVisible,
          },
        })
      )
    );

    await recordAuditLog({
      action: 'UPDATE',
      entity: 'PageSection',
      details: `Reordered ${sections.length} homepage sections`,
      admin,
    });

    revalidatePath('/');
    return { success: true, message: 'Homepage section order updated.' };
  } catch (err: any) {
    return { success: false, error: { code: 'ACTION_FAILED', message: err.message } };
  }
}

/**
 * Update Page Section Content
 */
export async function updatePageSectionContentAction(
  id: string,
  data: {
    title: string;
    subtitle?: string;
    content?: string;
    ctaLabel?: string;
    ctaUrl?: string;
    isVisible: boolean;
  }
) {
  try {
    const admin = await requireAdmin('MANAGE_PAGES');

    await db.pageSection.update({
      where: { id },
      data: {
        title: data.title,
        subtitle: data.subtitle || null,
        content: data.content || null,
        ctaLabel: data.ctaLabel || null,
        ctaUrl: data.ctaUrl || null,
        isVisible: data.isVisible,
      },
    });

    await recordAuditLog({
      action: 'UPDATE',
      entity: 'PageSection',
      entityId: id,
      details: `Updated content for section ${data.title}`,
      admin,
    });

    revalidatePath('/');
    return { success: true, message: 'Section content updated successfully.' };
  } catch (err: any) {
    return { success: false, error: { code: 'ACTION_FAILED', message: err.message } };
  }
}

/**
 * Create About Page Section
 */
export async function createAboutSectionAction(data: {
  sectionType: string;
  title: string;
  subtitle?: string | null;
  content?: string | null;
  ctaLabel?: string | null;
  ctaUrl?: string | null;
  secondaryCtaLabel?: string | null;
  secondaryCtaUrl?: string | null;
  imageUrl?: string | null;
  videoUrl?: string | null;
  styleConfig?: string | null;
  displayOrder?: number;
  isVisible?: boolean;
}) {
  try {
    const admin = await requireAdmin('MANAGE_PAGES');

    // Ensure 'about' page exists
    await db.page.upsert({
      where: { slug: 'about' },
      update: {},
      create: {
        slug: 'about',
        title: 'About GGems Sports Academy',
        status: 'PUBLISHED',
      },
    });

    let displayOrder = data.displayOrder;
    if (typeof displayOrder !== 'number') {
      const highest = await db.pageSection.findFirst({
        where: { pageSlug: 'about' },
        orderBy: { displayOrder: 'desc' },
        select: { displayOrder: true },
      });
      displayOrder = (highest?.displayOrder || 0) + 1;
    }

    const created = await db.pageSection.create({
      data: {
        pageSlug: 'about',
        sectionType: data.sectionType || 'CUSTOM',
        title: data.title || 'Untitled Section',
        subtitle: data.subtitle || null,
        content: data.content || null,
        ctaLabel: data.ctaLabel || null,
        ctaUrl: data.ctaUrl || null,
        secondaryCtaLabel: data.secondaryCtaLabel || null,
        secondaryCtaUrl: data.secondaryCtaUrl || null,
        imageUrl: data.imageUrl || null,
        videoUrl: data.videoUrl || null,
        styleConfig: data.styleConfig || null,
        displayOrder,
        isVisible: data.isVisible !== false,
      },
    });

    await recordAuditLog({
      action: 'CREATE',
      entity: 'PageSection',
      entityId: created.id,
      details: `Created new About section: ${created.sectionType} - ${created.title}`,
      admin,
    });

    revalidatePath('/about');
    revalidatePath('/admin/about');
    return { success: true, message: 'About section created successfully.', section: created };
  } catch (err: any) {
    return { success: false, error: { code: 'ACTION_FAILED', message: err.message } };
  }
}

/**
 * Update About Page Section
 */
export async function updateAboutSectionAction(
  id: string,
  data: {
    sectionType?: string;
    title?: string;
    subtitle?: string | null;
    content?: string | null;
    ctaLabel?: string | null;
    ctaUrl?: string | null;
    secondaryCtaLabel?: string | null;
    secondaryCtaUrl?: string | null;
    imageUrl?: string | null;
    videoUrl?: string | null;
    styleConfig?: string | null;
    displayOrder?: number;
    isVisible?: boolean;
  }
) {
  try {
    const admin = await requireAdmin('MANAGE_PAGES');

    const updated = await db.pageSection.update({
      where: { id },
      data: {
        ...(data.sectionType !== undefined ? { sectionType: data.sectionType } : {}),
        ...(data.title !== undefined ? { title: data.title } : {}),
        ...(data.subtitle !== undefined ? { subtitle: data.subtitle } : {}),
        ...(data.content !== undefined ? { content: data.content } : {}),
        ...(data.ctaLabel !== undefined ? { ctaLabel: data.ctaLabel } : {}),
        ...(data.ctaUrl !== undefined ? { ctaUrl: data.ctaUrl } : {}),
        ...(data.secondaryCtaLabel !== undefined ? { secondaryCtaLabel: data.secondaryCtaLabel } : {}),
        ...(data.secondaryCtaUrl !== undefined ? { secondaryCtaUrl: data.secondaryCtaUrl } : {}),
        ...(data.imageUrl !== undefined ? { imageUrl: data.imageUrl } : {}),
        ...(data.videoUrl !== undefined ? { videoUrl: data.videoUrl } : {}),
        ...(data.styleConfig !== undefined ? { styleConfig: data.styleConfig } : {}),
        ...(data.displayOrder !== undefined ? { displayOrder: data.displayOrder } : {}),
        ...(data.isVisible !== undefined ? { isVisible: data.isVisible } : {}),
      },
    });

    await recordAuditLog({
      action: 'UPDATE',
      entity: 'PageSection',
      entityId: id,
      details: `Updated About section: ${updated.sectionType} - ${updated.title}`,
      admin,
    });

    revalidatePath('/about');
    revalidatePath('/admin/about');
    return { success: true, message: 'About section updated successfully.' };
  } catch (err: any) {
    return { success: false, error: { code: 'ACTION_FAILED', message: err.message } };
  }
}

/**
 * Delete About Page Section
 */
export async function deleteAboutSectionAction(id: string) {
  try {
    const admin = await requireAdmin('MANAGE_PAGES');

    const existing = await db.pageSection.findUnique({
      where: { id },
    });

    if (!existing) {
      return { success: false, error: { code: 'NOT_FOUND', message: 'Section not found.' } };
    }

    await db.pageSection.delete({
      where: { id },
    });

    await recordAuditLog({
      action: 'DELETE',
      entity: 'PageSection',
      entityId: id,
      details: `Deleted About section: ${existing.sectionType} - ${existing.title}`,
      admin,
    });

    revalidatePath('/about');
    revalidatePath('/admin/about');
    return { success: true, message: 'About section deleted successfully.' };
  } catch (err: any) {
    return { success: false, error: { code: 'ACTION_FAILED', message: err.message } };
  }
}

/**
 * Reorder About Page Sections
 */
export async function reorderAboutSectionsAction(
  sections: Array<{ id: string; displayOrder: number; isVisible: boolean }>
) {
  try {
    const admin = await requireAdmin('MANAGE_PAGES');

    await db.$transaction(
      sections.map((s) =>
        db.pageSection.update({
          where: { id: s.id },
          data: {
            displayOrder: s.displayOrder,
            isVisible: s.isVisible,
          },
        })
      )
    );

    await recordAuditLog({
      action: 'UPDATE',
      entity: 'PageSection',
      details: `Reordered ${sections.length} About Us page sections`,
      admin,
    });

    revalidatePath('/about');
    revalidatePath('/admin/about');
    return { success: true, message: 'About Us section layout updated.' };
  } catch (err: any) {
    return { success: false, error: { code: 'ACTION_FAILED', message: err.message } };
  }
}

/**
 * Save / Update Program
 */
export async function saveProgramAction(formData: unknown) {
  try {
    const admin = await requireAdmin('MANAGE_PROGRAMS');
    const parseResult = programSchema.safeParse(formData);

    if (!parseResult.success) {
      return {
        success: false,
        error: { code: 'VALIDATION_FAILED', message: parseResult.error.errors[0]?.message },
      };
    }

    const { id, ...data } = parseResult.data;

    if (id) {
      await db.program.update({
        where: { id },
        data,
      });
      await recordAuditLog({ action: 'UPDATE', entity: 'Program', entityId: id, details: data.title, admin });
    } else {
      const created = await db.program.create({ data });
      await recordAuditLog({ action: 'CREATE', entity: 'Program', entityId: created.id, details: data.title, admin });
    }

    revalidatePath('/programmes');
    revalidatePath('/programs');
    if (data.slug) {
      revalidatePath(`/programmes/${data.slug}`);
      revalidatePath(`/programs/${data.slug}`);
    }
    revalidatePath('/admin/programs');
    revalidatePath('/');
    return { success: true, message: 'Program saved successfully.' };
  } catch (err: any) {
    return { success: false, error: { code: 'ACTION_FAILED', message: err.message } };
  }
}

/**
 * Delete Program
 */
export async function deleteProgramAction(id: string) {
  try {
    const admin = await requireAdmin('DELETE_CONTENT');
    const existing = await db.program.findUnique({ where: { id } });
    if (!existing) throw new Error('Program not found');

    await db.program.delete({ where: { id } });
    await recordAuditLog({ action: 'DELETE', entity: 'Program', entityId: id, details: existing.title, admin });

    revalidatePath('/programmes');
    revalidatePath('/programs');
    if (existing.slug) {
      revalidatePath(`/programmes/${existing.slug}`);
      revalidatePath(`/programs/${existing.slug}`);
    }
    revalidatePath('/admin/programs');
    revalidatePath('/');
    return { success: true, message: 'Program deleted successfully.' };
  } catch (err: any) {
    return { success: false, error: { code: 'ACTION_FAILED', message: err.message } };
  }
}

/**
 * Save / Update Team Member
 */
export async function saveTeamMemberAction(formData: unknown) {
  try {
    const admin = await requireAdmin('MANAGE_TEAM');
    const parseResult = teamMemberSchema.safeParse(formData);

    if (!parseResult.success) {
      return {
        success: false,
        error: { code: 'VALIDATION_FAILED', message: parseResult.error.errors[0]?.message },
      };
    }

    const { id, ...data } = parseResult.data;

    if (id) {
      await db.teamMember.update({
        where: { id },
        data,
      });
      await recordAuditLog({ action: 'UPDATE', entity: 'TeamMember', entityId: id, details: data.name, admin });
    } else {
      const created = await db.teamMember.create({ data });
      await recordAuditLog({ action: 'CREATE', entity: 'TeamMember', entityId: created.id, details: data.name, admin });
    }

    revalidatePath('/team');
    revalidatePath('/');
    return { success: true, message: 'Team member saved successfully.' };
  } catch (err: any) {
    return { success: false, error: { code: 'ACTION_FAILED', message: err.message } };
  }
}

/**
 * Delete Team Member
 */
export async function deleteTeamMemberAction(id: string) {
  try {
    const admin = await requireAdmin('DELETE_CONTENT');
    const existing = await db.teamMember.findUnique({ where: { id } });
    if (!existing) throw new Error('Team member not found');

    await db.teamMember.delete({ where: { id } });
    await recordAuditLog({ action: 'DELETE', entity: 'TeamMember', entityId: id, details: existing.name, admin });

    revalidatePath('/team');
    revalidatePath('/');
    return { success: true, message: 'Team member deleted successfully.' };
  } catch (err: any) {
    return { success: false, error: { code: 'ACTION_FAILED', message: err.message } };
  }
}

/**
 * Toggle Team Member Active Status
 */
export async function toggleTeamMemberStatusAction(id: string, newStatus: 'PUBLISHED' | 'DRAFT') {
  try {
    const admin = await requireAdmin('MANAGE_TEAM');
    const existing = await db.teamMember.findUnique({ where: { id } });
    if (!existing) throw new Error('Team member not found');

    const updated = await db.teamMember.update({
      where: { id },
      data: { status: newStatus },
    });

    await recordAuditLog({
      action: 'UPDATE_STATUS',
      entity: 'TeamMember',
      entityId: id,
      details: `${existing.name} status changed to ${newStatus}`,
      admin,
    });

    revalidatePath('/team');
    revalidatePath('/');
    return { success: true, data: updated, message: `Team member status set to ${newStatus}.` };
  } catch (err: any) {
    return { success: false, error: { code: 'ACTION_FAILED', message: err.message } };
  }
}

/**
 * Update Team Member Display Order
 */
export async function updateTeamMemberOrderAction(id: string, newOrder: number) {
  try {
    const admin = await requireAdmin('MANAGE_TEAM');
    const existing = await db.teamMember.findUnique({ where: { id } });
    if (!existing) throw new Error('Team member not found');

    const updated = await db.teamMember.update({
      where: { id },
      data: { displayOrder: newOrder },
    });

    await recordAuditLog({
      action: 'UPDATE_ORDER',
      entity: 'TeamMember',
      entityId: id,
      details: `${existing.name} order set to ${newOrder}`,
      admin,
    });

    revalidatePath('/team');
    revalidatePath('/');
    return { success: true, data: updated, message: 'Display order updated.' };
  } catch (err: any) {
    return { success: false, error: { code: 'ACTION_FAILED', message: err.message } };
  }
}


/**
 * Save / Update Center
 */
export async function saveCenterAction(formData: unknown) {
  try {
    const admin = await requireAdmin('MANAGE_CENTERS');
    const parseResult = centerSchema.safeParse(formData);

    if (!parseResult.success) {
      return {
        success: false,
        error: { code: 'VALIDATION_FAILED', message: parseResult.error.errors[0]?.message },
      };
    }

    const { id, galleryImages, ...data } = parseResult.data;

    let targetId = id;
    if (id) {
      await db.center.update({
        where: { id },
        data,
      });
      await recordAuditLog({ action: 'UPDATE', entity: 'Center', entityId: id, details: data.name, admin });
    } else {
      const created = await db.center.create({ data });
      targetId = created.id;
      await recordAuditLog({ action: 'CREATE', entity: 'Center', entityId: created.id, details: data.name, admin });
    }

    // Sync gallery images if provided
    if (galleryImages !== undefined && targetId) {
      await db.centerImage.deleteMany({ where: { centerId: targetId } });
      if (galleryImages.length > 0) {
        await db.centerImage.createMany({
          data: galleryImages.map((img, idx) => ({
            centerId: targetId,
            imageUrl: img.imageUrl,
            caption: img.caption || '',
            displayOrder: img.displayOrder !== undefined ? img.displayOrder : idx + 1,
          })),
        });
      }
    }

    revalidatePath('/centers');
    revalidatePath(`/centers/${data.slug}`);
    revalidatePath('/');
    return { success: true, message: 'Center saved successfully.' };
  } catch (err: any) {
    return { success: false, error: { code: 'ACTION_FAILED', message: err.message } };
  }
}

/**
 * Toggle Center Status
 */
export async function toggleCenterStatusAction(id: string, newStatus: 'PUBLISHED' | 'DRAFT') {
  try {
    const admin = await requireAdmin('MANAGE_CENTERS');
    const existing = await db.center.findUnique({ where: { id } });
    if (!existing) throw new Error('Center not found');

    const updated = await db.center.update({
      where: { id },
      data: { status: newStatus },
    });

    await recordAuditLog({
      action: 'UPDATE_STATUS',
      entity: 'Center',
      entityId: id,
      details: `${existing.name} status changed to ${newStatus}`,
      admin,
    });

    revalidatePath('/centers');
    revalidatePath(`/centers/${existing.slug}`);
    revalidatePath('/');
    return { success: true, data: updated, message: `Center status set to ${newStatus}.` };
  } catch (err: any) {
    return { success: false, error: { code: 'ACTION_FAILED', message: err.message } };
  }
}

/**
 * Update Center Display Order
 */
export async function updateCenterOrderAction(id: string, newOrder: number) {
  try {
    const admin = await requireAdmin('MANAGE_CENTERS');
    const existing = await db.center.findUnique({ where: { id } });
    if (!existing) throw new Error('Center not found');

    const updated = await db.center.update({
      where: { id },
      data: { displayOrder: newOrder },
    });

    await recordAuditLog({
      action: 'UPDATE_ORDER',
      entity: 'Center',
      entityId: id,
      details: `${existing.name} order set to ${newOrder}`,
      admin,
    });

    revalidatePath('/centers');
    revalidatePath(`/centers/${existing.slug}`);
    revalidatePath('/');
    return { success: true, data: updated, message: 'Display order updated.' };
  } catch (err: any) {
    return { success: false, error: { code: 'ACTION_FAILED', message: err.message } };
  }
}

/**
 * Delete Center
 */
export async function deleteCenterAction(id: string) {
  try {
    const admin = await requireAdmin('DELETE_CONTENT');
    const existing = await db.center.findUnique({ where: { id } });
    if (!existing) throw new Error('Center not found');

    await db.center.delete({ where: { id } });
    await recordAuditLog({ action: 'DELETE', entity: 'Center', entityId: id, details: existing.name, admin });

    revalidatePath('/centers');
    revalidatePath(`/centers/${existing.slug}`);
    revalidatePath('/');
    return { success: true, message: 'Center deleted successfully.' };
  } catch (err: any) {
    return { success: false, error: { code: 'ACTION_FAILED', message: err.message } };
  }
}

/**
 * Update Statistic
 */
export async function saveStatisticAction(formData: unknown) {
  try {
    const admin = await requireAdmin('MANAGE_SETTINGS');
    const parseResult = statisticSchema.safeParse(formData);

    if (!parseResult.success) {
      return {
        success: false,
        error: { code: 'VALIDATION_FAILED', message: parseResult.error.errors[0]?.message },
      };
    }

    const { id, ...data } = parseResult.data;

    if (id) {
      await db.statistic.update({
        where: { id },
        data,
      });
    } else {
      await db.statistic.create({ data });
    }

    await recordAuditLog({ action: 'UPDATE', entity: 'Statistic', details: data.label, admin });

    revalidatePath('/');
    return { success: true, message: 'Statistic updated successfully.' };
  } catch (err: any) {
    return { success: false, error: { code: 'ACTION_FAILED', message: err.message } };
  }
}

/**
 * Save / Update Achievement
 */
export async function saveAchievementAction(formData: unknown) {
  try {
    const admin = await requireAdmin('MANAGE_PROGRAMS');
    const parseResult = achievementSchema.safeParse(formData);

    if (!parseResult.success) {
      return {
        success: false,
        error: { code: 'VALIDATION_FAILED', message: parseResult.error.errors[0]?.message },
      };
    }

    const { id, ...data } = parseResult.data;

    if (id) {
      await db.achievement.update({
        where: { id },
        data,
      });
      await recordAuditLog({ action: 'UPDATE', entity: 'Achievement', entityId: id, details: data.athleteName, admin });
    } else {
      const created = await db.achievement.create({ data });
      await recordAuditLog({ action: 'CREATE', entity: 'Achievement', entityId: created.id, details: data.athleteName, admin });
    }

    revalidatePath('/achievements');
    revalidatePath('/');
    return { success: true, message: 'Achievement saved successfully.' };
  } catch (err: any) {
    return { success: false, error: { code: 'ACTION_FAILED', message: err.message } };
  }
}

/**
 * Delete Achievement
 */
export async function deleteAchievementAction(id: string) {
  try {
    const admin = await requireAdmin('DELETE_CONTENT');
    const existing = await db.achievement.findUnique({ where: { id } });
    if (!existing) throw new Error('Achievement not found');

    await db.achievement.delete({ where: { id } });
    await recordAuditLog({ action: 'DELETE', entity: 'Achievement', entityId: id, details: existing.athleteName, admin });

    revalidatePath('/achievements');
    revalidatePath('/');
    return { success: true, message: 'Achievement deleted successfully.' };
  } catch (err: any) {
    return { success: false, error: { code: 'ACTION_FAILED', message: err.message } };
  }
}

/**
 * Update Enquiry Status (NEW -> CONTACTED -> ARCHIVED)
 */
export async function updateEnquiryStatusAction(id: string, status: 'NEW' | 'CONTACTED' | 'ARCHIVED') {
  try {
    const admin = await requireAdmin('VIEW_ENQUIRIES');
    await db.contactEnquiry.update({
      where: { id },
      data: { status },
    });

    await recordAuditLog({
      action: 'UPDATE',
      entity: 'ContactEnquiry',
      entityId: id,
      details: `Changed enquiry status to ${status}`,
      admin,
    });

    revalidatePath('/admin/enquiries');
    return { success: true, message: `Enquiry marked as ${status}.` };
  } catch (err: any) {
    return { success: false, error: { code: 'ACTION_FAILED', message: err.message } };
  }
}

/**
 * Save Navigation Item
 */
export async function saveNavigationItemAction(formData: unknown) {
  try {
    const admin = await requireAdmin('MANAGE_NAVIGATION');
    const parseResult = navigationItemSchema.safeParse(formData);

    if (!parseResult.success) {
      return {
        success: false,
        error: { code: 'VALIDATION_FAILED', message: parseResult.error.errors[0]?.message },
      };
    }

    const { id, ...data } = parseResult.data;

    if (id) {
      await db.navigationItem.update({
        where: { id },
        data,
      });
    } else {
      await db.navigationItem.create({ data });
    }

    await recordAuditLog({ action: 'NAVIGATION_CHANGE', entity: 'NavigationItem', details: data.label, admin });

    revalidatePath('/', 'layout');
    return { success: true, message: 'Navigation updated successfully.' };
  } catch (err: any) {
    return { success: false, error: { code: 'ACTION_FAILED', message: err.message } };
  }
}

/**
 * Delete Navigation Item
 */
export async function deleteNavigationItemAction(id: string) {
  try {
    const admin = await requireAdmin('MANAGE_NAVIGATION');
    const existing = await db.navigationItem.findUnique({ where: { id } });
    if (!existing) throw new Error('Navigation item not found');

    await db.navigationItem.delete({ where: { id } });
    await recordAuditLog({ action: 'NAVIGATION_CHANGE', entity: 'NavigationItem', entityId: id, details: `Deleted ${existing.label}`, admin });

    revalidatePath('/', 'layout');
    return { success: true, message: 'Navigation item removed.' };
  } catch (err: any) {
    return { success: false, error: { code: 'ACTION_FAILED', message: err.message } };
  }
}

/**
 * Save Testimonial Action (Create / Update)
 */
export async function saveTestimonialAction(formData: unknown) {
  try {
    const admin = await requireAdmin('MANAGE_PAGES');
    const parseResult = testimonialSchema.safeParse(formData);

    if (!parseResult.success) {
      return {
        success: false,
        error: { code: 'VALIDATION_FAILED', message: parseResult.error.errors[0]?.message || 'Invalid input' },
      };
    }

    const { id, ...data } = parseResult.data;

    let saved;
    if (id) {
      saved = await db.testimonial.update({
        where: { id },
        data,
      });
      await recordAuditLog({
        action: 'UPDATE',
        entity: 'Testimonial',
        entityId: id,
        details: `Updated testimonial for ${saved.authorName}`,
        admin,
      });
    } else {
      saved = await db.testimonial.create({
        data,
      });
      await recordAuditLog({
        action: 'CREATE',
        entity: 'Testimonial',
        entityId: saved.id,
        details: `Created new testimonial by ${saved.authorName}`,
        admin,
      });
    }

    revalidatePath('/');
    revalidatePath('/admin/testimonials');
    return { success: true, message: 'Testimonial saved successfully.', testimonial: saved };
  } catch (err: any) {
    return { success: false, error: { code: 'ACTION_FAILED', message: err.message } };
  }
}

/**
 * Delete Testimonial Action
 */
export async function deleteTestimonialAction(id: string) {
  try {
    const admin = await requireAdmin('MANAGE_PAGES');
    const existing = await db.testimonial.findUnique({ where: { id } });
    if (!existing) throw new Error('Testimonial not found');

    await db.testimonial.delete({ where: { id } });
    await recordAuditLog({
      action: 'DELETE',
      entity: 'Testimonial',
      entityId: id,
      details: `Deleted testimonial from ${existing.authorName}`,
      admin,
    });

    revalidatePath('/');
    revalidatePath('/admin/testimonials');
    return { success: true, message: 'Testimonial deleted successfully.' };
  } catch (err: any) {
    return { success: false, error: { code: 'ACTION_FAILED', message: err.message } };
  }
}

/**
 * Toggle Testimonial Status Action
 */
export async function toggleTestimonialStatusAction(id: string, currentStatus: string) {
  try {
    const admin = await requireAdmin('MANAGE_PAGES');
    const nextStatus = currentStatus === 'PUBLISHED' ? 'DRAFT' : 'PUBLISHED';

    const updated = await db.testimonial.update({
      where: { id },
      data: { status: nextStatus },
    });

    await recordAuditLog({
      action: 'UPDATE',
      entity: 'Testimonial',
      entityId: id,
      details: `Changed testimonial status to ${nextStatus}`,
      admin,
    });

    revalidatePath('/');
    revalidatePath('/admin/testimonials');
    return { success: true, message: `Testimonial status set to ${nextStatus}.`, status: nextStatus };
  } catch (err: any) {
    return { success: false, error: { code: 'ACTION_FAILED', message: err.message } };
  }
}

/**
 * Save GGEMS Ecosystem Vertical Action (Create / Update)
 */
export async function saveVerticalAction(formData: unknown) {
  try {
    const admin = await requireAdmin('MANAGE_PAGES');
    const parseResult = ggemsVerticalSchema.safeParse(formData);

    if (!parseResult.success) {
      return {
        success: false,
        error: { code: 'VALIDATION_FAILED', message: parseResult.error.errors[0]?.message || 'Invalid input' },
      };
    }

    const { id, ...data } = parseResult.data;

    let saved;
    if (id) {
      saved = await db.ggemsVertical.update({
        where: { id },
        data,
      });
      await recordAuditLog({
        action: 'UPDATE',
        entity: 'GgemsVertical',
        entityId: id,
        details: `Updated ecosystem vertical: ${saved.title}`,
        admin,
      });
    } else {
      saved = await db.ggemsVertical.create({
        data,
      });
      await recordAuditLog({
        action: 'CREATE',
        entity: 'GgemsVertical',
        entityId: saved.id,
        details: `Created new ecosystem vertical: ${saved.title}`,
        admin,
      });
    }

    revalidatePath('/');
    revalidatePath('/admin/ecosystem');
    return { success: true, message: 'Ecosystem vertical saved successfully.', vertical: saved };
  } catch (err: any) {
    return { success: false, error: { code: 'ACTION_FAILED', message: err.message } };
  }
}

/**
 * Delete GGEMS Ecosystem Vertical Action
 */
export async function deleteVerticalAction(id: string) {
  try {
    const admin = await requireAdmin('MANAGE_PAGES');
    const existing = await db.ggemsVertical.findUnique({ where: { id } });
    if (!existing) throw new Error('Ecosystem vertical not found');

    await db.ggemsVertical.delete({ where: { id } });
    await recordAuditLog({
      action: 'DELETE',
      entity: 'GgemsVertical',
      entityId: id,
      details: `Deleted ecosystem vertical: ${existing.title}`,
      admin,
    });

    revalidatePath('/');
    revalidatePath('/admin/ecosystem');
    return { success: true, message: 'Ecosystem vertical deleted successfully.' };
  } catch (err: any) {
    return { success: false, error: { code: 'ACTION_FAILED', message: err.message } };
  }
}

/**
 * Toggle GGEMS Ecosystem Vertical Published Status
 */
export async function toggleVerticalPublishedAction(id: string, currentPublished: boolean) {
  try {
    const admin = await requireAdmin('MANAGE_PAGES');
    const nextPublished = !currentPublished;

    const updated = await db.ggemsVertical.update({
      where: { id },
      data: { published: nextPublished },
    });

    await recordAuditLog({
      action: 'UPDATE',
      entity: 'GgemsVertical',
      entityId: id,
      details: `Changed vertical ${updated.title} published status to ${nextPublished}`,
      admin,
    });

    revalidatePath('/');
    revalidatePath('/admin/ecosystem');
    return { success: true, message: `Vertical is now ${nextPublished ? 'published' : 'unpublished'}.`, published: nextPublished };
  } catch (err: any) {
    return { success: false, error: { code: 'ACTION_FAILED', message: err.message } };
  }
}

/**
 * Reorder GGEMS Ecosystem Verticals
 */
export async function reorderVerticalsAction(items: { id: string; displayOrder: number }[]) {
  try {
    const admin = await requireAdmin('MANAGE_PAGES');

    await Promise.all(
      items.map((item) =>
        db.ggemsVertical.update({
          where: { id: item.id },
          data: { displayOrder: item.displayOrder },
        })
      )
    );

    await recordAuditLog({
      action: 'REORDER',
      entity: 'GgemsVertical',
      details: `Reordered ${items.length} ecosystem verticals`,
      admin,
    });

    revalidatePath('/');
    revalidatePath('/admin/ecosystem');
    return { success: true, message: 'Verticals reordered successfully.' };
  } catch (err: any) {
    return { success: false, error: { code: 'ACTION_FAILED', message: err.message } };
  }
}

/**
 * ========================================================
 * CONTACT SETTINGS ACTIONS: PHONES
 * ========================================================
 */

export async function saveContactPhoneAction(formData: unknown) {
  try {
    const admin = await requireAdmin('MANAGE_SETTINGS');
    const parseResult = contactPhoneSchema.safeParse(formData);
    if (!parseResult.success) {
      return {
        success: false,
        error: { code: 'VALIDATION_FAILED', message: parseResult.error.errors[0]?.message || 'Invalid phone data' },
      };
    }

    const { id, phoneNumber, role, description, displayOrder, isPrimary, isActive } = parseResult.data;

    let savedPhone;
    if (id) {
      if (isPrimary) {
        await db.contactPhone.updateMany({
          where: { id: { not: id } },
          data: { isPrimary: false },
        });
      } else {
        const otherPrimary = await db.contactPhone.findFirst({
          where: { id: { not: id }, isPrimary: true },
        });
        if (!otherPrimary) {
          const anotherActive = await db.contactPhone.findFirst({
            where: { id: { not: id }, isActive: true },
            orderBy: { displayOrder: 'asc' },
          });
          if (anotherActive) {
            await db.contactPhone.update({
              where: { id: anotherActive.id },
              data: { isPrimary: true },
            });
          }
        }
      }

      savedPhone = await db.contactPhone.update({
        where: { id },
        data: {
          phoneNumber,
          role,
          description: description || null,
          displayOrder,
          isPrimary,
          isActive,
        },
      });

      await recordAuditLog({
        action: 'UPDATE',
        entity: 'ContactPhone',
        entityId: id,
        details: `Updated phone number: ${phoneNumber} (${role})`,
        admin,
      });
    } else {
      const totalPhones = await db.contactPhone.count();
      const shouldBePrimary = isPrimary || totalPhones === 0;

      if (shouldBePrimary) {
        await db.contactPhone.updateMany({
          data: { isPrimary: false },
        });
      }

      savedPhone = await db.contactPhone.create({
        data: {
          phoneNumber,
          role,
          description: description || null,
          displayOrder: displayOrder || totalPhones + 1,
          isPrimary: shouldBePrimary,
          isActive,
        },
      });

      await recordAuditLog({
        action: 'CREATE',
        entity: 'ContactPhone',
        entityId: savedPhone.id,
        details: `Created phone number: ${phoneNumber} (${role})`,
        admin,
      });
    }

    revalidatePath('/contact');
    revalidatePath('/admin/contact');
    return { success: true, phone: savedPhone, message: 'Phone number saved successfully.' };
  } catch (err: any) {
    return { success: false, error: { code: 'ACTION_FAILED', message: err.message } };
  }
}

export async function deleteContactPhoneAction(id: string) {
  try {
    const admin = await requireAdmin('MANAGE_SETTINGS');
    const existing = await db.contactPhone.findUnique({ where: { id } });
    if (!existing) {
      return { success: false, error: { code: 'NOT_FOUND', message: 'Phone number not found.' } };
    }

    if (existing.isActive) {
      const activeCount = await db.contactPhone.count({ where: { isActive: true } });
      if (activeCount <= 1) {
        return {
          success: false,
          error: {
            code: 'LAST_ACTIVE_PHONE',
            message: 'Delete prevented: Cannot delete the only active phone number. Please add another active phone number first.',
          },
        };
      }
    }

    if (existing.isPrimary) {
      const nextActive = await db.contactPhone.findFirst({
        where: { id: { not: id }, isActive: true },
        orderBy: { displayOrder: 'asc' },
      });
      if (nextActive) {
        await db.contactPhone.update({
          where: { id: nextActive.id },
          data: { isPrimary: true },
        });
      }
    }

    await db.contactPhone.delete({ where: { id } });

    await recordAuditLog({
      action: 'DELETE',
      entity: 'ContactPhone',
      entityId: id,
      details: `Deleted phone number: ${existing.phoneNumber} (${existing.role})`,
      admin,
    });

    revalidatePath('/contact');
    revalidatePath('/admin/contact');
    return { success: true, message: 'Phone number deleted successfully.' };
  } catch (err: any) {
    return { success: false, error: { code: 'ACTION_FAILED', message: err.message } };
  }
}

export async function toggleContactPhoneStatusAction(id: string, isActive: boolean) {
  try {
    const admin = await requireAdmin('MANAGE_SETTINGS');
    const existing = await db.contactPhone.findUnique({ where: { id } });
    if (!existing) {
      return { success: false, error: { code: 'NOT_FOUND', message: 'Phone number not found.' } };
    }

    if (!isActive) {
      const activeCount = await db.contactPhone.count({ where: { isActive: true } });
      if (activeCount <= 1) {
        return {
          success: false,
          error: {
            code: 'LAST_ACTIVE_PHONE',
            message: 'Disable prevented: Cannot disable the only active phone number.',
          },
        };
      }

      if (existing.isPrimary) {
        const nextActive = await db.contactPhone.findFirst({
          where: { id: { not: id }, isActive: true },
          orderBy: { displayOrder: 'asc' },
        });
        if (nextActive) {
          await db.contactPhone.update({
            where: { id: nextActive.id },
            data: { isPrimary: true },
          });
        }
      }
    }

    await db.contactPhone.update({
      where: { id },
      data: { isActive, isPrimary: !isActive ? false : existing.isPrimary },
    });

    await recordAuditLog({
      action: 'UPDATE',
      entity: 'ContactPhone',
      entityId: id,
      details: `Changed phone ${existing.phoneNumber} status to ${isActive ? 'active' : 'disabled'}`,
      admin,
    });

    revalidatePath('/contact');
    revalidatePath('/admin/contact');
    return { success: true, message: `Phone number ${isActive ? 'enabled' : 'disabled'} successfully.` };
  } catch (err: any) {
    return { success: false, error: { code: 'ACTION_FAILED', message: err.message } };
  }
}

export async function setPrimaryContactPhoneAction(id: string) {
  try {
    const admin = await requireAdmin('MANAGE_SETTINGS');
    const existing = await db.contactPhone.findUnique({ where: { id } });
    if (!existing) {
      return { success: false, error: { code: 'NOT_FOUND', message: 'Phone number not found.' } };
    }

    await db.$transaction([
      db.contactPhone.updateMany({ data: { isPrimary: false } }),
      db.contactPhone.update({ where: { id }, data: { isPrimary: true, isActive: true } }),
    ]);

    await recordAuditLog({
      action: 'UPDATE',
      entity: 'ContactPhone',
      entityId: id,
      details: `Set phone ${existing.phoneNumber} as primary contact`,
      admin,
    });

    revalidatePath('/contact');
    revalidatePath('/admin/contact');
    return { success: true, message: `Phone ${existing.phoneNumber} is now set as Primary.` };
  } catch (err: any) {
    return { success: false, error: { code: 'ACTION_FAILED', message: err.message } };
  }
}

export async function reorderContactPhonesAction(items: { id: string; displayOrder: number }[]) {
  try {
    const admin = await requireAdmin('MANAGE_SETTINGS');
    await Promise.all(
      items.map((item) =>
        db.contactPhone.update({
          where: { id: item.id },
          data: { displayOrder: item.displayOrder },
        })
      )
    );

    await recordAuditLog({
      action: 'REORDER',
      entity: 'ContactPhone',
      details: `Reordered ${items.length} phone numbers`,
      admin,
    });

    revalidatePath('/contact');
    revalidatePath('/admin/contact');
    return { success: true, message: 'Phone numbers reordered successfully.' };
  } catch (err: any) {
    return { success: false, error: { code: 'ACTION_FAILED', message: err.message } };
  }
}

/**
 * ========================================================
 * CONTACT SETTINGS ACTIONS: EMAILS
 * ========================================================
 */

export async function saveContactEmailAction(formData: unknown) {
  try {
    const admin = await requireAdmin('MANAGE_SETTINGS');
    const parseResult = contactEmailSchema.safeParse(formData);
    if (!parseResult.success) {
      return {
        success: false,
        error: { code: 'VALIDATION_FAILED', message: parseResult.error.errors[0]?.message || 'Invalid email data' },
      };
    }

    const { id, email, role, description, displayOrder, isPrimary, isActive } = parseResult.data;

    let savedEmail;
    if (id) {
      if (isPrimary) {
        await db.contactEmail.updateMany({
          where: { id: { not: id } },
          data: { isPrimary: false },
        });
      } else {
        const otherPrimary = await db.contactEmail.findFirst({
          where: { id: { not: id }, isPrimary: true },
        });
        if (!otherPrimary) {
          const anotherActive = await db.contactEmail.findFirst({
            where: { id: { not: id }, isActive: true },
            orderBy: { displayOrder: 'asc' },
          });
          if (anotherActive) {
            await db.contactEmail.update({
              where: { id: anotherActive.id },
              data: { isPrimary: true },
            });
          }
        }
      }

      savedEmail = await db.contactEmail.update({
        where: { id },
        data: {
          email,
          role,
          description: description || null,
          displayOrder,
          isPrimary,
          isActive,
        },
      });

      await recordAuditLog({
        action: 'UPDATE',
        entity: 'ContactEmail',
        entityId: id,
        details: `Updated email: ${email} (${role})`,
        admin,
      });
    } else {
      const totalEmails = await db.contactEmail.count();
      const shouldBePrimary = isPrimary || totalEmails === 0;

      if (shouldBePrimary) {
        await db.contactEmail.updateMany({
          data: { isPrimary: false },
        });
      }

      savedEmail = await db.contactEmail.create({
        data: {
          email,
          role,
          description: description || null,
          displayOrder: displayOrder || totalEmails + 1,
          isPrimary: shouldBePrimary,
          isActive,
        },
      });

      await recordAuditLog({
        action: 'CREATE',
        entity: 'ContactEmail',
        entityId: savedEmail.id,
        details: `Created email: ${email} (${role})`,
        admin,
      });
    }

    revalidatePath('/contact');
    revalidatePath('/admin/contact');
    return { success: true, email: savedEmail, message: 'Email address saved successfully.' };
  } catch (err: any) {
    return { success: false, error: { code: 'ACTION_FAILED', message: err.message } };
  }
}

export async function deleteContactEmailAction(id: string) {
  try {
    const admin = await requireAdmin('MANAGE_SETTINGS');
    const existing = await db.contactEmail.findUnique({ where: { id } });
    if (!existing) {
      return { success: false, error: { code: 'NOT_FOUND', message: 'Email not found.' } };
    }

    if (existing.isActive) {
      const activeCount = await db.contactEmail.count({ where: { isActive: true } });
      if (activeCount <= 1) {
        return {
          success: false,
          error: {
            code: 'LAST_ACTIVE_EMAIL',
            message: 'Delete prevented: Cannot delete the only active email address. Please add another active email address first.',
          },
        };
      }
    }

    if (existing.isPrimary) {
      const nextActive = await db.contactEmail.findFirst({
        where: { id: { not: id }, isActive: true },
        orderBy: { displayOrder: 'asc' },
      });
      if (nextActive) {
        await db.contactEmail.update({
          where: { id: nextActive.id },
          data: { isPrimary: true },
        });
      }
    }

    await db.contactEmail.delete({ where: { id } });

    await recordAuditLog({
      action: 'DELETE',
      entity: 'ContactEmail',
      entityId: id,
      details: `Deleted email: ${existing.email} (${existing.role})`,
      admin,
    });

    revalidatePath('/contact');
    revalidatePath('/admin/contact');
    return { success: true, message: 'Email address deleted successfully.' };
  } catch (err: any) {
    return { success: false, error: { code: 'ACTION_FAILED', message: err.message } };
  }
}

export async function toggleContactEmailStatusAction(id: string, isActive: boolean) {
  try {
    const admin = await requireAdmin('MANAGE_SETTINGS');
    const existing = await db.contactEmail.findUnique({ where: { id } });
    if (!existing) {
      return { success: false, error: { code: 'NOT_FOUND', message: 'Email not found.' } };
    }

    if (!isActive) {
      const activeCount = await db.contactEmail.count({ where: { isActive: true } });
      if (activeCount <= 1) {
        return {
          success: false,
          error: {
            code: 'LAST_ACTIVE_EMAIL',
            message: 'Disable prevented: Cannot disable the only active email address.',
          },
        };
      }

      if (existing.isPrimary) {
        const nextActive = await db.contactEmail.findFirst({
          where: { id: { not: id }, isActive: true },
          orderBy: { displayOrder: 'asc' },
        });
        if (nextActive) {
          await db.contactEmail.update({
            where: { id: nextActive.id },
            data: { isPrimary: true },
          });
        }
      }
    }

    await db.contactEmail.update({
      where: { id },
      data: { isActive, isPrimary: !isActive ? false : existing.isPrimary },
    });

    await recordAuditLog({
      action: 'UPDATE',
      entity: 'ContactEmail',
      entityId: id,
      details: `Changed email ${existing.email} status to ${isActive ? 'active' : 'disabled'}`,
      admin,
    });

    revalidatePath('/contact');
    revalidatePath('/admin/contact');
    return { success: true, message: `Email address ${isActive ? 'enabled' : 'disabled'} successfully.` };
  } catch (err: any) {
    return { success: false, error: { code: 'ACTION_FAILED', message: err.message } };
  }
}

export async function setPrimaryContactEmailAction(id: string) {
  try {
    const admin = await requireAdmin('MANAGE_SETTINGS');
    const existing = await db.contactEmail.findUnique({ where: { id } });
    if (!existing) {
      return { success: false, error: { code: 'NOT_FOUND', message: 'Email not found.' } };
    }

    await db.$transaction([
      db.contactEmail.updateMany({ data: { isPrimary: false } }),
      db.contactEmail.update({ where: { id }, data: { isPrimary: true, isActive: true } }),
    ]);

    await recordAuditLog({
      action: 'UPDATE',
      entity: 'ContactEmail',
      entityId: id,
      details: `Set email ${existing.email} as primary contact`,
      admin,
    });

    revalidatePath('/contact');
    revalidatePath('/admin/contact');
    return { success: true, message: `Email ${existing.email} is now set as Primary.` };
  } catch (err: any) {
    return { success: false, error: { code: 'ACTION_FAILED', message: err.message } };
  }
}

export async function reorderContactEmailsAction(items: { id: string; displayOrder: number }[]) {
  try {
    const admin = await requireAdmin('MANAGE_SETTINGS');
    await Promise.all(
      items.map((item) =>
        db.contactEmail.update({
          where: { id: item.id },
          data: { displayOrder: item.displayOrder },
        })
      )
    );

    await recordAuditLog({
      action: 'REORDER',
      entity: 'ContactEmail',
      details: `Reordered ${items.length} email addresses`,
      admin,
    });

    revalidatePath('/contact');
    revalidatePath('/admin/contact');
    return { success: true, message: 'Email addresses reordered successfully.' };
  } catch (err: any) {
    return { success: false, error: { code: 'ACTION_FAILED', message: err.message } };
  }
}

/**
 * ========================================================
 * CONTACT SETTINGS ACTIONS: ADDRESSES
 * ========================================================
 */

export async function saveContactAddressAction(formData: unknown) {
  try {
    const admin = await requireAdmin('MANAGE_SETTINGS');
    const parseResult = contactAddressSchema.safeParse(formData);
    if (!parseResult.success) {
      return {
        success: false,
        error: { code: 'VALIDATION_FAILED', message: parseResult.error.errors[0]?.message || 'Invalid address data' },
      };
    }

    const {
      id,
      label,
      addressLine1,
      addressLine2,
      city,
      state,
      pincode,
      country,
      mapUrl,
      directionsUrl,
      isPrimary,
      isActive,
      displayOrder,
    } = parseResult.data;

    let savedAddress;
    if (id) {
      if (isPrimary) {
        await db.contactAddress.updateMany({
          where: { id: { not: id } },
          data: { isPrimary: false },
        });
      } else {
        const otherPrimary = await db.contactAddress.findFirst({
          where: { id: { not: id }, isPrimary: true },
        });
        if (!otherPrimary) {
          const anotherActive = await db.contactAddress.findFirst({
            where: { id: { not: id }, isActive: true },
            orderBy: { displayOrder: 'asc' },
          });
          if (anotherActive) {
            await db.contactAddress.update({
              where: { id: anotherActive.id },
              data: { isPrimary: true },
            });
          }
        }
      }

      savedAddress = await db.contactAddress.update({
        where: { id },
        data: {
          label,
          addressLine1,
          addressLine2: addressLine2 || null,
          city,
          state,
          pincode: pincode || null,
          country: country || 'India',
          mapUrl: mapUrl || null,
          directionsUrl: directionsUrl || null,
          isPrimary,
          isActive,
          displayOrder,
        },
      });

      await recordAuditLog({
        action: 'UPDATE',
        entity: 'ContactAddress',
        entityId: id,
        details: `Updated address: ${label} (${city}, ${state})`,
        admin,
      });
    } else {
      const totalAddresses = await db.contactAddress.count();
      const shouldBePrimary = isPrimary || totalAddresses === 0;

      if (shouldBePrimary) {
        await db.contactAddress.updateMany({
          data: { isPrimary: false },
        });
      }

      savedAddress = await db.contactAddress.create({
        data: {
          label,
          addressLine1,
          addressLine2: addressLine2 || null,
          city,
          state,
          pincode: pincode || null,
          country: country || 'India',
          mapUrl: mapUrl || null,
          directionsUrl: directionsUrl || null,
          isPrimary: shouldBePrimary,
          isActive,
          displayOrder: displayOrder || totalAddresses + 1,
        },
      });

      await recordAuditLog({
        action: 'CREATE',
        entity: 'ContactAddress',
        entityId: savedAddress.id,
        details: `Created address: ${label} (${city}, ${state})`,
        admin,
      });
    }

    revalidatePath('/contact');
    revalidatePath('/admin/contact');
    return { success: true, address: savedAddress, message: 'Address saved successfully.' };
  } catch (err: any) {
    return { success: false, error: { code: 'ACTION_FAILED', message: err.message } };
  }
}

export async function deleteContactAddressAction(id: string) {
  try {
    const admin = await requireAdmin('MANAGE_SETTINGS');
    const existing = await db.contactAddress.findUnique({ where: { id } });
    if (!existing) {
      return { success: false, error: { code: 'NOT_FOUND', message: 'Address not found.' } };
    }

    if (existing.isActive) {
      const activeCount = await db.contactAddress.count({ where: { isActive: true } });
      if (activeCount <= 1) {
        return {
          success: false,
          error: {
            code: 'LAST_ACTIVE_ADDRESS',
            message: 'Delete prevented: Cannot delete the only active address. Please add another address first.',
          },
        };
      }
    }

    if (existing.isPrimary) {
      const nextActive = await db.contactAddress.findFirst({
        where: { id: { not: id }, isActive: true },
        orderBy: { displayOrder: 'asc' },
      });
      if (nextActive) {
        await db.contactAddress.update({
          where: { id: nextActive.id },
          data: { isPrimary: true },
        });
      }
    }

    await db.contactAddress.delete({ where: { id } });

    await recordAuditLog({
      action: 'DELETE',
      entity: 'ContactAddress',
      entityId: id,
      details: `Deleted address: ${existing.label}`,
      admin,
    });

    revalidatePath('/contact');
    revalidatePath('/admin/contact');
    return { success: true, message: 'Address deleted successfully.' };
  } catch (err: any) {
    return { success: false, error: { code: 'ACTION_FAILED', message: err.message } };
  }
}

export async function toggleContactAddressStatusAction(id: string, isActive: boolean) {
  try {
    const admin = await requireAdmin('MANAGE_SETTINGS');
    const existing = await db.contactAddress.findUnique({ where: { id } });
    if (!existing) {
      return { success: false, error: { code: 'NOT_FOUND', message: 'Address not found.' } };
    }

    if (!isActive) {
      const activeCount = await db.contactAddress.count({ where: { isActive: true } });
      if (activeCount <= 1) {
        return {
          success: false,
          error: {
            code: 'LAST_ACTIVE_ADDRESS',
            message: 'Disable prevented: Cannot disable the only active address.',
          },
        };
      }

      if (existing.isPrimary) {
        const nextActive = await db.contactAddress.findFirst({
          where: { id: { not: id }, isActive: true },
          orderBy: { displayOrder: 'asc' },
        });
        if (nextActive) {
          await db.contactAddress.update({
            where: { id: nextActive.id },
            data: { isPrimary: true },
          });
        }
      }
    }

    await db.contactAddress.update({
      where: { id },
      data: { isActive, isPrimary: !isActive ? false : existing.isPrimary },
    });

    await recordAuditLog({
      action: 'UPDATE',
      entity: 'ContactAddress',
      entityId: id,
      details: `Changed address ${existing.label} status to ${isActive ? 'active' : 'disabled'}`,
      admin,
    });

    revalidatePath('/contact');
    revalidatePath('/admin/contact');
    return { success: true, message: `Address ${isActive ? 'enabled' : 'disabled'} successfully.` };
  } catch (err: any) {
    return { success: false, error: { code: 'ACTION_FAILED', message: err.message } };
  }
}

export async function setPrimaryContactAddressAction(id: string) {
  try {
    const admin = await requireAdmin('MANAGE_SETTINGS');
    const existing = await db.contactAddress.findUnique({ where: { id } });
    if (!existing) {
      return { success: false, error: { code: 'NOT_FOUND', message: 'Address not found.' } };
    }

    await db.$transaction([
      db.contactAddress.updateMany({ data: { isPrimary: false } }),
      db.contactAddress.update({ where: { id }, data: { isPrimary: true, isActive: true } }),
    ]);

    await recordAuditLog({
      action: 'UPDATE',
      entity: 'ContactAddress',
      entityId: id,
      details: `Set address ${existing.label} as primary`,
      admin,
    });

    revalidatePath('/contact');
    revalidatePath('/admin/contact');
    return { success: true, message: `Address "${existing.label}" is now set as Primary.` };
  } catch (err: any) {
    return { success: false, error: { code: 'ACTION_FAILED', message: err.message } };
  }
}

export async function reorderContactAddressesAction(items: { id: string; displayOrder: number }[]) {
  try {
    const admin = await requireAdmin('MANAGE_SETTINGS');
    await Promise.all(
      items.map((item) =>
        db.contactAddress.update({
          where: { id: item.id },
          data: { displayOrder: item.displayOrder },
        })
      )
    );

    await recordAuditLog({
      action: 'REORDER',
      entity: 'ContactAddress',
      details: `Reordered ${items.length} addresses`,
      admin,
    });

    revalidatePath('/contact');
    revalidatePath('/admin/contact');
    return { success: true, message: 'Addresses reordered successfully.' };
  } catch (err: any) {
    return { success: false, error: { code: 'ACTION_FAILED', message: err.message } };
  }
}

/**
 * Update Brand Logos Action (Header & Footer)
 */
export async function updateBrandLogosAction(input: {
  headerLogo?: string | null;
  footerLogo?: string | null;
}) {
  try {
    const admin = await requireAdmin();

    let logoValue: string | null = null;
    const trimmedHeader = input.headerLogo?.trim() || null;
    const trimmedFooter = input.footerLogo?.trim() || null;

    if (trimmedHeader || trimmedFooter) {
      logoValue = JSON.stringify({
        header: trimmedHeader,
        footer: trimmedFooter,
      });
    }

    await db.siteSettings.upsert({
      where: { id: 1 },
      update: { logoUrl: logoValue },
      create: {
        id: 1,
        siteName: 'GGEMS SQUASH ACADEMY',
        siteTagline: 'Unleash Your Inner Champion',
        siteDescription:
          'With over 20 years of experience in squash coaching and sports development, GGems develops players from grassroots to national excellence across Delhi NCR.',
        address: 'Jaypee Wish Town, Kosmos-62, Sector 134',
        officeLocationDetails: 'Jaypee Wish Town, Kosmos-62, Sector 134, Noida',
        logoUrl: logoValue,
      },
    });

    await recordAuditLog({
      action: 'UPDATE',
      entity: 'SiteSettings',
      entityId: '1',
      details: `Updated brand logos: Header (${trimmedHeader ? 'custom' : 'default'}), Footer (${trimmedFooter ? 'custom' : 'default'})`,
      admin,
    });

    revalidatePath('/', 'layout');
    revalidatePath('/admin/branding');
    revalidatePath('/admin/navigation');
    return { success: true, message: 'Brand logos updated successfully.' };
  } catch (err: any) {
    return { success: false, error: { code: 'ACTION_FAILED', message: err.message || 'Failed to update brand logos.' } };
  }
}


