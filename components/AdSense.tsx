// Google AdSense Banner Component
'use client';

import { useEffect } from 'react';

const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;

export function AdSenseBanner({ slot, style = {}, className = '' }: { slot: string; style?: React.CSSProperties; className?: string }) {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        // @ts-expect-error AdSense global may not be typed
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch {
        // Ignore AdSense errors silently
      }
    }
  }, []);

  if (!client || client === 'undefined') return null;

  return (
    <ins
      className={`adsbygoogle block ${className}`}
      style={style}
      data-ad-client={client}
      data-ad-slot={slot}
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  );
}
