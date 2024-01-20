import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';

export const defaultLocale = 'fr';
export const locales = [defaultLocale, 'en'];
export const timeZone = 'Europe/Paris';
export const defaultNameSpace = 'pages';

export default getRequestConfig(async ({ locale }: { locale: string }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale)) notFound();

  return {
    messages: (await import(`../locales/${locale}.json`)).default,
    timeZone: timeZone,
  };
});
