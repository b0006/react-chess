import { FC } from 'react';
import { observer } from 'mobx-react';
import { useNavigate } from 'react-router-dom';
import { profileStore } from '../../../../store';
import { Button } from '../../../common';
import styles from './RightContent.module.scss';

export const RightContent: FC = observer(() => {
  const navigate = useNavigate();
  const { userData, logout } = profileStore;

  const onLogoutClick = () => {
    logout();
    navigate('/');
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.desktop}>
        {userData.isAuth && (
          <>
            <Button href='/profile' text='Profile' icon='profile' iconSide='right' />
            <Button
              className={styles.button}
              text='Logout'
              icon='logout'
              iconSide='right'
              onClick={onLogoutClick}
            />
          </>
        )}
        {!userData.isAuth && (
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
});
