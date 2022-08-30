import { useRef, useState, useEffect } from 'react';
import { Chess, Move } from 'chess.js';
import { BoardState, UseChessboardProps, UseChessboardReturn } from './types';
import { setAnimationMove } from './utils';

export const useChessboard = ({ withAnimationPiece }: UseChessboardProps): UseChessboardReturn => {
  const boardElRef = useRef<HTMLDivElement>(null);
  const chessRef = useRef(new Chess());
  const moveTimeoutIdRef = useRef<NodeJS.Timeout | null>(null);

  const [boardState, setBoardState] = useState<BoardState | null>(chessRef.current.board());

  const getPossibleMoves = (): Move[] => chessRef.current.moves({ verbose: true });

  const updateBoardState = () => setBoardState(chessRef.current.board());

  const onMove = (move: Move) => {
    const moved = chessRef.current.move({ from: move.from, to: move.to });

    if (!moved) {
      console.error('Ошибка хода:', { nextMove: move });
      return;
    }

    if (!withAnimationPiece) {
      updateBoardState();
      return;
    }

    moveTimeoutIdRef.current = setAnimationMove(moved, boardElRef.current, () => {
      updateBoardState();
    });
  };

  const onUndoMove = () => {
    const historyMoveList = chessRef.current.history({ verbose: true });
    const lastMove = historyMoveList[historyMoveList.length - 1];

    if (!lastMove) {
      console.error('Ошибка обратного хода');
      return;
    }

    const undo = () => {
      chessRef.current.undo();
      updateBoardState();
    };

    if (!withAnimationPiece) {
      undo();
      return;
    }

    moveTimeoutIdRef.current = setAnimationMove(
      { ...lastMove, from: lastMove.to, to: lastMove.from },
      boardElRef.current,
      () => {
        undo();
      },
    );
  };

  useEffect(() => {
    return () => {
      if (moveTimeoutIdRef.current) {
        clearTimeout(moveTimeoutIdRef.current);
      }
    };
  }, []);

  return {
    chessEngine: chessRef.current,
    boardElRef,
    boardState,
    getPossibleMoves,
    onUndoMove,
    onMove,
  };
};
