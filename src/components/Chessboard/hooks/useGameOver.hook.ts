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
  typeLabel: null,
  isOnceOver: false,
  typeData: {
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

    const gameOverResult = Object.entries(gameOverStatus).reduce(
      (result, [gameOverType, isGameOver]) => {
        if (isGameOver) {
          const separatorLabel = result.label ? '/' : '';
          const separatorType = result.typeLabel ? '/' : '';

          return {
            label: `${result.label}${separatorLabel}${
              GAME_OVER_LABEL[gameOverType as ChessGameOver]
            }`,
            typeLabel: `${result.typeLabel}${separatorType}${gameOverType}`,
          };
        }

        return result;
      },
      {
        label: '',
        typeLabel: '',
      },
    );

    setGameOverState({
      label: gameOverResult.label,
      typeLabel: gameOverResult.typeLabel as ChessGameOver,
      isOnceOver: Boolean(gameOverResult.label),
      typeData: gameOverStatus,
    });
  }, [chessEngine, boardState]);

  return { gameOverState };
};
