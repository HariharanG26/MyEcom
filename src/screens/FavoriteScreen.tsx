import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, FlatList, Image, Pressable} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';

const FavoriteScreen = ({navigation}: any) => {
  const [products, setProducts] = useState([]);

  useFocusEffect(() => {
    AsyncStorage.getItem('favorite').then(data => {
      let favorites = JSON.parse(data ?? '[]');
      setProducts(favorites);
    });
  });

  const handleDelete = async id => {
    try {
      const updatedFavorites = products.filter(item => item.id !== id);
      await AsyncStorage.setItem('favorite', JSON.stringify(updatedFavorites));
      setProducts(updatedFavorites);
    } catch (error) {
      console.log(error);
    }
  };

  if (products.length === 0) {
    return (
      <View style={{alignItems: 'center'}}>
        <View style={styles.header}>
        <Text style={[styles.headerText,{marginTop:25}]}>Favorites</Text>
      </View>
        <Image source={require('../images/Sally-4.png')} />
        <View style={styles.centerContainer}>
          <Text style={styles.noItemsText}>No Favorites Yet</Text>
          <Text style={{color: 'black',fontFamily:"Raleway-Medium",marginTop:15}}>Hit the orange button down</Text>
          <Text style={{color: 'black',fontFamily:"Raleway-Medium", marginBottom:15}}>below to Create an order</Text>
        </View>
        <Pressable style={styles.button} onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>Start Ordering</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Favorites</Text>
      </View>
      <FlatList
        data={products}
        renderItem={({item}: any) => {
          return (
            <Pressable
              onPress={() =>
                navigation.navigate('ProductDetail', {id: item.id})
              }
              style={styles.item}>
              <Image
                source={{uri: `${item.image}`}}
                style={{
                  width: 100,
                  height: 100,
                }}
              />
              <Text
                style={{
                  color: 'black',
                  fontFamily: 'Raleway-Bold',
                  marginTop: 10,
                }}>
                {item.brand}
              </Text>
              <Text style={{color: 'black', fontFamily: 'Raleway-Bold'}}>
                {item.model}
              </Text>
              <Text style={{color: '#5956E9', fontFamily: 'Raleway-Bold'}}>
                From $ {item.price}
              </Text>
              <Pressable
                style={{
                  backgroundColor: '#5956E9',
                  marginTop: 8,
                  padding: 5,
                  borderRadius: 5,
                }}
                onPress={() => handleDelete(item.id)}>
                <Text style={{color: '#fff', fontFamily: 'Raleway-Bold'}}>
                  Delete
                </Text>
              </Pressable>
            </Pressable>
          );
        }}
        keyExtractor={item => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
      />
    </View>
  );
};

export default FavoriteScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
  },
  centerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  noItemsText: {
    fontSize: 28,
    color: 'black',
    textAlign: 'center',
    fontFamily: 'Raleway-Bold',
  },
  row: {
    flex: 1,
    justifyContent: 'space-around',
  },
  item: {
    margin: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 15,
  },
  button: {
    alignItems: 'center',
    marginTop: 10,
    backgroundColor: '#5956E9',
    marginHorizontal: 80,
    padding: 15,
    paddingHorizontal:40,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontFamily:"Raleway-Bold"
  },
  header: {
    alignItems: 'center',
    marginBottom:25
  },
  headerText: {
    color: 'black',
    fontFamily: 'Raleway-Bold',
    fontSize: 30,
  },
  
});
