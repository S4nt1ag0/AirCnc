import React, {useState, useEffect } from 'react';
import { Text, SafeAreaView, ScrollView, AsyncStorage } from 'react-native';
import {RectButton} from 'react-native-gesture-handler';
import Logo from '../../assets/svg/logo.svg';
import styles from './style.ts'
import AuthContext from '../../contexts/AuthContext'; 
import SpotList from '../../components/SpotList'

export default function List(){
    const [techs,setTechs]= useState([])
    const { signOut } = React.useContext(AuthContext);
    useEffect(()=>{
        AsyncStorage.getItem('@AirCnc:techs').then(savetechs =>{
            console.log(savetechs)
            const techsArray = savetechs.split(',').map(tech =>tech.trim());
            setTechs(techsArray);
        })
    },[])
    
    return (
    <SafeAreaView style={styles.container}>
        <RectButton style={styles.logo} onPress={signOut}>
            <Logo height={42}  fill='#f05a5b'/>
        </RectButton>
        <ScrollView style={styles.content}>
            {techs.map((tech,index) => <SpotList key={index} tech={tech} />)}
        </ScrollView>
    </SafeAreaView>
    )
}