import { FC } from 'react';
import { Chessboard, useChessboard } from '../../components/Chessboard';

const StartPage: FC = () => {
  const { chessRef, lastMove, initBoardState, setLastMove } = useChessboard();

  const onClick = () => {
    const moves = chessRef.current.moves({ verbose: true });
    const move = moves[Math.floor(Math.random() * moves.length)];
    const moved = chessRef.current.move(move);
    if (moved) {
      setLastMove({ from: moved?.from, to: moved?.to });
    }
  };

  return (
    <div>
      <Chessboard lastMove={lastMove} initBoardState={initBoardState} />
      <p>test</p>
      <button onClick={onClick}>клик</button>
    </div>
  );
};

export { StartPage };
