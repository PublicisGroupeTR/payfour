/* eslint-disable react-native/no-inline-styles */
// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React, {useState, useEffect, useRef} from 'react';
import {View, Text, SafeAreaView, Image, Linking, FlatList, TouchableOpacity, Dimensions} from 'react-native';
import Loader from '../Components/Loader.js';
import SubtabHeader from '../Components/SubtabHeader.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'react-native-axios';
import { apiGet, apiPut } from '../utils/api.js';
//const { showError } = useError();

const NotificationScreen = ({navigation, route}) => {
  const [loading, setLoading] = useState(false);
  const [notificationData, setNotificationData] = useState(false);

  const scrollRef = useRef();
  useEffect(() => {   
    const unsubscribe = navigation.addListener('focus', () => {
      // do something
      AsyncStorage.getItem('token').then(value =>{
        const config = {
          headers: { Authorization: `Bearer ${value}` }
        };
        apiGet('notifications?page=1&pageSize=12', onGetNotifications);
        
      });
    });
    return unsubscribe;
  }, [route]);
  const onGetNotifications = (response) =>{
          console.log(response.data);

          let setRead=[];
          let list = response.data.data.items;
          for(var i=0; i < list.length;i++){
            list[i].time = calculateTimeDiff(list[i].date);
            console.log(list[i].time);
            if(!list[i].isRead)setRead.push(list[i].id);
          }
          setNotificationData(response.data.data.items);
          setLoading(false);
          scrollRef.current?.scrollToOffset({ animated: true, offset: 0 });
          if(setRead.length > 0){
            console.log("setRead");
            console.log(setRead);
      apiPut('notifications/read', setRead, onSetRead);
      
    }
  }
  const onSetRead = (response) =>{
              console.log(response.data);
  }
  const calculateTimeDiff = (date) =>{
    let timestampEntry = new Date().getTime();
    let timestampExit = new Date(date).getTime();

    let delta = Math.ceil((timestampEntry - timestampExit)/1000);

    if(Math.ceil(delta/60/60/24) > 0){
      return Math.ceil(delta/60/60/24)+"d";
    }else if(Math.ceil(delta/60/60) > 0){
      return Math.ceil(delta/60/60)+"h";
    }else{
      return Math.ceil(delta/60)+"m";
    }
    console.log("delta");
    console.log(delta);
  }
  const Item = ({id, isRead, title, time}) => (
    
    <View key={id} style={{
      paddingTop:24,
      paddingBottom:24,
      paddingLeft:24,
      paddingRight:24,
      borderBottomWidth:1,
      borderBottomColor:'#EFF1F5',
      backgroundColor:isRead?  '#fff' : '#DFF0FF',
    }}> 
    <TouchableOpacity 
    style={{
      flexDirection:'row', 
      alignItems:'center',
      paddingLeft:8,
      paddingRight:8,
      
    }}
    onPress={() => {      
        console.log("notification click");
        console.log(id);
        }}
        >
          <View style={{
            position:'absolute',
            left:-8,
            width:8,
            height:8,
            borderRadius:8,
            backgroundColor:isRead?  '#fff' : '#F85064',
            display:isRead? 'none': 'flex',
            marginRight:8,
          }}>
          </View>
        <Image 
        source={require('../../assets/img/export/notification_logo.png')}
        style={{
          width:40,
          height:40,
          marginRight:12
          
        }}
      />
      <View style={{width:Dimensions.get('window').width - 116}}>
        <Text style={{
          fontSize:12,
          lineHeight:18,
          color:'#0B1929',
          marginBottom:8,
        }}>
          {title}
        </Text>
        <Text style={{
          fontSize:12,
          lineHeight:18,
          color:'#909EAA',
        }}>
          {time}
        </Text>
        </View>
        {/* <View style={{
          flexDirection:'row',
          alignItems:'center',
          justifyContent:'flex-start',
        }}>
        <Image 
        source={require('../../assets/img/export/time-oclock.png')}
        style={{
          resizeMode:'contain',
          width:10,
          height:10,
          marginRight:4,
          tintColor: '#28303F',
        }}>
        </Image>
          <Text style={{
            fontSize:10,
            color:'#909EAA',
          }}>
          Son gün {time}
          </Text>
        </View> */}
    </TouchableOpacity>
    </View>
    );
  const renderNotifications = () => {
      if (notificationData.length > 0) {
        return (        
          <FlatList
              data={notificationData}
              ref={scrollRef}
              renderItem={({item}) => (
                //time, title, refno, img
                <Item id={item.id} isRead={item.isRead} time={item.time} title={item.description} img = {item.thumbnailUrl} refno={item.campaignCode}  refid={item.id} expired={item.expired}/>
              )}
              keyExtractor={item => item.id+Math.random()}
              style={{paddingLeft: 30,
                paddingRight: 30, marginLeft:-30, marginRight:-30, }}
              // onEndReached={setPage}
              initialNumToRender={20}            
            />
        );
      } else {
        return (
          <View
            style={{
              padding: 18,
              height: 54,
              color: '#1D1D25',
            }}>
            <Text
              style={{
                fontSize: 16,
                color: '#0B1929',
                fontWeight: '700',
                paddingLeft: 20,
              }}>
              Bildirim bulunamadı.
            </Text>
          </View>
        );
      }
    };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <Loader loading={loading} />
      
      <SubtabHeader routetarget="Discover" name="Bildirimler" count="0" />
      {renderNotifications()}
      <View style={{paddingBottom:80}}>
      </View>
    </SafeAreaView>
  );
};

export default NotificationScreen;
