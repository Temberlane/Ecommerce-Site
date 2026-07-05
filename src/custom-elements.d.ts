import type { DetailedHTMLProps, HTMLAttributes } from 'react';

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'image-slot': DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & {
        shape?: 'rect' | 'rounded' | 'circle';
        radius?: number | string;
        placeholder?: string;
        /** Real photo URL from src/data/images.ts; omit to keep the placeholder tile. */
        src?: string;
      };
    }
  }
}
