import { Inter } from 'next/font/google';
import localFont from 'next/font/local';
import { cookies } from 'next/headers';
import { cn } from '@/lib/utils';
import './globals.css';
import { ThemeProvider } from '@/components/layouts/stcms/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { I18nProviderClient } from '@/locales/client';
import SessionProvider from '@/components/layouts/stcms/session-provider';
import Direction from '@/components/layouts/stcms/direction-provider';

const fontSans = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const fontHeading = localFont({
  src: '../assets/fonts/ttf/iranyekanwebmedium.ttf',
  variable: '--font-iranyekan',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = cookies().get('Next-Locale')?.value || 'en';
  return (
    <html
      suppressHydrationWarning
      lang={locale}
      dir={locale === 'fa' ? 'rtl' : 'ltr'}
    >
      <body
        suppressHydrationWarning={true}
        className={cn(
          'font-sans rtl:font-iranyekan antialiased',
          fontSans.variable,
          fontHeading.variable
        )}
      >
        <SessionProvider>
          <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
            <Direction>
              <I18nProviderClient locale={locale}>
                {children}
                <Toaster />
              </I18nProviderClient>
            </Direction>
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
