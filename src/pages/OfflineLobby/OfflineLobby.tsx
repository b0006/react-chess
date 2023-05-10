import { FC } from 'react';
import { observer } from 'mobx-react';
import { OfflineLobby } from '../../components/Lobby/OfflineLobby';

export const OfflineLobbyPage: FC = observer(() => {
  return (
    <div>
      <OfflineLobby />
    </div>
  );
});
