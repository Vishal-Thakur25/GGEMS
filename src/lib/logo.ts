export interface SiteLogos {
  headerLogo: string | null;
  footerLogo: string | null;
}

export const DEFAULT_HEADER_LOGO = '/images/GGEMS_Sports_Academy_Logo.png';

/**
 * Safely parse raw logoUrl from SiteSettings.
 * Can be either a direct image URL or a JSON string with { header, footer }.
 */
export function parseSiteLogos(rawLogoUrl: string | null | undefined): SiteLogos {
  if (!rawLogoUrl || typeof rawLogoUrl !== 'string') {
    return {
      headerLogo: null,
      footerLogo: null,
    };
  }

  const trimmed = rawLogoUrl.trim();
  if (trimmed.startsWith('{') && trimmed.endsWith('}')) {
    try {
      const parsed = JSON.parse(trimmed);
      return {
        headerLogo: parsed.header || parsed.headerLogo || null,
        footerLogo: parsed.footer || parsed.footerLogo || null,
      };
    } catch {
      // Fallback if JSON parse fails
    }
  }

  // Plain single URL used for both or header
  return {
    headerLogo: trimmed || null,
    footerLogo: trimmed || null,
  };
}
