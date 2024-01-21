import { makeUrlAbsolute, shortenUrl } from '@/utility/url';

// META / DOMAINS

export const SITE_TITLE =
  process.env.NEXT_PUBLIC_SITE_TITLE ||
  'A Vue de Coucou – La boutique';

const VERCEL_BRANCH_URL = process.env.NEXT_PUBLIC_VERCEL_BRANCH_URL;
const VERCEL_BRANCH = process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF;
const VERCEL_URL = VERCEL_BRANCH_URL && VERCEL_BRANCH
  ? `${VERCEL_BRANCH_URL.split(`-git-${VERCEL_BRANCH}-`)[0]}.vercel.app`
  : undefined;

const SITE_DOMAIN =
  process.env.NEXT_PUBLIC_SITE_DOMAIN ||
  VERCEL_URL;

const SITE_DOMAIN_SHORT = shortenUrl(SITE_DOMAIN);

export const SITE_DOMAIN_OR_TITLE =
  SITE_DOMAIN_SHORT ||
  SITE_TITLE;

export const SITE_DESCRIPTION =
  process.env.NEXT_PUBLIC_SITE_DESCRIPTION ||
  SITE_DOMAIN;

export const BASE_URL = process.env.NODE_ENV === 'production'
  ? makeUrlAbsolute(SITE_DOMAIN)?.toLowerCase()
  : 'http://localhost:3000';

// SETTINGS

export const PRO_MODE_ENABLED = process.env.NEXT_PUBLIC_PRO_MODE === '1';
export const GEO_PRIVACY_ENABLED = process.env.NEXT_PUBLIC_GEO_PRIVACY === '1';
export const PRIORITY_ORDER_ENABLED =
  process.env.NEXT_PUBLIC_IGNORE_PRIORITY_ORDER !== '1';
export const SHOW_REPO_LINK = process.env.NEXT_PUBLIC_HIDE_REPO_LINK !== '1';
export const GRID_ASPECT_RATIO = process.env.NEXT_PUBLIC_GRID_ASPECT_RATIO
  ? parseFloat(process.env.NEXT_PUBLIC_GRID_ASPECT_RATIO)
  : 1;
export const OG_TEXT_BOTTOM_ALIGNMENT =
  (process.env.NEXT_PUBLIC_OG_TEXT_ALIGNMENT ?? '').toUpperCase() === 'BOTTOM';

export const HIGH_DENSITY_GRID = GRID_ASPECT_RATIO <= 1;

export const CONFIG_CHECKLIST_STATUS = {
  hasTitle: (process.env.NEXT_PUBLIC_SITE_TITLE ?? '').length > 0,
  hasDomain: (process.env.NEXT_PUBLIC_SITE_DOMAIN ?? '').length > 0,
  showRepoLink: SHOW_REPO_LINK,
  isProModeEnabled: PRO_MODE_ENABLED,
  isGeoPrivacyEnabled: GEO_PRIVACY_ENABLED,
  isPriorityOrderEnabled: PRIORITY_ORDER_ENABLED,
  isOgTextBottomAligned: OG_TEXT_BOTTOM_ALIGNMENT,
  gridAspectRatio: GRID_ASPECT_RATIO,
};

export type ConfigChecklistStatus = typeof CONFIG_CHECKLIST_STATUS;
