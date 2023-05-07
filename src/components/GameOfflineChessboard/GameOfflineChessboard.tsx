import { FC } from 'react';
import { observer } from 'mobx-react';
import { offlineGameStore } from '../../store';
import { Chessboard, useChessboard } from '../Chessboard';
import { useAiEngine } from './useAiEngine.hook';

export const GameOfflineChessboard: FC = observer(() => {
  const { game } = offlineGameStore;

  const { chessEngine, boardElRef, boardState, promotionState, setPromotionState, onMove } =
    useChessboard({
      withAnimationPiece: true,
      withAutopromotion: game.isAutoPromotion,
      autopromotionPiece: game.autopromotionPiece,
    });

  const { isAiMoving } = useAiEngine({ chessEngine, game, onMove });

  return (
    <div>
      <Chessboard
        chessEngine={chessEngine}
        boardState={boardState}
        ref={boardElRef}
        promotionState={promotionState}
        isEnemyMoving={isAiMoving}
        setPromotionState={setPromotionState}
        onMove={onMove}
      />
    </div>
  );
});
