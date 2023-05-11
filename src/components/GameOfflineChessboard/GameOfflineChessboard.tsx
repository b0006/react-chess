import { FC } from 'react';
import { observer } from 'mobx-react';
import { partyStore } from '../../store';
import { Chessboard, useChessboard } from '../Chessboard';
import { useAiEngine } from './useAiEngine.hook';
import { useApiHistory } from './useApiHistory.hook';
import { useFinishParty } from './useFinishParty.hook';

export const GameOfflineChessboard: FC = observer(() => {
  const { viewParty, updatePartyData } = partyStore;
  const { onMoveCallback } = useApiHistory({ viewParty });

  const {
    chessEngine,
    boardElRef,
    boardState,
    promotionState,
    gameOverState,
    setPromotionState,
    onMove,
  } = useChessboard({
    initStatus: { fen: viewParty.fen || '', pgn: viewParty.pgn || '' },
    withAnimationPiece: true,
    withAutopromotion: viewParty.isAutoPromotion,
    autopromotionPiece: viewParty.autopromotionPiece,
    onMoveCallback,
  });

  const { isAiMoving } = useAiEngine({ chessEngine, viewParty, onMove });

  useFinishParty({ viewParty, gameOverState, updatePartyData });

  return (
    <div>
      <Chessboard
        myColor={viewParty.myColor}
        chessEngine={chessEngine}
        boardState={boardState}
        ref={boardElRef}
        promotionState={promotionState}
        gameOverState={gameOverState}
        isEnemyMoving={isAiMoving}
        setPromotionState={setPromotionState}
        onMove={onMove}
      />
    </div>
  );
});
