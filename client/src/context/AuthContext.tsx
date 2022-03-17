import React, { createContext } from 'react';

export const AuthContext = createContext(null);

const AuthContextProvider = () => {
  return <div>AuthContextProvider</div>;
};

export default AuthContextProvider;
