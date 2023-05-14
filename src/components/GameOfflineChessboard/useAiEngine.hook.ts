import { useEffect, useCallback, useRef, useState } from 'react';
import { ChessInstance, Move } from 'chess.js';
import { PromotionPiece } from '../Chessboard';
import { UseAiEngineProps } from './types';
import { workerScript } from './worker-ai';

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
  const workerAiRef = useRef<Worker>();
  const isMyTurn = chessEngine.turn() === viewParty.myColor;

  const startEnemyMove = useCallback(() => {
    if (!workerAiRef.current || !chessEngine) {
      console.error('Error AI move');
      return;
    }

    setIsAiMoving(true);
    workerAiRef.current.postMessage([chessEngine.fen(), viewParty.difficult]);
  }, [chessEngine, viewParty.difficult]);

  useEffect(() => {
    if (!isMyTurn) {
      startEnemyMove();
    }
  }, [isMyTurn, startEnemyMove]);

  useEffect(() => {
    const loadEngine = () => {
      if (typeof window?.STOCKFISH !== 'function') {
        window.console.error('STOCKFISH was not loaded');
        return;
      }

      if (wasInit) {
        return;
      }

      const onWorkerMessgae = (event: MessageEvent<string>) => {
        try {
          const resultAi = JSON.parse(event.data);
          if (resultAi.bestMoveLine) {
            const move = getEnemyMoveByString(chessEngine, resultAi.bestMoveLine);
            onMove({ move });
            setIsAiMoving(false);
          }
        } catch (err: unknown) {
          // nothing (it is not error)
        }
      };

      workerAiRef.current = new Worker(workerScript);
      workerAiRef.current.addEventListener('message', onWorkerMessgae);

      // the first enemy move
      if (viewParty.myColor === 'b' && !isMyTurn) {
        workerAiRef.current.postMessage([chessEngine.fen(), viewParty.difficult]);
      }

      setWasInit(true);

      return () => {
        workerAiRef.current?.removeEventListener('message', onWorkerMessgae);
        workerAiRef.current?.terminate();
      };
    };

    loadEngine();
  }, [wasInit, isMyTurn, chessEngine, viewParty.difficult, viewParty.myColor, onMove]);

  return { isAiMoving };
};
