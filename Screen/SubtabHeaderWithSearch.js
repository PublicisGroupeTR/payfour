/* eslint-disable no-unused-vars */
// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React, {useState, useRef, useEffect} from 'react';
import {StyleSheet, View, TouchableOpacity, Image, Text, Keyboard} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Bildirim from '../../assets/img/svg/bildirim.svg';
import { TextInput } from 'react-native-gesture-handler';

const SubtabHeaderWithSearch = props => {
  const {routetarget, name, count, mode, inputCallback, searchCallback, openCallback, closeCallback, eraseCallback,  ...attributes} = props;

  const navigation = useNavigation();
  const [showInput, setShowInput] = useState(false); 
  const [userSearch, setUserSearch] = useState('');
  const searchInput = useRef();
  /*console.log(navigation);
  console.log(routetarget);*/
  useEffect(()=> searchInput.current.clear(),[]);
  return (
    <View style={[styles.topStyle, {backgroundColor: props.mode === 'dark' ? 'transparent' : '#fff', flexDirection:'row',justifyContent:'space-between',
      shadowColor:'#000000',
          shadowOffset:{
            width:0,
            height:20,
          },
          shadowOpacity:0.5,
          shadowRadius:5,
          elevation:10,
     }]}>
      <View style={{display: showInput? 'none' : 'flex', flexDirection:'row', flexGrow:1}}>
        <TouchableOpacity
          style={[
            styles.buttonClose,
            {display: routetarget === '' ? 'none' : 'flex'},
          ]}
          onPress={() => navigation.navigate(routetarget)}>        
            <Image
              source={require('../../assets/img/export/arrow_back.png')}
              style={{
                width: 32,
                height: 32,
                tintColor: props.mode === 'dark' ? '#fff' : 'none',
              }}
            />
        </TouchableOpacity>
        <View style={{
          alignItems: 'center',
          justifyContent:'center',
          }}>
          <Text style={{
            color: props.mode === 'dark'? '#fff' : '#0B1929',
            fontSize:16,
          }}>
            {name}
          </Text>
        </View>

      </View>
      <TouchableOpacity
        style={[
          styles.buttonSearch,
          {display: showInput? 'none' : 'flex',}
        ]}
        onPress={() => {
          console.log("search");
          setShowInput(!showInput);
          openCallback();
        }}>        
          <Image
            source={require('../../assets/img/export/search_icon.png')}
            style={{
              width: 24,
              height: 24,
            }}
          />
      </TouchableOpacity>
      <View style={{display: showInput? 'flex' : 'none', flexDirection:'row', flexGrow:1}}>
        <TouchableOpacity
          style={[
            styles.buttonClose,
            {width:20,
              height:20,
              position:'absolute',
              right:10,
              top:14,zIndex:5
            }
          ]}
          onPress={() => {
            setUserSearch('');
            eraseCallback('');            
            searchInput.current.clear();
            setShowInput(false);
            searchCallback('');
            //closeCallback();
          }}>        
            <Image
              source={require('../../assets/img/export/remove.png')}
              style={{
                width: 32,
                height: 32,
                tintColor: props.mode === 'dark' ? '#fff' : 'none',
              }}
            />
        </TouchableOpacity>
        <View style={{
          borderWidth:1,
          borderColor:'#E4E4E8',
          borderRadius:6,          
          paddingTop:8,
          paddingBottom:8,
          paddingLeft:12,
          paddingRight:12,
          flexGrow:1}}>
        <TextInput style={{          
          fontSize:14,
          lineHeight:14,
          height:28,
          padding:0,
        }}
        onChangeText={UserSearch => {
          setUserSearch(UserSearch);
          console.log("send to suggestion");
          console.log(UserSearch);
          inputCallback(UserSearch);
        }}
        ref={searchInput}
        placeholder="Kampanya, marka, kategori..." //12345
        placeholderTextColor="#909EAA"
        onSubmitEditing={Keyboard.dismiss}
        blurOnSubmit={false}
        underlineColorAndroid="#f000"
        returnKeyType="next">

        </TextInput>
        </View>
      </View>
      {/*  */}
      
    </View>
  );
};

export default SubtabHeaderWithSearch;

const styles = StyleSheet.create({
  topStyle: {
    paddingTop:13,
    paddingBottom:13,
    paddingLeft:16,
    paddingRight:16,
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'center',    
    borderColor: '#EBEBEB',
    position: 'relative',
    backgroundColor:'#fff'
  },
  buttonClose: {
    
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonSearch: {    
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width:32,
    height:32,

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
