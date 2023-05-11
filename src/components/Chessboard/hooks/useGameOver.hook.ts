import { useEffect, useState } from 'react';
import { ChessGameOver } from '../../../store/partyStore/types';
import { UseGameOverProps } from './types';

const GAME_OVER_LABEL: Record<ChessGameOver, string> = {
  checkmate: 'Checkmate',
  draw: 'Draw',
  insufficientMaterial: 'Insufficient material',
  stalemate: 'Stalemate',
  threefoldRepetition: 'Threefold repetition',
};

export const useGameOver = ({ chessEngine, boardState }: UseGameOverProps) => {
  const [gameOverText, setGameOverText] = useState('');

  useEffect(() => {
    if (!boardState) {
      return;
    }

    const gameOverStatus: Record<ChessGameOver, boolean> = {
      checkmate: chessEngine.in_checkmate(),
      draw: chessEngine.in_draw(),
      insufficientMaterial: chessEngine.insufficient_material(),
      stalemate: chessEngine.in_stalemate(),
      threefoldRepetition: chessEngine.in_threefold_repetition(),
    };

    const resultText = Object.entries(gameOverStatus).reduce((str, [gameOverType, isGameOver]) => {
      if (isGameOver) {
        const separator = str ? '/' : '';
        return `${str}${separator}${GAME_OVER_LABEL[gameOverType as ChessGameOver]}`;
      }

      return str;
    }, '');

    setGameOverText(resultText);
  }, [chessEngine, boardState]);

  return { gameOverText };
};
