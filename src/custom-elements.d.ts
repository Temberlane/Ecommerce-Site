import type { DetailedHTMLProps, HTMLAttributes } from 'react';

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'image-slot': DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & {
        shape?: 'rect' | 'rounded' | 'circle';
        radius?: number | string;
        placeholder?: string;
      };
    }
  }
}
