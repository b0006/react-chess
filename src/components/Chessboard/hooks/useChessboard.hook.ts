import { useRef, useState, useEffect } from 'react';
import { Chess } from 'chess.js';
import {
  BoardState,
  OnMoveProps,
  PromotionState,
  UseChessboardProps,
  UseChessboardReturn,
} from '../types';
import { getPositionForCastlingPiece, isCastlingMove, setAnimationMove } from '../utils';

export const useChessboard = ({
  initStatus = {
    fen: '',
    pgn: '',
  },
  withAnimationPiece = true,
  withAutopromotion = true,
  autopromotionPiece = 'q',
  onMoveCallback,
}: UseChessboardProps): UseChessboardReturn => {
  const boardElRef = useRef<HTMLDivElement>(null);
  const chessRef = useRef(new Chess(initStatus.fen || undefined));
  const moveTimeoutIdOneRef = useRef<NodeJS.Timeout | null>(null);
  const moveTimeoutIdTwoRef = useRef<NodeJS.Timeout | null>(null);

  const [wasInit, setWasInit] = useState(false);

  useEffect(() => {
    if (initStatus.pgn && !wasInit) {
      setWasInit(true);
      chessRef.current.load_pgn(initStatus.pgn);
    }
  }, [initStatus.pgn, wasInit]);

  const [promotionState, setPromotionState] = useState<PromotionState>({
    isShownModal: false,
    move: null,
  });
  const [boardState, setBoardState] = useState<BoardState | null>(chessRef.current.board());

  const updateBoardState = () => {
    setBoardState(chessRef.current.board());
    onMoveCallback?.({ fen: chessRef.current.fen(), pgn: chessRef.current.pgn() });
  };

  const onMove = ({ move, extendPromotion }: OnMoveProps) => {
    if (!move) {
      return;
    }

    if (move.promotion && !withAutopromotion && !extendPromotion) {
      setPromotionState({ isShownModal: true, move });
      return;
    }

    const { isCastlingKingSide, isCastlingQueenSide } = isCastlingMove(move);

    const moved = chessRef.current.move({
      from: move.from,
      to: move.to,
      promotion: extendPromotion || autopromotionPiece,
    });

    if (!moved) {
      console.error('Move error:', { nextMove: move });
      return;
    }

    if (!withAnimationPiece) {
      updateBoardState();
      return;
    }

    if (isCastlingQueenSide || isCastlingKingSide) {
      const positionCastling = getPositionForCastlingPiece(
        moved.color,
        isCastlingKingSide,
        isCastlingQueenSide,
      );

      moveTimeoutIdOneRef.current = setAnimationMove(moved, boardElRef.current, () => {
        updateBoardState();
      });

      moveTimeoutIdTwoRef.current = setAnimationMove(
        { ...moved, from: positionCastling.from, to: positionCastling.to },
        boardElRef.current,
        () => {
          updateBoardState();
        },
      );

      return;
    }

    moveTimeoutIdOneRef.current = setAnimationMove(moved, boardElRef.current, () => {
      updateBoardState();
    });
  };

  const onUndoMove = () => {
    const historyMoveList = chessRef.current.history({ verbose: true });
    const lastMove = historyMoveList[historyMoveList.length - 1];

    if (!lastMove) {
      console.error('Error undo move');
      return;
    }

    const undo = () => {
      chessRef.current.undo();
      updateBoardState();
    };

    const { isCastlingKingSide, isCastlingQueenSide } = isCastlingMove(lastMove);

    if (!withAnimationPiece) {
      undo();
      return;
    }

    if (isCastlingKingSide || isCastlingQueenSide) {
      const positionCastling = getPositionForCastlingPiece(
        lastMove.color,
        isCastlingKingSide,
        isCastlingQueenSide,
      );

      moveTimeoutIdOneRef.current = setAnimationMove(
        { ...lastMove, from: lastMove.to, to: lastMove.from },
        boardElRef.current,
      );

      moveTimeoutIdTwoRef.current = setAnimationMove(
        { ...lastMove, from: positionCastling.to, to: positionCastling.from },
        boardElRef.current,
        () => {
          undo();
        },
      );

      return;
    }

    moveTimeoutIdOneRef.current = setAnimationMove(
      { ...lastMove, from: lastMove.to, to: lastMove.from },
      boardElRef.current,
      () => {
        undo();
      },
    );
  };

  useEffect(() => {
    return () => {
      if (moveTimeoutIdOneRef.current) {
        clearTimeout(moveTimeoutIdOneRef.current);
      }

      if (moveTimeoutIdTwoRef.current) {
        clearTimeout(moveTimeoutIdTwoRef.current);
      }
    };
  }, []);

  return {
    chessEngine: chessRef.current,
    boardElRef,
    boardState,
    promotionState,
    setPromotionState,
    onUndoMove,
    onMove,
  };
};
