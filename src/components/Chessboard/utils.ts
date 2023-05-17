import { Move, PieceColor, Square } from 'chess.js';

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
  pieceEl.style.zIndex = '11';

  timeoutId = setTimeout(() => {
    if (typeof callback === 'function') {
      callback();
    }
  }, 250);

  return timeoutId;
};

export const setAnimationMove = (
  moved: Move,
  boardEl: HTMLDivElement | null,
  callback?: () => void,
) => {
  const fromCellEl = boardEl?.querySelector(`[data-square="${moved.from}"]`);
  const toCellEl = boardEl?.querySelector(`[data-square="${moved.to}"]`);

  if (!fromCellEl || !toCellEl) {
    window.console.error('Error animation move:', { fromCellEl, toCellEl });
    return null;
  }

  return setAnimationPiece(fromCellEl, toCellEl, callback);
};

export const getPositionForCastlingPiece = (
  moveColor: PieceColor,
  isCastlingKingSide: boolean,
  isCastlingQueenSide: boolean,
): { from: Square; to: Square } => {
  if (moveColor === 'w') {
    return {
      from: isCastlingKingSide ? 'h1' : 'a1',
      to: isCastlingQueenSide ? 'd1' : 'f1',
    };
  }

  return {
    from: isCastlingKingSide ? 'h8' : 'a8',
    to: isCastlingQueenSide ? 'd8' : 'f8',
  };
};

export const isCastlingMove = (move: Move) => {
  return {
    isCastlingQueenSide: move.san === 'O-O-O',
    isCastlingKingSide: move.san === 'O-O',
  };
};
