/* eslint-disable react-native/no-inline-styles */
// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Keyboard,
  Linking,
  Modal,
  Dimensions,
  StyleSheet,
} from 'react-native';
import { registerStyles } from '../../Components/RegisterStyles';

import {styles} from '../../Components/Styles.js';
import Loader from '../../Components/Loader.js';
import SubtabHeader from '../../Components/SubtabHeader.js';

import axios from 'react-native-axios';
import MaskInput from 'react-native-mask-input';
import LinearGradient from 'react-native-linear-gradient';
import {Dropdown} from 'react-native-element-dropdown';


const ProfileSupport = ({navigation}) => { 

  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [campaign, setCampaign] = useState(false);
  const [payment, setPayment] = useState(false);
  const [offers, setOffers] = useState(false);

  
  

  return(
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>      
      
    <Loader loading={loading} />
    <SubtabHeader routetarget="ProfileHome" name="Yardım / Bize Ulaşın" count="0" />
    <ScrollView
keyboardShouldPersistTaps="handled"
style={[registerStyles.scrollView, {backgroundColor: '#efeff3'}]}>
<KeyboardAvoidingView enabled>
    <View style={{paddingTop: 16,
      paddingBottom: 16,
      paddingLeft: 16,
      paddingRight: 16,}}>
          <View
              style={{
                backgroundColor:'#fff',
                borderTopLeftRadius: 24,
                borderTopRightRadius: 24,
                borderBottomLeftRadius: 24,
                borderBottomRightRadius: 24,
                paddingTop: 16,
                paddingLeft: 16,
                paddingRight: 16,
                paddingBottom: 16,
                marginBottom:16,
                width: '100%',
              }}>
                  <TouchableOpacity style={{
                    height:52,
                    
                    flexDirection:'row',
                    alignItems:'center',
                    justifyContent:'space-between',
                    borderBottomWidth:1,
                    borderBottomColor:'#F2F4F6',
                    marginBottom:8,
                  }}
                  onPress={() => { Linking.openURL(`tel:4441000`) }}>
                      <View style={{flexDirection:'row', alignItems:'center'}}>
                        <Image
                          source={require('../../../assets/img/export/icon_phone.png')}
                          style={{
                            width: 24,
                            height: 24,
                            marginRight:10,
                            resizeMode: 'contain',
                          }}
                        />
                        <View>
                        <Text style={{
                            fontSize:14,
                            fontWeight:'700',
                            lineHeight:20,
                            color:'#0B1929',
                            textAlign:'left',
                          }}>Payfour / CarrefourSA Destek Hattı
                          </Text>
                          {/* <Text style={{
                            fontSize:12,
                            color:'#0B1929',
                            textAlign:'left',
                            width:120
                          }}>
                            Payfour / CarrefourSA Destek Hattı
                          </Text>
                          <Text style={{
                            fontSize:14,
                            fontWeight:'700',
                            lineHeight:20,
                            color:'#0B1929',
                            textAlign:'left',
                            width:120
                          }}>
                            444 10 00
                          </Text> */}
                        </View>
                      </View>
                      <Image
                        source={require('../../../assets/img/export/arrow_right_dark.png')}
                        style={{
                          width: 24,
                          height: 24,
                          resizeMode: 'contain',
                          tintColor:'#004F97'
                        }}
                      />  
                  </TouchableOpacity>
                  <TouchableOpacity style={{
                    height:52,
                    
                    flexDirection:'row',
                    alignItems:'center',
                    justifyContent:'space-between',
                    borderBottomWidth:1,
                    borderBottomColor:'#F2F4F6',
                    marginBottom:8,
                  }}
                  onPress={() => { Linking.openURL(`whatsapp://send?phone=4441000`) }}>
                      <View style={{flexDirection:'row', alignItems:'center'}}>
                        <Image
                          source={require('../../../assets/img/export/icon_whatsapp.png')}
                          style={{
                            width: 24,
                            height: 24,
                            marginRight:10,
                            resizeMode: 'contain',
                          }}
                        />
                        <View>
                          <Text style={{
                            fontSize:14,
                            fontWeight:'700',
                            lineHeight:20,
                            color:'#0B1929',
                            textAlign:'left',
                            width:200
                          }}>
                            Whatsapp Destek Hattı
                          </Text>
                        </View>
                      </View>
                      <Image
                        source={require('../../../assets/img/export/arrow_right_dark.png')}
                        style={{
                          width: 24,
                          height: 24,
                          resizeMode: 'contain',
                          tintColor:'#004F97'
                        }}
                      />  
                  </TouchableOpacity>
                  <TouchableOpacity style={{
                    height:52,
                    
                    flexDirection:'row',
                    alignItems:'center',
                    justifyContent:'space-between',
                    marginBottom:8,
                  }}
                  onPress={() => Linking.openURL('mailto:bilgi@carrefoursa.com')}>
                      <View style={{flexDirection:'row', alignItems:'center'}}>
                        <Image
                          source={require('../../../assets/img/export/icon_mail.png')}
                          style={{
                            width: 24,
                            height: 24,
                            marginRight:10,
                            resizeMode: 'contain',
                          }}
                        />
                        <View>
                          <Text style={{
                            fontSize:14,
                            fontWeight:'700',
                            lineHeight:20,
                            color:'#0B1929',
                            textAlign:'left',
                            width:200
                          }}>
                            bilgi@carrefoursa.com
                          </Text>
                        </View>
                      </View>
                      <Image
                        source={require('../../../assets/img/export/arrow_right_dark.png')}
                        style={{
                          width: 24,
                          height: 24,
                          resizeMode: 'contain',
                          tintColor:'#004F97'
                        }}
                      />  
                  </TouchableOpacity>
                  
                  {/* <View style={{paddingTop:8, paddingBottom:8}}>
                    <Text style={{color:'#909EAA', fontSize:12}}>
                    Nunc mattis enim ut tellus. Orci ac auctor augue mauris augue neque. Consequat interdum varius sit amet mattis vulputate. 
                    <Text style={{fontWeight:'700'}}>At urna condimentum mattis pellentesque id nibh tortor.</Text> 
                    </Text>
                  </View>                 */}
              </View>
              </View>
              </KeyboardAvoidingView>
              </ScrollView>
              </SafeAreaView>
  )
  
};

const profileStyles = StyleSheet.create({
  profileHolder:{
    borderRadius:16, 
    backgroundColor:'#fff', 
    paddingLeft:12, 
    paddingRight:12,
    marginBottom:16, 
    width:'100%'
  },
  profileBtn: {
    height:48,
    paddingTop:16,
    paddingBottom:16,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    borderBottomWidth:1,
    borderColor:'#E4E4E8',
  },
  profileLeft:{
    flexDirection:'row',
  },
  profileIconHolder:{
    paddingRight:24,
  },
  profileIcon:{
    width:24,
    height:24,    
  },
  profileText:{
    color:'#0B1929',
    fontSize:14,
    fontWeight:'700',
  },
  profileArrow:{
    width:24,
    height:24,
  },
  profileTitleHolder:{
    width:'100%',
    marginBottom:16,
  },
  profileTitle:{
    color:'#909EAA',
    fontSize:14,
    textAlign:'left',
  },
});
const regstyles = StyleSheet.create({
  registerInputStyle:{
    backgroundColor:'#fff',
    paddingTop:17,
    paddingBottom:17, 
    paddingLeft:12, 
    paddingRight:12,    
    borderWidth: 1,
    borderRadius: 10,
    marginBottom:16,
    width:'100%',
  },
  mainBody: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    alignContent: 'center',
  },
  topStyle: {
    alignContent: 'center',
    paddingTop: 39,
    paddingBottom: 30,
    borderColor: '#EBEBEB',
    borderBottomWidth: 1,
  },
  centerStyle: {
    alignContent: 'center',
  },
  sectionStyle: {
    flexDirection: 'column',
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },
  buttonStyle: {
    backgroundColor: '#1D1D25',
    borderWidth: 0,
    color: '#FFFFFF',
    height: 65,
    alignItems: 'center',
    borderRadius: 10,
    marginLeft: 35,
    marginRight: 35,
    marginBottom: 25,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 20,
    fontFamily: 'Helvetica-Bold',
    fontWeight: 'bold',
    fontSize: 16,
  },
  inputTitleStyle: {
    color: '#7E797F',
    fontSize: 12,
    marginBottom: 10,
  },
  inputStyle: {
    color: '#1D1D25',
    paddingTop: 30,
    paddingBottom: 30,
    fontFamily: 'Helvetica-Bold',
    fontSize: 14,
    borderWidth: 1,
    borderColor: '#EBEBEB',
    borderLeftWidth: 0,
    borderRightWidth: 0,
    marginBottom: 48,
    opacity: 1,
  },
  bottomStyle: {
    alignItems: 'center',
    marginBottom: 30,
  },
  copyrightTextStyle: {
    color: '#7E797F',
    textAlign: 'center',
    fontWeight: 'light',
    fontSize: 10,
    alignSelf: 'center',
  },
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },
});
export default ProfileSupport;
