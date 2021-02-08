import React, {useEffect,useMemo,useReducer} from 'react';
import { AsyncStorage, Button, Text, TextInput, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './src/pages/Login'
import List from './src/pages/List'
import Booking from './src/pages/Booking'

import api from './src/services/api'

export const AuthContext = React.createContext();

function SplashScreen() {
  return (
    <View>
      <Text>Loading...</Text>
    </View>
  );
}

const Stack = createStackNavigator();

export default function Routes({ navigation }) {
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_USER':
          return {
            ...prevState,
            userId: action.Id,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userId: action.Id,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userId: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userId: null,
    }
  );

  React.useEffect(() => {
    // Procurando UserId no AsyncStorage
    const restoreUser = async () => {
      let userId;
      try {
        userId = await AsyncStorage.getItem('userId');
      } catch (e) {
        userId=null;
      }

      dispatch({ type: 'RESTORE_USER', Id: userId });
    };
 
    restoreUser();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async data => { 
        const response = await api.post('/login',{email: data.email});
        const {_id} = response.data;
        AsyncStorage.setItem('userId', _id );
        AsyncStorage.setItem('techs',data.techs)
        // tratar erro em caso de falha ao fazer login   
        dispatch({ type: 'SIGN_IN', Id: _id });
      },
      signOut: () => {
        AsyncStorage.removeItem('userId');
        AsyncStorage.removeItem('techs')
        dispatch({ type: 'SIGN_OUT' })},
    }),
    []
  );

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown:false}}>
          {state.isLoading ? (
            // Não terminou de procurar um token no Async Storage
            <>
            <Stack.Screen name="Splash" component={SplashScreen} />
            </>
          ) : state.userId == null ? (
            // Não achou um Token, portanto, User não logado
            
            <>
            <Stack.Screen
              name="SignIn"
              component={Login}
              options={{
                title: 'Sign in',
                animationTypeForReplace: state.isSignout ? 'pop' : 'push',
              }}
            />
            </>
          ) : (
            // User Logado
           
            <>
            <Stack.Screen name="List" component={List} />
            <Stack.Screen name="Booking" component={Booking} />

            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
