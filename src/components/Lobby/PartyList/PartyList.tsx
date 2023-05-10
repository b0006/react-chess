import { FC } from 'react';
import { PartyListProps } from './types';
import styles from './PartyList.module.scss';
import { Button } from '../../common';

export const PartyList: FC<PartyListProps> = ({ list, onPartyStart }) => {
  return (
    <div>
      <h3 className={styles.title}>PartyList</h3>
      <div className={styles.list}>
        {list.map((party) => (
          <div key={party.id} className={styles.item}>
            <div>
              <div>My color: {party.myColor}</div>
              {party.difficult && <div>Difficult: {party.difficult}</div>}
            </div>
            <div className={styles['buttons-wrapper']}>
              <Button
                text='Play'
                icon='play'
                iconSide='right'
                theme='secondary'
                onClick={() => onPartyStart(party.id)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
