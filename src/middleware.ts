import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicons|img|favicon.ico).*)', '/', '/(en|fr)/:path*'],
};

export default createMiddleware(routing);
