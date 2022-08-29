import { useRef, useState } from 'react';
import { Chess, ShortMove } from 'chess.js';
import { UseChessboard } from './types';

export const useChessboard = (): UseChessboard => {
  const chessRef = useRef(new Chess());
  const [lastMove, setLastMove] = useState<ShortMove | null>(null);

  return { chessRef, initBoardState: chessRef.current.board(), lastMove, setLastMove };
};
