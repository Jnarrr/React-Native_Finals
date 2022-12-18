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
            <View style = {{ width: 100, height: 100, backgroundColor: color }}>

            </View>

            <TouchableOpacity onPress={() => { navigation.navigate('EditProduct', {
                key:id, 
                productname:productname, 
                color:color,
                size:size,
                price:price,
                description:description
                } ); }}>
                <Text style={{ color: 'black' }}>Edit</Text>
            </TouchableOpacity>
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