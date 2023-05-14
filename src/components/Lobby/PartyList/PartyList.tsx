import { FC } from 'react';
import cn from 'classnames';
import { observer } from 'mobx-react';
import { profileStore } from '../../../store';
import { ChessParty } from '../../../store/partyStore/types';
import { Button, Filter, SvgIcon, useFilter, FilterItem } from '../../common';
import { ICONS_DEFAULT } from '../../Chessboard/icons';
import { PartyListProps } from './types';
import styles from './PartyList.module.scss';

const FILTER_LIST: FilterItem[] = [
  { label: 'Active', value: 'active' },
  { label: 'Game over', value: 'gameOver' },
];

const getViewList = (activeFilterList: string[], list: ChessParty[]) => {
  if (activeFilterList.length === 0) {
    return list;
  }

  const hasActiveFilter = activeFilterList.includes(FILTER_LIST[0].value);
  const hasGameOverFilter = activeFilterList.includes(FILTER_LIST[1].value);

  const filterList = list.reduce((result, party) => {
    let isShowParty = false;

    if (hasActiveFilter && !party.resultParty) {
      isShowParty = true;
    }

    if (hasGameOverFilter && party.resultParty) {
      isShowParty = true;
    }

    return isShowParty ? [...result, party] : result;
  }, [] as ChessParty[]);

  return filterList;
};

export const PartyList: FC<PartyListProps> = observer(({ list, onPartyStart }) => {
  const { activeFilterList, onFilterChange } = useFilter({
    initActiveFilter: [FILTER_LIST[0].value],
  });

  const {
    userData: { profileData },
  } = profileStore;

  const onPlayClick = (partyId: string) => () => {
    onPartyStart(partyId);
  };

  const viewList = getViewList(activeFilterList, list);

  return (
    <div>
      <h3 className={styles.title}>Party list</h3>
      <Filter
        className={styles.filter}
        filterList={FILTER_LIST}
        activeFilterList={activeFilterList}
        onFilterChange={onFilterChange}
      />
      <div className={styles.list}>
        {viewList.length === 0 && <div>No parties</div>}
        {viewList.map((party) => {
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
