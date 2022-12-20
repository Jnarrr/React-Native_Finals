import React, {useState, useEffect} from 'react';
import {View, Button, Text, ScrollView, Image, TextInput, Dimensions, TouchableOpacity, StyleSheet, ActivityIndicator, FlatList} from 'react-native';
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

    const colNum = 2;

    useEffect(() => {
      createTable();
      if(isFocused){ 
        getProducts();
        setSearch('');
      }
    }, [isFocused]); 

    return(
        <View style = {{ padding: 30 }}>
            <TextInput 
              style = {styles.input} 
              placeholder = 'Search name of a Product' 
              placeholderTextColor = 'gray'
              value = {search}
              onChangeText = { (text) => searchFilter(text) }
            />
            <Image source = { require('../images/search.png')} style = {styles.icon}/>

            <FlatList 
            style = {{ height: 480, marginTop: 20 }}
            data={ products }
            renderItem = {({ item }) => (
              <TouchableOpacity activeOpacity={.50} style = {{ 
              backgroundColor: item.color,
              padding: 10,
              marginVertical: 8,
              borderRadius: 8,
              height: 100,
              width: Dimensions.get('window').width / 2,
              margin: 5,
              flex: 1,
              }} onPress={() => { navigation.navigate('ProductDetails', {item:item} ); }}>
                <Text style={styles.subItemText}>{item.productname}</Text>
                <Text style={styles.price}>₱{item.price}</Text>
                <Text style={styles.size}>{item.size}</Text>
              </TouchableOpacity>
            )}
            numColumns = {colNum}
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
    backgroundColor: 'purple',
    borderRadius: 50,
    },
    size:{
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'right',
    position: 'absolute',
    bottom: 15,
    left: 15
    },
    price:{
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'right',
    position: 'absolute',
    bottom: 15,
    right: 15
    },
    subItem:{
    justifyContent: 'center', 
    flexDirection: 'row',
    marginTop: 12,
    },
    subItemText:{
    color: 'white', 
    textAlign: 'left', 
    fontWeight: 'bold', 
    fontSize: 14,
    margin: 5
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
    icon: {
    width:20,
    height:20,
    marginLeft: 30,
    marginTop: -30
    },
})

export default ProductsScreen;