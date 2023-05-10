import { FC, useState } from 'react';
import { observer } from 'mobx-react';
import { Button } from '../../common';
import { partyStore } from '../../../store';
import { GameOfflineSettings } from '../../GameOfflineSettings';
import { Container } from '../../Layout/Container';
import { PartyList } from '../PartyList';
import { useGetPartyList } from './useGetPartyList.hook';
import styles from './OfflineLobby.module.scss';

export const OfflineLobby: FC = observer(() => {
  const { offlinePartyList } = partyStore;
  const [isShownCreateModal, setIsShownCreateModal] = useState(false);

  const { isLoading } = useGetPartyList();

  return (
    <>
      <Container>
        {/* TODO: loader */}
        {isLoading && <div>Loading...</div>}
        {!isLoading && (
          <>
            <Button
              className={styles['create-button']}
              text='Create a party'
              disabled={isLoading}
              onClick={() => setIsShownCreateModal(true)}
            />
            <PartyList list={offlinePartyList} />
          </>
        )}
      </Container>
      {isShownCreateModal && <GameOfflineSettings onClose={() => setIsShownCreateModal(false)} />}
    </>
  );
});
