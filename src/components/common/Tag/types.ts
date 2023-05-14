export interface TagProps {
  className?: string;
  text: string;
  onRemove?: () => void;
  theme?: 'white' | 'primary';
}
