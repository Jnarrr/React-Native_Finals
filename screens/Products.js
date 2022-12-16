import React, {useState, useEffect} from 'react';
import {View, Button, Text, ScrollView, TouchableOpacity, StyleSheet, ActivityIndicator, FlatList} from 'react-native';
import { openDatabase } from "react-native-sqlite-storage";

const db = openDatabase({
  name: 'groceryDB',
  location: 'default'
});

const ProductsScreen = ( {navigation} ) => {
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
    
    componentDidMount = () => {
        createTable();
        getProducts();
    }

    useEffect(() => {
        getProducts();
    }, []); 

    return(
        <View>
            <Text>Products Screen</Text>
            <FlatList 
            data={ products }
            renderItem = {({ item }) => (
                <TouchableOpacity onPress={() => { navigation.navigate('ProductDetails', {item:item} ); }}>
                <Text style={{ color: 'black' }}>{ item.productname }</Text>
                </TouchableOpacity>
            )}
            />
            <TouchableOpacity style = {styles.addButton} onPress={() => { navigation.navigate('AddProduct'); }}>
                <Text style = {{ color: 'white' }}>+</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    addButton: {
    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: -50,
    backgroundColor: '#15D005',
    borderRadius: 50,
    },
})

export default ProductsScreen;