import { FC } from 'react';
import { Chessboard, useChessboard } from '../../components/Chessboard';

const StartPage: FC = () => {
  const { chessEngine, lastMove, initBoardState, setLastMove } = useChessboard();

  const onClick = () => {
    const moves = chessEngine.moves({ verbose: true });
    const move = moves[Math.floor(Math.random() * moves.length)];
    if (move) {
      setLastMove(move);
    }
  };

  return (
    <div>
      <Chessboard lastMove={lastMove} initBoardState={initBoardState} chessEngine={chessEngine} />
      <button onClick={onClick}>Random move</button>
    </div>
  );
};

export { StartPage };
