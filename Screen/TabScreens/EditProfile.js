/* eslint-disable react-native/no-inline-styles */
// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component

import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {styles} from '../Components/Styles.js';
import Loader from '../Components/Loader';

const EditProfile = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState('');
  const [userSurname, setUserSurname] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPhone, setUserPhone] = useState('');

  const handleUpdate = () => {
    AsyncStorage.getItem('auth_token').then(token => {
      updateProfile(token);
    });
  };
  const updateProfile = async token => {
    const response = await fetch(
      'https://gelirortaklari.api.hasoffers.com/Apiv3/json?api_key=' +
        token +
        '&Target=Affiliate_AffiliateUser&Method=update&data[email]=' +
        userEmail +
        '&data[last_name]=' +
        userSurname +
        ']=&data[first_name]=' +
        userName +
        ']=&data[cell_phone]=' +
        userPhone,
    );
    const json = await response.json();
    console.log(json);
  };
  const getProfile = async obj => {
    console.log(obj);
    setLoading(true);
    const response = await fetch(
      'https://gelirortaklari.api.hasoffers.com/Apiv3/json?api_key=' +
        obj.token +
        '&Target=Affiliate_AffiliateUser&Method=findById&id=' +
        obj.id,
    );
    const json = await response.json();
    //console.log(json);
    console.log(json.response.data.AffiliateUser);
    setUserName(json.response.data.AffiliateUser.first_name);
    setUserSurname(json.response.data.AffiliateUser.last_name);
    setUserEmail(json.response.data.AffiliateUser.email);
    setUserPhone(json.response.data.AffiliateUser.cell_phone);
    setLoading(false);
  };
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // do something
      console.log('Hello World!');
      var obj = {};
      AsyncStorage.getItem('auth_token').then(token =>
        //navigation.replace(value === null ? 'Auth' : 'TabNavigationRoutes'),
        {
          obj.token = token;
          AsyncStorage.getItem('userId').then(id => {
            obj.id = id;
            getProfile(obj);
          });
        },
      );
    });
    return unsubscribe;
  }, [navigation]);
  return (
    <View style={styles.mainBody}>
      <Loader loading={loading} />
      <View style={styles.topStyle}>
        <TouchableOpacity
          style={styles.buttonClose}
          onPress={() => navigation.navigate('Profile')}>
          <Image
            source={require('../../assets/img/back_btn.png')}
            style={{
              width: 13,
              height: 23,
            }}
          />
        </TouchableOpacity>
        <View style={{alignItems: 'center'}}>
          <Text style={styles.headerTextStyle}>Profili Düzenle</Text>
        </View>
      </View>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          flex: 1,
        }}>
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            paddingTop: 27,
            paddingLeft: 35,
            paddingRight: 35,
            width: '100%',
          }}>
          <Text style={styles.inputTitleStyle}>Ad</Text>
          <TextInput
            style={styles.inputStyle}
            onChangeText={UserName => setUserName(UserName)}
            autoCapitalize="none"
            placeholder={userName}
            value={userName}
            placeholderTextColor="#7E797F"
            returnKeyType="next"
            underlineColorAndroid="#f000"
            blurOnSubmit={false}
          />
          <Text style={styles.inputTitleStyle}>Soyad</Text>
          <TextInput
            style={styles.inputStyle}
            onChangeText={UserSurname => setUserSurname(UserSurname)}
            autoCapitalize="none"
            placeholder={userSurname}
            value={userSurname}
            placeholderTextColor="#7E797F"
            returnKeyType="next"
            underlineColorAndroid="#f000"
            blurOnSubmit={false}
          />
          <Text style={styles.inputTitleStyle}>E-posta Adresi</Text>
          <TextInput
            style={styles.inputStyle}
            onChangeText={UserEmail => setUserEmail(UserEmail)}
            autoCapitalize="none"
            placeholder={userEmail}
            value={userEmail}
            placeholderTextColor="#7E797F"
            keyboardType="email-address"
            returnKeyType="next"
            underlineColorAndroid="#f000"
            blurOnSubmit={false}
          />
          <Text style={styles.inputTitleStyle}>Telefon</Text>
          <TextInput
            style={styles.inputStyle}
            onChangeText={UserPhone => setUserPhone(UserPhone)}
            autoCapitalize="none"
            placeholder={userPhone}
            value={userPhone}
            placeholderTextColor="#7E797F"
            keyboardType="email-address"
            returnKeyType="next"
            underlineColorAndroid="#f000"
            blurOnSubmit={false}
          />
          <TouchableOpacity
            style={styles.buttonStyle}
            activeOpacity={0.5}
            onPress={handleUpdate}>
            <Text style={styles.buttonTextStyle}>GÜNCELLE</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default EditProfile;
