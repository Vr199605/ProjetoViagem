/**
 * Resolves static asset URLs taking Vite's base path into account
 * ensuring images load reliably on localhost, custom domains, and GitHub Pages subpaths.
 */
export function getAssetUrl(path) {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) {
    return path;
  }
  
  const base = import.meta.env.BASE_URL || '/';
  const cleanBase = base.endsWith('/') ? base : base + '/';
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  
  return `${cleanBase}${cleanPath}`;
}

/**
 * High quality curated fallback images for destinations and events
 */
export const DEFAULT_FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=80';

export function handleImageError(e, fallback = DEFAULT_FALLBACK_IMAGE) {
  if (e?.currentTarget && e.currentTarget.src !== fallback) {
    e.currentTarget.onerror = null; // Prevent infinite error loop
    e.currentTarget.src = fallback;
  }
}
