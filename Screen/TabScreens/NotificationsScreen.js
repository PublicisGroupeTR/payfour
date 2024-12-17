/* eslint-disable react-native/no-inline-styles */
// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React from 'react';
import {View, Text, SafeAreaView, Image, Linking} from 'react-native';
import {styles} from '../Components/Styles.js';
import TabHeader from '../Components/TabHeader';
import {TouchableOpacity} from 'react-native-gesture-handler';

const NotificationsScreen = () => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <TabHeader routetarget="" name="Bildirim" count="0" />
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
          source={require('../../assets/img/bildirim.png')}
          style={{
            width: 28,
            height: 33,
            marginBottom: 40,
          }}
        />
        <Text style={styles.modalTitle}>Çok Yakında</Text>
        <Text style={styles.modalDesc}>
          “Bildirim” detaylarınıza çok yakında bu sayfadan ulaşabilirsiniz.
        </Text>
      </View> */}

      <View
        style={{
          paddingTop: 40,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
        <Image
          source={require('../../assets/img/notifications_logo.png')}
          style={{
            width: 88,
            height: 88,
            marginBottom: 25,
          }}
        />
        <View style={{marginBottom: 60}}>
          <Text syle={{fontSize: 16, fontWeight: '500', textAlign: 'center'}}>
            Payfour bildirimleri için:
          </Text>
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              marginRight: 50,
            }}>
            <Image
              source={require('../../assets/img/notifications_telegram.png')}
              style={{
                width: 70,
                height: 70,
                marginBottom: 25,
              }}
            />
            <TouchableOpacity
              onPress={() => Linking.openURL('https://t.me/publicisaffiliate')}
              style={{
                paddingLeft: 20,
                paddingRight: 20,
                paddingTop: 13,
                paddingBottom: 13,
                borderRadius: 25,
                backgroundColor: '#4d9cd4',
              }}>
              <Text style={{color: '#fff'}}>Takip Et</Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}>
            <Image
              source={require('../../assets/img/notifications_whatsapp.png')}
              style={{
                width: 70,
                height: 70,
                marginBottom: 25,
              }}
            />
            <TouchableOpacity
              onPress={() =>
                Linking.openURL(
                  'https://whatsapp.com/channel/0029VaDXY6J7tkj8X1sebM3z',
                )
              }
              style={{
                paddingLeft: 20,
                paddingRight: 20,
                paddingTop: 13,
                paddingBottom: 13,
                borderRadius: 25,
                backgroundColor: '#408a7e',
              }}>
              <Text style={{color: '#fff'}}>Takip Et</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default NotificationsScreen;
