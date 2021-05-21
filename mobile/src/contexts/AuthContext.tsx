import React, { createContext, useState, useEffect } from "react";
import { AsyncStorage} from 'react-native';

import api from '../services/api'

interface AuthContextData {
  signed: boolean;
  user: object;
  loading: boolean;
  signIn(): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<object | null>(null);
  const [loading,setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadStorageData() {
      const storagedUser = await AsyncStorage.getItem("@AirCnc:userId");
      const storagedTechs = await AsyncStorage.getItem("@AirCnc:techs");

      if (storagedUser && storagedTechs) {
        setUser(storagedUser);
      }

      setLoading(false);
    }

    loadStorageData();
  });

  async function signIn(email,techs) {
    console.log(email,techs)
    const response = await api.post('/login',{email});
    const {_id} = response.data;
    await AsyncStorage.setItem('@AirCnc:userId', _id);  
    await AsyncStorage.setItem('@AirCnc:techs',techs)

    setUser(_id)
  }

  async function signOut() {
    await AsyncStorage.clear();
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ signed: !!user, user, signIn,signOut,loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;