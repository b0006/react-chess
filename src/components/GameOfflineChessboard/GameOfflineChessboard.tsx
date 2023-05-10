import { FC } from 'react';
import { observer } from 'mobx-react';
import { partyStore } from '../../store';
import { Chessboard, useChessboard } from '../Chessboard';
import { useAiEngine } from './useAiEngine.hook';

export const GameOfflineChessboard: FC = observer(() => {
  const { viewParty } = partyStore;

  const { chessEngine, boardElRef, boardState, promotionState, setPromotionState, onMove } =
    useChessboard({
      withAnimationPiece: true,
      withAutopromotion: viewParty.isAutoPromotion,
      autopromotionPiece: viewParty.autopromotionPiece,
    });

  const { isAiMoving } = useAiEngine({ chessEngine, viewParty, onMove });

  return (
    <div>
      <Chessboard
        myColor={viewParty.myColor}
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
