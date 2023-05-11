import { FC } from 'react';
import { Chessboard, useChessboard } from '../../components/Chessboard';

export const TestPage: FC = () => {
  const {
    chessEngine,
    boardElRef,
    boardState,
    promotionState,
    gameOverState,
    setPromotionState,
    onMove,
    onUndoMove,
  } = useChessboard({
    withAnimationPiece: true,
    withAutopromotion: false,
    autopromotionPiece: 'b',
  });

  const onClick = () => {
    const moves = chessEngine.moves({ verbose: true });
    const move = moves[Math.floor(Math.random() * moves.length)];
    onMove({ move });
  };

  return (
    <div>
      <Chessboard
        myColor='b'
        gameOverState={gameOverState}
        chessEngine={chessEngine}
        boardState={boardState}
        ref={boardElRef}
        promotionState={promotionState}
        setPromotionState={setPromotionState}
        onMove={onMove}
      />
      <button onClick={onClick}>Random move</button>
      <button onClick={onUndoMove}>Undo move</button>
    </div>
  );
};
