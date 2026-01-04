'use client';

import { useState } from 'react';
import Image from 'next/image';

interface ClickableImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  thumbnailWidth?: number;
}

export function ClickableImage({ src, alt, width = 800, height = 600, thumbnailWidth }: ClickableImageProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="block cursor-pointer border-0 bg-transparent p-0 transition-opacity hover:opacity-80"
        type="button"
        aria-label={`Open full size ${alt}`}
        style={thumbnailWidth ? { maxWidth: `${thumbnailWidth}px` } : undefined}
      >
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="rounded-lg w-full h-auto"
        />
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={() => setIsOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Image modal"
        >
          <button
            onClick={() => setIsOpen(false)}
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            type="button"
            aria-label="Close modal"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-[90vh] max-w-[90vw]"
          >
            <Image
              src={src}
              alt={alt}
              width={width * 2}
              height={height * 2}
              className="h-auto max-h-[90vh] w-auto max-w-full rounded-lg"
            />
          </div>
        </div>
      )}
    </>
  );
}
