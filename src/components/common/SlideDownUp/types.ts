import { ReactNode } from 'react';

export interface SlideDownUpProps {
  isOpen: boolean;
  className?: string;
  children?: ReactNode | ReactNode[];
  onAnimationOpenEnd?: () => void;
  onAnimationCloseEnd?: () => void;
}
