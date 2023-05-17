import { SVGAttributes } from 'react';
import { ICON_LIST } from './icons';

export interface SvgIconProps extends SVGAttributes<SVGElement> {
  kind?: keyof typeof ICON_LIST;
}
