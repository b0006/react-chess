import { useRef, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { ClientOnlyPortalProps } from './types';

export const ClientOnlyPortal = ({ children, selector }: ClientOnlyPortalProps) => {
  const ref = useRef<HTMLElement | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    ref.current = selector ? document.querySelector(selector) : document.body;
    setMounted(true);
  }, [selector]);

  return mounted && ref.current ? createPortal(children, ref.current) : null;
};
