import { Button, Heading, Link, Stack } from '@chakra-ui/react';
import React, { Fragment } from 'react';
import { useForm } from 'react-hook-form';
import MyInput from '../../components/Input';
import { LoginState } from '.';

interface Props {
  onClickLink?: () => void;
  onSubmit: (state: LoginState) => void;
}

const Login = (props: Props) => {
  const { onClickLink, onSubmit } = props;
  const { control, handleSubmit } = useForm<LoginState>({
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmitForm = handleSubmit((data) => {
    onSubmit(data);
  });

  return (
    <Fragment>
      <Heading mb={4} fontSize={'3xl'} textAlign={'center'} color={'white'}>
        Login
      </Heading>

      <form onSubmit={onSubmitForm}>
        <Stack spacing={3}>
          <MyInput
            control={control}
            name={'username'}
            rules={{
              required: 'This field is required',
            }}
            renderStyleProps={{
              placeholder: 'Username or e-mail',
              variant: 'flushed',
            }}
          />
          <MyInput
            control={control}
            name={'password'}
            rules={{
              required: 'This field is required',
              minLength: {
                value: 5,
                message: 'Your password must be at least 5 characters',
              },
            }}
            renderStyleProps={{
              placeholder: 'Password',
              variant: 'flushed',
              type: 'password',
            }}
          />

          <Button type={'submit'} colorScheme={'teal'}>
            Login
          </Button>
          <Heading textAlign={'center'} fontSize={'sm'}>
            You don't have account?{' '}
            <Link color={'teal'} onClick={onClickLink}>
              Register
            </Link>
          </Heading>
        </Stack>
      </form>
    </Fragment>
  );
};

export default Login;
