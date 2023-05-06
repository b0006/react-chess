import { FC } from 'react';
import { Move } from 'chess.js';
import { Chessboard, useChessboard } from '../../components/Chessboard';

const StartPage: FC = () => {
  const { chessEngine, boardElRef, boardState, onMove, onUndoMove } = useChessboard({
    withAnimationPiece: false,
  });

  const onClickCell = (_: string, move: Move | null) => {
    if (move) {
      onMove(move);
    }
  };

  const onClick = () => {
    const moves = chessEngine.moves({ verbose: true });
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
