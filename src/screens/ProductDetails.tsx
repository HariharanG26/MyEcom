import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import {Arrow, Path33961} from '../images';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';

const ProductDetails = ({navigation, route}: any) => {
  const [product, setProduct] = useState<any>({});
  const [existProduct, setExistProduct] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);

  const {id} = route.params;

  useEffect(() => {
    axios
      .get(
        `https://64450603914c816083c4251c.mockapi.io/appoinmet/products/${id}`,
      )
      .then(res => {
        setProduct(res.data);
      });
  }, []);

  useFocusEffect(() => {
    AsyncStorage.getItem('favorite').then(data => {
      let favorites = JSON.parse(data ?? '[]');
      setExistProduct(favorites);

      const existingProduct = favorites.find(item => item.id === id);
      setIsFavorite(existingProduct !== undefined);
    });
  });

  const addFavorite = async () => {
    const favoriteProduct = {
      id: id,
      model: product.model,
      brand: product.brand,
      image: product.image,
      price: product.price,
    };

    AsyncStorage.getItem('favorite').then(data => {
      let favorites = JSON.parse(data ?? '[]');

      const existingProductIndex = favorites.find(item => item.id == id);
      if (existingProductIndex) {
        let updatedFavorites = favorites.filter(product => product.id != id);
        AsyncStorage.setItem('favorite', JSON.stringify(updatedFavorites)).then(
          () => {
            setIsFavorite(false);
          },
        );
      } else {
        AsyncStorage.setItem(
          'favorite',
          JSON.stringify([...favorites, favoriteProduct]),
        ).then(() => {
          setIsFavorite(true);
        });
      }
    });
  };

  const handleAddBasket = async () => {
    let basket: any = await AsyncStorage.getItem('basket');
    // AsyncStorage.clear()

    if (!basket) {
      basket = [];
      let basketItem = {
        product: product,
        count: 1,
      };
      basket.push(basketItem);
      await AsyncStorage.setItem('basket', JSON.stringify(basket));
    } else {
      let parsedData = JSON.parse(basket);
      let basketItem = parsedData.find(
        (item: any) => item.product.id === product.id,
      );
      if (basketItem) {
        basketItem.count++;
        await AsyncStorage.setItem('basket', JSON.stringify(parsedData));
      } else {
        let basketItem = {
          product: product,
          count: 1,
        };
        parsedData.push(basketItem);
        await AsyncStorage.setItem('basket', JSON.stringify(parsedData));
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerIcons}>
        <Pressable onPress={() => navigation.goBack()}>
          <Arrow />
        </Pressable>
        <Pressable onPress={() => addFavorite()}>
          <Path33961 filled={isFavorite} />
        </Pressable>
      </View>
      <View style={styles.image}>
        <Image
          source={{uri: `${product.image}`}}
          style={{
            width: '100%',
            height: 300,
          }}
        />
      </View>
      <View style={styles.description}>
        <Text style={styles.descriptionText}>
          {product.brand} {product.model}
        </Text>
      </View>
      <View style={styles.colorHeader}>
        <Text style={styles.colorHeaderText}>Colors</Text>
      </View>
      <View style={styles.colors}>
        <View style={styles.color}>
          <View style={{flexDirection: 'row', padding: 5}}>
            <View
              style={[styles.colorItems, {backgroundColor: 'silver'}]}></View>
            <Text style={styles.colorText}>Silver</Text>
          </View>
        </View>
        <View style={styles.color}>
          <View style={{flexDirection: 'row', padding: 5}}>
            <View
              style={[styles.colorItems, {backgroundColor: '#e6c7bd'}]}></View>
            <Text style={styles.colorText}>Purple</Text>
          </View>
        </View>
        <View style={styles.color}>
          <View style={{flexDirection: 'row', padding: 5}}>
            <View
              style={[styles.colorItems, {backgroundColor: 'black'}]}></View>
            <Text style={styles.colorText}>Black</Text>
          </View>
        </View>
      </View>
      <View style={styles.containerText}>
        <Text style={styles.containerTextStyle}>
          Get Apple TV+ free for a year
        </Text>
        <Text style={styles.containerDescription}>
          Available when you purchase any new iPhone, iPad, iPod Touch, Mac or
          Apple TV, £4.99/month after free trial.
        </Text>
      </View>
      <View style={styles.priceLabel}>
        <Text style={styles.priceText}>Price</Text>
        <Text style={styles.price}>$ {product.price}</Text>
      </View>
      <View style={styles.addButton}>
        <TouchableOpacity style={{alignItems: 'center'}}>
          <Text style={styles.buttonText} onPress={handleAddBasket}>
            Add to basket
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProductDetails;

const styles = StyleSheet.create({
  headerIcons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 18,
    marginTop: 25,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    alignItems: 'center',
    marginTop: 25,
  },
  description: {
    marginTop: 19,
    marginHorizontal: 30,
  },
  descriptionText: {
    color: 'black',
    fontFamily: 'Raleway-Bold',
    fontSize: 28,
  },
  colorHeader: {
    marginHorizontal: 30,
    marginTop: 5,
  },
  colorHeaderText: {
    color: 'black',
    fontFamily: 'Raleway-Bold',
    fontSize: 17,
  },
  colors: {
    flexDirection: 'row',
    marginTop: 10,
    marginHorizontal: 24,
  },
  colorText: {
    color: 'black',
    marginHorizontal: 5,
  },
  color: {
    borderWidth: 1,
    borderColor: '#e3e3e3',
    marginHorizontal: 6,
    borderRadius: 10,
  },
  colorItems: {
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 8,
  },
  containerText: {
    marginLeft: 28,
    marginTop: 18,
  },
  containerTextStyle: {
    color: 'black',
    fontFamily: 'Raleway-Bold',
    fontSize: 18,
  },
  containerDescription: {
    color: '#7f7f7f',
    fontFamily: 'Raleway-Medium',
    marginTop: 7,
  },
  price: {
    color: '#5956E9',
    fontFamily: 'Raleway-Bold',
    fontSize: 22,
  },
  priceText: {
    color: '#7f7f7f',
    fontFamily: 'Raleway-Medium',
    fontSize: 17,
  },
  priceLabel: {
    flexDirection: 'row',
    marginHorizontal: 35,
    justifyContent: 'space-between',
    marginTop: 30,
  },
  addButton: {
    backgroundColor: '#5956E9',
    marginHorizontal: 37,
    marginTop: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    paddingVertical: 20,
    fontFamily: 'Raleway-Bold',
    fontSize: 20,
  },
});
