import sanitizeHtml from 'sanitize-html';

/**
 * Sanitizes rich text / HTML content to prevent XSS.
 * Removes dangerous tags, event handlers, and javascript: protocols.
 */
export function sanitizeRichText(dirtyHtml: string): string {
  if (!dirtyHtml) return '';
  return sanitizeHtml(dirtyHtml, {
    allowedTags: [
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span', 'b', 'i', 'strong', 'em',
      'ul', 'ol', 'li', 'br', 'hr', 'blockquote', 'a', 'code', 'pre'
    ],
    allowedAttributes: {
      a: ['href', 'target', 'rel', 'title'],
      span: ['class'],
      p: ['class'],
    },
    allowedSchemes: ['http', 'https', 'mailto', 'tel'],
    transformTags: {
      a: sanitizeHtml.simpleTransform('a', { rel: 'noopener noreferrer' }),
    },
  });
}

/**
 * Validates that an input URL is safe (http, https, or internal relative path).
 * Disallows javascript:, vbscript:, data:, and control characters.
 */
export function isSafeUrl(url: string): boolean {
  if (!url) return false;
  const trimmed = url.trim();

  // Allow relative URLs like /about, /programs/junior
  if (trimmed.startsWith('/') && !trimmed.startsWith('//')) {
    return true;
  }

  // Allow anchor tags like #pathway
  if (trimmed.startsWith('#')) {
    return true;
  }

  // Allow phone & mailto
  if (trimmed.startsWith('tel:') || trimmed.startsWith('mailto:')) {
    return true;
  }

  try {
    const parsed = new URL(trimmed);
    return ['http:', 'https:'].includes(parsed.protocol);
  } catch {
    return false;
  }
}

/**
 * Validates CSS color values (Hex, RGB, HSL) to block CSS injection.
 */
export function isValidCssColor(color: string): boolean {
  if (!color) return false;
  const trimmed = color.trim();

  // Hex color (#FFF, #FFFFFF, #FFFFFFFF)
  const hexRegex = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/;
  if (hexRegex.test(trimmed)) return true;

  // rgb/rgba
  const rgbRegex = /^rgba?\(\s*([0-9]{1,3}\s*,\s*){2}[0-9]{1,3}\s*(,\s*(0|1|0?\.[0-9]+)\s*)?\)$/;
  if (rgbRegex.test(trimmed)) return true;

  // hsl/hsla
  const hslRegex = /^hsla?\(\s*[0-9]{1,3}\s*,\s*[0-9]{1,3}%\s*,\s*[0-9]{1,3}%\s*(,\s*(0|1|0?\.[0-9]+)\s*)?\)$/;
  if (hslRegex.test(trimmed)) return true;

  return false;
}
