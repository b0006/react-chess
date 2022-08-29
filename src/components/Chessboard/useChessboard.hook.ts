import { useRef, useState, useEffect } from 'react';
import { Chess, Move } from 'chess.js';
import { BoardState, UseChessboardProps, UseChessboardReturn } from './types';

const getCenterOfCell = (el: Element) => {
  const state = el.getBoundingClientRect();
  const x = state.left + state.width / 2;
  const y = state.top + state.height / 2;
  return { x, y };
};

const setAnimationPiece = (fromCellEl: Element, toCellEl: Element, callback?: () => void) => {
  let timeoutId: NodeJS.Timeout | null = null;

  const { x: fromX, y: fromY } = getCenterOfCell(fromCellEl);
  const { x: toX, y: toY } = getCenterOfCell(toCellEl);

  const x = toX - fromX;
  const y = toY - fromY;

  const pieceEl = fromCellEl.firstChild as HTMLElement;
  if (!pieceEl) {
    return timeoutId;
  }

  pieceEl.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  // pieceEl.style.zIndex = '11';

  timeoutId = setTimeout(() => {
    if (typeof callback === 'function') {
      callback();
    }
  }, 250);

  return timeoutId;
};

const setAnimationMove = (moved: Move, boardEl: HTMLDivElement | null, callback: () => void) => {
  const fromCellEl = boardEl?.querySelector(`[data-square="${moved.from}"]`);
  const toCellEl = boardEl?.querySelector(`[data-square="${moved.to}"]`);

  if (!fromCellEl || !toCellEl) {
    console.error('Ошибка хода с анимацией:', { fromCellEl, toCellEl });
    return null;
  }

  return setAnimationPiece(fromCellEl, toCellEl, callback);
};

export const useChessboard = ({ withAnimationPiece }: UseChessboardProps): UseChessboardReturn => {
  const boardElRef = useRef<HTMLDivElement>(null);
  const chessRef = useRef(new Chess());
  const moveTimeoutIdRef = useRef<NodeJS.Timeout | null>(null);

  const [boardState, setBoardState] = useState<BoardState | null>(chessRef.current.board());
  const [nextMove, setNextMove] = useState<Move | null>(null);

  const getPossibleMoves = (): Move[] => chessRef.current.moves({ verbose: true });

  const onMove = (move: Move) => {
    const moved = chessRef.current.move({ from: move.from, to: move.to });

    if (!moved) {
      console.error('Ошибка хода:', { nextMove: move });
      return;
    }

    if (!withAnimationPiece) {
      setNextMove(moved);
      setBoardState(chessRef.current.board());
      return;
    }

    moveTimeoutIdRef.current = setAnimationMove(moved, boardElRef.current, () => {
      setNextMove(moved);
      setBoardState(chessRef.current.board());
    });
  };

  useEffect(() => {
    return () => {
      if (moveTimeoutIdRef.current) {
        clearTimeout(moveTimeoutIdRef.current);
      }
    };
  }, []);

  return {
    boardElRef,
    boardState,
    nextMove,
    getPossibleMoves,
    onMove,
  };
};
