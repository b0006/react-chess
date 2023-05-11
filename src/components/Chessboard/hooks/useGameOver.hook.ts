import { useEffect, useState } from 'react';
import { ChessGameOver } from '../../../store/partyStore/types';
import { GameOverState, GameOverTypes, UseGameOverProps } from './types';

const GAME_OVER_LABEL: Record<ChessGameOver, string> = {
  checkmate: 'Checkmate',
  draw: 'Draw',
  insufficientMaterial: 'Insufficient material',
  stalemate: 'Stalemate',
  threefoldRepetition: 'Threefold repetition',
};

export const INIT_GAME_OVER_STATE: GameOverState = {
  label: '',
  isOnceOver: false,
  type: {
    checkmate: false,
    draw: false,
    insufficientMaterial: false,
    stalemate: false,
    threefoldRepetition: false,
  },
};

export const useGameOver = ({ chessEngine, boardState }: UseGameOverProps) => {
  const [gameOverState, setGameOverState] = useState<GameOverState>(INIT_GAME_OVER_STATE);

  useEffect(() => {
    if (!boardState) {
      return;
    }

    const gameOverStatus: GameOverTypes = {
      checkmate: chessEngine.in_checkmate(),
      draw: chessEngine.in_draw(),
      insufficientMaterial: chessEngine.insufficient_material(),
      stalemate: chessEngine.in_stalemate(),
      threefoldRepetition: chessEngine.in_threefold_repetition(),
    };

    const gameOverLabel = Object.entries(gameOverStatus).reduce(
      (str, [gameOverType, isGameOver]) => {
        if (isGameOver) {
          const separator = str ? '/' : '';
          return `${str}${separator}${GAME_OVER_LABEL[gameOverType as ChessGameOver]}`;
        }

        return str;
      },
      '',
    );

    setGameOverState({
      label: gameOverLabel,
      isOnceOver: Boolean(gameOverLabel),
      type: gameOverStatus,
    });
  }, [chessEngine, boardState]);

  return { gameOverState };
};
