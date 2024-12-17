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


const ProfileLegal = ({navigation}) => { 

  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [campaign, setCampaign] = useState(false);
  const [payment, setPayment] = useState(false);
  const [offers, setOffers] = useState(false);
  const [rulesModalVisible, setRulesModalVisible] = useState(false);
  const [electronicModalVisible, setElectronicModalVisible] = useState(false);
  const [carrefourModalVisible, setCarrefourModalVisible] = useState(false);
  const [dgpaysModalVisible, setDgpaysModalVisible] = useState(false);
  const [membershipModalVisible, setMembershipModalVisible] = useState(false);
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  
  const handleExit = () => {
    console.log('handleExit');

    //setModalVisible(true);
  };
  
  

  return(
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>      
      <Modal
            animationType="slide"
            transparent={true}
            visible={rulesModalVisible}
            onRequestClose={() => {
              setRulesModalVisible(!rulesModalVisible);
            }}>
            <View
              style={{
                flex: 1,                
                justifyContent: 'flex-end',
                alignItems: 'flex-end',
                backgroundColor: 'rgba(0, 0, 0, 0.6)',
                width:Dimensions.get('window').width
              }}>
              <ScrollView contentContainerStyle={{
                flex: 1,  
                flexDirection:'column',              
                justifyContent: 'flex-end',
                alignItems: 'flex-end',
                width:Dimensions.get('window').width
                
              }}>
              <View
                style={{
                  backgroundColor:'#fff',
                  borderTopLeftRadius: 24,
                  borderTopRightRadius: 24,
                  paddingTop: 33,
                  paddingLeft: 16,
                  paddingRight: 16,
                  width:'100%'
                  
                }}>
                  
                  <View style={{
                      flexDirection:'row',
                      justifyContent:'space-between',
                      }}>
                        <Text style={{
                          fontSize:14,
                          fontWeight:'700',
                          color:'#0B1929',
                          lineHeight:20,
                          textAlign:'left',
                          marginBottom:24,
                        }}>
                          Payfour Kullanıcı Sözleşmesi
                        </Text>
                        <TouchableOpacity 
                      style={{
                        width:24,
                        height:24,
                      }}
                      onPress={() => {
                        console.log('close');
                        setRulesModalVisible(false);}}>                  
                        <Image 
                        source={require('../../../assets/img/export/close.png')}
                        style={{
                          width: 24,
                          height: 24,
                          resizeMode: 'contain',
                          tintColor:'#0B1929'
                        }}
                      />
                    </TouchableOpacity>
                       </View> 
                      <View style={{marginBottom:24}}>
                        <Text style={{
                          fontSize:12,
                          color:'#909EAA',
                          marginBottom:8,
                        }}>
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Libero justo laoreet sit amet cursus sit amet dictum. Vitae sapien pellentesque habitant morbi. Ac odio tempor orci dapibus ultrices. 

Enim ut tellus elementum sagittis vitae. 
In massa tempor nec feugiat nisl pretium fusce id velit. 
Tristique sollicitudin nibh sit amet commodo nulla facilisi nullam. 
Netus et malesuada fames ac turpis egestas sed tempus urna. Turpis massa tincidunt dui ut.
Fermentum posuere urna nec tincidunt praesent semper feugiat.

Purus viverra accumsan in nisl nisi scelerisque eu ultrices vitae. Nisl suscipit adipiscing bibendum est. Tempus imperdiet nulla malesuada pellentesque elit. Fringilla urna porttitor rhoncus dolor purus. Nec feugiat nisl pretium fusce id. Egestas pretium aenean pharetra magna ac. Arcu ac tortor dignissim convallis aenean. Nisi quis eleifend quam adipiscing vitae proin. Urna cursus eget nunc scelerisque viverra mauris in aliquam sem. Enim eu turpis egestas pretium. Nunc mattis enim ut tellus. Orci ac auctor augue mauris augue neque. Consequat interdum varius sit amet mattis vulputate. At urna condimentum mattis pellentesque id nibh tortor. Mattis pellentesque id nibh tortor id aliquet. Cras sed felis eget velit aliquet.
                        </Text>
                       
               
                      </View>
                  </View>
                  
               </ScrollView>
              <View style={{
                  backgroundColor:'#fff',
                  paddingTop:24,
                  paddingBottom:24,
                  paddingLeft:16,
                  paddingRight:16,
                  width:'100%',
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 15,
                  },
                  shadowOpacity: 1,
                  shadowRadius: 30,                  
                  elevation: 18,
                }}>
                <TouchableOpacity
                  style={[
                    styles.buttonStyle,
                    {
                      width: '100%',
                      height: 52,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderWidth: 2,
                      borderColor: '#004F97',
                      backgroundColor: '#004F97',
                      padding:0,
                      elevation:1,
                    },
                  ]}
                  onPress={() => setRulesModalVisible(false)}>
                  <Text
                    style={{fontSize: 14, color: '#ffffff'}}>
                    Kapat
                  </Text>
                </TouchableOpacity>
               </View>
               
            </View>
      </Modal>
      <Modal
            animationType="slide"
            transparent={true}
            visible={electronicModalVisible}
            onRequestClose={() => {
              setElectronicModalVisible(!electronicModalVisible);
            }}>
            <View
              style={{
                flex: 1,                
                justifyContent: 'flex-end',
                alignItems: 'flex-end',
                backgroundColor: 'rgba(0, 0, 0, 0.6)',
                width:Dimensions.get('window').width
              }}>
              <ScrollView contentContainerStyle={{
                flex: 1,  
                flexDirection:'column',              
                justifyContent: 'flex-end',
                alignItems: 'flex-end',
                width:Dimensions.get('window').width
                
              }}>
              <View
                style={{
                  backgroundColor:'#fff',
                  borderTopLeftRadius: 24,
                  borderTopRightRadius: 24,
                  paddingTop: 33,
                  paddingLeft: 16,
                  paddingRight: 16,
                  width:'100%'
                  
                }}>
                  
                  <View style={{
                      flexDirection:'row',
                      justifyContent:'space-between',
                      }}>
                        <Text style={{
                          fontSize:14,
                          fontWeight:'700',
                          color:'#0B1929',
                          lineHeight:20,
                          textAlign:'left',
                          marginBottom:24,
                        }}>
                          Dgpays Elektronik Hesap Açılış Sözleşmesi
                        </Text>
                        <TouchableOpacity 
                      style={{
                        width:24,
                        height:24,
                      }}
                      onPress={() => {
                        console.log('close');
                        setElectronicModalVisible(false);}}>                  
                        <Image 
                        source={require('../../../assets/img/export/close.png')}
                        style={{
                          width: 24,
                          height: 24,
                          resizeMode: 'contain',
                          tintColor:'#0B1929'
                        }}
                      />
                    </TouchableOpacity>
                       </View> 
                      <View style={{marginBottom:24}}>
                        <Text style={{
                          fontSize:12,
                          color:'#909EAA',
                          marginBottom:8,
                        }}>
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Libero justo laoreet sit amet cursus sit amet dictum. Vitae sapien pellentesque habitant morbi. Ac odio tempor orci dapibus ultrices. 

Enim ut tellus elementum sagittis vitae. 
In massa tempor nec feugiat nisl pretium fusce id velit. 
Tristique sollicitudin nibh sit amet commodo nulla facilisi nullam. 
Netus et malesuada fames ac turpis egestas sed tempus urna. Turpis massa tincidunt dui ut.
Fermentum posuere urna nec tincidunt praesent semper feugiat.

Purus viverra accumsan in nisl nisi scelerisque eu ultrices vitae. Nisl suscipit adipiscing bibendum est. Tempus imperdiet nulla malesuada pellentesque elit. Fringilla urna porttitor rhoncus dolor purus. Nec feugiat nisl pretium fusce id. Egestas pretium aenean pharetra magna ac. Arcu ac tortor dignissim convallis aenean. Nisi quis eleifend quam adipiscing vitae proin. Urna cursus eget nunc scelerisque viverra mauris in aliquam sem. Enim eu turpis egestas pretium. Nunc mattis enim ut tellus. Orci ac auctor augue mauris augue neque. Consequat interdum varius sit amet mattis vulputate. At urna condimentum mattis pellentesque id nibh tortor. Mattis pellentesque id nibh tortor id aliquet. Cras sed felis eget velit aliquet.
                        </Text>
                       
               
                      </View>
                  </View>
                  
               </ScrollView>
              <View style={{
                  backgroundColor:'#fff',
                  paddingTop:24,
                  paddingBottom:24,
                  paddingLeft:16,
                  paddingRight:16,
                  width:'100%',
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 15,
                  },
                  shadowOpacity: 1,
                  shadowRadius: 30,                  
                  elevation: 18,
                }}>
                <TouchableOpacity
                  style={[
                    styles.buttonStyle,
                    {
                      width: '100%',
                      height: 52,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderWidth: 2,
                      borderColor: '#004F97',
                      backgroundColor: '#004F97',
                      padding:0,
                      elevation:1,
                    },
                  ]}
                  onPress={() => setElectronicModalVisible(false)}>
                  <Text
                    style={{fontSize: 14, color: '#ffffff'}}>
                    Kapat
                  </Text>
                </TouchableOpacity>
               </View>
               
            </View>
      </Modal>
      <Modal
            animationType="slide"
            transparent={true}
            visible={carrefourModalVisible}
            onRequestClose={() => {
              setCarrefourModalVisible(!carrefourModalVisible);
            }}>
            <View
              style={{
                flex: 1,                
                justifyContent: 'flex-end',
                alignItems: 'flex-end',
                backgroundColor: 'rgba(0, 0, 0, 0.6)',
                width:Dimensions.get('window').width
              }}>
              <ScrollView contentContainerStyle={{
                flex: 1,  
                flexDirection:'column',              
                justifyContent: 'flex-end',
                alignItems: 'flex-end',
                width:Dimensions.get('window').width
                
              }}>
              <View
                style={{
                  backgroundColor:'#fff',
                  borderTopLeftRadius: 24,
                  borderTopRightRadius: 24,
                  paddingTop: 33,
                  paddingLeft: 16,
                  paddingRight: 16,
                  width:'100%'
                  
                }}>
                  
                  <View style={{
                      flexDirection:'row',
                      justifyContent:'space-between',
                      }}>
                        <Text style={{
                          fontSize:14,
                          fontWeight:'700',
                          color:'#0B1929',
                          lineHeight:20,
                          textAlign:'left',
                          marginBottom:24,
                        }}>
                          CarrefourSA Üyelik Sözleşmesi
                        </Text>
                        <TouchableOpacity 
                      style={{
                        width:24,
                        height:24,
                      }}
                      onPress={() => {
                        console.log('close');
                        setCarrefourModalVisible(false);}}>                  
                        <Image 
                        source={require('../../../assets/img/export/close.png')}
                        style={{
                          width: 24,
                          height: 24,
                          resizeMode: 'contain',
                          tintColor:'#0B1929'
                        }}
                      />
                    </TouchableOpacity>
                       </View> 
                      <View style={{marginBottom:24}}>
                        <Text style={{
                          fontSize:12,
                          color:'#909EAA',
                          marginBottom:8,
                        }}>
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Libero justo laoreet sit amet cursus sit amet dictum. Vitae sapien pellentesque habitant morbi. Ac odio tempor orci dapibus ultrices. 

Enim ut tellus elementum sagittis vitae. 
In massa tempor nec feugiat nisl pretium fusce id velit. 
Tristique sollicitudin nibh sit amet commodo nulla facilisi nullam. 
Netus et malesuada fames ac turpis egestas sed tempus urna. Turpis massa tincidunt dui ut.
Fermentum posuere urna nec tincidunt praesent semper feugiat.

Purus viverra accumsan in nisl nisi scelerisque eu ultrices vitae. Nisl suscipit adipiscing bibendum est. Tempus imperdiet nulla malesuada pellentesque elit. Fringilla urna porttitor rhoncus dolor purus. Nec feugiat nisl pretium fusce id. Egestas pretium aenean pharetra magna ac. Arcu ac tortor dignissim convallis aenean. Nisi quis eleifend quam adipiscing vitae proin. Urna cursus eget nunc scelerisque viverra mauris in aliquam sem. Enim eu turpis egestas pretium. Nunc mattis enim ut tellus. Orci ac auctor augue mauris augue neque. Consequat interdum varius sit amet mattis vulputate. At urna condimentum mattis pellentesque id nibh tortor. Mattis pellentesque id nibh tortor id aliquet. Cras sed felis eget velit aliquet.
                        </Text>
                       
               
                      </View>
                  </View>
                  
               </ScrollView>
              <View style={{
                  backgroundColor:'#fff',
                  paddingTop:24,
                  paddingBottom:24,
                  paddingLeft:16,
                  paddingRight:16,
                  width:'100%',
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 15,
                  },
                  shadowOpacity: 1,
                  shadowRadius: 30,                  
                  elevation: 18,
                }}>
                <TouchableOpacity
                  style={[
                    styles.buttonStyle,
                    {
                      width: '100%',
                      height: 52,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderWidth: 2,
                      borderColor: '#004F97',
                      backgroundColor: '#004F97',
                      padding:0,
                      elevation:1,
                    },
                  ]}
                  onPress={() => setCarrefourModalVisible(false)}>
                  <Text
                    style={{fontSize: 14, color: '#ffffff'}}>
                    Kapat
                  </Text>
                </TouchableOpacity>
               </View>
               
            </View>
      </Modal> 
      <Modal
            animationType="slide"
            transparent={true}
            visible={dgpaysModalVisible}
            onRequestClose={() => {
              setDgpaysModalVisible(!dgpaysModalVisible);
            }}>
            <View
              style={{
                flex: 1,                
                justifyContent: 'flex-end',
                alignItems: 'flex-end',
                backgroundColor: 'rgba(0, 0, 0, 0.6)',
                width:Dimensions.get('window').width
              }}>
              <ScrollView contentContainerStyle={{
                flex: 1,  
                flexDirection:'column',              
                justifyContent: 'flex-end',
                alignItems: 'flex-end',
                width:Dimensions.get('window').width
                
              }}>
              <View
                style={{
                  backgroundColor:'#fff',
                  borderTopLeftRadius: 24,
                  borderTopRightRadius: 24,
                  paddingTop: 33,
                  paddingLeft: 16,
                  paddingRight: 16,
                  width:'100%'
                  
                }}>
                  
                  <View style={{
                      flexDirection:'row',
                      justifyContent:'space-between',
                      }}>
                        <Text style={{
                          fontSize:14,
                          fontWeight:'700',
                          color:'#0B1929',
                          lineHeight:20,
                          textAlign:'left',
                          marginBottom:24,
                        }}>
                          Dgpays Aydınlatma Metni
                        </Text>
                        <TouchableOpacity 
                      style={{
                        width:24,
                        height:24,
                      }}
                      onPress={() => {
                        console.log('close');
                        setDgpaysModalVisible(false);}}>                  
                        <Image 
                        source={require('../../../assets/img/export/close.png')}
                        style={{
                          width: 24,
                          height: 24,
                          resizeMode: 'contain',
                          tintColor:'#0B1929'
                        }}
                      />
                    </TouchableOpacity>
                       </View> 
                      <View style={{marginBottom:24}}>
                        <Text style={{
                          fontSize:12,
                          color:'#909EAA',
                          marginBottom:8,
                        }}>
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Libero justo laoreet sit amet cursus sit amet dictum. Vitae sapien pellentesque habitant morbi. Ac odio tempor orci dapibus ultrices. 

Enim ut tellus elementum sagittis vitae. 
In massa tempor nec feugiat nisl pretium fusce id velit. 
Tristique sollicitudin nibh sit amet commodo nulla facilisi nullam. 
Netus et malesuada fames ac turpis egestas sed tempus urna. Turpis massa tincidunt dui ut.
Fermentum posuere urna nec tincidunt praesent semper feugiat.

Purus viverra accumsan in nisl nisi scelerisque eu ultrices vitae. Nisl suscipit adipiscing bibendum est. Tempus imperdiet nulla malesuada pellentesque elit. Fringilla urna porttitor rhoncus dolor purus. Nec feugiat nisl pretium fusce id. Egestas pretium aenean pharetra magna ac. Arcu ac tortor dignissim convallis aenean. Nisi quis eleifend quam adipiscing vitae proin. Urna cursus eget nunc scelerisque viverra mauris in aliquam sem. Enim eu turpis egestas pretium. Nunc mattis enim ut tellus. Orci ac auctor augue mauris augue neque. Consequat interdum varius sit amet mattis vulputate. At urna condimentum mattis pellentesque id nibh tortor. Mattis pellentesque id nibh tortor id aliquet. Cras sed felis eget velit aliquet.
                        </Text>
                       
               
                      </View>
                  </View>
                  
               </ScrollView>
              <View style={{
                  backgroundColor:'#fff',
                  paddingTop:24,
                  paddingBottom:24,
                  paddingLeft:16,
                  paddingRight:16,
                  width:'100%',
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 15,
                  },
                  shadowOpacity: 1,
                  shadowRadius: 30,                  
                  elevation: 18,
                }}>
                <TouchableOpacity
                  style={[
                    styles.buttonStyle,
                    {
                      width: '100%',
                      height: 52,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderWidth: 2,
                      borderColor: '#004F97',
                      backgroundColor: '#004F97',
                      padding:0,
                      elevation:1,
                    },
                  ]}
                  onPress={() => setDgpaysModalVisible(false)}>
                  <Text
                    style={{fontSize: 14, color: '#ffffff'}}>
                    Kapat
                  </Text>
                </TouchableOpacity>
               </View>
               
            </View>
      </Modal>
      <Modal
            animationType="slide"
            transparent={true}
            visible={membershipModalVisible}
            onRequestClose={() => {
              setMembershipModalVisible(!membershipModalVisible);
            }}>
            <View
              style={{
                flex: 1,                
                justifyContent: 'flex-end',
                alignItems: 'flex-end',
                backgroundColor: 'rgba(0, 0, 0, 0.6)',
                width:Dimensions.get('window').width
              }}>
              <ScrollView contentContainerStyle={{
                flex: 1,  
                flexDirection:'column',              
                justifyContent: 'flex-end',
                alignItems: 'flex-end',
                width:Dimensions.get('window').width
                
              }}>
              <View
                style={{
                  backgroundColor:'#fff',
                  borderTopLeftRadius: 24,
                  borderTopRightRadius: 24,
                  paddingTop: 33,
                  paddingLeft: 16,
                  paddingRight: 16,
                  width:'100%'
                  
                }}>
                  
                  <View style={{
                      flexDirection:'row',
                      justifyContent:'space-between',
                      }}>
                        <Text style={{
                          fontSize:14,
                          fontWeight:'700',
                          color:'#0B1929',
                          lineHeight:20,
                          textAlign:'left',
                          marginBottom:24,
                        }}>
                          CarrefourSA Aydınlatma Metni
                        </Text>
                        <TouchableOpacity 
                      style={{
                        width:24,
                        height:24,
                      }}
                      onPress={() => {
                        console.log('close');
                        setMembershipModalVisible(false);}}>                  
                        <Image 
                        source={require('../../../assets/img/export/close.png')}
                        style={{
                          width: 24,
                          height: 24,
                          resizeMode: 'contain',
                          tintColor:'#0B1929'
                        }}
                      />
                    </TouchableOpacity>
                       </View> 
                      <View style={{marginBottom:24}}>
                        <Text style={{
                          fontSize:12,
                          color:'#909EAA',
                          marginBottom:8,
                        }}>
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Libero justo laoreet sit amet cursus sit amet dictum. Vitae sapien pellentesque habitant morbi. Ac odio tempor orci dapibus ultrices. 

Enim ut tellus elementum sagittis vitae. 
In massa tempor nec feugiat nisl pretium fusce id velit. 
Tristique sollicitudin nibh sit amet commodo nulla facilisi nullam. 
Netus et malesuada fames ac turpis egestas sed tempus urna. Turpis massa tincidunt dui ut.
Fermentum posuere urna nec tincidunt praesent semper feugiat.

Purus viverra accumsan in nisl nisi scelerisque eu ultrices vitae. Nisl suscipit adipiscing bibendum est. Tempus imperdiet nulla malesuada pellentesque elit. Fringilla urna porttitor rhoncus dolor purus. Nec feugiat nisl pretium fusce id. Egestas pretium aenean pharetra magna ac. Arcu ac tortor dignissim convallis aenean. Nisi quis eleifend quam adipiscing vitae proin. Urna cursus eget nunc scelerisque viverra mauris in aliquam sem. Enim eu turpis egestas pretium. Nunc mattis enim ut tellus. Orci ac auctor augue mauris augue neque. Consequat interdum varius sit amet mattis vulputate. At urna condimentum mattis pellentesque id nibh tortor. Mattis pellentesque id nibh tortor id aliquet. Cras sed felis eget velit aliquet.
                        </Text>
                       
               
                      </View>
                  </View>
                  
               </ScrollView>
              <View style={{
                  backgroundColor:'#fff',
                  paddingTop:24,
                  paddingBottom:24,
                  paddingLeft:16,
                  paddingRight:16,
                  width:'100%',
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 15,
                  },
                  shadowOpacity: 1,
                  shadowRadius: 30,                  
                  elevation: 18,
                }}>
                <TouchableOpacity
                  style={[
                    styles.buttonStyle,
                    {
                      width: '100%',
                      height: 52,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderWidth: 2,
                      borderColor: '#004F97',
                      backgroundColor: '#004F97',
                      padding:0,
                      elevation:1,
                    },
                  ]}
                  onPress={() => setMembershipModalVisible(false)}>
                  <Text
                    style={{fontSize: 14, color: '#ffffff'}}>
                    Kapat
                  </Text>
                </TouchableOpacity>
               </View>
               
            </View>
      </Modal>      
    <Loader loading={loading} />
    <SubtabHeader routetarget="ProfileHome" name="Sözleşmelerim" count="0" />
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
                  onPress={() => {setRulesModalVisible(!rulesModalVisible) }}>
                      <View style={{flexDirection:'row', alignItems:'center'}}>                        
                        <View>
                          <Text style={{
                            fontSize:14,
                            fontWeight:'700',
                            lineHeight:20,
                            color:'#0B1929',
                            textAlign:'left',
                            width:200
                          }}>
                            Payfour Kullanıcı Sözleşmesi
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
                    borderBottomWidth:1,
                    borderBottomColor:'#F2F4F6',
                    marginBottom:8,
                  }}
                  onPress={() => {setElectronicModalVisible(!electronicModalVisible) }}>
                      <View style={{flexDirection:'row', alignItems:'center'}}>                        
                        <View>
                          <Text style={{
                            fontSize:14,
                            fontWeight:'700',
                            lineHeight:20,
                            color:'#0B1929',
                            textAlign:'left',
                            width:300
                          }}>
                            Dgpays Elektronik Hesap Açılış Sözleşmesi
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
                  onPress={() => {setCarrefourModalVisible(!carrefourModalVisible) }}>
                      <View style={{flexDirection:'row', alignItems:'center'}}>
                        
                        <View>
                          <Text style={{
                            fontSize:14,
                            fontWeight:'700',
                            lineHeight:20,
                            color:'#0B1929',
                            textAlign:'left',
                            width:300
                          }}>
                            CarrefourSA Üyelik Sözleşmesi
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
                  onPress={() => {setDgpaysModalVisible(!dgpaysModalVisible) }}>
                      <View style={{flexDirection:'row', alignItems:'center'}}>                       
                        <View>
                          <Text style={{
                            fontSize:14,
                            fontWeight:'700',
                            lineHeight:20,
                            color:'#0B1929',
                            textAlign:'left',
                            width:300
                          }}>
                            Dgpays Aydınlatma Metni
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
                  onPress={() => {setMembershipModalVisible(!membershipModalVisible) }}>
                      <View style={{flexDirection:'row', alignItems:'center'}}>                        
                        <View>
                          <Text style={{
                            fontSize:14,
                            fontWeight:'700',
                            lineHeight:20,
                            color:'#0B1929',
                            textAlign:'left',
                            width:300
                          }}>
                            CarrefourSA Aydınlatma Metni
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
export default ProfileLegal;
