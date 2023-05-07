import { FC } from 'react';
import { Button } from '../../../common';
import styles from './RightContent.module.scss';

// TODO
const IS_AUTH = false;

const RightContent: FC = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.desktop}>
        {IS_AUTH && (
          <>
            <Button href='/profile' text='Profile' icon='profile' iconSide='right' />
            <Button className={styles.button} text='Logout' icon='logout' iconSide='right' />
          </>
        )}
        {!IS_AUTH && (
          <>
            <Button
              className={styles.button}
              href='/sign-in'
              text='Sign in'
              icon='signIn'
              iconSide='right'
              theme='secondary'
            />
            <Button
              className={styles.button}
              href='/sign-up'
              text='Sign up'
              icon='userPlus'
              iconSide='right'
              theme='primary'
            />
          </>
        )}
      </div>
      <div className={styles.mobile}>
        <Button icon='bars' theme='flat' />
      </div>
    </div>
  );
};

export { RightContent };
