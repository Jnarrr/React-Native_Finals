import React, {useState, useEffect} from 'react';
import {View, Button, Text, ScrollView, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, FlatList} from 'react-native';
import { openDatabase } from "react-native-sqlite-storage";

const db = openDatabase({
    name: 'groceryDB',
    location: 'default'
});

const EditProductScreen = ( {navigation, route} ) => {
    const [id, setId] = useState(route.params.key)
    const [productname, setProductname] = useState(route.params.productname);
    const [color, setColor] = useState(route.params.color);
    const [size, setSize] = useState(route.params.size);
    const [price, setPrice] = useState(route.params.price);
    const [description, setDescription] = useState(route.params.description);
    const [products, setProducts] = useState([]);

    const updateItem = () => {
        if(!productname) {
          alert('Please enter Product Name')
          return false;
        }
    
        db.transaction(txn => {
          txn.executeSql(
            'UPDATE products SET productname = ?, color = ?, size = ?, price = ?, description = ? WHERE id = ?',
            [productname, color, size, price, description, id],
            (sqlTxn, res) => {
              navigation.navigate('Products');
            },
            error => {
              console.log("may error: " + error.message)
            }
          );
        });
    }

    return(
        <View>
            <Text>Edit Product Screen</Text>
            <TextInput 
            style = { styles.input }
            onChangeText = { (text) => [setProductname(text)] }
            placeholder='Enter Product Name'
            placeholderTextColor= 'gray'
            maxLength={30} 
            defaultValue = {route.params.productname}
            />
            <TextInput 
            style = { styles.input }
            onChangeText = { (text) => [setColor(text)] }
            placeholder='Enter Color'
            placeholderTextColor= 'gray'
            maxLength={30} 
            defaultValue = {route.params.color}
            />
            <TextInput 
            style = { styles.input }
            onChangeText = { (text) => [setSize(text)] }
            placeholder='Enter Size'
            placeholderTextColor= 'gray'
            maxLength={30} 
            defaultValue = {route.params.size}
            />
            <TextInput 
            style = { styles.input }
            onChangeText = { (text) => [setPrice(text)] }
            placeholder='Enter Price'
            placeholderTextColor= 'gray'
            maxLength={30} 
            defaultValue = {route.params.price}
            />
            <TextInput 
            style = { styles.input }
            onChangeText = { (text) => [setDescription(text)] }
            placeholder='Enter Description'
            placeholderTextColor= 'gray'
            maxLength={30} 
            defaultValue = {route.params.description}
            />
            <TouchableOpacity style = {styles.btn} onPress={ updateItem }>
                <Text style = { styles.btnText }>Save</Text>
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

export default EditProductScreen;