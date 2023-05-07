import { FC, useEffect } from 'react';
import { observer } from 'mobx-react';
import { useNavigate } from 'react-router-dom';
import { offlineGameStore } from '../../store';
import { GameOfflineChessboard } from '../../components/GameOfflineChessboard';

export const OfflineChessGamePage: FC = observer(() => {
  const navigate = useNavigate();
  const { game } = offlineGameStore;

  useEffect(() => {
    if (!game.isPlaying) {
      navigate('/');
    }
  }, [game]);

  return (
    <div>
      <GameOfflineChessboard />
    </div>
  );
});
