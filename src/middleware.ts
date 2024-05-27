import { createI18nMiddleware } from 'next-international/middleware';
import { type NextRequest } from 'next/server';

const I18nMiddleware = createI18nMiddleware({
  locales: ['en', 'fa'],
  defaultLocale: 'fa',
  urlMappingStrategy: 'rewrite',
  resolveLocaleFromRequest: request => {
    // Do your logic here to resolve the locale
    return 'fa'
  }
});

export function middleware(request: NextRequest) {
  return I18nMiddleware(request);
}

export const config = {
  matcher: [
    '/((?!api|static|.*\\..*|_next|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};
