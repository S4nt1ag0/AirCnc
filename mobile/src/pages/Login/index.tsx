import React, {useState, useEffect, useContext } from 'react';
import { Text, TextInput, Button, View, KeyboardAvoidingView, Platform} from 'react-native';
import {RectButton} from 'react-native-gesture-handler';
import Logo from '../../assets/svg/logo.svg';
import styles from './style'

import { AuthContext } from '../../../Routes'; 

export default function Login(){
  const [email, setEmail] = React.useState('');
  const [techs, setTechs] = React.useState('');

  const { signIn } = React.useContext(AuthContext);
    return (
    <KeyboardAvoidingView enabled={Platform.OS=== 'ios'} behavior="padding" style={styles.container}>
      <Logo height={42}  fill='#f05a5b'/>
      <View style={styles.form}>
        <Text style={styles.label}>SEU EMAIL * </Text>
        <TextInput
          style={styles.input}
          placeholder="Seu e-mail"
          placeholderTextColor="#999"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          value={email}
          onChangeText={setEmail}
          
          
        />
        <Text style={styles.label}>TECNOLOGIAS * </Text>
        <TextInput
          style={styles.input}
          placeholder="Tecnologias de interesse"
          placeholderTextColor="#999"
          autoCapitalize="words"
          value={techs}
          onChangeText={setTechs}
        />
      </View>
      <RectButton style={styles.button} onPress={() => signIn({email,techs}) }>
        <Text style={styles.buttonText}> Encontrar Spots </Text>
      </RectButton>
    </KeyboardAvoidingView>
  );
} 