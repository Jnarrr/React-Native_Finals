import React from 'react';
import { View, Text, Button, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/Home';
import ProductsScreen from './screens/Products';
import ProductDetailsScreen from './screens/ProductDetails';
import AddProductScreen from './screens/AddProduct';
import EditProductScreen from './screens/EditProduct';

const Stack = createNativeStackNavigator();

const aquaApp = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerTitleAlign: 'center' }}>
        <Stack.Screen
          name="Home"
          component={ HomeScreen }
          options={{ 
            title: 'Home', 
            headerRight: () => (
              <Button
              onPress={() => alert('This is a button!')}
              title="Info"
              color="#000"></Button>),
            headerShown: false
          }}
          
        />
        <Stack.Screen
          name="Products"
          component={ ProductsScreen }
          options={{ 
            title: 'Products', 
            headerRight: () => (
              <Button
              onPress={() => alert('This is a button!')}
              title="Info"
              color="#000"></Button>)
          }}
          
        />
        <Stack.Screen
          name="ProductDetails"
          component={ ProductDetailsScreen }
          options={{ 
            title: 'Product Details', 
            headerRight: () => (
              <Button
              onPress={() => alert('This is a button!')}
              title="Info"
              color="#000"></Button>)
          }}
          
        />
        <Stack.Screen
          name="AddProduct"
          component={ AddProductScreen }
          options={{ 
            title: 'Add Product'
          }}
          
        />
        <Stack.Screen
          name="EditProduct"
          component={ EditProductScreen }
          options={{ 
            title: 'Edit Product'
          }}
          
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default aquaApp;