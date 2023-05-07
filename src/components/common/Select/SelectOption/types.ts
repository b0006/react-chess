import { Option } from '../types';

export interface SelectOptionProps {
  isOpen: boolean;
  option: Option;
  activeOption: Option | null;
  onChange: () => void;
}
