import { FC, useState } from 'react';
import cn from 'classnames';
import { FilterProps, UseFilterProps } from './types';
import styles from './Filter.module.scss';

export const useFilter = ({ initActiveFilter = [] }: UseFilterProps) => {
  const [activeFilterList, setActiveFilterList] = useState<string[]>(initActiveFilter);

  const onFilterChange = (valueList: string[]) => {
    setActiveFilterList(valueList);
  };

  return { activeFilterList, onFilterChange };
};

export const Filter: FC<FilterProps> = ({
  filterList,
  activeFilterList,
  className,
  onFilterChange,
}) => {
  const onItemClick = (value: string, isActive: boolean) => () => {
    const newList = isActive
      ? [...activeFilterList, value]
      : activeFilterList.filter((item) => item !== value);

    onFilterChange(newList);
  };

  return (
    <div className={cn(styles.wrapper, className)}>
      {filterList.map((item) => (
        <button
          key={item.value}
          type='button'
          className={cn(styles.item, {
            [styles['item__active']]: activeFilterList.includes(item.value),
          })}
          onClick={onItemClick(item.value, !activeFilterList.includes(item.value))}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
};
