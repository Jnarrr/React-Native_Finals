import React, {useState, useEffect} from 'react';
import {View, Button, Text, ScrollView, TextInput, Image, Dimensions, TouchableOpacity, StyleSheet, ActivityIndicator, FlatList, Alert} from 'react-native';
import { openDatabase } from "react-native-sqlite-storage";
import { Dropdown } from 'react-native-element-dropdown';

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

  const updateItem = () => {
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

    const picture = () => {
        if (size == '14oz') {
            return <Image source = { require('../images/vector_flask14oz.png')} style = {styles.flask} />
        } else if (size == '18oz'){
            return <Image source = { require('../images/vector_flask18oz.png')} style = {styles.flask} />
        } else if (size == '22oz'){
            return <Image source = { require('../images/vector_flask22oz.png')} style = {styles.flask} />
        } else if (size == '32oz'){
            return <Image source = { require('../images/vector_flask32oz.png')} style = {styles.flask} />
        } else if (size == '40oz'){
            return <Image source = { require('../images/vector_flask40oz.png')} style = {styles.flask} />
        } else if (size == '64oz'){
            return <Image source = { require('../images/vector_flask64oz.png')} style = {styles.flask} />
        } else {
          return <Text style = {{ color: 'white', textAlign: 'center', height: 130, marginTop: 100, fontSize: 30, fontWeight: 'bold' }}>Please Select Size</Text>
        }
    }

    return(
        <View style = {{ flex: 1, backgroundColor: color || 'gray' }}>
            <TouchableOpacity activeOpacity={.5} onPress={ () => navigation.goBack()}>
                <Image source = { require('../images/back.png')} style = {styles.back}/>
            </TouchableOpacity>
            {picture()}
            <Text style = {styles.size}>{size}</Text>
            <ScrollView style = {styles.whiteBox}>
            <Text style = {{ color: color, fontSize: 30, fontWeight: 'bold', marginBottom: 10, }}>Edit Aquaflask</Text>
              <TextInput 
              style = { styles.input }
              onChangeText = { (text) => [setProductname(text)] }
              placeholder='Enter Product Name'
              placeholderTextColor= 'gray'
              maxLength={30} 
              defaultValue = {route.params.productname}
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
              defaultValue = {route.params.price}
              />
              <TextInput 
              style = { styles.input }
              onChangeText = { (text) => [setDescription(text)] }
              placeholder='Enter Description'
              placeholderTextColor= 'gray'
              maxLength={150} 
              defaultValue = {route.params.description}
              />

              <TouchableOpacity style = {styles.btn} onPress={ updateItem }>
                  <Text style = {styles.btnText}>Save</Text>
              </TouchableOpacity>

            </ScrollView>
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
    back:{
    width: 30,
    height: 30,
    position: 'absolute',
    top: 15,
    left: 15
    },
    flask:{
    width: 200,
    height: 200,
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 10
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
    whiteBox: {
    flex: 1,
    width: Dimensions.get('window').width,
    marginTop: 50,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: 'white',
    padding: 30
    },
})

export default EditProductScreen;