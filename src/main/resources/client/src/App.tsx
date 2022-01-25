import React, { useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import axios from 'axios';
import { ENDPOINT_URL } from './lib/constants';
import './styles/globals.css';
import Preload from './pages/preload';

const fetchUsers = async () => {
  return axios.get(`${ENDPOINT_URL}/users`).then((res) => res.data);
};

function App() {
  return <Preload />;
}

export default App;
