import { CSSProperties } from 'react';

export type OptionValue = string | number | null;

export interface Option {
  label: string;
  value: OptionValue;
}

export interface SelectProps {
  className?: string;
  label?: string;
  options: Option[];
  wrapperStyle?: CSSProperties;
  isOutsideClickClose?: boolean;
  withEmptyOption?: boolean;
  emptyOptionLabel?: string;
  value?: OptionValue;
  onChange?: (value: OptionValue) => void;
}
