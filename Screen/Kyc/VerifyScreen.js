/* eslint-disable react-native/no-inline-styles */
// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  NativeModules,
  TouchableOpacity,
  Image,
  Platform
} from 'react-native';
import SubtabHeader from '../Components/SubtabHeader.js';
import {FontFamilies} from '../../constants/fonts.js';
import { useIsFocused } from '@react-navigation/native';

const VerifyScreen = ({ navigation, route }) => {

  const isFocused = useIsFocused();
  const [allData, setAllData] = useState();

  const openEnQualifyActivity = async () => {

    // NativeModules.EnQualifyModuleIOS.showSwiftUIView()
    // return

    NativeModules.EnQualifyModuleIOS.showOCR()


    if (!allData) {
      return
    }

    if (Platform.OS == "ios") {
      NativeModules.EnQualifyModuleIOS.showOCR()
    } else {
      NativeModules.EnQualifyModuleAndroid.openNativeActivity(JSON.stringify(allData))
    }
    
  }

  const getData = async () => {
    const token = await AsyncStorage.getItem('token');
    const params = route.params
    let data = {}
    if (params) {
      if (params.user) {
        data = { ...data, ...params.user}
      }
      if (params.incometypesSelected) {
        data = { ...data, ...{ incometypesSelected : params.incometypesSelected}}
      }
      if (params.data) {
        data = { ...data, ...params.data}
      }
      if (params.referenceId) {
        data = { ...data, ...{ referenceId: params.referenceId}}
      }
      if (params.selectedaAreements) {
        data = { ...data,...{ selectedaAreements : params.selectedaAreements}}
      }
      if (token) {
        data = { ...data, ...{ token: token}}
      }
      console.log(data)
      setAllData(data)
    }
  }

  const goBack = () => {
    navigation.goBack()
  }

  useEffect(()=>{
  if (isFocused) {
    getData()
  }
  },[isFocused])

  return (
    <View style={styles.wrapper}>
      <SubtabHeader isKycPage name="Kullanıcı Onayı" count="0" />
      <View style={styles.main}>
        <View style={styles.container}>
          <View style={styles.content}>
            <Image
              source={require('../../assets/img/kyc_onay.png')}
              style={styles.image}
            />
            <Text style={styles.title}>Onayın Gerekiyor</Text>
            <Text style={styles.text}>Kimlik tespiti sürecinde, uzaktan kimlik tespitinin yapılması amacıyla biyometrik verilerinin Dgpara Ödeme ve Elektronik Para Kuruluşu Anonim Şirketi (“Dgpara”) ve Dgpara’nın yalnızca bu amaçla sınırlı olarak yetkilendirdiği üçüncü kişiler tarafından işlenmesine onay veriyorum.</Text>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={goBack}
              style={[styles.buttonStyle, { backgroundColor: '#fff', borderWidth: 1, borderColor: '#004F97' }]}
              activeOpacity={0.5}
            >
              <Text style={[styles.buttonTextStyle, { color: '#004F97' }]}>Vazgeç</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={()=> openEnQualifyActivity()}
              style={[styles.buttonStyle, {}]}
              activeOpacity={0.5}
            >
              <Text style={styles.buttonTextStyle}>Onayla</Text>
            </TouchableOpacity>
          </View>

        </View>
      </View>
    </View>
  );
};

export default VerifyScreen;

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
    paddingTop:64,
    alignItems:"center"
  },
  image:{
    width:120,
    height:120
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
    flexDirection: "row",
    gap: 12
  },
  buttonStyle: {
    flex: 1,
    backgroundColor: '#004F97',
    borderWidth: 0,
    color: '#FFFFFF',
    height: 52,
    alignItems: 'center',
    justifyContent:"center",
    borderRadius: 10,

  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 15,
    fontFamily: 'Ubuntu-Bold',
    fontWeight: '500',
    fontSize: 14,
  },
  dgfin:{
    width:"100%",
    height:77
  }
});
