'use client';

import { AbstractIntlMessages, NextIntlClientProvider } from 'next-intl';

import { timeZone } from '@/i18n/request';

const Providers = ({
  children,
  locale,
  messages,
}: {
  children: React.ReactNode;
  locale: string;
  messages: AbstractIntlMessages;
}) => {
  return (
    <NextIntlClientProvider
      timeZone={timeZone}
      locale={locale}
      defaultTranslationValues={{
        i: (text) => <i>{text}</i>,
      }}
      messages={messages}
    >
      {children}
    </NextIntlClientProvider>
  );
};

export { Providers };
