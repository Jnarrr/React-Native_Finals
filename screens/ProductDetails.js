import React, {useState, useEffect} from 'react';
import {View, Button, Text, ScrollView, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, FlatList, Alert} from 'react-native';
import { openDatabase } from "react-native-sqlite-storage";

const db = openDatabase({
    name: 'groceryDB',
    location: 'default'
});

const ProductDetailsScreen = ( {navigation, route} ) => {
    const [id, setId] = useState(route.params.item.key)
    const [productname, setProductname] = useState(route.params.item.productname);
    const [color, setColor] = useState(route.params.item.color);
    const [size, setSize] = useState(route.params.item.size);
    const [price, setPrice] = useState(route.params.item.price);
    const [description, setDescription] = useState(route.params.item.description);
    const [products, setProducts] = useState([]);

    updateItem = () => {
        if(!productname) {
          alert('Please enter Product Name')
          return false;
        }
    
        db.transaction(txn => {
          txn.executeSql(
            'UPDATE products SET productname = ?, color = ?, size = ?, price = ?, description = ? WHERE id = ?',
            [productname, color, size, price, description, id],
            (sqlTxn, res) => {
              navigation.goBack();
            },
            error => {
              console.log("may error: " + error.message)
            }
          );
        });
    }

    deleteItem = () => {
        db.transaction(txn => {
          txn.executeSql(
            'DELETE FROM products WHERE id = ?',
            [id],
            (sqlTxn, res) => {
                Alert.alert('Product Deleted successfully!')
                navigation.goBack();
            },
            error => {
                console.log("may error: " + error.message)
            }
          );
        });
    }

    return(
        <View>
            <Text>Product Details Screen</Text>
            <Text>{id}</Text>
            <Text>{productname}</Text>
            <Text>{color}</Text>
            <Text>{size}</Text>
            <Text>{price}</Text>
            <Text>{description}</Text>

            <TextInput 
            style = { styles.input }
            onChangeText = { (text) => [setProductname(text)] }
            placeholder='Enter Product Name'
            placeholderTextColor= 'gray'
            maxLength={30} 
            defaultValue = {route.params.item.productname}
            />
            <TextInput 
            style = { styles.input }
            onChangeText = { (text) => [setColor(text)] }
            placeholder='Enter Color'
            placeholderTextColor= 'gray'
            maxLength={30} 
            defaultValue = {route.params.item.color}
            />
            <TextInput 
            style = { styles.input }
            onChangeText = { (text) => [setSize(text)] }
            placeholder='Enter Size'
            placeholderTextColor= 'gray'
            maxLength={30} 
            defaultValue = {route.params.item.size}
            />
            <TextInput 
            style = { styles.input }
            onChangeText = { (text) => [setPrice(text)] }
            placeholder='Enter Price'
            placeholderTextColor= 'gray'
            maxLength={30} 
            defaultValue = {route.params.item.price}
            />
            <TextInput 
            style = { styles.input }
            onChangeText = { (text) => [setDescription(text)] }
            placeholder='Enter Description'
            placeholderTextColor= 'gray'
            maxLength={30} 
            defaultValue = {route.params.item.description}
            />

            <Button
                title="Save"
                color="darkorange" 
                onPress={ () => { updateItem() }}
            />
            <Button
                title="Delete"
                color="darkred" 
                onPress={ () => { deleteItem() }}
            />
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

export default ProductDetailsScreen;