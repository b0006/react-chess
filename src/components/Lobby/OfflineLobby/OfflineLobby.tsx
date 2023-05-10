import { FC, useState } from 'react';
import { Button } from '../../common';
import { GameOfflineSettings } from '../../GameOfflineSettings';
import { Container } from '../../Layout/Container';
import { PartyList } from '../PartyList';

export const OfflineLobby: FC = () => {
  const [isShownCreateModal, setIsShownCreateModal] = useState(false);

  return (
    <>
      <Container>
        <div>
          <Button text='Create a party' onClick={() => setIsShownCreateModal(true)} />
        </div>
        <PartyList list={[]} />
      </Container>
      {isShownCreateModal && <GameOfflineSettings onClose={() => setIsShownCreateModal(false)} />}
    </>
  );
};
