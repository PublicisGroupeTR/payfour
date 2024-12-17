/* eslint-disable react-native/no-inline-styles */
// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Linking,
  Modal,
  AppState,
  Dimensions,
} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

import AsyncStorage from '@react-native-async-storage/async-storage';
//import {SelectList} from 'react-native-dropdown-select-list';
import {Dropdown} from 'react-native-element-dropdown';
import Loader from '../Components/Loader';
import TabHeader from '../Components/TabHeader';
import {ScrollView} from 'react-native-gesture-handler';
//import Clipboard from '@react-native-clipboard/clipboard';
import {styles} from '../Components/Styles.js';
import Linkwhite from '../../assets/img/svg/linkwhite.svg';

const Stack = createStackNavigator();
const Link = ({navigation}) => {
  const [selected, setSelected] = React.useState('');
  const [data, setData] = React.useState([]);
  const [filterData, setFilterData] = React.useState([]);

  const [offerLink, setOfferLink] = useState('');

  const [userLink, setUserLink] = useState('');
  const [userLinkError, setUserLinkError] = useState(false);
  const [userBrandError, setUserBrandError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pasteValue, setPasteValue] = useState('');
  const [errortext, setErrortext] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('Marka Seçiniz');
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        console.log('App has come to the foreground!');
        console.log('get clipboard');
        //Clipboard.getString().then(value => setCopied(value));
      }

      appState.current = nextAppState;
      setAppStateVisible(appState.current);
      console.log('AppState', appState.current);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  /*{
    "channelType": 1,
    "userStatusType": 3,
    "userStatusDeletionType": 1,
    "wallet": {
      "id": null,
      "phone": "+905337745616"
    },
    "processDatetime": "2024-08-23T12:44:55.072Z"
  }*/
  const copyToClipboard = () => {
    //Clipboard.setString('hello world');
  };
  const handleSubmitPress = () => {
    setErrortext('');
    if (!userLink || selected === '0') {
      if (selected === '0') {
        //alert('Please fill Email');
        setUserBrandError(true);
      }
      console.log(userBrandError);
      if (!userLink) {
        //alert('Please fill Password');
        setUserLinkError(true);
      }
      return;
    }
    setLoading(true);
    AsyncStorage.getItem('affiliateId').then(value => getLink(value));
  };
  const checkFilterData = () => {
    console.log('checkFilterData');
    console.log(userLink);
    let f_arr = [];
    let t_arr = [];
    for (var i = 0; i < data.length; i++) {
      console.log(data[i].url);
      t_arr.push({
        key: data[i].key,
        value: data[i].value,
      });
      if (data[i].url.indexOf(userLink) > -1) {
        f_arr.push({
          key: data[i].key,
          value: data[i].value,
        });
      }
    }
    console.log('filter data');
    console.log(t_arr.length);
    console.log(f_arr.length);
    let res = f_arr.length > 0 ? f_arr : t_arr;

    setFilterData(res);

    console.log('selected');
    console.log(selected);
    if (selected !== '0' && f_arr.length > 0) {
      let found = false;
      for (var i = 0; i < f_arr.length; i++) {
        if (f_arr[i].key === selected) {
          found = true;
        }
      }
      console.log('found');
      console.log(found);
      if (!found) {
        setSelected(f_arr[0].key);
        setSelectedBrand(f_arr[0].value);
      }
    }
    console.log('selected after');
    console.log(selected);

    //setSelected('3932');
  };
  const getLink = async token => {
    const response = await fetch(
      'https://sh.gelirortaklari.com/shortlink?aff_id=' +
        token +
        '&offer_id=' +
        selected +
        '&adgroup=' +
        token +
        '&url=' +
        userLink,
    );
    const json = await response.json();
    setLoading(false);
    //console.error(error);
    console.log(json);
    if (json.success) {
      console.log('success');
      console.log(json.shortlink);
      setOfferLink(json.shortlink);
      //setModalVisible(true);
      navigation.navigate('Share', {
        shortLink: json.shortlink,
      });
    } else {
      setErrortext(json.message);
      console.log(json.message);
    }
  };
  const getOffers = async token => {
    setUserLink('');
    try {
      const response = await fetch(
        'https://gelirortaklari.api.hasoffers.com/Apiv3/json?api_key=' +
          token +
          '&Target=Affiliate_Offer&Method=findAll&contain%5B%5D=OfferTag',
      );
      const json = await response.json();
      console.log(json);
      //console.log(json.response);
      //console.log(json.response.data);
      //console.log(json.response.data.length);
      const res_array = [];
      const full_array = [];
      for (let i in json.response.data) {
        //console.log(json.response.data[i].OfferTag['382'] === undefined);
        if (json.response.data[i].OfferTag['382'] !== undefined) {
          full_array.push({
            key: json.response.data[i].Offer.id,
            value: json.response.data[i].Offer.name,
            url: json.response.data[i].Offer.preview_url,
          });
          res_array.push({
            key: json.response.data[i].Offer.id,
            value: json.response.data[i].Offer.name,
          });
        }
      }
      console.log('full');
      console.log(full_array);
      console.log('res');
      console.log(res_array);
      setData(full_array);
      setFilterData(res_array);
      setSelected('0');
      setSelectedBrand('Marka Seçiniz');
      setUserLink('');
      /*for (var i = 0; i < json.response.data.length; i++) {
        console.log(json.response.data[i].OfferTag);
      }*/
      //return json.movies;
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    console.log('userLink changed');
    console.log(userLink);
    checkFilterData();
  }, []);

  const setCopied = value => {
    console.log('clipboard copy');
    console.log(value);
    if (value === '') {
      console.log('no val');
    } else {
      console.log('paste val');
      console.log(value);
      setPasteValue(value);
    }
  };
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // do something
      console.log('Hello World!');

      AsyncStorage.getItem('auth_token').then(value =>
        //navigation.replace(value === null ? 'Auth' : 'TabNavigationRoutes'),
        getOffers(value),
      );
    });
    return unsubscribe;
  }, [navigation]);

  const pasteUserLink = async () => {
    console.log('paste click');
    /*const text = await Clipboard.getString();

    console.log(text);
    setUserLink(text);*/
  };
  const findVal = () => {
    console.log('findVal');
    console.log(selected);
    for (var i = 0; i < filterData.length; i++) {
      console.log(filterData[i]);
      if (filterData[i].key === selected) {
        setSelectedBrand(filterData[i].value);
        return;
      }
    }
    console.log(selectedBrand);
  };
  const renderItem = item => {
    return (
      <View
        style={{
          padding: 20,
          height: 54,
          color: '#1D1D25',
        }}>
        <Text
          style={{
            fontSize: 12,
            color: '#1D1D25',
          }}>
          {item.value}
        </Text>
      </View>
    );
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      {/* <View style={styles.topStyle}>
        <View style={{alignItems: 'center'}}>
          <Text style={styles.headerTextStyle}>Özel link oluştur</Text>
        </View>
        <View style={styles.notificationIcon}>
          <View style={styles.notificationImg}>
            <Image
              source={require('../../assets/img/bildirim.png')}
              style={{
                width: 18,
                height: 21,
              }}
            />
          </View>
          <View style={styles.notificationNumber}>
            <Text style={styles.notificationText}>1</Text>
          </View>
        </View>
      </View> */}
      <TabHeader routetarget="" name="Özel link oluştur" count="0" />
      <Loader loading={loading} />
      <ScrollView keyboardShouldPersistTaps="handled" style={styles.scrollView}>
        <View style={[styles.sectionStyle, {paddingTop: 47}]}>
          <Text style={[styles.inputTitleStyle, styles.borderedInputTitle]}>
            Marka Seçiniz
          </Text>
          {/* <Text
            style={{
              borderColor: userBrandError ? '#ff0000' : '#EBEBEB',
              borderWidth: 1,
              padding: 20,
              fontSize: 12,
              borderRadius: 10,
              height: 54,
              color: '#1D1D25',
              marginBottom: 18,
            }}>
            {selectedBrand}
          </Text> */}
          {/* <Image
            source={require('../../assets/img/select_brand.png')}
            style={{
              width: 19,
              height: 18,
              position: 'absolute',
              top: 105,
              right: 0,
            }}
          /> */}
          <Dropdown
            style={{
              borderColor: userBrandError ? '#ff0000' : '#EBEBEB',
              borderWidth: 1,
              padding: 20,
              fontSize: 12,
              borderRadius: 10,
              height: 54,
              color: '#1D1D25',
              marginBottom: 18,
            }}
            placeholderStyle={{
              fontSize: 12,
              color: '#1D1D25',
            }}
            selectedTextStyle={{
              fontSize: 12,
              color: '#1D1D25',
            }}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={filterData}
            maxHeight={300}
            labelField="value"
            valueField="key"
            placeholder={'Marka seçiniz'}
            searchPlaceholder="Search..."
            value={selected}
            onChange={item => {
              console.log('item.value');
              console.log(item.key);
              setSelected(item.key);
              /*setValue(item.value);
              setIsFocus(false);*/
            }}
            renderItem={renderItem}
          />
          {/* <SelectList
            setSelected={val => setSelected(val)}
            data={filterData}
            onSelect={val => findVal()}
            fontFamily="Helvetica-Bold"
            search={false}
            arrowicon={
              <Image
                source={require('../../assets/img/dd.png')}
                style={{
                  width: 20,
                  height: 10,
                  top: 10,
                }}
              />
            }
            boxStyles={{
              borderColor: '#fff',
              position: 'absolute',
              top: -77,
              width: '100%',
              height: 80,
              backgroundColor: 'transparent',
              color: '#1d1d25',
            }}
            dropdownStyles={{
              position: 'absolute',
              top: -67,
              left: 0,
              backgroundColor: '#fff',
              width: '100%',
              zIndex: 10,
              borderRadius: 0,
              borderColor: '#EBEBEB',
            }}
            defaultOption={{key: '0', value: 'Marka seçiniz'}}
          /> */}
          <Text style={[styles.inputTitleStyle, styles.borderedInputTitle]}>
            Deeplink URL
          </Text>
          <TouchableOpacity
            onPress={pasteUserLink}
            style={{
              backgroundColor: pasteValue === '' ? '#ebebeb' : '#A2FF9D',
              borderRadius: 20,
              paddingLeft: 14,
              paddingRight: 14,
              paddingTop: 8,
              paddingBottom: 8,
              zIndex: 20,
              width: 80,
              height: 30,
              position: 'absolute',
              right: 14,
              top: 196,
            }}>
            <Text style={{fontSize: 10, color: '#1D1D25', textAlign: 'center'}}>
              Yapıştır
            </Text>
          </TouchableOpacity>
          <TextInput
            style={{
              borderColor: '#EBEBEB',
              borderWidth: 1,
              padding: 20,
              fontSize: 12,
              borderRadius: 10,
              height: 54,
              color: '#1D1D25',
              marginBottom: 40,
            }}
            onFocus={() => {
              console.log(userLink);
              setUserLinkError(false);
            }}
            onChange={({nativeEvent: {eventCount, target, text}}) => {
              console.log(text);
              setUserLink(text);
              //checkFilterData();
            }}
            placeholder="URL" //12345
            placeholderTextColor="#7E797F"
            keyboardType="default"
            blurOnSubmit={false}
            underlineColorAndroid="#f000"
            returnKeyType="next"
            value={userLink}
          />
          {errortext !== '' ? (
            <Text style={styles.errorTextStyle}> {errortext} </Text>
          ) : null}

          <TouchableOpacity
            style={[
              styles.buttonStyle,
              {
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              },
            ]}
            activeOpacity={0.5}
            onPress={handleSubmitPress}>
            {/* <Linkwhite width={23} height={20} style={{marginRight: 25}} /> */}
            <Image
              source={require('../../assets/img/link_btn.png')}
              style={{
                width: 23,
                height: 20,
                resizeMode: 'contain',
                marginRight: 25,
              }}
            />
            <Text style={styles.buttonTextStyle}>LİNK OLUŞTUR</Text>
          </TouchableOpacity>
          {/* <Text
                style={styles.registerTextStyle}
                onPress={() => navigation.navigate('RegisterScreen')}>
                New Here ? Register
              </Text> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const LinkScreen = () => {
  return (
    <Stack.Navigator initialRouteName="Link">
      <Stack.Screen
        name="Link"
        component={Link}
        options={{headerShown: false}}
      />
      {/* Navigation Drawer as a landing page */}
      
    </Stack.Navigator>
  );
};
export default LinkScreen;
