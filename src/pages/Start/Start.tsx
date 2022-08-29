import { FC } from 'react';
import { Chessboard, useChessboard } from '../../components/Chessboard';

const StartPage: FC = () => {
  const { chessEngine, boardState, onMove } = useChessboard();

  const onClick = () => {
    const moves = chessEngine.moves({ verbose: true });
    const move = moves[Math.floor(Math.random() * moves.length)];
    onMove(move);
  };

  return (
    <div>
      <Chessboard boardState={boardState} />
      <button onClick={onClick}>Random move</button>
    </div>
  );
};

export { StartPage };
