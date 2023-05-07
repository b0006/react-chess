import { FC } from 'react';
import cn from 'classnames';
import { Container } from '../../Layout/Container';
import styles from './StatusBar.module.scss';
import { StatusBarProps } from './types';

export const StatusBar: FC<StatusBarProps> = ({ isEnemyMoving, chessEngine }) => {
  const historyMoves = chessEngine.history();

  return (
    <Container>
      <div className={styles.wrapper}>
        <div className={styles['history-wrapper']}>
          {historyMoves.map((move, index) => (
            <span className={styles['history-item']} key={index}>
              {move}
            </span>
          ))}
        </div>
        <div className={cn(styles.status, { [styles['status-show']]: isEnemyMoving })}>
          {/* eslint-disable-next-line prettier/prettier */}
          {'Waiting for the opponent\'s move...'}
        </div>
      </div>
    </Container>
  );
};
