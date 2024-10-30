// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React
import React from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet, Linking} from 'react-native';

// Import Navigators from React Navigation
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

// Import Screens
import WalletScreen from './TabScreens/WalletScreen';
//import OfferScreen from './TabScreens/OfferScreen';
import CampaignScreen from './TabScreens/CampaignScreen';
import DiscoverScreen from './TabScreens/DiscoverScreen';
//import NotificationsScreen from './TabScreens/NotificationsScreen';
//import ContactScreen from './TabScreens/ContactScreen';
//import ProfileScreen from './TabScreens/ProfileScreen';

import Cuzdan from '../assets/img/svg/cuzdan.svg';
import Cuzdanactive from '../assets/img/svg/cuzdanactive.svg';
import Teklif from '../assets/img/svg/teklif.svg';
import Teklifactive from '../assets/img/svg/teklifactive.svg';
import Link from '../assets/img/svg/link.svg';
import Linkactive from '../assets/img/svg/linkactive.svg';
import Bildirim from '../assets/img/svg/bildirim.svg';
import Bildirimactive from '../assets/img/svg/bildirimactive.svg';
import Profil from '../assets/img/svg/profil.svg';
import Profilactive from '../assets/img/svg/profilactive.svg';

function CustomTabBar({state, descriptors, navigation}) {
  return (
    <View
      // eslint-disable-next-line react-native/no-inline-styles
      style={{
        flexDirection: 'row',
        // backgroundColor: '#f1f1f1',
        borderTopWidth: 1,
        borderTopColor: '#e8e8e8',
      }}>

      {state.routes.map((route, index) => {
        console.log(route);
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;
        const isFocused = state.index === index;
        let imgpath = '';
        let btnTitle = '';
        switch (label) {
          case 'wallet':
            btnTitle = 'Cüzdan';
            imgpath = isFocused ? (
              <Cuzdanactive style={styles.iconStyle} />
            ) : (
              // <Image
              //   source={require('../assets/img/tab_icons/wallet_active.png')}
              //   style={styles.iconStyle}
              // />
              <Cuzdan style={styles.iconStyle} />

              // <Image
              //   source={require('../assets/img/tab_icons/wallet.png')}
              //   style={styles.iconStyle}
              // />
            );
            break;
          case 'offer':
            btnTitle = 'Teklif';
            imgpath = isFocused ? (
              <Teklifactive style={styles.iconStyle} />
            ) : (
              // <Image
              //   source={require('../assets/img/tab_icons/offer_active.png')}
              //   style={styles.iconStyle}
              // />
              <Teklif style={styles.iconStyle} />

              // <Image
              //   source={require('../assets/img/tab_icons/offer.png')}
              //   style={styles.iconStyle}
              // />
            );
            break;
          case 'discover':
            btnTitle = 'Keşfet';
            imgpath = isFocused ? (
              // <Linkactive style={styles.iconStyle} />
               <Image
                 source={require('../assets/img/tab_icons/link_active.png')}
                 style={styles.iconStyle}
               />
            ) : (
              
              // <Link style={styles.iconStyle} />

               <Image
                 source={require('../assets/img/tab_icons/link.png')}
                 style={styles.iconStyle}
               />
            );
            break;
          case 'contact':
            btnTitle = 'İletişim';
            imgpath = isFocused ? (
              // <Bildirimactive style={styles.iconStyle} />
              <Image
                  source={require('../assets/img/contact_w.png')}
                  style={styles.iconStyle}
                />
                
            ) : (
              // <Image
              //   source={require('../assets/img/tab_icons/notification_active.png')}
              //   style={styles.iconStyle}
              // />
              // <Bildirim style={styles.iconStyle} />
              <Image
                  source={require('../assets/img/contact.png')}
                  style={styles.iconStyle}
                />
              // <Image
              //   source={require('../assets/img/tab_icons/notification.png')}
              //   style={styles.iconStyle}
              // />
            );
            break;
          case 'profile':
            btnTitle = 'Profil';
            imgpath = isFocused ? (
              <Profilactive style={styles.iconStyle} />
            ) : (
              // <Image
              //   source={require('../assets/img/tab_icons/profile_active.png')}
              //   style={styles.iconStyle}
              // />
              <Profil style={styles.iconStyle} />

              // <Image
              //   source={require('../assets/img/tab_icons/profile.png')}
              //   style={styles.iconStyle}
              // />
            );
            break;
        }

        console.log(imgpath);
        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({name: route.name, merge: true});
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            key={label}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tabBtnStyle}>
            <View
              style={[styles.tabBorderStyle, {height: isFocused ? 3 : 0}]}
            />
            <View style={{alignItems: 'center'}}>{imgpath}</View>
            <Text
              style={[
                styles.tabTextStyle,
                {fontFamily: isFocused ? 'Helvetica-Bold' : 'Helvetica'},
              ]}>
              {btnTitle}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
const Tab = createBottomTabNavigator();

const CustomTabBarButton =({children, onPress}) =>{
  return(
    <TouchableOpacity 
    style={{
      top:-30,
      justifyContent:'center',
      alignItems:'center',
      ...styles.shadow
    }}
    onPress={onPress}>
      <View>
        {children}
      </View>
    </TouchableOpacity>
)};
const TabNavigatorRoutes = props => {
  return (
    <Tab.Navigator
      initialRouteName="discover"
      
      screenOptions={{
        tabBarShowLabel:false,
        showIcon: true,
        tabBarStyle:{
        backgroundColor:'#fff',
        borderTopLeftRadius:30,
        borderTopRightRadius:30,
        height:80,
        elevation:0,
        position:'absolute',
        ...styles.shadow
      }
      }}
      //tabBar={props => <CustomTabBar {...props} 
      ///>}
      >
      
      <Tab.Screen
        name="discover"
        component={DiscoverScreen}
        options={{
          headerShown: false,
          tabBarIcon:({focused}) =>{
            return (
            <View style={{
              alignItems:'center',
              justifyContent:'center',
            }}>
              <Image 
              source={require('../assets/img/export/tab_home_active.png')}
              style={{
                width: 24,
                height: 24,
                resizeMode: 'contain',
              }}
              />
              <Text
                style={{
                  color: focused ? '#004F97' : '#909EAA',
                  fontSize:10
                  }}>
                Keşfet
              </Text>
            </View>
            )
          }
        }}
      />
      <Tab.Screen
        name="campaign"
        component={CampaignScreen}
        listeners={({ navigation, route }) => ({
          tabPress: (e) => {
            // Prevent default action
            e.preventDefault();
              // Do something with the `navigation` object
            //navigation.navigate('discover');
            navigation.navigate('campaign', { 
              screen: 'CampaignList'
            })
          },
        })}
        options={{
          headerShown: false,
          tabBarIcon:({focused}) =>{
            return (
            <View style={{
              alignItems:'center',
              justifyContent:'center',
            }}>
              <Image 
              source={require('../assets/img/export/tab_campaign.png')}
              style={{
                width: 24,
                height: 24,
                resizeMode: 'contain',
                tintColor: focused ? '#004F97' : '#909EAA',
              }}
              />
              <Text
                style={{
                  color: focused ? '#004F97' : '#909EAA',
                  fontSize:10
                  }}>
                Kampanyalar
              </Text>
            </View>
            )
          }
        }}
      />
      <Tab.Screen
        name="payment"
        component={DiscoverScreen}
        // listeners={({ navigation, route }) => ({
        //   tabPress: (e) => {
        //     // Prevent default action
        //     e.preventDefault();
        //       // Do something with the `navigation` object
        //     //navigation.navigate('discover');
        //     navigation.navigate('discover', { 
        //       screen: 'payment',
        //       params: {checkpayment:true}
        //     })
        //   },
        // })}
        options={{
          initialParams:{
              payment: true
          },
          headerShown: false,
          tabBarIcon:({focused}) =>{
            return (
            <View style={{top:-20,
              alignItems:'center',
              justifyContent:'center',
            }}>
              <Image 
              source={require('../assets/img/export/tab_pay.png')}
              style={{
                width: 66,
                height: 66,
                resizeMode: 'contain',
              }}
              />
              <Text
                style={{
                  color: focused ? '#004F97' : '#909EAA',
                  fontSize:10
                  }}>
                Ödeme Yap
              </Text>
            </View>
            )
          }
        }}
      />
      <Tab.Screen
        name="wallet"
        component={WalletScreen}
        listeners={({ navigation, route }) => ({
          tabPress: (e) => {
            // Prevent default action
            e.preventDefault();
              // Do something with the `navigation` object
            //navigation.navigate('discover');
            navigation.navigate('wallet', { 
              screen: 'Balance'
            })
          },
        })}
        options={{
          headerShown: false,
          tabBarIcon:({focused}) =>{
            return (
            <View style={{
              alignItems:'center',
              justifyContent:'center',
            }}>
              <Image 
              source={require('../assets/img/export/tab_wallet.png')}
              style={{
                width: 24,
                height: 24,
                resizeMode: 'contain',
                tintColor: focused ? '#004F97' : '#909EAA',
              }}
              />
              <Text
                style={{
                  color: focused ? '#004F97' : '#909EAA',
                  fontSize:10
                  }}>
                Cüzdanım
              </Text>
            </View>
            )
          }
        }}
      />
      <Tab.Screen
        name="market"
        component={DiscoverScreen}
        listeners={{
          tabPress: e => {
            // Prevent default action
            e.preventDefault();
            Linking.openURL('https://www.carrefoursa.com/')
          },
        }}
        options={{
          headerShown: false,
          tabBarIcon:({focused}) =>{
            return (
            <View style={{
              alignItems:'center',
              justifyContent:'center',
            }}>
              <Image 
              source={require('../assets/img/export/tab_market.png')}
              style={{
                width: 35,
                height: 23,
                resizeMode: 'contain',
              }}
              />
              <Text
                style={{
                  color: focused ? '#004F97' : '#909EAA',
                  fontSize:10
                  }}>
                Market
              </Text>
            </View>
            )
          }
        }}
      />
      
    </Tab.Navigator>
  );
};
const styles = StyleSheet.create({
  shadow:{
    shadowColor:'#000000',
    shadowOffset:{
      width:0,
      height:20,
    },
    shadowOpacity:0.5,
    shadowRadius:5,
    elevation:10,
  },
  iconStyle: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
    marginBottom: 12,
  },
  tabBtnStyle: {
    width: '20%',
    height: 100,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabBorderStyle: {
    position: 'absolute',
    top: 0,
    width: 35,
    backgroundColor: '#1D1D25',
  },
  tabTextStyle: {
    fontSize: 12,
    color: '#1D1D25',
  },
});
export default TabNavigatorRoutes;
