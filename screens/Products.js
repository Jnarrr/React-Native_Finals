import React, {useState, useEffect} from 'react';
import {View, Button, Text, ScrollView, TouchableOpacity, StyleSheet, ActivityIndicator, FlatList} from 'react-native';
import { openDatabase } from "react-native-sqlite-storage";

const db = openDatabase({
  name: 'groceryDB',
  location: 'default'
});

const ProductsScreen = ( {navigation} ) => {
    const [color, setColor] = useState('');
    const [size, setSize] = useState('');
    const [productname, setProductName] = useState('');
    const [products, setProducts] = useState([]);

    const createTable = () => {
        db.transaction(txn => {
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS products (id INTEGER PRIMARY KEY AUTOINCREMENT, productname VARCHAR(50), size VARCHAR(50), color VARCHAR(50))',
              [],
              (sqlTxn, res) => {
                console.log("table created successfully");
              },
              error => {
                console.log("may error: " + error.message)
              }
            );
    
        });
    }

    return(
        <View>
            <Text>Products Screen</Text>
        </View>
    )
}

export default ProductsScreen;