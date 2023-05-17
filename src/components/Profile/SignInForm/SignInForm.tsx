import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useFetchDataApi } from '../../../hooks';
import { profileStore } from '../../../store';
import { Button, Input, useNotification } from '../../common';
import { FormLayout } from '../FormLayout';
import styles from './SignInForm.module.scss';
import { FormFields, SignInResponse } from './types';

export const SignInForm: FC = () => {
  const navigate = useNavigate();
  const { setProfileData } = profileStore;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>();

  const { addNotification } = useNotification();
  const [isLoading, signInRequest] = useFetchDataApi<FormFields, SignInResponse>(
    '/auth/sign-in/',
    'POST',
  );

  const onSubmit = async (data: FormFields): Promise<void> => {
    const { error, response } = await signInRequest(data);

    if (error || !response) {
      const descriptionText = error || 'Try again, please';

      addNotification(
        { title: 'Error', description: descriptionText },
        { id: descriptionText, appearance: 'error' },
      );
      return;
    }

    setProfileData(response.userData, response.accessToken);
    navigate('/');
  };

  return (
    <FormLayout isLoading={isLoading}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1 className={styles.title}>Sign in</h1>
        <Input
          className={styles.input}
          label='Email'
          placeholder='email@mail.ru'
          errorText={errors.email?.message}
          {...register('email', {
            required: 'Enter email',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Incorrect email',
            },
          })}
        />
        <Input
          className={styles.input}
          type='password'
          label='Password'
          errorText={errors.password?.message}
          {...register('password', {
            required: 'Enter password',
            minLength: {
              value: 8,
              message: 'Too short',
            },
            maxLength: {
              value: 200,
              message: 'Too big',
            },
          })}
        />
        <Button className={styles.button} type='submit' text='Submit' theme='primary' />
      </form>
    </FormLayout>
  );
};
