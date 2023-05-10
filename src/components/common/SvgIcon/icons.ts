import { FC } from 'react';

import { ReactComponent as CrossIcon } from '../../../assets/common-icons/cross.svg';
import { ReactComponent as LoaderIcon } from '../../../assets/common-icons/loader.svg';
import { ReactComponent as CheckedIcon } from '../../../assets/common-icons/checked.svg';
import { ReactComponent as InfoIcon } from '../../../assets/common-icons/info.svg';
import { ReactComponent as WarningIcon } from '../../../assets/common-icons/warning.svg';
import { ReactComponent as GoogleIcon } from '../../../assets/common-icons/google.svg';
import { ReactComponent as VkIcon } from '../../../assets/common-icons/vk.svg';
import { ReactComponent as LogoutIcon } from '../../../assets/common-icons/logout.svg';
import { ReactComponent as ProfileIcon } from '../../../assets/common-icons/profile.svg';
import { ReactComponent as BarsIcon } from '../../../assets/common-icons/bars.svg';
import { ReactComponent as HomeIcon } from '../../../assets/common-icons/home.svg';
import { ReactComponent as DesktopIcon } from '../../../assets/common-icons/desktop.svg';
import { ReactComponent as SignInIcon } from '../../../assets/common-icons/sign-in.svg';
import { ReactComponent as UserClockIcon } from '../../../assets/common-icons/user-clock.svg';
import { ReactComponent as UserPlusIcon } from '../../../assets/common-icons/user-plus.svg';
import { ReactComponent as ChevronDownicon } from '../../../assets/common-icons/chevronDown.svg';
import { ReactComponent as Plusicon } from '../../../assets/common-icons/plus.svg';
import { ReactComponent as Playicon } from '../../../assets/common-icons/play.svg';

const Empty: FC = () => null;

export const ICON_LIST = {
  undefined: Empty,
  cross: CrossIcon,
  loader: LoaderIcon,
  checked: CheckedIcon,
  info: InfoIcon,
  warning: WarningIcon,
  google: GoogleIcon,
  vk: VkIcon,
  logout: LogoutIcon,
  profile: ProfileIcon,
  bars: BarsIcon,
  home: HomeIcon,
  desktop: DesktopIcon,
  signIn: SignInIcon,
  userClock: UserClockIcon,
  userPlus: UserPlusIcon,
  chevronDown: ChevronDownicon,
  plus: Plusicon,
  play: Playicon,
};
