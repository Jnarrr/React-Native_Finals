import React, {useState, useEffect} from 'react';
import {View, Button, Text, ScrollView, Image, Dimensions, TouchableOpacity, StyleSheet, ActivityIndicator, FlatList, Alert} from 'react-native';
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

    const picture = () => {
        if (route.params.item.size == '14oz') {
            return <Image source = { require('../images/vector_flask14oz.png')} style = {styles.flask} />
        } else if (route.params.item.size == '18oz'){
            return <Image source = { require('../images/vector_flask18oz.png')} style = {styles.flask} />
        } else if (route.params.item.size == '22oz'){
            return <Image source = { require('../images/vector_flask22oz.png')} style = {styles.flask} />
        } else if (route.params.item.size == '32oz'){
            return <Image source = { require('../images/vector_flask32oz.png')} style = {styles.flask} />
        } else if (route.params.item.size == '40oz'){
            return <Image source = { require('../images/vector_flask40oz.png')} style = {styles.flask} />
        } else if (route.params.item.size == '64oz'){
            return <Image source = { require('../images/vector_flask64oz.png')} style = {styles.flask} />
        } 
    }

    return(
        <View style = {{ flex: 1, backgroundColor: route.params.item.color }}>
            <TouchableOpacity activeOpacity={.5} onPress={ () => navigation.goBack()}>
                <Image source = { require('../images/back.png')} style = {styles.back}/>
            </TouchableOpacity>
            {picture()}
            <Text style = {styles.size}>{size}</Text>
            <View style = {styles.whiteBox}>
                <Text style = {{ color: route.params.item.color, fontSize: 30, fontWeight: 'bold' }}>{productname}</Text>
                <Text style = {{ backgroundColor: route.params.item.color, 
                    color: 'white', 
                    fontSize: 24, 
                    fontWeight: 'bold', 
                    borderTopRightRadius: 14,
                    borderBottomEndRadius: 14,
                    borderBottomLeftRadius: 14,
                    width: 125,
                    height: 35,
                    textAlign: 'center'
                    }}>₱{price}</Text>
                <View style = {{ marginTop: 10, margin: 5, borderTopWidth: 2, borderColor: route.params.item.color }}>
                <Text style = {{ margin: 10, fontSize: 14, fontWeight: 'bold', color: 'gray' }}>
                    {description}</Text>
                </View>

                <View style = {{ flexDirection: 'row', justifyContent: 'space-evenly' }}> 

                    <TouchableOpacity style = { styles.btnDelete } onPress={ () => {deleteItem()} }>
                        <Text style = {styles.btnText}>Delete</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style = { styles.btn } onPress={() => { navigation.navigate('EditProduct', {
                        key:id, 
                        productname:productname, 
                        color:color,
                        size:size,
                        price:price,
                        description:description
                        } ); }}>
                        <Text style = {styles.btnText}>Edit</Text>
                    </TouchableOpacity>

                </View>
                
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    back:{
    width: 30,
    height: 30,
    position: 'absolute',
    top: 15,
    left: 15
    },
    flask:{
    width: 200,
    height: 270,
    alignSelf: 'center',
    marginTop: 50
    },
    size:{
    textAlign: 'center',
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: -30
    },
    btnText:{
    color: 'white',
    fontSize: 14,
    padding: 8,
    textAlign: 'center',
    fontWeight: 'bold',
    },
    btn:{
    backgroundColor: 'purple',
    color: 'white',
    width: 180,
    height: 35,
    alignSelf: 'center',
    marginTop: 20,
    borderTopRightRadius: 14,
    borderBottomEndRadius: 14,
    borderBottomLeftRadius: 14,
    },
    btnDelete:{
    backgroundColor: 'brown',
    color: 'white',
    width: 100,
    height: 35,
    alignSelf: 'center',
    marginTop: 20,
    borderTopLeftRadius: 14,
    borderBottomEndRadius: 14,
    borderBottomLeftRadius: 14,
    },
    whiteBox: {
    flex: 1,
    width: Dimensions.get('window').width,
    marginTop: 100,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: 'white',
    padding: 30
    },
})

export default ProductDetailsScreen;