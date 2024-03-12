'use client';

import { getEscapePath } from '@/site/paths';
import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';

const LISTENER_KEYUP = 'keyup';

export default function PhotoEscapeHandler() {
  const router = useRouter();
  const locale = useLocale();
  const pathname = usePathname();

  const escapePath = getEscapePath(locale, pathname);

  useEffect(() => {
    const onKeyUp = (e: KeyboardEvent) => {
      if (e.key.toUpperCase() === 'ESCAPE' && escapePath) {
        router.push(escapePath, { scroll: false });
      }
    };
    window.addEventListener(LISTENER_KEYUP, onKeyUp);
    return () => window.removeEventListener(LISTENER_KEYUP, onKeyUp);
  }, [router, escapePath]);

  return null;
}
