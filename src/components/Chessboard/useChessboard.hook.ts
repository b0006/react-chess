import { useRef, useState } from 'react';
import { Chess, Move } from 'chess.js';
import { UseChessboard } from './types';

export const useChessboard = (): UseChessboard => {
  const chessRef = useRef(new Chess());
  const [nextMove, setNextMove] = useState<Move | null>(null);

  return {
    chessEngine: chessRef.current,
    initBoardState: chessRef.current.board(),
    nextMove,
    setNextMove,
  };
};
