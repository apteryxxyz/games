/* eslint-disable react-hooks/rules-of-hooks */
'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import Script from 'next/script';
import { useEffect } from 'react';

export function GoogleAnalytics() {
  if (
    !process.env['NEXT_PUBLIC_GOOGLE_MEASUREMENT_ID'] ||
    process.env['NODE_ENV'] !== 'production'
  )
    return null;

  const measurementId = process.env['NEXT_PUBLIC_GOOGLE_MEASUREMENT_ID'];
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const path = pathname + searchParams.toString();
    window.gtag('config', measurementId, { page_path: path });
  }, [pathname, searchParams, measurementId]);

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
      />

      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${measurementId}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  );
}
