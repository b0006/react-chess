import { FC } from 'react';
import { Button } from '../../../components/common/Button';
import styles from './MainMenu.module.scss';

export const MainMenu: FC = () => {
  return (
    <div>
      <h2 className={styles.title}>Select the game mode</h2>
      <Button
        classNameLink={styles.link}
        className={styles.button}
        href='/lobby-online'
        icon='profile'
        text='Player VS player'
        theme='primary'
      />
      <Button
        classNameLink={styles.link}
        className={styles.button}
        icon='desktop'
        text='Player VS AI'
        theme='primary'
      />
      <Button
        classNameLink={styles.link}
        className={styles.button}
        href='/test'
        icon='desktop'
        text='Test page'
        theme='secondary'
      />
    </div>
  );
};
