import {View, Text, StyleSheet, Image} from 'react-native';
import {useState, useEffect} from 'react';
import React from 'react';
import axios from 'axios';
import {FlatList} from 'react-native-gesture-handler';
import {Location} from '../images';

const ProfileScreen = () => {
  const [user, setuser] = useState<any>([]);

  useEffect(() => {
    axios
      .get('https://663530d09bb0df2359a4120d.mockapi.io/profile/details/profile')
      .then(res => {
        setuser(res.data);
      });
  }, []);

  return (
    <>
      <View style={styles.header}>
        <Text style={styles.headerText}>Profile</Text>
      </View>
      <View>
        <FlatList
          data={user}
          renderItem={({item}: any) => {
            return (
              <View style={styles.profile}>
                <View>
                  <Image
                    source={{uri: `${item.image}`}}
                    style={{
                      width: 76,
                      height: 76,
                      borderRadius: 38,
                      marginLeft: 25,
                      position: 'absolute',
                      top: -50,
                      bottom: 0,
                      left: 0,
                      right: 0,
                    }}
                  />
                  <Text
                    style={{
                      color: 'black',
                      fontFamily: 'Raleway-Bold',
                      fontSize: 18,
                      marginTop:35
                    }}>
                    {item.fullName}
                  </Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <View>
                    <Location />
                  </View>
                  <View style={{marginLeft: 5}}>
                    <Text
                      style={{fontFamily: 'Raleway-Medium', color: 'black'}}>
                      Address: {item.street}
                    </Text>
                    <Text
                      style={{fontFamily: 'Raleway-Medium', color: 'black'}}>
                      {item.city}, {item.country}
                    </Text>
                  </View>
                </View>
              </View>
            );
          }}
        />
      </View>
    </>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    marginTop: 15,
  },
  headerText: {
    color: 'black',
    fontFamily: 'Raleway-Bold',
    fontSize: 30,
  },
  profile: {
    alignItems: 'center',
    marginTop: 50,
    backgroundColor: '#e1e1e1',
    marginHorizontal: 33,
    padding: 17,
    borderRadius: 20,
  },
});

interface User {
  fullName: string;
  street: string;
  image: string;
  email: string;
  city: string;
  country: string;
  id: string;
}
