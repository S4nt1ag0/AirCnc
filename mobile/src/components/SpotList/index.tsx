import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, Image} from 'react-native';
import {RectButton} from 'react-native-gesture-handler';
import api from '../../services/api';
import styles from './style'
import { useNavigation } from '@react-navigation/native';

export default function SpotList({tech}) {
    const [spots,setSpots]=useState([])
    const navigation = useNavigation();
    
    useEffect(()=>{
        async function loadSpots(){
             const response = await api.get('/spots',{
                 params:{techs:tech}
             })
             setSpots(response.data)
        }
        loadSpots()
       
    },[])

    function handleNavigation(spotId:Any) {
        navigation.navigate('Booking',{spotId})

    }
    return(
        <View style={styles.container}>
            <Text style={styles.title}>Empresas que usam <Text style={styles.bold}>{tech}</Text></Text>

            <FlatList 
            style={styles.list}
            data={spots}
            keyExtractor={spot=>spot._id}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({item})=>(
                <View style={styles.itemList}>
                    <Image style={styles.thumbnail} source={{uri: `${api.defaults.baseURL}${item.thumbnail_url}`}} />
                    <Text style={styles.company}>{item.company}</Text>
                    <Text style={styles.price}>{item.price? `R$${item.price}/dia` : 'GRATUITO '}</Text>
                    <RectButton style={styles.button} onPress={()=>{handleNavigation(item._id)}}>
                        <Text style={styles.buttonText}> Solicitar reserva</Text>
                    </RectButton>
                </View>
            )}
            />
        </View>
    )}