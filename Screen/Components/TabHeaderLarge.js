/* eslint-disable no-unused-vars */
// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React from 'react';
import {StyleSheet, View, TouchableOpacity, Image, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Bildirim from '../../assets/img/svg/bildirim.svg';

const TabHeaderLarge = props => {
  const {routetarget, name, count, ...attributes} = props;

  const navigation = useNavigation();

  /*console.log(navigation);
  console.log(routetarget);*/
  return (
    <View style={styles.topStyle}>
      <TouchableOpacity
        style={[
          styles.buttonClose,
          {display: routetarget === '' ? 'none' : 'flex'},
        ]}
        onPress={() => navigation.navigate(routetarget)}>
        <View style={{}}>
          <Image
            source={require('../../assets/img/back_btn.png')}
            style={{
              width: 13,
              height: 23,
            }}
          />
        </View>
      </TouchableOpacity>
      <View style={{alignItems: 'center'}}>
        <Text style={[styles.headerTextStyle, {fontWeight:'700'}]}>{name}</Text>
      </View>
      {/* <TouchableOpacity
        style={{
          width: 18,
          height: 21,
          position: 'absolute',
          top: 40,
          right: 37,
        }}
        onPress={() => navigation.navigate('notification')}>
        <View style={styles.notificationIcon}>
          <View style={styles.notificationImg}>
            <Bildirim width={18} height={21} />
            <Image
              source={require('../../assets/img/bildirim.png')}
              style={{
                width: 18,
                height: 21,
              }}
            /> 
          </View>
          <View style={styles.notificationNumber}>
            <Text style={styles.notificationText}>{count}</Text>
          </View>
        </View>
      </TouchableOpacity> */}
    </View>
  );
};

export default TabHeaderLarge;

const styles = StyleSheet.create({
  topStyle: {
    backgroundColor: '#fff',
    height: 96,
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
    paddingTop: 39,
    paddingBottom: 30,
    borderColor: '#EBEBEB',
    borderBottomWidth: 1,
    position: 'relative',
  },
  buttonClose: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 79,
    height: 96,
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
