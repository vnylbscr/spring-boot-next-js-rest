import { Container, Flex } from '@chakra-ui/react';
import axios from 'axios';
import React, { useState } from 'react';
import { useMutation } from 'react-query';
import { ENDPOINT_URL } from '../../lib/constants';
import Login from './login';
import Register from './register';

export interface LoginState {
  username: string;
  password: string;
}

export interface RegisterState extends LoginState {
  email: string;
  passwordConfirm: string;
}

const Preload = () => {
  const [isLogin, setIsLogin] = useState(true);
  const loginMutation = useMutation((data: LoginState) => {
    return axios.post(`${ENDPOINT_URL}/users`, data);
  });

  const registerMutation = useMutation((data: RegisterState) => {
    return axios.post(`${ENDPOINT_URL}/users/register`, data);
  });

  const onClickLink = () => {
    setIsLogin((value) => !value);
  };

  const loginSubmit = (data: LoginState) => {
    loginMutation.mutate({
      ...data,
    });
  };

  const registerSubmit = (data: RegisterState) => {
    registerMutation.mutate({
      ...data,
    });
  };

  return (
    <Flex
      h={'100vh'}
      background={'gray.700'}
      alignItems={'center'}
      justifyContent={'center'}
      color={'#fff'}
    >
      <Container
        background={'gray.800'}
        borderRadius={'md'}
        maxW={'md'}
        p={'12'}
      >
        {isLogin ? (
          <Login onSubmit={loginSubmit} onClickLink={onClickLink} />
        ) : (
          <Register onSubmit={registerSubmit} onClickLink={onClickLink} />
        )}
      </Container>
    </Flex>
  );
};

export default Preload;
