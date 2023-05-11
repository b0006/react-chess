import { useEffect, useCallback, useRef, useState } from 'react';
import { ChessInstance, Move } from 'chess.js';
import { ChessEngine, PromotionPiece } from '../Chessboard';
import { UseAiEngineProps } from './types';

const getEnemyMoveByString = (stateChess: ChessInstance, bestMoveLine: string): Move | null => {
  const bestMove = bestMoveLine.substring(0, 4);
  const promotion =
    (bestMoveLine.length === 5 && (bestMoveLine.substring(4, 5) as PromotionPiece)) || undefined;

  const moves = stateChess.moves({ verbose: true });

  const movesData = moves.reduce(
    (result, acc) => ({
      ...result,
      [`${acc.from}${acc.to}`]: acc,
    }),
    {} as Record<string, Move>,
  );

  if (!movesData?.[bestMove]) {
    return null;
  }

  return { ...movesData[bestMove], promotion };
};

export const useAiEngine = ({ chessEngine, viewParty, onMove }: UseAiEngineProps) => {
  const [isAiMoving, setIsAiMoving] = useState(false);

  const [wasInit, setWasInit] = useState(false);
  const engineRef = useRef<ChessEngine>();
  const isMyTurn = chessEngine.turn() === viewParty.myColor;

  const startEnemyMove = useCallback(() => {
    if (!engineRef.current || !chessEngine) {
      console.error('Error AI move');
      return;
    }

    setIsAiMoving(true);
    engineRef.current.postMessage(`position fen ${chessEngine.fen()}`);
    engineRef.current.postMessage(`go depth ${viewParty.difficult}`);
  }, [chessEngine, viewParty.difficult]);

  useEffect(() => {
    if (!isMyTurn) {
      startEnemyMove();
    }
  }, [isMyTurn, startEnemyMove]);

  const onEngineEvent = useCallback(
    (event: unknown) => {
      window.console.log('STOCKFISH event', event);

      if (typeof event === 'string') {
        const [name, value]: string[] = event.split(' ');
        if (name === 'bestmove' && value) {
          const move = getEnemyMoveByString(chessEngine, value);
          onMove({ move });
          setIsAiMoving(false);
        }
      }
    },
    [chessEngine, onMove],
  );

  useEffect(() => {
    const loadEngine = () => {
      if (typeof window?.STOCKFISH !== 'function') {
        window.console.error('STOCKFISH was not loaded');
        return;
      }

      if (wasInit) {
        return;
      }

      const engine = window.STOCKFISH();
      engineRef.current = engine;
      engine.onmessage = onEngineEvent;

      engine.postMessage('ucinewgame');
      engine.postMessage(`position fen ${chessEngine.fen()}`);

      // the first enemy move
      if (viewParty.myColor === 'b') {
        engine.postMessage(`go depth ${viewParty.difficult}`);
      }

      setWasInit(true);
    };

    loadEngine();
  }, [wasInit, chessEngine, viewParty.difficult, viewParty.myColor, onEngineEvent]);

  return { isAiMoving };
};
