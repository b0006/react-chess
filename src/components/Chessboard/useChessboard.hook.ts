import { useRef, useState } from 'react';
import { Chess, Move } from 'chess.js';
import { UseChessboard } from './types';

export const useChessboard = (): UseChessboard => {
  const chessRef = useRef(new Chess());
  const [lastMove, setLastMove] = useState<Move | null>(null);

  return {
    chessEngine: chessRef.current,
    initBoardState: chessRef.current.board(),
    lastMove,
    setLastMove,
  };
};
