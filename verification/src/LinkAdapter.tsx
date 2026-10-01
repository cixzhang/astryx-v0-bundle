import {forwardRef} from 'react';
import type {AnchorHTMLAttributes} from 'react';

export const LinkAdapter = forwardRef<
  HTMLAnchorElement,
  AnchorHTMLAttributes<HTMLAnchorElement>
>(function LinkAdapter(props, ref) {
  return <a ref={ref} {...props} />;
});
