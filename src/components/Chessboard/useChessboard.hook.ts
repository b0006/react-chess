import { useRef, useState } from 'react';
import { Chess, Move } from 'chess.js';
import { BoardState, UseChessboardReturn } from './types';

export const useChessboard = (): UseChessboardReturn => {
  const chessRef = useRef(new Chess());
  const [boardState, setBoardState] = useState<BoardState | null>(chessRef.current.board());
  const [nextMove, setNextMove] = useState<Move | null>(null);

  const onMove = (move: Move) => {
    const moved = chessRef.current.move({ from: move.from, to: move.to });

    if (!moved) {
      console.error('Ошибка хода:', { nextMove: move });
      return;
    }

    setNextMove(moved);
    setBoardState(chessRef.current.board());
  };

  return {
    chessEngine: chessRef.current,
    boardState,
    nextMove,
    onMove,
  };
};
