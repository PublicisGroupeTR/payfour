/* eslint-disable react-native/no-inline-styles */
// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Button,
  NativeModules,
  TouchableOpacity,
  Image
} from 'react-native';
import SubtabHeader from '../Components/SubtabHeader.js';
import {FontFamilies} from '../../constants/fonts.js';

const NFCClosed = ({ navigation, route }) => {

  const openEnQualifyActivity = () => {
    NativeModules.EnQualifyModuleAndroid.openNativeActivity()
  }

  return (
    <View style={styles.wrapper}>
      {/* <SubtabHeader routetarget="VerifyScreen" name="Kimliğini Doğrula" count="0" /> */}
      <View style={styles.main}>
        <View style={styles.container}>
          <View style={styles.content}>
            <Image
              source={require('../../assets/img/kyc_nfc_error.png')}
              style={styles.image}
            />
            <Text style={styles.title}>NFC Özelliğiniz Kapalı</Text>
            <Text style={styles.text}>Lütfen NFC özelleğinizi açıp tekrar deneyiniz</Text>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={openEnQualifyActivity}
              style={[styles.buttonStyle, {}]}
              activeOpacity={0.5}
            >
              <Text style={styles.buttonTextStyle}>Tekrar Dene</Text>
            </TouchableOpacity>
            <Image
              source={require('../../assets/img/dgfin_legal.png')}
              style={styles.dgfin} />
          </View>
        </View>
      </View>
    </View>
  );
};

export default NFCClosed;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  main: {
    flex: 1,
    padding: 16,
    backgroundColor:"#efeff3"
  },
  container: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 24,
    flex: 1,
    justifyContent:"space-between"
  },
  content:{
    paddingTop:50,
    alignItems:"center"
  },
  image:{
    width:120,
    height:120
  },
  icon:{
    width:24,
    height:24
  },
  title:{
    color: '#004F97',
    fontFamily: FontFamilies.UBUNTU.medium,
    fontWeight: '500',
    fontSize: 16,
    marginTop:24,
    marginBottom:8
  },
  text:{
    color: "#909EAA",
    fontFamily: FontFamilies.UBUNTU.normal,
    fontWeight: '400',
    fontSize: 12,
    textAlign:"center"
  },
  buttonContainer: {
    flexDirection: "col",
    gap: 12
  },
  buttonStyle: {
    backgroundColor: '#004F97',
    borderWidth: 0,
    color: '#FFFFFF',
    height: 52,
    alignItems: 'center',
    borderRadius: 10,

  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 15,
    fontFamily: FontFamilies.UBUNTU.medium,
    fontWeight: '500',
    fontSize: 14,
  },
  dgfin:{
    width:"100%",
    height:77
  }
});
