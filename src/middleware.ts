import { NextRequest, NextResponse } from 'next/server';
import type { NextApiRequest, NextApiResponse } from 'next';
import {
  PREFIX_PHOTO,
} from './site/paths';

export default function middleware(req: NextRequest, res:NextResponse) {
  const pathname = req.nextUrl.pathname;

  if (/^\/photos\/(.)+$/.test(pathname)) {
    // Accept /photos/* paths, but serve /p/*
    const matches = pathname.match(/^\/photos\/(.+)$/);
    return NextResponse.rewrite(new URL(
      `${PREFIX_PHOTO}/${matches?.[1]}`,
      req.url,
    ));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
