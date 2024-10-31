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


const ProfileFAQ = ({navigation}) => { 

  const [faqItem, setFaqItem] = useState(1);
  const [loading, setLoading] = useState(false);
  const [campaign, setCampaign] = useState(false);
  const [payment, setPayment] = useState(false);
  const [offers, setOffers] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  
  const handleExit = () => {
    console.log('handleExit');

    setModalVisible(true);
  };
  
  

  return(
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>      
      
    <Loader loading={loading} />
    <SubtabHeader routetarget="ProfileHome" name="Sıkça Sorulanlar" count="0" />
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
                  
                  <View style={{marginBottom:8}}>
                    <TouchableOpacity style={{
                      height:50,
                      
                      flexDirection:'row',
                      alignItems:'center',
                      justifyContent:'space-between',
                      borderBottomWidth:1,
                      borderBottomColor:'#F2F4F6',
                    }}
                    onPress={()=>setFaqItem(1)}>
                      <Text style={{
                        fontSize:14,
                        fontWeight:700,
                        color:'#0B1929',
                      }}>
                        Sed auctor eget augue sed iaculis
                      </Text>
                      <Image
                        source={require('../../../assets/img/export/arrow_down_blue.png')}
                        style={{
                          width: 24,
                          height: 24,
                          resizeMode: 'contain',
                          transform: faqItem == 1? [{scaleY:1}] : [{scaleY:-1}]
                        }}
                      />
                    </TouchableOpacity>
                      
                    <View style={{
                      padding:16,
                      display:faqItem == 1? 'flex' : 'none',
                    }}>
                      <Text style={{
                        fontSize:12,
                      color:'#909EAA',}}>
                        Nunc mattis enim ut tellus. Orci ac auctor augue mauris augue neque. Consequat interdum varius sit amet mattis vulputate. 
                        <Text style={{fontWeight:'700'}}>At urna condimentum mattis pellentesque id nibh tortor.</Text> Mattis pellentesque id nibh tortor id aliquet. Cras sed felis eget velit aliquet.Purus viverra accumsan in nisl nisi scelerisque eu ultrices vitae. Nisl suscipit adipiscing bibendum est. 
                      </Text>
                    </View>
                          
                    
                  </View>
                  <View style={{marginBottom:8}}>
                    <TouchableOpacity style={{
                      height:50,
                      
                      flexDirection:'row',
                      alignItems:'center',
                      justifyContent:'space-between',
                      borderBottomWidth:1,
                      borderBottomColor:'#F2F4F6',
                    }}
                    onPress={()=>setFaqItem(2)}>
                      <Text style={{
                        fontSize:14,
                        fontWeight:700,
                        color:'#0B1929',
                      }}>
                        Sed auctor eget augue sed iaculis
                      </Text>
                      <Image
                        source={require('../../../assets/img/export/arrow_down_blue.png')}
                        style={{
                          width: 24,
                          height: 24,
                          resizeMode: 'contain',
                          transform: faqItem == 2? [{scaleY:1}] : [{scaleY:-1}]
                        }}
                      />
                    </TouchableOpacity>
                      
                    <View style={{
                      padding:16,
                      display:faqItem == 2? 'flex' : 'none',
                    }}>
                      <Text style={{
                        fontSize:12,
                      color:'#909EAA',}}>
                        Nunc mattis enim ut tellus. Orci ac auctor augue mauris augue neque. Consequat interdum varius sit amet mattis vulputate. 
                        <Text style={{fontWeight:'700'}}>At urna condimentum mattis pellentesque id nibh tortor.</Text> Mattis pellentesque id nibh tortor id aliquet. Cras sed felis eget velit aliquet.Purus viverra accumsan in nisl nisi scelerisque eu ultrices vitae. Nisl suscipit adipiscing bibendum est. 
                      </Text>
                    </View>
                          
                    
                  </View>
                  <View style={{marginBottom:8}}>
                    <TouchableOpacity style={{
                      height:50,
                      
                      flexDirection:'row',
                      alignItems:'center',
                      justifyContent:'space-between',
                      borderBottomWidth:1,
                      borderBottomColor:'#F2F4F6',
                    }}
                    onPress={()=>setFaqItem(3)}>
                      <Text style={{
                        fontSize:14,
                        fontWeight:700,
                        color:'#0B1929',
                      }}>
                        Sed auctor eget augue sed iaculis
                      </Text>
                      <Image
                        source={require('../../../assets/img/export/arrow_down_blue.png')}
                        style={{
                          width: 24,
                          height: 24,
                          resizeMode: 'contain',
                          transform: faqItem == 3? [{scaleY:1}] : [{scaleY:-1}]
                        }}
                      />
                    </TouchableOpacity>
                      
                    <View style={{
                      padding:16,
                      display:faqItem == 3? 'flex' : 'none',
                    }}>
                      <Text style={{
                        fontSize:12,
                      color:'#909EAA',}}>
                        Nunc mattis enim ut tellus. Orci ac auctor augue mauris augue neque. Consequat interdum varius sit amet mattis vulputate. 
                        <Text style={{fontWeight:'700'}}>At urna condimentum mattis pellentesque id nibh tortor.</Text> Mattis pellentesque id nibh tortor id aliquet. Cras sed felis eget velit aliquet.Purus viverra accumsan in nisl nisi scelerisque eu ultrices vitae. Nisl suscipit adipiscing bibendum est. 
                      </Text>
                    </View>
                          
                    
                  </View>
                  <View style={{marginBottom:8}}>
                    <TouchableOpacity style={{
                      height:50,
                      
                      flexDirection:'row',
                      alignItems:'center',
                      justifyContent:'space-between',
                      borderBottomWidth:1,
                      borderBottomColor:'#F2F4F6',
                    }}
                    onPress={()=>setFaqItem(4)}>
                      <Text style={{
                        fontSize:14,
                        fontWeight:700,
                        color:'#0B1929',
                      }}>
                        Sed auctor eget augue sed iaculis
                      </Text>
                      <Image
                        source={require('../../../assets/img/export/arrow_down_blue.png')}
                        style={{
                          width: 24,
                          height: 24,
                          resizeMode: 'contain',
                          transform: faqItem == 4? [{scaleY:1}] : [{scaleY:-1}]
                        }}
                      />
                    </TouchableOpacity>
                      
                    <View style={{
                      padding:16,
                      display:faqItem == 4? 'flex' : 'none',
                    }}>
                      <Text style={{
                        fontSize:12,
                      color:'#909EAA',}}>
                        Nunc mattis enim ut tellus. Orci ac auctor augue mauris augue neque. Consequat interdum varius sit amet mattis vulputate. 
                        <Text style={{fontWeight:'700'}}>At urna condimentum mattis pellentesque id nibh tortor.</Text> Mattis pellentesque id nibh tortor id aliquet. Cras sed felis eget velit aliquet.Purus viverra accumsan in nisl nisi scelerisque eu ultrices vitae. Nisl suscipit adipiscing bibendum est. 
                      </Text>
                    </View>
                          
                    
                  </View>
                  <View style={{marginBottom:8}}>
                    <TouchableOpacity style={{
                      height:50,
                      
                      flexDirection:'row',
                      alignItems:'center',
                      justifyContent:'space-between',
                      borderBottomWidth:1,
                      borderBottomColor:'#F2F4F6',
                    }}
                    onPress={()=>setFaqItem(5)}>
                      <Text style={{
                        fontSize:14,
                        fontWeight:700,
                        color:'#0B1929',
                      }}>
                        Sed auctor eget augue sed iaculis
                      </Text>
                      <Image
                        source={require('../../../assets/img/export/arrow_down_blue.png')}
                        style={{
                          width: 24,
                          height: 24,
                          resizeMode: 'contain',
                          transform: faqItem == 5? [{scaleY:1}] : [{scaleY:-1}]
                        }}
                      />
                    </TouchableOpacity>
                      
                    <View style={{
                      padding:16,
                      display:faqItem == 5? 'flex' : 'none',
                    }}>
                      <Text style={{
                        fontSize:12,
                      color:'#909EAA',}}>
                        Nunc mattis enim ut tellus. Orci ac auctor augue mauris augue neque. Consequat interdum varius sit amet mattis vulputate. 
                        <Text style={{fontWeight:'700'}}>At urna condimentum mattis pellentesque id nibh tortor.</Text> Mattis pellentesque id nibh tortor id aliquet. Cras sed felis eget velit aliquet.Purus viverra accumsan in nisl nisi scelerisque eu ultrices vitae. Nisl suscipit adipiscing bibendum est. 
                      </Text>
                    </View>
                          
                    
                  </View>
                  <View style={{marginBottom:8}}>
                    <TouchableOpacity style={{
                      height:50,
                      
                      flexDirection:'row',
                      alignItems:'center',
                      justifyContent:'space-between',
                      // borderBottomWidth:1,
                      // borderBottomColor:'#F2F4F6',
                    }}
                    onPress={()=>setFaqItem(6)}>
                      <Text style={{
                        fontSize:14,
                        fontWeight:700,
                        color:'#0B1929',
                      }}>
                        Sed auctor eget augue sed iaculis
                      </Text>
                      <Image
                        source={require('../../../assets/img/export/arrow_down_blue.png')}
                        style={{
                          width: 24,
                          height: 24,
                          resizeMode: 'contain',
                          transform: faqItem == 1? [{scaleY:1}] : [{scaleY:-1}]
                        }}
                      />
                    </TouchableOpacity>
                      
                    <View style={{
                      padding:16,
                      display:faqItem == 6? 'flex' : 'none',
                    }}>
                      <Text style={{
                        fontSize:12,
                      color:'#909EAA',}}>
                        Nunc mattis enim ut tellus. Orci ac auctor augue mauris augue neque. Consequat interdum varius sit amet mattis vulputate. 
                        <Text style={{fontWeight:'700'}}>At urna condimentum mattis pellentesque id nibh tortor.</Text> Mattis pellentesque id nibh tortor id aliquet. Cras sed felis eget velit aliquet.Purus viverra accumsan in nisl nisi scelerisque eu ultrices vitae. Nisl suscipit adipiscing bibendum est. 
                      </Text>
                    </View>
                          
                    
                  </View>
                  <TouchableOpacity
                    style={[styles.buttonStyle, {marginBottom: 0, backgroundColor: '#fff', borderWidth:1, borderColor: '#004F97', flexDirection:'row', alignItems:'center', justifyContent:'center'}]}
                    
                    activeOpacity={0.5}
                    onPress={()=>{}}>
                      <Image
                        source={require('../../../assets/img/export/icon_chat.png')}
                        style={{
                          width: 24,
                          height: 24,
                          marginRight:8,
                          resizeMode: 'contain',
                        }}
                      />
                      <Text style={[styles.buttonTextStyle, {color: '#004F97'}]}>Yardım / Bize Ulaşın</Text>
                    </TouchableOpacity>


                  
                  
                
                
               
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
export default ProfileFAQ;
