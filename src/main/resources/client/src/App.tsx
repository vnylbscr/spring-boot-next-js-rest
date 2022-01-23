import React, { useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import axios from 'axios';
import { ENDPOINT_URL } from './lib/constants';
import './styles/globals.css';

const fetchUsers = async () => {
  return axios.get(`${ENDPOINT_URL}/users`).then((res) => res.data);
};

function App() {
  const { isLoading, data, error } = useQuery('users', fetchUsers);
  const [state, setState] = useState({
    email: '',
    password: '',
    username: '',
  });
  const mutation = useMutation((data: typeof state) => {
    return axios.post(`${ENDPOINT_URL}/users`, data);
  });

  if (error) {
    return <div className='error'>An Error Occured {error} </div>;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className='container'>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          mutation.mutate({
            ...state,
          });
        }}
      >
        <input name='email' onChange={(e) => handleChange(e)} type='text' />
        <input name='username' onChange={(e) => handleChange(e)} type='text' />
        <input name='password' onChange={(e) => handleChange(e)} type='text' />
        <input type='submit' />
      </form>
    </div>
  );
}

export default App;
