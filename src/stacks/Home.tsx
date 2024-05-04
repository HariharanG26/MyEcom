import {View, Text} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ProfileScreen from '../screens/ProfileScreen';
import HomeStack from './HomeStack';
import FavoriteScreen from '../screens/FavoriteScreen';
import CartScreen from '../screens/CartScreen';
import HomeImage from '../images/Home';
import {Buy, Path33961, Profile} from '../images';

const Home = ({}) => {
  const Tab = createBottomTabNavigator();

  return (
    <>
      <Tab.Navigator>
        <Tab.Screen
          name="HomeStack"
          component={HomeStack}
          options={{tabBarShowLabel:false,headerShown: false, tabBarIcon: ({focused}:any) => <HomeImage fill={focused?"#5956E9":"white"} stroke={focused?"#5956E9":"black"}/>}}
        />
        <Tab.Screen
          name="Favorite"
          component={FavoriteScreen}
          options={{tabBarShowLabel:false,headerShown: false, tabBarIcon: ({focused}) => <Path33961 filled={focused} />}}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{tabBarShowLabel:false,headerShown: false, tabBarIcon: ({focused}) => <Profile  fill={focused?"#5956E9":"white"} stroke={focused?"#5956E9":"black"}/>}}
        />
        <Tab.Screen
          name="Cart"
          component={CartScreen}
          options={{tabBarShowLabel:false,headerShown: false, tabBarIcon: ({focused}) => <Buy  fill={focused?"#5956E9":"white"} stroke={focused?"#5956E9":"black"}/>}}
        />
      </Tab.Navigator>
    </>
  );
};

export default Home;
