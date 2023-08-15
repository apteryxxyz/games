import type { MetadataRoute } from 'next/types';
import { absoluteUrl } from '@/utilities/url';

export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api', '/_next', '/static'],
      },
    ],
    host: absoluteUrl(),
    sitemap: absoluteUrl(`/sitemap.xml`),
  } satisfies MetadataRoute.Robots;
}
