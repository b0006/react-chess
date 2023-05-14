export interface FilterItem {
  label: string;
  value: string;
}

export interface FilterProps {
  filterList: FilterItem[];
  activeFilterList: string[];
  className?: string;
  onFilterChange: (valueList: string[]) => void;
}

export interface UseFilterProps {
  initActiveFilter?: string[];
}
