import React, {useState, useEffect } from 'react';
import { View, Text,SafeAreaView, AsyncStorage, TextInput, Alert } from 'react-native';
import {RectButton} from 'react-native-gesture-handler';
import io from 'socket.io-client';
import api from '../../services/api'
import styles from './style'

export default function Booking({ route, navigation }){
    const { spotId } = route.params;
    const [date,setDate] = useState('')
   
    async function handleSubmit() {
        const userId = await AsyncStorage.getItem('@AirCnc:userId')

        await api.post(`/spots/${spotId}/bookings`,{
            date
        },{ 
            headers:{
                user: userId
            }
        })

        Alert.alert('Solicitação de reserva', 'sua solicitação de reserva foi enviada com sucesso')
        navigation.navigate('List')
    }
 
  useEffect(()=>{
    AsyncStorage.getItem('@AirCnc:userId').then( userId=>{
        const socket = io(`${api.defaults.baseURL}`, { query: { user: userId } });
        socket.on('booking_result', (data:any) =>{
          Alert.alert('Atualização de solicitação',`Sua reserva em ${data.spot.company} em ${data.date} foi ${data.approved ? 'APROVADO' : 'REJEITADO'}`)
  })
    })
     
    
  },[])

     function handleCancel() {
        navigation.navigate('List')
    }
 
    return (
    <SafeAreaView style={styles.container}>
        <Text style={styles.label}>DATA DE INTERESSE *</Text>
        <TextInput
          style={styles.input}
          placeholder="Qual data você quer reservar?"
          placeholderTextColor="#999"
          autoCapitalize="words"
          autoCorrect={false}
          value={date}
          onChangeText={setDate}
          
          
        />

        <RectButton style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}> Solicitar Reserva </Text>
        </RectButton>

        <RectButton style={[styles.button,{backgroundColor: '#ccc'}]} onPress={handleCancel}>
            <Text style={styles.buttonText}> Cancelar </Text>
        </RectButton>
    </SafeAreaView>) 
}