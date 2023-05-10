import { FC, useEffect } from 'react';
import { observer } from 'mobx-react';
import { useNavigate } from 'react-router-dom';
import { partyStore } from '../../store';
import { GameOfflineChessboard } from '../../components/GameOfflineChessboard';

export const OfflineChessGamePage: FC = observer(() => {
  const navigate = useNavigate();
  const { viewParty } = partyStore;

  useEffect(() => {
    if (!viewParty.isPlaying) {
      navigate('/');
    }
  }, [viewParty.isPlaying]);

  return (
    <div>
      <GameOfflineChessboard />
    </div>
  );
});
