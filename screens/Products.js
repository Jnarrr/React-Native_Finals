import React, {useState, useEffect} from 'react';
import {View, Button, Text, ScrollView, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, FlatList} from 'react-native';
import { openDatabase } from "react-native-sqlite-storage";
import { useIsFocused } from "@react-navigation/native";

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
    const isFocused = useIsFocused();

    //search
    const [search, setSearch] = useState('');
    const [filtereddata, setFilteredData] = useState([]);
    const [masterdata, setMasterData] = useState([]);

    const createTable = () => {
        db.transaction(txn => {
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS products (id INTEGER PRIMARY KEY AUTOINCREMENT, productname VARCHAR(50), color VARCHAR(50), size VARCHAR(50), price VARCHAR(50), description VARCHAR(50))',
              [],
              (sqlTxn, res) => {
                //console.log("table created successfully");
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

    const searchFilter = (text) => {
      setSearch(text);
      if (text){
        db.transaction(txn => {
          txn.executeSql(
            `SELECT * FROM products WHERE productname LIKE '%${search}%' ORDER BY id DESC`,
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
      } else {
        getProducts();
      }
    }

    useEffect(() => {
      createTable();
      if(isFocused){ 
        getProducts();
        setSearch('');
      }
    }, [isFocused]); 

    return(
        <View>
            <Text>Products Screen</Text>
            <TextInput 
              style = {styles.input} 
              placeholder = 'Search name of a Product' 
              placeholderTextColor = 'gray'
              value = {search}
              onChangeText = { (text) => searchFilter(text) }
            />
            <FlatList 
            data={ products }
            renderItem = {({ item }) => (
              <View>
                <TouchableOpacity onPress={() => { navigation.navigate('ProductDetails', {item:item} ); }}>
                  <Text style={{ color: item.color }}>{ item.productname }</Text>
                </TouchableOpacity>
              </View>
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
    input: {
    padding: 2,
    height: 40,
    backgroundColor: '#E8E8E8',
    borderRadius: 10,
    shadowRadius: 10,
    fontSize: 14,
    textAlign:'center',
    color: 'black',
    },
})

export default ProductsScreen;