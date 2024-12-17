/* eslint-disable react-native/no-inline-styles */
// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React, {useState} from 'react';
import {View, Text, SafeAreaView, Image, Linking} from 'react-native';
import {styles} from '../Components/Styles.js';
import TabHeader from '../Components/TabHeader.js';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Loader from '../Components/Loader';
import Email from '../../assets/img/svg/email.svg';

const ContactScreen = () => {
  const [loading, setLoading] = useState(false);

  const sendMail = () => {
    console.log('sendMail');
    Linking.openURL('mailto:go@publicisgroupe.com');
  };
  const sendMsg = () => {
    console.log('sendMsg');
    Linking.openURL('https://wa.me/905425763055');
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <Loader loading={loading} />
      {/* <View style={styles.topStyle}>
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
          <Text style={styles.headerTextStyle}>İletişim</Text>
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
      <TabHeader routetarget="" name="İletişim" count="0" />

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
            paddingTop: 58,
            paddingBottom: 58,
            flex: 1,
          },
        ]}>
        <View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 28,
            }}>
            <Email width={42} height={42} style={{marginRight: 14}} />
            {/* <Image
              source={require('../../assets/img/email.png')}
              style={{
                width: 42,
                height: 42,
                marginRight: 14,
              }}
            /> */}
            <Text style={{fontSize: 24, fontWeight: '700', color: '#1D1D25'}}>
              E-Posta
            </Text>
          </View>
          <View style={{marginBottom: 30}}>
            <Text style={{fontSize: 14, color: '#1D1D25'}}>
              Finansal, teknolojik ve operasyonel kapsamda Tüm sorularınızı bize
              e-posta üzerinden sorabilirsiniz.
            </Text>
          </View>
          <TouchableOpacity
            style={[
              styles.buttonStyle,
              {
                fontSize: 12,
                width: 184,
                height: 39,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              },
            ]}
            activeOpacity={0.5}
            onPress={sendMail}>
            <Text style={{fontSize: 12, fontWeight: '700', color: '#ffffff'}}>
              E-POSTA GÖNDER
            </Text>
          </TouchableOpacity>
        </View>
        {/* <View
          style={{
            width: '100%',
            height: 1,
            backgroundColor: '#1D1D25',
            marginTop: 50,
            marginBottom: 50,
            opacity: 0.1,
          }}></View> */}
        {/* <View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 28,
            }}>
            <Whatsapp width={42} height={42} style={{marginRight: 14}} />

            
            <Text style={{fontSize: 24, fontWeight: '700', color: '#1D1D25'}}>
              WhatsApp
            </Text>
          </View>
          <View style={{marginBottom: 30}}>
            <Text style={{fontSize: 14, color: '#1D1D25'}}>
              İhtiyacınız olan herhangi bir konuda WhatsApp Business kanalımız
              üzerinden de bize ulaşabilirsiniz.
            </Text>
          </View>
          <TouchableOpacity
            style={[
              styles.buttonStyle,
              {
                fontSize: 12,
                width: 184,
                height: 39,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              },
            ]}
            activeOpacity={0.5}
            onPress={sendMsg}>
            <Text style={{fontSize: 12, fontWeight: '700', color: '#ffffff'}}>
              MESAJ GÖNDER
            </Text>
          </TouchableOpacity>
        </View> */}
      </View>
    </SafeAreaView>
  );
};

export default ContactScreen;
