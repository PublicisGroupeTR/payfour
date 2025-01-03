/* eslint-disable no-unused-vars */
// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React from 'react';
import {StyleSheet, View, TouchableOpacity, Image, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Bildirim from '../../assets/img/svg/bildirim.svg';

const SubtabHeader = props => {
  const {routetarget, name, count, mode, ...attributes} = props;

  const navigation = useNavigation();

  /*console.log(navigation);
  console.log(routetarget);*/
  return (
    <View style={[styles.topStyle, {backgroundColor: props.mode === 'dark' ? 'transparent' : '#fff',zIndex:1}]}>
      <TouchableOpacity
        style={[
          styles.buttonClose,
          {display: routetarget === '' ? 'none' : 'flex', flexDirection:'row'},
        ]}
        onPress={() => navigation.navigate(routetarget)}>        
          <Image
            source={require('../../assets/img/export/arrow_back.png')}
            style={{
              width: 32,
              height: 32,
              tintColor: props.mode === 'dark' ? '#fff' : 'none',
            }}
          />
      <View style={{
        alignItems: 'center',
        justifyContent:'center',
        }}>
        <Text style={{
          color: props.mode === 'dark'? '#fff' : '#0B1929',
          fontSize:16,
          fontWeight:'700'
        }}>
          {name}
        </Text>
      </View>
      
      </TouchableOpacity>
      
    </View>
  );
};

export default SubtabHeader;

const styles = StyleSheet.create({
  topStyle: {
    paddingTop:13,
    paddingBottom:13,
    paddingLeft:16,
    paddingRight:16,
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'center',    
    borderColor: '#EBEBEB',
    position: 'relative',
    backgroundColor:'#fff'
  },
  buttonClose: {
    
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTextStyle: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 18,
    color: '#1D1D25',
  },
  notificationIcon: {
    width: 18,
    height: 21,
    // position: 'absolute',
    // top: 40,
    // right: 37,
  },
  notificationImg: {
    width: 18,
    height: 21,
  },
  notificationNumber: {
    width: 15,
    height: 15,
    backgroundColor: '#FF9D9D',
    borderRadius: 13,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    top: -30,
    right: -7,
  },
  notificationText: {
    fontSize: 10,
    lineHeight: 10,
    fontFamily: 'Helvetica-Bold',
    color: '#fff',
  },
});
