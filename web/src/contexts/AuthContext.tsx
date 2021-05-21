import React, { createContext, useState, useEffect } from "react";
import api from '../Services/api'

interface AuthContextData {
  signed: boolean;
  user: string | null;
  loading: boolean;
  signIn(email:string): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<string | null>(null);
  const [loading,setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadStorageData() {
      const storagedUser = await localStorage.getItem('user');

      if (storagedUser){
        setUser(storagedUser);
      }

      setLoading(false);
    }

    loadStorageData();
  });

  async function signIn(email:string) {
      await api.post('/login',{email}).then((response)=>{
      localStorage.setItem('user', response.data._id );
      setUser(response.data._id)
      }).catch((err)=>{
        console.log(err)
        alert('parece que o servidor está offline no momento :/ , tente novamente mais tarde')
      });
  }

  async function signOut() {
    setUser(null);

    await localStorage.removeItem('user');
  }

  return (
    <AuthContext.Provider value={{ signed: !!user, user, signIn ,signOut,loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;