import { FC } from 'react';
import { Chessboard, useChessboard } from '../../components/Chessboard';

const StartPage: FC = () => {
  const { boardElRef, boardState, getPossibleMoves, onMove, onUndoMove } = useChessboard({
    withAnimationPiece: true,
  });

  const onClick = () => {
    const moves = getPossibleMoves();
    const move = moves[Math.floor(Math.random() * moves.length)];
    onMove(move);
  };

  return (
    <div>
      <Chessboard boardState={boardState} ref={boardElRef} />
      <button onClick={onClick}>Random move</button>
      <button onClick={onUndoMove}>Undo move</button>
    </div>
  );
};

export { StartPage };
