import { FunctionComponent, SVGProps } from 'react';
import { PieceType, PieceColor } from 'chess.js';

import { ReactComponent as BishopDark } from '../../assets/chess-icons/bishop-dark.svg';
import { ReactComponent as BishopLight } from '../../assets/chess-icons/bishop-light.svg';
import { ReactComponent as KingDark } from '../../assets/chess-icons/king-dark.svg';
import { ReactComponent as KingLight } from '../../assets/chess-icons/king-light.svg';
import { ReactComponent as KnightDark } from '../../assets/chess-icons/knight-dark.svg';
import { ReactComponent as KnightLight } from '../../assets/chess-icons/knight-light.svg';
import { ReactComponent as PawnDark } from '../../assets/chess-icons/pawn-dark.svg';
import { ReactComponent as PawnLight } from '../../assets/chess-icons/pawn-light.svg';
import { ReactComponent as QueenDark } from '../../assets/chess-icons/queen-dark.svg';
import { ReactComponent as QueenLight } from '../../assets/chess-icons/queen-light.svg';
import { ReactComponent as RookDark } from '../../assets/chess-icons/rook-dark.svg';
import { ReactComponent as RookLight } from '../../assets/chess-icons/rook-light.svg';

type ChessType = {
  [key in PieceType]: FunctionComponent<SVGProps<SVGSVGElement>>;
};

type IconsType = {
  [key in PieceColor]: ChessType;
};

export const ICONS_DEFAULT: IconsType = {
  b: {
    q: QueenDark,
    b: BishopDark,
    r: RookDark,
    p: PawnDark,
    n: KnightDark,
    k: KingDark,
  },
  w: {
    q: QueenLight,
    b: BishopLight,
    r: RookLight,
    p: PawnLight,
    n: KnightLight,
    k: KingLight,
  },
};

export type SvgIcon = FunctionComponent<SVGProps<SVGSVGElement>> | null;
