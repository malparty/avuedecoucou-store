import createMiddleware from 'next-intl/middleware';

import { locales, defaultLocale } from '@/i18n';

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicons|img|favicon.ico).*)', '/', '/(en|fr)/:path*'],
};

export default createMiddleware({
  // A list of all locales that are supported
  locales: locales,

  // Used when no locale matches
  defaultLocale: defaultLocale,
});
