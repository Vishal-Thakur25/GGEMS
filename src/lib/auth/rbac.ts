import { AdminRole } from '@prisma/client';

export type Permission =
  | 'VIEW_DASHBOARD'
  | 'MANAGE_PAGES'
  | 'MANAGE_PROGRAMS'
  | 'MANAGE_TEAM'
  | 'MANAGE_CENTERS'
  | 'MANAGE_MEDIA'
  | 'MANAGE_NAVIGATION'
  | 'MANAGE_THEME'
  | 'MANAGE_SEO'
  | 'MANAGE_USERS'
  | 'MANAGE_SETTINGS'
  | 'VIEW_ENQUIRIES'
  | 'DELETE_CONTENT'
  | 'VIEW_AUDIT_LOGS';

const ROLE_PERMISSIONS: Record<AdminRole, Permission[]> = {
  SUPER_ADMIN: [
    'VIEW_DASHBOARD',
    'MANAGE_PAGES',
    'MANAGE_PROGRAMS',
    'MANAGE_TEAM',
    'MANAGE_CENTERS',
    'MANAGE_MEDIA',
    'MANAGE_NAVIGATION',
    'MANAGE_THEME',
    'MANAGE_SEO',
    'MANAGE_USERS',
    'MANAGE_SETTINGS',
    'VIEW_ENQUIRIES',
    'DELETE_CONTENT',
    'VIEW_AUDIT_LOGS',
  ],
  ADMIN: [
    'VIEW_DASHBOARD',
    'MANAGE_PAGES',
    'MANAGE_PROGRAMS',
    'MANAGE_TEAM',
    'MANAGE_CENTERS',
    'MANAGE_MEDIA',
    'MANAGE_NAVIGATION',
    'MANAGE_THEME',
    'MANAGE_SEO',
    'MANAGE_USERS',
    'MANAGE_SETTINGS',
    'VIEW_ENQUIRIES',
    'DELETE_CONTENT',
    'VIEW_AUDIT_LOGS',
  ],
  EDITOR: [
    'VIEW_DASHBOARD',
    'MANAGE_PAGES',
    'MANAGE_PROGRAMS',
    'MANAGE_TEAM',
    'MANAGE_CENTERS',
    'MANAGE_MEDIA',
    'VIEW_ENQUIRIES',
  ],
  CONTENT_MANAGER: [
    'VIEW_DASHBOARD',
    'MANAGE_PAGES',
    'MANAGE_MEDIA',
    'VIEW_ENQUIRIES',
  ],
};

export function hasPermission(role: AdminRole, permission: Permission): boolean {
  const allowed = ROLE_PERMISSIONS[role] || [];
  return allowed.includes(permission);
}
