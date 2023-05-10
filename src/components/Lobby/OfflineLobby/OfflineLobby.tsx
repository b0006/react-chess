import { FC, useState } from 'react';
import { observer } from 'mobx-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../common';
import { partyStore } from '../../../store';
import { GameOfflineSettings } from '../../GameOfflineSettings';
import { Container } from '../../Layout/Container';
import { PartyList } from '../PartyList';
import { useGetPartyList } from './useGetPartyList.hook';
import styles from './OfflineLobby.module.scss';

export const OfflineLobby: FC = observer(() => {
  const navigate = useNavigate();
  const { offlinePartyList, startOfflineParty } = partyStore;
  const [isShownCreateModal, setIsShownCreateModal] = useState(false);

  const { isLoading } = useGetPartyList();

  const onPartyStart = (partyId: string) => {
    const [partyData] = offlinePartyList.filter((party) => party.id === partyId);
    startOfflineParty(partyData);
    navigate('/offline-chess-game');
  };

  return (
    <>
      <Container>
        {/* TODO: loader */}
        {isLoading && <div>Loading...</div>}
        {!isLoading && (
          <>
            <Button
              className={styles['create-button']}
              icon='plus'
              text='Create a party'
              disabled={isLoading}
              onClick={() => setIsShownCreateModal(true)}
            />
            <PartyList list={offlinePartyList} onPartyStart={onPartyStart} />
          </>
        )}
      </Container>
      {isShownCreateModal && <GameOfflineSettings onClose={() => setIsShownCreateModal(false)} />}
    </>
  );
});
