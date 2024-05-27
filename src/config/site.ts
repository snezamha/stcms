export const siteUrl =
  process.env.NEXT_PUBLIC_APP_URL;

export const siteConfig = (locale?: string) => ({
  name: '',
  url: siteUrl + '/' + locale,
  ogImage: `${siteUrl}/${locale}/opengraph-image`,
  description: '',
  links: {
    twitter: '',
    github: '',
  },
  creator: {
    name: 'SnezamhA',
    link: 'mailto:snezamha@gmail.com',
  },
});

export type SiteConfig = typeof siteConfig;
