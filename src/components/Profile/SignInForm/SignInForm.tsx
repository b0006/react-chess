import React from 'react';
import { useForm } from 'react-hook-form';
import { Button, Input } from '../../common';
import { FormLayout } from '../FormLayout';
import styles from './SignInForm.module.scss';
import { FormFields } from './types';

export const SignInForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onSubmit = async (data: FormFields): Promise<void> => {
    // const { error, response } = await signInRequst(data);
    // if (error || !response) {
    //   addNotification({ title: 'Ошибка', description: error || 'Попробуйте еще раз' }, { appearance: 'error' });
    //   return;
    // }
    // saveToken(response.accessToken);
    // setProfileData(response.userData);
    // history.push('/');
  };

  return (
    <FormLayout isLoading={false}>
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
