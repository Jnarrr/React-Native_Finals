import React, {useState, useEffect} from 'react';
import {View, Button, Text, ScrollView, TouchableOpacity, StyleSheet, TextInput, ActivityIndicator, FlatList} from 'react-native';
import { openDatabase } from "react-native-sqlite-storage";

const db = openDatabase({
    name: 'groceryDB',
    location: 'default'
});

const AddProductScreen = ( {navigation} ) => {
    const [productname, setProductname] = useState('');
    const [color, setColor] = useState('');
    const [size, setSize] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [products, setProducts] = useState([]);

    const createTable = () => {
        db.transaction(txn => {
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS products (id INTEGER PRIMARY KEY AUTOINCREMENT, productname VARCHAR(50), color VARCHAR(50), size VARCHAR(50), price VARCHAR(50), description VARCHAR(50))',
              [],
              (sqlTxn, res) => {
                console.log("table created successfully");
              },
              error => {
                console.log("error: " + error.message)
              }
            );
    
        });
    }

    const getProducts = () => {
        db.transaction(txn => {
          txn.executeSql(
            'SELECT * FROM products ORDER BY id DESC',
            [],
            (sqlTxn, res) => {
    
              let len = res.rows.length;
    
              if(len > 0){
                let results = [];
    
                for (let i = 0; i < len; i++){
                  let item = res.rows.item(i);
    
                  results.push({ key: item.id, productname: item.productname, color: item.color, size: item.size, price: item.price, description: item.description });
                }
    
                setProducts(results);
              }
              
            },
            error => {
              console.log("error: " + error.message)
            }
          );
        });
    }

    const addProduct = () => {
        if(productname.length == 0) {
            alert('Enter Product Name')
            return false;
        }
        if(color.length == 0) {
            alert('Enter Color')
            return false;
        }
        if(size.length == 0) {
            alert('Enter Size')
            return false;
        }
        if(price.length == 0) {
            alert('Enter Price')
            return false;
        }
        if(description.length == 0) {
            alert('Enter Description')
            return false;
        }
    
        db.transaction(txn => {
          txn.executeSql(
            'INSERT INTO products (productname, color, size, price, description) VALUES (?, ?, ?, ?, ?)',
            [productname, color, size, price, description],
            (sqlTxn, res) => {
                setProductname('');
                setColor('');
                setSize('');
                setPrice('');
                setDescription('');
                getProducts();
                alert('Successfully saved item');
                navigation.navigate('Products');
            },
            error => {
              console.log("may error: " + error.message)
            }
          );
        });
    }


    useEffect(() => {
        createTable();
    }, []); 

    return(
        <View>
            <TextInput 
            style = { styles.input }
            onChangeText = { (text) => [setProductname(text)] }
            placeholder='Enter Product Name'
            placeholderTextColor= 'gray'
            maxLength={30} 
            />
            <TextInput 
            style = { styles.input }
            onChangeText = { (text) => [setColor(text)] }
            placeholder='Enter Color'
            placeholderTextColor= 'gray'
            maxLength={30} 
            />
            <TextInput 
            style = { styles.input }
            onChangeText = { (text) => [setSize(text)] }
            placeholder='Enter Size'
            placeholderTextColor= 'gray'
            maxLength={30} 
            />
            <TextInput 
            style = { styles.input }
            onChangeText = { (text) => [setPrice(text)] }
            placeholder='Enter Price'
            placeholderTextColor= 'gray'
            maxLength={30} 
            />
            <TextInput 
            style = { styles.input }
            onChangeText = { (text) => [setDescription(text)] }
            placeholder='Enter Description'
            placeholderTextColor= 'gray'
            maxLength={30} 
            />

            <TouchableOpacity style = {styles.btn} onPress={ addProduct }>
                <Text style = {styles.btnText}>Save Product</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
    padding: 2,
    height: 40,
    marginBottom: 5,
    marginTop: 5,
    borderColor: 'gray',
    borderBottomWidth: 1.5,
    shadowRadius: 10,
    fontSize: 16,
    color: 'black',
    },
    btnText:{
    color: 'white',
    fontSize: 14,
    padding: 8,
    textAlign: 'center',
    fontWeight: 'bold',
    },
    btn:{
    backgroundColor: 'orange',
    width: 150,
    height: 35,
    borderRadius: 5,
    alignSelf: 'center',
    marginBottom: 100
    },
})

export default AddProductScreen;