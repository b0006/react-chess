import { FC, useEffect } from 'react';
import { observer } from 'mobx-react';
import { Chessboard, useChessboard } from '../../components/Chessboard';
import { Button } from '../../components/common';
import { profileStore } from '../../store';

const WS_USER_EVENT = {
  getPartyList: 'getPartyList',
};

const WS_ERROR_EVENT = {
  initConnection: 'initConnection',
};

export const TestPage: FC = observer(() => {
  const { initWsConnection, listenWsMsg, sendWsMsg } = profileStore;

  useEffect(() => {
    initWsConnection();
  }, [initWsConnection]);

  useEffect(() => {
    listenWsMsg(WS_ERROR_EVENT.initConnection, (message) => {
      window.console.log('ERROR FROM SERVER', message);
    });
  }, [listenWsMsg]);

  useEffect(() => {
    listenWsMsg(WS_USER_EVENT.getPartyList, (message) => {
      window.console.log('FROM SERVER', message);
    });
  }, [listenWsMsg]);

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
      <Button
        text='Send test ws'
        onClick={() => sendWsMsg(WS_USER_EVENT.getPartyList, { data: 'dd' })}
      />
    </div>
  );
});
