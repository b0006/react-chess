export type Appearance = 'info' | 'error' | 'success' | 'warning';

export interface Handler {
  label: string;
  handler: () => void;
}

export interface PopupProps {
  confirm?: Handler;
  cancel?: Handler;
  appearance?: Appearance;
  overlayClickClose?: boolean;
  showCloseButton?: boolean;
  title?: string;
  description?: string;
  onClose: () => void;
}
