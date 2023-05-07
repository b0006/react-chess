import { ChessEngine } from './components/Chessboard/types';

declare global {
  interface Window {
    STOCKFISH: () => ChessEngine;
  }
}

let STOCKFISH = window.STOCKFISH; 
