import { getRequestConfig } from 'next-intl/server';
import {routing} from './routing';
export const defaultLocale = 'fr';
export const locales = [defaultLocale, 'en'];
export const timeZone = 'Europe/Paris';
export const defaultNameSpace = 'pages';

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  // Ensure that the incoming locale is valid
  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: (await import(`../../locales/${locale}.json`)).default,
    timeZone: timeZone,
  };
});
