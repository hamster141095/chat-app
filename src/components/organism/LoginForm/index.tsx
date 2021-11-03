import React from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { RootStoreContext } from '../../../store/RootStore';
import { Button } from '../../atoms/Button';
import { Typography } from '../../atoms/Typography';
import { Wrapper } from '../../atoms/Wrapper';
import { CaptchaBlock } from '../../molecules/CaptchaBlock';
import { FormInput } from '../../molecules/FormInput';
import { ButtonSize, ButtonType, ButtonVariant } from '../../atoms/Button/types/types';
import { InputId, InputSize, InputType } from '../../molecules/FormInput/types/types';
import { TypographyTypeStyle } from '../../atoms/Typography/types/types';
import { SCREENS } from '../../../router/endpoints';
import { useLocalStorageState } from '../../../hooks/useLocalStorageState';

import './loginForm.scss';

interface IFormInput {
  username: string;
  password: string;
  captcha: string;
}

const schema = yup.object().shape({
  username: yup
    .string()
    .min(2, 'Your name must contain at least 2 letters')
    .max(25, 'Your name must be less than 50 letters')
    .matches(/^[A-Za-zА-Яа-яЁё]+$/, 'Only alphabets are allowed in your name ')
    .required('Please input your name'),
  password: yup
    .string()
    .min(4, ' Password must contain at least 4 symbols')
    .required('Please input your password'),
  captcha: yup
    .string()
    .min(5, 'Min 5 symbols')
    .max(5, 'Max 5 symbols')
    .required('Please input captcha'),
});

export const LoginForm = (): React.ReactElement => {
  const [username, setUsername] = useLocalStorageState(InputId.username, '');
  const rootStore = React.useContext(RootStoreContext);
  const [isUserAuthenticate, setIsUserAuthenticate] = useLocalStorageState(
    'isUserAuthenticate',
    ''
  );

  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm<IFormInput>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: {
      username,
      password: '',
      captcha: '',
    },
  });
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    setUsername(data.username);
    setIsUserAuthenticate('true');
    rootStore.userStore.setUser(data.username);
  };

  return (
    <Wrapper className="form-login">
      <Typography className="form-login__text" variant={TypographyTypeStyle.h2}>
        Please, autorize yourself
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name={InputId.username}
          control={control}
          render={({ field }) => (
            <FormInput
              placeholder={'User name'}
              type={InputType.text}
              labelText="User name"
              className="form-login__input"
              field={field}
              errorText={errors.username?.message}
            />
          )}
        />

        <Controller
          name={InputId.password}
          control={control}
          render={({ field }) => (
            <FormInput
              placeholder={'Input password'}
              type={InputType.password}
              labelText="Password"
              className="form-login__input"
              field={field}
              errorText={errors.password?.message}
            />
          )}
        />

        <Wrapper flex className="form-login__security-code">
          <Controller
            name={InputId.captcha}
            control={control}
            render={({ field }) => (
              <FormInput
                placeholder={'Security code'}
                type={InputType.text}
                labelText="Security code"
                className="form-login__input"
                field={field}
                size={InputSize.medium}
                errorText={errors.captcha?.message}
              />
            )}
          />
          <CaptchaBlock />
        </Wrapper>

        <Wrapper flex className="form-login__buttons">
          <Button
            className="form-login__button"
            variant={ButtonVariant.primary}
            size={ButtonSize.medium}
            type={ButtonType.submit}
            isDisabled={!isValid}
          >
            Log in
          </Button>

          <Button
            className="form-login__button"
            variant={ButtonVariant.outline}
            size={ButtonSize.medium}
            type={ButtonType.button}
            isNavLink
            path={SCREENS.SCREEN_SIGN_UP}
          >
            Registration
          </Button>
        </Wrapper>
      </form>
    </Wrapper>
  );
};
