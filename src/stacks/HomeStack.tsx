import {View, Text, TextInput, StyleSheet, FlatList, Image, Pressable} from 'react-native';
import {useEffect, useState} from 'react';
import axios from 'axios';
import React from 'react';
import SearchIcon from '../images/SearchIcon'

const HomeStack = ({navigation}:any) => {
  const [products, setProducts] = useState<any>([]);
  const [originalProducts, setOriginalProducts] = useState<any>([]);

  useEffect(() => {
    axios
      .get('https://64450603914c816083c4251c.mockapi.io/appoinmet/products')
      .then(res => {
        setProducts(res.data);
        setOriginalProducts(res.data);
      });
  }, []);

  const search = ({value}: any) => {
    let filteredProducts = originalProducts.filter((item:any) =>
      item.brand.toLowerCase().includes(value.toLowerCase()),
    );
    setProducts([...filteredProducts]);
  };

  const renderItem = ({item}: any) => {
    return (
      <View>
        <Pressable
        onPress={()=>navigation.navigate('ProductDetail',{id: item.id})}
          style={{
            marginHorizontal: 25,
            backgroundColor: '#fff',
            alignItems: 'center',
            width: 250,
            height: 225,
            marginTop: 100,
            borderRadius: 20,
          }}>
          <Image
            source={{uri: `${item.image}`}}
            style={{
              width: 190,
              height: 190,
              borderRadius: 95,
              position: 'absolute',
              top: -95,
            }}
          />
          <Text
            style={{
              color: 'black',
              fontFamily: 'Raleway-Bold',
              fontSize: 22,
              marginTop: 115,
            }}>
            {item.brand}
          </Text>
          <Text
            style={{
              color: '#868686',
              fontFamily: 'Raleway-Medium',
              fontSize: 16,
            }}>
            {item.model}
          </Text>
          <Text
            style={{
              color: '#5956e9',
              fontSize: 17,
              fontFamily: 'Raleway-Bold',
              marginTop: 15,
            }}>
            $ {item.price}
          </Text>
        </Pressable>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.input}>
        <TextInput
          placeholder="Search"
          placeholderTextColor={'black'}
          cursorColor={'black'}
          style={{color: 'black'}}
          onChangeText={value => search({value})}
        />
        <View style={{position:"absolute",left:15,top:16}}>
        <SearchIcon />
        </View>
      </View>
      <View style={styles.header}>
        <Text style={styles.headerText}>Order Online</Text>
        <Text style={styles.headerText}>Collect In Store</Text>
      </View>
      <View style={styles.labels}>
        <Text style={styles.labelText}>Wearable</Text>
        <Text style={styles.labelText}>Laptops</Text>
        <Text style={styles.labelText}>Phones</Text>
        <Text style={styles.labelText}>Drones</Text>
      </View>
      <View style={{marginTop: 15}}>
        <FlatList data={products} horizontal renderItem={renderItem} />
      </View>
    </View>
  );
};

export default HomeStack;

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    marginTop: 46,
    marginHorizontal: 18,
    borderRadius: 30,
    paddingLeft:45,
    paddingVertical:5
  },
  headerText: {
    fontFamily: 'Raleway-Bold',
    color: 'black',
    fontSize: 40,
    marginHorizontal: 18,
  },
  header: {
    marginTop: 31,
  },
  labels: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 72,
  },
  labelText: {
    color: '#9A9A9D',
  },
  listItems: {
    marginHorizontal: 15,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#F2F2F2',
  },
});
