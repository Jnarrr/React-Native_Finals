import React, {useState, useEffect} from 'react';
import {View, Button, Text, ScrollView, Image, TouchableOpacity, Dimensions, StyleSheet, ActivityIndicator, FlatList} from 'react-native';

const HomeScreen = ( {navigation} ) => {
    return(
        <View style = {{ flex: 1 }}>
            <Image source = { require('../images/wave.png')} style = {styles.wave} />
            <Image source = { require('../images/Aquaflask-Logo.png')} style = {styles.logo} />
            <Text style = {styles.signature}>#SayYassToAquaFlask</Text>
            <TouchableOpacity style = {styles.btn} onPress={ () => navigation.navigate('Products')}>
                <Text style = { styles.btnText }>See all Products</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    btnText:{
    color: 'white',
    fontSize: 16,
    padding: 15,
    textAlign: 'center',
    fontWeight: 'bold',
    },
    btn:{
    backgroundColor: 'purple',
    color: 'white',
    width: 180,
    height: 50,
    alignSelf: 'center',
    borderTopRightRadius: 50,
    borderBottomEndRadius: 50,
    borderBottomLeftRadius: 50,
    marginTop: 220,
    },
    wave:{
        width: Dimensions.get('window').width,
        height: 800
    },
    logo:{
        width: 270,
        height: 180,
        marginTop: -680,
        alignSelf: 'center'
    },
    signature:{
        color: 'white',
        textAlign: 'center',
        fontStyle: 'italic',
        fontWeight: 'bold',
        fontSize: 18,
    }
})

export default HomeScreen;