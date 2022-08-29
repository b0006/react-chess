import { FC } from 'react';
import { Chessboard, useChessboard } from '../../components/Chessboard';

const StartPage: FC = () => {
  const { chessEngine, nextMove, initBoardState, setNextMove } = useChessboard();

  const onClick = () => {
    const moves = chessEngine.moves({ verbose: true });
    const move = moves[Math.floor(Math.random() * moves.length)];
    if (move) {
      setNextMove(move);
    }
  };

  return (
    <div>
      <Chessboard nextMove={nextMove} initBoardState={initBoardState} chessEngine={chessEngine} />
      <button onClick={onClick}>Random move</button>
    </div>
  );
};

export { StartPage };
