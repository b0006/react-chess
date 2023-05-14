import { ButtonHTMLAttributes } from 'react';
import { ICON_LIST } from '../SvgIcon';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Текст кнопки */
  text?: string;
  /** Состояние загрузки */
  isLoading?: boolean;
  /** Иконка */
  icon?: keyof typeof ICON_LIST;
  /** Положение иконки относительно текста */
  iconSide?: 'left' | 'right';
  /** Кнопка в виде круга (только с иконкой) */
  isCircle?: boolean;
  /** Стиль кнопки */
  theme?:
    | 'primary'
    | 'primary-white'
    | 'secondary'
    | 'secondary-white'
    | 'flat'
    | 'flat-white'
    | 'danger';
  /** Кнопка в виде ссылки */
  href?: string;
  /** Класс для ссылки */
  classNameLink?: string;
}
