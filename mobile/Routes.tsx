import React, {useEffect,useMemo,useReducer, useContext} from 'react';
import { AsyncStorage, Button, Text, TextInput, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import AuthContext from "./src/contexts/AuthContext";
import Login from './src/pages/Login'
import List from './src/pages/List'
import Booking from './src/pages/Booking'
import api from './src/services/api'

function SplashScreen() {
  return ( 
    <View>
      <Text>Loading...</Text>
    </View>
  );
}

const Stack = createStackNavigator();

export default function Routes({ navigation }) {

  const { signed,loading } = useContext(AuthContext);

  if(loading){
    return <Stack.Screen name="Splash" component={SplashScreen} />
  }else{
  return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown:false}}>
          { !signed ? (
            // Não achou um Token, portanto, User não logado
            <>
            <Stack.Screen
              name="SignIn"
              component={Login}
              options={{
                title: 'Sign in',
                animationTypeForReplace: 'pop',
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
  );
}
}
