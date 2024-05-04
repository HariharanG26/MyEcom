import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Start } from '../images';

const GetStarted = ({ navigation }:any) => {
  return (
    <View style={styles.container}>
      <View style={styles.headerText}>
        <Text style={styles.text}>Find Your</Text>
        <Text style={styles.text}>Gadget</Text>
      </View>
      <View>
        <View style={styles.image}>
        <Start width={400} height={400}/>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Home')}>
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default GetStarted;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5956e9',
  },
  headerText: {
    marginLeft: 45,
    marginTop: 74,
  },
  text: {
    fontSize: 65,
    fontFamily: 'Raleway-Bold',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
    marginHorizontal: 100,
    borderRadius: 10,
    marginTop:10
  },
  image:{
    alignItems:"center",
    marginRight:"25%",
  },
  buttonText:{
    color:"#5956e9",
    fontFamily:'Raleway-Bold',
  }
});