import { ChessEngine } from './components/Chessboard/types';

declare global {
  interface Window {
    STOCKFISH: () => ChessEngine;
  }
}

const STOCKFISH = window.STOCKFISH;
