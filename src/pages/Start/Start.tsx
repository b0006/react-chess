import { FC } from 'react';
import { BoardCell, Chessboard, useChessboard } from '../../components/Chessboard';

const StartPage: FC = () => {
  const { boardElRef, boardState, getPossibleMoves, onMove, onUndoMove } = useChessboard({
    withAnimationPiece: true,
  });

  const onClickCell = (squareId: string, cellItem?: BoardCell) => {
    console.log(squareId, cellItem);
  };

  const onClick = () => {
    const moves = getPossibleMoves();
    const move = moves[Math.floor(Math.random() * moves.length)];
    onMove(move);
  };

  return (
    <div>
      <Chessboard boardState={boardState} ref={boardElRef} onClickCell={onClickCell} />
      <button onClick={onClick}>Random move</button>
      <button onClick={onUndoMove}>Undo move</button>
    </div>
  );
};

export { StartPage };
