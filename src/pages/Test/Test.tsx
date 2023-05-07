import { FC } from 'react';
import { Chessboard, useChessboard } from '../../components/Chessboard';

const TestPage: FC = () => {
  const {
    chessEngine,
    boardElRef,
    boardState,
    promotionState,
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
    console.log('4');
    onMove(move);
  };

  return (
    <div>
      <Chessboard
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

export { TestPage };