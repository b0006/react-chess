import { useEffect, useCallback, useRef } from 'react';
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

export const useAiEngine = ({ chessEngine, game, onMove }: UseAiEngineProps) => {
  const engineRef = useRef<ChessEngine>();
  const isMyTurn = chessEngine.turn() === game.myColor;

  const startEnemyMove = useCallback(() => {
    if (!engineRef.current || !chessEngine) {
      console.error('Error AI move');
      return;
    }

    engineRef.current.postMessage(`position fen ${chessEngine.fen()}`);
    engineRef.current.postMessage(`go depth ${game.difficult}`);
  }, [game.difficult, game.myColor]);

  useEffect(() => {
    if (!isMyTurn) {
      console.log('START ENEMY MOVE');
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
          console.log('AI move', move);
          onMove(move);
        }
      }
    },
    [chessEngine],
  );

  useEffect(() => {
    const loadEngine = () => {
      if (typeof window?.STOCKFISH !== 'function') {
        window.console.error('STOCKFISH was not loaded');
        return;
      }

      const engine = window.STOCKFISH();
      engineRef.current = engine;
      engine.onmessage = onEngineEvent;

      engine.postMessage('ucinewgame');
      engine.postMessage(`position fen ${chessEngine.fen()}`);

      // the first enemy move
      if (game.myColor === 'b') {
        engine.postMessage(`go depth ${game.difficult}`);
      }
    };

    loadEngine();
  }, [chessEngine, game, onEngineEvent]);
};
