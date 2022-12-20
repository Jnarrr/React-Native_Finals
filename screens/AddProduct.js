import React, {useState, useEffect} from 'react';
import {View, Button, Text, ScrollView, TouchableOpacity, StyleSheet, TextInput, ActivityIndicator, FlatList} from 'react-native';
import { openDatabase } from "react-native-sqlite-storage";
import { Dropdown } from 'react-native-element-dropdown';

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

    const [isFocusColor, setIsFocusColor] = useState(false);
    const colorList = [
      { label: 'aqua', value: 'aqua' },
      { label: 'aquamarine', value: 'aquamarine' },
      { label: 'black', value: 'black' },
      { label: 'blue', value: 'blue' },
      { label: 'blueviolet', value: 'blueviolet' },
      { label: 'brown', value: 'brown' },
      { label: 'burlywood', value: 'burlywood' },
      { label: 'cadetblue', value: 'cadetblue' },
      { label: 'chartreuse', value: 'chartreuse' },
      { label: 'chocolate', value: 'chocolate' },
      { label: 'coral', value: 'coral' },
      { label: 'cornflowerblue', value: 'cornflowerblue' },
      { label: 'crimson', value: 'crimson' },
      { label: 'cyan', value: 'cyan' },
      { label: 'darkblue', value: 'darkblue' },
      { label: 'darkcyan', value: 'darkcyan' },
      { label: 'darkgoldenrod', value: 'darkgoldenrod' },
      { label: 'darkgray', value: 'darkgray' },
      { label: 'darkgreen', value: 'darkgreen' },
      { label: 'darkgrey', value: 'darkgrey' },
      { label: 'darkkhaki', value: 'darkkhaki' },
      { label: 'darkmagenta', value: 'darkmagenta' },
      { label: 'darkolivegreen', value: 'darkolivegreen' },
      { label: 'darkorange', value: 'darkorange' },
      { label: 'darkorchid', value: 'darkorchid' },
      { label: 'darkred', value: 'darkred' },
      { label: 'darksalmon', value: 'darksalmon' },
      { label: 'darkseagreen', value: 'darkseagreen' },
      { label: 'darkred', value: 'darkred' },
      { label: 'darkslateblue', value: 'darkslateblue' },
      { label: 'darkslategrey', value: 'darkslategrey' },
      { label: 'darkturquoise', value: 'darkturquoise' },
      { label: 'darkviolet', value: 'darkviolet' },
      { label: 'deeppink', value: 'deeppink' },
      { label: 'deepskyblue', value: 'deepskyblue' },
      { label: 'dimgray', value: 'dimgray' },
      { label: 'dodgerblue', value: 'dodgerblue' },
      { label: 'firebrick', value: 'firebrick' },
      { label: 'forestgreen', value: 'forestgreen' },
      { label: 'gold', value: 'gold' },
      { label: 'goldenrod', value: 'goldenrod' },
      { label: 'gray', value: 'gray' },
      { label: 'green', value: 'green' },
      { label: 'greenyellow', value: 'greenyellow' },
      { label: 'hotpink', value: 'hotpink' },
      { label: 'indianred', value: 'indianred' },
      { label: 'indigo', value: 'indigo' },
      { label: 'lawngreen', value: 'lawngreen' },
      { label: 'lightseagreen', value: 'lightseagreen' },
      { label: 'lime', value: 'lime' },
      { label: 'limegreen', value: 'limegreen' },
      { label: 'magenta', value: 'magenta' },
      { label: 'maroon', value: 'maroon' },
      { label: 'mediumaquamarine', value: 'mediumaquamarine' },
      { label: 'mediumpurple', value: 'mediumpurple' },
      { label: 'mediumspringgreen', value: 'mediumspringgreen' },
      { label: 'mediumturquoise', value: 'mediumturquoise' },
      { label: 'midnightblue', value: 'midnightblue' },
      { label: 'olive', value: 'olive' },
      { label: 'olivedrab', value: 'olivedrab' },
      { label: 'peru', value: 'peru' },
      { label: 'purple', value: 'purple' },
      { label: 'red', value: 'red' },
      { label: 'rosybrown', value: 'rosybrown' },
      { label: 'royalblue', value: 'royalblue' },
      { label: 'salmon', value: 'salmon' },
      { label: 'sienna', value: 'sienna' },
      { label: 'silver', value: 'silver' },
      { label: 'steelblue', value: 'steelblue' },
      { label: 'tan', value: 'tan' },
      { label: 'teal', value: 'teal' },
      { label: 'tomato', value: 'tomato' },
      { label: 'turquoise', value: 'turquoise' },
      { label: 'yellow', value: 'yellow' },
    ];

    const [isFocusSize, setIsFocusSize] = useState(false);
    const sizeList = [
      { label: '14oz', value: '14oz' },
      { label: '18oz', value: '18oz' },
      { label: '22oz', value: '22oz' },
      { label: '32oz', value: '32oz' },
      { label: '40oz', value: '40oz' },
      { label: '64oz', value: '64oz' },
    ]

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
                navigation.goBack();
            },
            error => {
              console.log("may error: " + error.message)
            }
          );
        });
    }

    return(
        <View style = {{ flex: 1, padding: 30 }}>
            <TextInput 
            style = { styles.input }
            onChangeText = { (text) => [setProductname(text)] }
            placeholder='Enter Product Name'
            placeholderTextColor= 'gray'
            maxLength={30} 
            />
            <Dropdown
            style={[styles.input, isFocusColor && { borderColor: 'purple' }]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            data={colorList}
            maxHeight={300}
            labelField="label"
            valueField="value"
            search
            placeholder={!isFocusColor ? 'Select Color' : '...'}
            value={color}
            onFocus={() => setIsFocusColor(true)}
            onBlur={() => setIsFocusColor(false)}
            onChange={item => {
                setColor(item.value);
                setIsFocusColor(false);
            }}
            />
            <Dropdown
            style={[styles.input, isFocusSize && { borderColor: 'purple' }]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            data={sizeList}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!isFocusSize ? 'Select Size' : '...'}
            value={size}
            onFocus={() => setIsFocusSize(true)}
            onBlur={() => setIsFocusSize(false)}
            onChange={item => {
                setSize(item.value);
                setIsFocusSize(false);
            }}
            />
            <TextInput 
            style = { styles.input }
            onChangeText = { (text) => [setPrice(text)] }
            placeholder='Enter Price'
            placeholderTextColor= 'gray'
            keyboardType='numeric'
            maxLength={30} 
            />
            <TextInput 
            style = { styles.input }
            onChangeText = { (text) => [setDescription(text)] }
            placeholder='Enter Description'
            placeholderTextColor= 'gray'
            maxLength={150} 
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
    backgroundColor: 'purple',
    width: 150,
    height: 35,
    borderRadius: 5,
    alignSelf: 'center',
    marginTop: 30
    },
    dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    },
    placeholderStyle: {
    fontSize: 16,
    color: 'gray',
    },
    selectedTextStyle: {
    fontSize: 16,
    color: 'black',
    },
})

export default AddProductScreen;