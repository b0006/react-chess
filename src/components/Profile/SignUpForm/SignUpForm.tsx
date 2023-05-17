import { FC, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Input, Button, useNotification } from '../../common';
import { useFetchDataApi } from '../../../hooks';
import { FormLayout } from '../FormLayout';
import styles from './SignUpForm.module.scss';
import { FormFields } from './types';

export const SignUpForm: FC = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormFields>();

  const password = useRef('');
  password.current = watch('password', '');

  const { addNotification } = useNotification();
  const [isLoading, signUpRequest] = useFetchDataApi<FormFields>('/auth/sign-up/', 'POST');

  const onSubmit = async (data: FormFields): Promise<void> => {
    const { error, response } = await signUpRequest(data);

    if (error || !response) {
      const descriptionText = error || 'Try again, please';

      addNotification(
        { title: 'Error', description: descriptionText },
        { id: descriptionText, appearance: 'error' },
      );
      return;
    }

    addNotification(
      { title: 'Success', description: 'User has been created' },
      { id: 'sign-up-success', appearance: 'success' },
    );
    navigate('/sign-in');
  };

  return (
    <FormLayout isLoading={isLoading}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1 className={styles.title}>Sign up</h1>
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
          label='Login'
          placeholder='login'
          errorText={errors.username?.message}
          {...register('username', {
            required: 'Enter login',
            minLength: {
              value: 3,
              message: 'Too short',
            },
            maxLength: {
              value: 48,
              message: 'Too big',
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
        <Input
          className={styles.input}
          type='password'
          label='Confirm password'
          errorText={errors.confirmPassword?.message}
          {...register('confirmPassword', {
            required: 'Confirm password',
            validate: (value) => value === password.current || 'Passwords is not equal',
          })}
        />
        <Button className={styles.button} type='submit' text='Continue' theme='primary' />
      </form>
    </FormLayout>
  );
};
