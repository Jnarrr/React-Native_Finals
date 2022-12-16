import React, {useState, useEffect} from 'react';
import {View, Button, Text, ScrollView, TouchableOpacity, StyleSheet, ActivityIndicator, FlatList} from 'react-native';

const HomeScreen = ( {navigation} ) => {
    return(
        <View>
            <Text>Home Screen</Text>
            <TouchableOpacity style = {styles.btn} onPress={ () => navigation.navigate('Products')}>
                <Text style = { styles.btnText }>See all Products</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    btnText:{
    color: 'white',
    fontSize: 14,
    padding: 8,
    textAlign: 'center',
    fontWeight: 'bold',
    },
    btn:{
    backgroundColor: 'rgb(80, 140, 2)',
    color: 'white',
    width: 150,
    height: 35,
    borderRadius: 5,
    alignSelf: 'center',
    marginBottom: 100
    },
})

export default HomeScreen;