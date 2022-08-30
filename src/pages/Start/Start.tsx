import { FC } from 'react';
import { Move } from 'chess.js';
import { Chessboard, useChessboard } from '../../components/Chessboard';

const StartPage: FC = () => {
  const { chessEngine, boardElRef, boardState, getPossibleMoves, onMove, onUndoMove } =
    useChessboard({
      withAnimationPiece: true,
    });

  const onClickCell = (squareId: string, move: Move | null) => {
    console.log(squareId, move);
    if (move) {
      onMove(move);
    }
  };

  const onClick = () => {
    const moves = getPossibleMoves();
    const move = moves[Math.floor(Math.random() * moves.length)];
    onMove(move);
  };

  return (
    <div>
      <Chessboard
        chessEngine={chessEngine}
        boardState={boardState}
        ref={boardElRef}
        onClickCell={onClickCell}
      />
      <button onClick={onClick}>Random move</button>
      <button onClick={onUndoMove}>Undo move</button>
    </div>
  );
};

export { StartPage };
