import { FC, useEffect } from 'react';
import { Chessboard, useChessboard } from '../../components/Chessboard';
import { Button } from '../../components/common';
import { useWSActions, useWSConnection } from '../../hooks';

const WS_EVENT_TEST_NAME = 'userTest';

export const TestPage: FC = () => {
  useWSConnection();
  const { sendWsMsg, listenWsMsg } = useWSActions();

  useEffect(() => {
    listenWsMsg(WS_EVENT_TEST_NAME, (message) => {
      console.log('FROM SERVER', message);
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
        onClick={() => sendWsMsg(WS_EVENT_TEST_NAME, { type: 'cc', data: 'dd' })}
      />
    </div>
  );
};
