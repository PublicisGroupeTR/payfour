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
  FlatList,
  Linking,
  Modal,
  Dimensions,  
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createStackNavigator} from '@react-navigation/stack';
import {styles} from '../Components/Styles.js';
import Loader from '../Components/Loader';
import TabHeader from '../Components/TabHeader';
import Clipboard from '@react-native-clipboard/clipboard';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import Linkwhite from '../../assets/img/svg/linkwhite.svg';
import Bilgi from '../../assets/img/svg/bilgi.svg';

const Stack = createStackNavigator();

const Offers = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [offerData, setOfferData] = useState([]);

  const getOffers = async token => {
    /*const response = await fetch(
      'https://gelirortaklari.api.hasoffers.com/Apiv3/json?api_key=' +
        token +
        '&Target=Affiliate_Offer&Method=findAll&contain%5B%5D=OfferTag',
    );*/
    setLoading(true);
    const bearer =
      '8dd6c9c528c465e252b791d0924dcc8c6ad0c6058c784027d6cba106941026cffe8bd3640495a8c498dbf4d2baf250c751b0eea096bb58f27f91f7d9b6ad522c3761f8a072d95382a05485737039c6aaa15a623f53580be8b2e537de34c47daea17dc99da0bcb73231eeae92405941ea0a2f8a4713b08870d88674b0f29b127c';
    console.log('bearer');
    console.log(bearer);
    const response = await fetch(
      'https://admin.gelirortaklari.com/api/offer-configs?populate=image&sort[0]=index&sort[1]=offer_name&pagination[pageSize]=100&pagination[page]=1',
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-type': 'application/json',
          Authorization: `Bearer ${bearer}`, // notice the Bearer before your token
        },
      },
    );
    const json = await response.json();
    console.log('res');
    console.log(json);
    console.log(json.data[0].attributes);
    console.log(json.data[0].attributes.offer_name);
    console.log(json.data[0].attributes.image.data[0].attributes.url);
    let tmArr = [];
    for (var i = 0; i < json.data.length; i++) {
      let tmObj = {};
      tmObj.id = json.data[i].attributes.offer_id;
      tmObj.name = json.data[i].attributes.offer_name;
      tmObj.img = json.data[i].attributes.image.data[0].attributes.url;
      tmArr.push(tmObj);
    }
    console.log('tmArr');
    console.log(tmArr);
    setOfferData(tmArr);
    console.log('tmArr');
    console.log(offerData);
    setLoading(false);
  };
  const onOfferSelect = function (id) {
    console.log(id);
    navigation.navigate('OfferDetails', {offerId: id});
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

  const Item = ({title, src, id}) => (
    <TouchableOpacity
      key={id}
      style={{marginBottom: 25}}
      onPress={() => onOfferSelect(id)}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          height: 85,
        }}>
        <View
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 1,
            borderColor: '#E8E8E8',
            borderRadius: 10,
            height: 85,
            width: 152,
            marginRight: 15,
            padding: 20,
          }}>
          <Image
            source={{uri: src}}
            style={{
              width: '100%',
              height: '100%',
              resizeMode: 'contain',
            }}
          />
        </View>
        <Text style={[styles.modalTitle, {fontSize: 14, lineHeight: 85}]}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      {/* <View style={styles.topStyle}>
        <View style={{alignItems: 'center'}}>
          <Text style={styles.headerTextStyle}>Teklif</Text>
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
      <TabHeader routetarget="" name="Teklif" count="0" />

      {/* <View
        style={[
          styles.centeredView,
          {
            backgroundColor: '#fff',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            paddingLeft: 30,
            paddingRight: 30,
            flex: 1,
          },
        ]}>
        <Image
          source={require('../../assets/img/teklif.png')}
          style={{
            width: 35,
            height: 33,
            marginBottom: 40,
          }}
        />
        <Text style={styles.modalTitle}>Çok Yakında</Text>
        <Text style={styles.modalDesc}>
          “Teklif” detaylarınıza çok yakında bu sayfadan ulaşabilirsiniz.
        </Text>
      </View> */}
      <Loader loading={loading} />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        style={[styles.scrollView, {backgroundColor: '#fff'}]}>
        <View
          style={[
            styles.centeredView,
            {
              backgroundColor: '#fff',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              paddingLeft: 30,
              paddingRight: 30,
              paddingTop: 50,
              paddingBottom: 50,
              flex: 1,
            },
          ]}>
          <FlatList
            data={offerData}
            renderItem={({item}) => (
              <Item title={item.name} src={item.img} id={item.id} />
            )}
            keyExtractor={item => item.id}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const OfferDetails = ({route, navigation}) => {
  const {offerId} = route.params;
  const [loading, setLoading] = useState(false);
  const [offerData, setOfferData] = useState({
    advertiser_id: '0',
    commission: '0',
    commission_model: ' ',
    default_url: '',
    description: '',
    offer_id: '',
  });

  const [errorVisible, setErrorVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getOfferDetails();
    });
    return unsubscribe;
  }, []);

  const getOfferDetails = async token => {
    /*const response = await fetch(
      'https://gelirortaklari.api.hasoffers.com/Apiv3/json?api_key=' +
        token +
        '&Target=Affiliate_Offer&Method=findAll&contain%5B%5D=OfferTag',
    );*/
    console.log('getOfferDetails');
    setLoading(true);
    const bearer =
      '8dd6c9c528c465e252b791d0924dcc8c6ad0c6058c784027d6cba106941026cffe8bd3640495a8c498dbf4d2baf250c751b0eea096bb58f27f91f7d9b6ad522c3761f8a072d95382a05485737039c6aaa15a623f53580be8b2e537de34c47daea17dc99da0bcb73231eeae92405941ea0a2f8a4713b08870d88674b0f29b127c';
    console.log('bearer');
    console.log(bearer);
    const response = await fetch(
      'https://admin.gelirortaklari.com/api/offer-configs?populate=image&filters[offer_id][$eq]=' +
        offerId,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-type': 'application/json',
          Authorization: `Bearer ${bearer}`, // notice the Bearer before your token
        },
      },
    );
    const json = await response.json();
    console.log('res');
    console.log(json.data[0].attributes);

    let tmObj = {};
    tmObj.offer_id = json.data[0].attributes.offer_id;
    tmObj.advertiser_id = json.data[0].attributes.advertiser_id;
    tmObj.commission = json.data[0].attributes.commission;
    tmObj.commission_model = json.data[0].attributes.commission_model;
    tmObj.default_url = json.data[0].attributes.default_url;
    tmObj.description = json.data[0].attributes.description;
    tmObj.img = json.data[0].attributes.image.data[0].attributes.url;
    setOfferData(tmObj);

    setLoading(false);
  };

  const handleLink = () => {
    setLoading(true);
    AsyncStorage.getItem('affiliateId').then(value => getLink(value));
  };
  const getLink = async token => {
    const response = await fetch(
      'https://sh.gelirortaklari.com/shortlink?aff_id=' +
        token +
        '&offer_id=' +
        offerData.offer_id +
        '&adgroup=' +
        token +
        '&url=' +
        offerData.default_url,
    );
    const json = await response.json();
    setLoading(false);
    //console.error(error);
    console.log(json);
    if (json.success) {
      console.log('success');
      console.log(json.shortlink);
      //setOfferLink(json.shortlink);
      //setModalVisible(true);
      navigation.navigate('ShareLink', {
        shortLink: json.shortlink,
      });
    } else {
      //setErrortext(json.message);
      console.log(json.message);
      setErrorMessage(json.message);
      setErrorVisible(true);
    }
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <Loader loading={loading} />

      {/* <View style={styles.topStyle}>
        <TouchableOpacity
          style={styles.buttonClose}
          onPress={() => navigation.navigate('Link')}>
          <Image
            source={require('../../assets/img/back_btn.png')}
            style={{
              width: 13,
              height: 23,
            }}
          />
        </TouchableOpacity>
        <View style={{alignItems: 'center'}}>
          <Text style={styles.headerTextStyle}>Teklif Detay</Text>
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
      <TabHeader routetarget="Offers" name="Teklif Detay" count="0" />

      <ScrollView keyboardShouldPersistTaps="handled" style={styles.scrollView}>
        <View style={styles.sectionStyle}>
          <View
            style={{
              alignSelf: 'center',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderWidth: 1,
              borderColor: '#E8E8E8',
              borderRadius: 10,
              height: 85,
              width: 152,
              marginBottom: 50,
              padding: 20,
            }}>
            <Image
              source={{uri: offerData.img}}
              style={{
                width: '100%',
                height: '100%',
                resizeMode: 'contain',
              }}
            />
          </View>
          <TouchableOpacity
            style={[
              styles.buttonStyle,
              {
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                marginBottom: 50,
              },
            ]}
            activeOpacity={0.5}
            onPress={handleLink}>
            <Linkwhite width={23} height={20} style={{marginRight: 25}} />

            {/* <Image
              source={require('../../assets/img/link_btn.png')}
              style={{
                width: 23,
                height: 20,
                resizeMode: 'contain',
                marginRight: 25,
              }}
            /> */}
            <Text style={styles.buttonTextStyle}>LİNK OLUŞTUR</Text>
          </TouchableOpacity>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 50,
            }}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '40%',
              }}>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '700',
                  marginBottom: 12,
                  color: '#1D1D25',
                }}>
                Model
              </Text>
              <View
                style={{
                  width: '100%',
                  height: 1,
                  backgroundColor: '#e8e8e8',
                  marginBottom: 12,
                }}></View>
              <Text style={{fontSize: 14, color: '#1D1D25'}}>
                {offerData.commission_model}
              </Text>
            </View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '40%',
              }}>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '700',
                  marginBottom: 12,
                  color: '#1D1D25',
                }}>
                Komisyon
              </Text>
              <View
                style={{
                  width: '100%',
                  height: 1,
                  backgroundColor: '#e8e8e8',
                  marginBottom: 12,
                }}></View>
              <Text style={{fontSize: 14, color: '#1D1D25'}}>
                {offerData.commission}
              </Text>
            </View>
          </View>
          <View>
            <Text
              style={{
                fontSize: 18,
                fontWeight: '700',
                marginBottom: 20,
                color: '#1D1D25',
              }}>
              Teklif Hakkında
            </Text>
            <Text style={{fontSize: 14, color: '#1D1D25'}}>
              {offerData.description}
            </Text>
          </View>
        </View>
      </ScrollView>

      <View
        style={{
          display: errorVisible ? 'flex' : 'none',
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(92, 92, 92, 0.56)',
          paddingLeft: 48,
          paddingRight: 48,
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}>
        <View
          style={{
            backgroundColor: '#ffffff',
            borderRadius: 10,
            paddingTop: 41,
            paddingBottom: 49,
            paddingLeft: 36,
            paddingRight: 36,
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
          <Bilgi width={27} height={27} style={{marginBottom: 24}} />
          {/* <Image
              source={require('../../assets/img/info.png')}
              style={{
                width: 27,
                height: 27,
                marginBottom: 24,
              }}
            /> */}
          <Text
            style={{
              fontSize: 18,
              fontWeight: '700',
              color: '#1D1D25',
              marginBottom: 18,
            }}>
            Uyarı
          </Text>
          <Text
            style={{
              fontSize: 14,
              fontWeight: '400',
              color: '#1D1D25',
              marginBottom: 33,
            }}>
            {errorMessage}
          </Text>
          <TouchableOpacity
            style={[
              styles.buttonStyle,
              {
                width: 250,
                height: 55,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderWidth: 2,
                borderColor: '#1D1D25',
                backgroundColor: '#ffffff',
              },
            ]}
            onPress={() => {
              console.log('onpress');
              setErrorVisible(!errorVisible);
            }}>
            <Text style={{fontSize: 16, fontWeight: '700', color: '#1D1D25'}}>
              KAPAT
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};
const ShareLink = ({route, navigation}) => {
  const {shortLink} = route.params;
  const [modalVisible, setModalVisible] = useState(false);

  const smScreen = Dimensions.get('window').width < 375;
  const copyToClipboard = async () => {
    Clipboard.setString(shortLink);
    console.log('copied');
    console.log(shortLink);
    setModalVisible(true);
    const text = await Clipboard.getString();
    console.log(text);
    setTimeout(() => {
      setModalVisible(false);
    }, 2000);
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          //Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(92, 92, 92, 0.56)',
            paddingLeft: 48,
            paddingRight: 48,
          }}>
          <View
            style={{
              backgroundColor: '#ffffff',
              borderRadius: 10,
              paddingTop: 41,
              paddingBottom: 49,
              paddingLeft: 36,
              paddingRight: 36,
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}>
            <Bilgi width={27} height={27} style={{marginBottom: 24}} />

            {/* <Image
              source={require('../../assets/img/info.png')}
              style={{
                width: 27,
                height: 27,
                marginBottom: 24,
              }}
            /> */}
            <Text
              style={{
                fontSize: 18,
                fontWeight: '700',
                color: '#1D1D25',
                marginBottom: 18,
              }}>
              Bilgi
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontWeight: '400',
                color: '#1D1D25',
                marginBottom: 33,
              }}>
              Link Kopyalandı
            </Text>
          </View>
        </View>
      </Modal>
      {/* <View style={styles.topStyle}>
        <TouchableOpacity
          style={styles.buttonClose}
          onPress={() => navigation.navigate('Link')}>
          <Image
            source={require('../../assets/img/back_btn.png')}
            style={{
              width: 13,
              height: 23,
            }}
          />
        </TouchableOpacity>
        <View style={{alignItems: 'center'}}>
          <Text style={styles.headerTextStyle}>Tebrikler</Text>
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
      <TabHeader routetarget="Offers" name="Tebrikler" count="0" />

      <ScrollView
        keyboardShouldPersistTaps="handled"
        style={[styles.scrollView, {backgroundColor: '#fff'}]}>
        <View style={styles.centeredView}>
          <View
            style={[
              styles.modalView,
              {
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                paddingLeft: 30,
                paddingRight: 30,
                paddingTop: 60,
                paddingBottom:60,
              },
            ]}>
            <Image
              source={require('../../assets/img/share.png')}
              style={{
                width: 39,
                height: 33,
                marginBottom: 37,
              }}
            />
            <Text style={[styles.modalTitle, {textAlign:'center'}]}>Linkiniz oluşturuldu.</Text>
            <Text style={styles.modalDesc}>
              Linkin üzerine tıkladığınızda otomatik olarak kopyalanır.
            </Text>
            <TouchableOpacity
              style={[
                styles.buttonStyle,
                {
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '100%',
                  marginBottom: 72,
                },
              ]}
              activeOpacity={0.5}
              onPress={copyToClipboard}>
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={[
                  styles.buttonTextStyle,
                  {
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingLeft: 20,
                    paddingRight: 20,
                  },
                ]}>
                {shortLink}
              </Text>
            </TouchableOpacity>
            <Text style={styles.modalSubtitle}>Şimdi ne yapmalıyım?</Text>
            <Text style={styles.modalDesc}>
              Satış linkini sosyal medyada yarattığınız postlar ile paylaşın.
            </Text>
            <View
              style={{
                diplay: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '100%',
              }}>
              <TouchableOpacity
                style={styles.appBtn}
                onPress={() => Linking.openURL('https://www.facebook.com/')}>
                <Image
                  source={require('../../assets/img/facebook.png')}
                  style={{
                    width: smScreen? 40 : 60,
                    height: smScreen? 40 : 60,
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.appBtn}
                onPress={() => Linking.openURL('https://www.instagram.com/')}>
                <Image
                  source={require('../../assets/img/instagram.png')}
                  style={{
                    width: smScreen? 40 : 60,
                    height: smScreen? 40 : 60,
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.appBtn}
                onPress={() => Linking.openURL('https://www.youtube.com/')}>
                <Image
                  source={require('../../assets/img/youtube.png')}
                  style={{
                    width: smScreen? 40 : 60,
                    height: smScreen? 40 : 60,
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.appBtn}
                onPress={() => Linking.openURL('https://www.tiktok.com/')}>
                <Image
                  source={require('../../assets/img/tiktok.png')}
                  style={{
                    width: smScreen? 40 : 60,
                    height: smScreen? 40 : 60,
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.appBtn}
                onPress={() => Linking.openURL('https://wa.me/')}>
                <Image
                  source={require('../../assets/img/whatsapp.png')}
                  style={{
                    width: smScreen? 40 : 60,
                    height: smScreen? 40 : 60,
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const OfferScreen = ({navigation}) => {
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      navigation.navigate('Offers');
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <Stack.Navigator initialRouteName="Offers">
      <Stack.Screen
        name="Offers"
        component={Offers}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="OfferDetails"
        component={OfferDetails}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ShareLink"
        component={ShareLink}
        // Hiding header for Navigation Drawer as we will use our custom header
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
export default OfferScreen;
