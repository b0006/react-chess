import { FC, useRef, useEffect } from 'react';
import cn from 'classnames';
import { Scrollbar } from '../../common';
import { usePrevious } from '../../../hooks';
import { Container } from '../../Layout/Container';
import styles from './StatusBar.module.scss';
import { StatusBarProps } from './types';

export const StatusBar: FC<StatusBarProps> = ({ isEnemyMoving, chessEngine, gameOverText }) => {
  const historyMoves = chessEngine.history();
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const prevHistoryList = usePrevious(historyMoves);

  useEffect(() => {
    const isHistoryChanged =
      Array.isArray(prevHistoryList) &&
      Array.isArray(historyMoves) &&
      prevHistoryList.length !== historyMoves.length;

    if (!wrapperRef.current || !isHistoryChanged) {
      return;
    }

    const maxScrollLeft = wrapperRef.current.scrollWidth - wrapperRef.current.clientWidth;
    wrapperRef.current.scroll({ left: maxScrollLeft });
  }, [historyMoves, prevHistoryList]);

  return (
    <Container>
      <div className={styles.wrapper}>
        <Scrollbar className={styles['history-wrapper']} ref={wrapperRef}>
          {historyMoves.map((move, index) => (
            <span className={styles['history-item']} key={index}>
              {move}
            </span>
          ))}
        </Scrollbar>
        <div
          className={cn(styles.status, { [styles['status-show']]: isEnemyMoving || gameOverText })}
        >
          {/* eslint-disable-next-line prettier/prettier */}
          {gameOverText || 'Waiting for the opponent\'s move...'}
        </div>
      </div>
    </Container>
  );
};
