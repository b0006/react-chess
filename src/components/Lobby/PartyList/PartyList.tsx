import { FC } from 'react';
import cn from 'classnames';
import { observer } from 'mobx-react';
import { profileStore } from '../../../store';
import { Button, SvgIcon } from '../../common';
import { ICONS_DEFAULT } from '../../Chessboard/icons';
import { PartyListProps } from './types';
import styles from './PartyList.module.scss';

export const PartyList: FC<PartyListProps> = observer(({ list, onPartyStart }) => {
  const {
    userData: { profileData },
  } = profileStore;

  const onPlayClick = (partyId: string) => () => {
    onPartyStart(partyId);
  };

  return (
    <div>
      <h3 className={styles.title}>PartyList</h3>
      <div className={styles.list}>
        {list.map((party) => {
          const MyColorPawn = ICONS_DEFAULT[party.myColor].p;
          const isMyColorBlack = party.myColor === 'b';

          return (
            <div
              key={party.id}
              className={cn(styles.item, {
                [styles['item__over']]: party.resultParty,
              })}
            >
              <div>
                <div className={styles['players-wrapper']}>
                  <div className={styles['icon-wrapper']}>
                    <span className={styles['icon-label']}>You</span>
                    <MyColorPawn className={styles['icon-player']} />
                    {party.resultParty && party.winPlayer === profileData?.username && (
                      <SvgIcon className={styles['icon-winner']} kind='crown' />
                    )}
                  </div>
                  {party.isVersusAi && (
                    <div
                      className={cn(styles['icon-wrapper'], {
                        [styles['icon-wrapper__black']]: isMyColorBlack,
                      })}
                    >
                      <SvgIcon
                        className={cn(styles['icon-player'], {
                          [styles['icon-player__black']]: isMyColorBlack,
                        })}
                        kind='robot'
                      />
                      {party.resultParty && party.winPlayer !== profileData?.username && (
                        <SvgIcon className={styles['icon-winner']} kind='crown' />
                      )}
                    </div>
                  )}
                </div>
                {/* {party.difficult && <div>Difficult: {party.difficult}</div>} */}
              </div>
              <div className={styles['buttons-wrapper']}>
                <Button
                  text={party.resultParty ? 'Watch' : 'Play'}
                  icon={party.resultParty ? 'eyeOpen' : 'play'}
                  iconSide='right'
                  theme='secondary'
                  onClick={onPlayClick(party.id)}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
});
