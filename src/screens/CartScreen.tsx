import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useNavigation, useIsFocused} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SvgNotification from '../images/Notification';
import SvgDelete from '../images/Delete';

const CartScreen = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [basketItem, setBasketItem] = useState<any>([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const total = basketItem.reduce((accumulator, item) => {
      return accumulator + item.product.price * item.count;
    }, 0);
    setTotalPrice(total);
  }, [basketItem]);

  useEffect(() => {
    if (isFocused) {
      AsyncStorage.getItem('basket').then(data => {
        let basketItems = JSON.parse(data ?? '[]');
        setBasketItem(basketItems);
      });
    }
  }, [isFocused]);

  const handleIncrement = async (index: any) => {
    const updatedBasket = [...basketItem];
    updatedBasket[index].count += 1;
    setBasketItem(updatedBasket);
    await AsyncStorage.setItem('basket', JSON.stringify(updatedBasket));
  };

  const handleDelete = async (index: number) => {
    const updatedBasket = [...basketItem];
    updatedBasket.splice(index, 1);
    setBasketItem(updatedBasket);
    await AsyncStorage.setItem('basket', JSON.stringify(updatedBasket));
  };

  const handleDecrement = async (index: any) => {
    const updatedBasket = [...basketItem];
    if (updatedBasket[index].count > 1) {
      updatedBasket[index].count -= 1;
      setBasketItem(updatedBasket);
      await AsyncStorage.setItem('basket', JSON.stringify(updatedBasket));
    }
  };

  const renderItem = ({item, index}: any) => (
    <View style={styles.productContainer}>
      <Image
        source={{uri: `${item.product.image}`}}
        style={{
          width: 80,
          height: 80,
        }}
      />
      <View style={styles.items}>
        <Text style={{color: 'black', fontFamily: 'Raleway-Bold'}}>
          {item.product.brand} {item.product.model}
        </Text>
        <Text style={{color: '#5956E9', fontFamily: 'Raleway-Bold'}}>
          $ {item.product.price}
        </Text>
        <View style={{flexDirection: 'row', marginTop: 15}}>
          <Text
            style={{
              color: 'black',
              marginRight: 10,
              fontFamily: 'Raleway-Bold',
              fontSize: 15,
            }}>
            Quantity:
          </Text>
          <Pressable
            onPress={() => handleDecrement(index)}
            style={{
              backgroundColor: '#7DCCEC',
              paddingHorizontal: 10,
              borderRadius: 8,
            }}>
            <Text style={{color: 'black', fontSize: 20}}>-</Text>
          </Pressable>
          <Text
            style={{
              fontFamily: 'Raleway-Medium',
              color: 'black',
              marginHorizontal: 5,
              fontSize: 20,
            }}>
            {item.count}
          </Text>
          <Pressable
            onPress={() => handleIncrement(index)}
            style={{
              backgroundColor: '#7DCCEC',
              paddingHorizontal: 10,
              borderRadius: 8,
            }}>
            <Text style={{color: 'black', fontSize: 20}}>+</Text>
          </Pressable>
          <Pressable onPress={()=> handleDelete(index)} style={{justifyContent:"center",marginLeft:10}}>
            <SvgDelete />
          </Pressable>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Basket</Text>
      </View>
      <View style={styles.delivery}>
        <SvgNotification />
        <Text style={styles.deliveryText}>
          Delivery for FREE until the end of the month
        </Text>
      </View>
      <FlatList
        data={basketItem}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
      <View style={{flexDirection:"row",justifyContent:"space-between",marginHorizontal:39}}>
      <Text style={{color:"black",fontSize:17,fontFamily:"Raleway-Bold"}}>Total</Text>
      <Text style={{color:"#5956E9",fontSize:17,fontFamily:"Raleway-Bold"}}>$ {totalPrice}</Text>
      </View>
      <TouchableOpacity style={styles.checkButton}>
        <Text style={{fontFamily: 'Raleway-Bold', color: 'white'}}>
          Checkout
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  productContainer: {
    flexDirection: 'row',
    marginVertical: 10,
    backgroundColor: '#e3e3e3',
    marginHorizontal: 30,
    padding: 10,
    borderRadius: 10,
  },
  header: {
    alignItems: 'center',
    marginTop: 15,
  },
  headerText: {
    color: 'black',
    fontFamily: 'Raleway-Bold',
    fontSize: 30,
  },
  delivery: {
    alignItems: 'center',
    backgroundColor: '#D3F2FF',
    marginHorizontal: 50,
    flexDirection: 'row',
    padding: 10,
    borderRadius: 20,
    marginTop: 10,
  },
  deliveryText: {
    color: 'black',
    fontFamily: 'Raleway-Bold',
    fontSize: 10,
    marginLeft: 5,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  items: {
    marginLeft: 15,
  },
  checkButton: {
    backgroundColor: '#5956E9',
    alignItems: 'center',
    marginHorizontal: 36,
    paddingVertical: 25,
    marginVertical:24,
    borderRadius:10
  },
});
