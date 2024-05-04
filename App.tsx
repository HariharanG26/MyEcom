import React from 'react';
import {View, Text, Button} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import GetStarted from './src/stacks/GetStarted';
import Home from './src/stacks/Home';
import ProductDetails from './src/screens/ProductDetails';

const Stack = createStackNavigator();

const App = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen
        name="getstarted"
        component={GetStarted}
        options={{headerShown: false}}
      />
      <Stack.Screen name="Home" component={Home} options={{headerShown: false}} />
      <Stack.Screen name="ProductDetail" component={ProductDetails} options={{headerShown: false}} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default App;
