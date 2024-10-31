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
  FlatList,
  TextInput,
  ScrollView,
  Linking,
  Modal,
  Dimensions,
  StyleSheet,
  Pressable,
  Platform,
  Keyboard,
  Alert
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createStackNavigator} from '@react-navigation/stack';
import {SelectList} from 'react-native-dropdown-select-list';
import {registerStyles} from '../Components/RegisterStyles.js';
import {styles} from '../Components/Styles.js';
import Loader from '../Components/Loader.js';
import TabHeader from '../Components/TabHeader.js';
import SubtabHeader from '../Components/SubtabHeader.js';
import SubtabHeaderWithSearch from '../Components/SubtabHeaderWithSearch.js';
import Bilgi from '../../assets/img/svg/bilgi.svg';
import axios from 'react-native-axios';
import LinearGradient from 'react-native-linear-gradient';
import HTMLView from 'react-native-htmlview';
import Clipboard from '@react-native-clipboard/clipboard';
const Stack = createStackNavigator();

const CampaignList = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [campaignData, setCampaignData] = useState(false);
  const scrollRef = useRef();
  const [transactionType, setTransactionType] = React.useState('all');
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [orderModalVisible, setOrderModalVisible] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [popularSearches, setPopularSearches] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  
  const [isSpecial, setIsSpecial] = useState(false);
  const [isCashback, setIsCashback] = useState(false);
  const [isPartnership, setIsPartnership] = useState(false);
  const [isAward, setIsAward] = useState(false);
  const [isPaymentOfEase, setIsPaymentOfEase] = useState(false);
  const [orderType, setOrderType] = React.useState('DateDescending');

  const [filterType, setFilterType] = React.useState('');

  useEffect(() => {   
    const unsubscribe = navigation.addListener('focus', () => {
      // do something
        getCampaigns(false)
    });
    return unsubscribe;
  }, [navigation]);
  const setFilterData = () =>{
    setFilterModalVisible(false);
    setOrderModalVisible(false);
    let filter = "";
    if(isSpecial) filter+="&isSpecial=true";
    if(isCashback) filter+="&isCashback=true";
    if(isPartnership) filter+="&isPartnership=true";
    if(isAward) filter+="&isAward=true";
    if(isPaymentOfEase) filter+="&isPaymentOfEase=true";
    filter+='&sort='+orderType;
    console.log("filter ? ");
    console.log(filter);
    getCampaigns(false, filter);
  }
  const getCampaigns = (isPayfour, filterList, search)=>{
    AsyncStorage.getItem('token').then(value =>{
      const config = {
        headers: { Authorization: `Bearer ${value}` }
      };
      let searchParams = '?page=1&pageSize=12';
      if(search) searchParams+='&keyword='+search;
      let path = 'https://payfourapp.test.kodegon.com/api/campaigns'+searchParams;
      if(isPayfour) path+="&isPayfourCampaign=true";
      if(filterList) path+=filterList;
      console.log("campaign params");
      console.log(path);
      axios.get(path, config).then(response => {
        console.log(response.data);
        console.log(response.data.data);
        console.log(response.data.data.items);
        let sl = response.data.data.items;
        for(var i=0; i < sl.length;i++){
          sl[i].key = sl[i].campaignCode;
          let dt = new Date(sl[i].expireDate);
          let tdt = new Date();
          console.log(dt.getTime());
          console.log(tdt.getTime());
          console.log(dt.getTime() < tdt.getTime());
          sl[i].expired = (dt.getTime() < tdt.getTime());
          let t = (((dt.getDate()<10)? "0"+dt.getDate() : dt.getDate())) +'.'+(((dt.getMonth()+1)<10)? "0"+(dt.getMonth()+1) :(dt.getMonth()+1))+'.'+dt.getFullYear();
          sl[i].time = t;
          
        }
        console.log(sl);
        setCampaignData(sl);
        setLoading(false);
        scrollRef.current?.scrollToOffset({ animated: true, offset: 0 });
      })
      .catch(error => {
        console.error("Error sending data: ", error);
        let msg="";
        (error.response.data.errors.message) ? msg += error.response.data.errors.message+"\n" : msg += "Ödeme hatası \n"; (error.response.data.errors.paymentError) ? msg += error.response.data.errors.paymentError+"\n" : msg += ""; Alert.alert(msg);
      });

    });
  }
const Item = ({time, title, refno, img, key, refid, expired}) => (
  <View key={key} style={{...slstyles.slide}}> 
  <TouchableOpacity onPress={() => { 
    

      console.log("campaign click");
      console.log(expired);
      console.log(refid)
      navigation.navigate('campaign', { 
            screen: 'CampaignDetail',
            params: {id: refid}
          })}
        }>
      <View style={{}}>
        <View style={{
          position:'absolute',
          top:0,
          left:0,
          width:'100%',
          height:'100%',
          backgroundColor:expired?  'rgba(0,0,0,0.5)' : 'none',
          zIndex:2,
        }}></View>
        
      <Image 
      source={{
        uri: img,
      }}
      style={[slstyles.slideImg, {
        resizeMode: 'cover',
        
      }]}
    />
    </View>
      <Text style={{
        fontSize:12,
        lineHeight:18,
        color:'#0B1929',
        marginBottom:8,
      }}>
        {title}
      </Text>
      <View style={{
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
      </View>
  </TouchableOpacity>
  </View>
  );
const renderSuggestionItems = () =>{ 
  console.log("renderSuggestionItems");
  
  console.log(suggestions.length)
      
  return(

      <FlatList
      data={suggestions}
      renderItem={(item) => 
        <SuggestionItem key={item.item} title={item.item}/>
      }
      keyExtractor={item => item.key}
      style={{ width:'100%'}}
      initialNumToRender={20}>

      </FlatList>

  )
}
  const SuggestionItem = ({key, title}) => (
    <View key={key} style={{width:'100%',
      height:50,
      borderBottomWidth:1,
      borderBottomColor:'#EFF1F5',
      
    }}> 
      <TouchableOpacity style={{
        paddingLeft:8,
        paddingRight:8,
        paddingTop:12,
        paddingBottom:12,
      }}
      onPress={() => {   
          console.log("suggestion click"); 
          onSearch(title);       
      }}>    
        <Text style={{
          fontSize:12,
          lineHeight:18,
          color:'#0B1929',
        }}>
            {title}
        </Text>       
      </TouchableOpacity>
    </View>
    );
  const renderPopular = () => {
    
      
  }
  const renderSuggestions = () => {

  }
  const renderCampaigns = () => {
    if (campaignData.length > 0) {
      return (        
        <FlatList
            data={campaignData}
            ref={scrollRef}
            renderItem={({item}) => (
              //time, title, refno, img
              <Item time={item.time} title={item.title} img = {item.thumbnailUrl} refno={item.campaignCode}  refid={item.id} expired={item.expired}/>
            )}
            keyExtractor={item => item.id+Math.random()}
            style={{paddingLeft: 30,
              paddingRight: 30, marginLeft:-30, marginRight:-30}}
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
            Kampanya bulunamadı.
          </Text>
        </View>
      );
    }
  };
  const onSearchPress = () => {
      console.log("onSearchPress");
      AsyncStorage.getItem('token').then(value =>{
        const config = {
          headers: { Authorization: `Bearer ${value}` }
        };
        axios.get('https://payfourapp.test.kodegon.com/api/campaigns/popularsearches', config).then(response => {
          console.log(response.data);
          console.log(response.data.data);
          console.log(response.data.data.items);
          let sl = response.data.data;
          setPopularSearches(sl);
          setShowSearch(true);
        })
    })
  }
  const onInput = (data) => {
    console.log("onInput", data);
      setLoading(true);
      AsyncStorage.getItem('token').then(value =>{
        const config = {
          headers: { Authorization: `Bearer ${value}` }
        };
        axios.get('https://payfourapp.test.kodegon.com/api/campaigns/suggest?keyword='+data, config).then(response => {
          console.log(response.data);
          console.log(response.data.data);
          console.log(response.data.data.items);
          let sl = response.data.data;
          // setPopularSearches(sl);
          // setShowSearch(true);
          setSuggestions(response.data.data);
          setLoading(false);
        })
  
      });
  }
  const onSearch = (data) => {
    console.log("onSearchSubmit", data);
    searchKeyword(data);
  }
  const onSearchClose = (data) => {
    console.log("onSearchClose", data);
    setShowSearch(false);
  }
  const onErase = () => {
    console.log("onErase");
    setSuggestions([]);
  }
  const searchKeyword = (data) => {
    console.log("searchKeyword", data);
    setShowSearch(false);
    getCampaigns(null, null, data);
  }
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}> 
    <Modal
            animationType="slide"
            transparent={true}
            visible={filterModalVisible}
            onRequestClose={() => {
              setFilterModalVisible(!filterModalVisible);
            }}>
            <View
              style={{
                flex: 1,                
                justifyContent: 'flex-end',
                alignItems: 'flex-end',
                backgroundColor: 'rgba(92, 92, 92, 0.56)',
              }}>
              <View
                style={{
                  backgroundColor:'#fff',
                  borderTopLeftRadius: 24,
                  borderTopRightRadius: 24,
                  paddingTop: 30,
                  paddingBottom: 16,
                  paddingLeft: 16,
                  paddingRight: 16,
                  width: '100%',
                }}>
                  <View style={{
                    flexDirection:'row',
                    justifyContent:'space-between',
                    alignItems:'center',
                    marginBottom:16,
                  }}>
                    <Text style={{
                      fontSize:14,
                      lineHeight:16,
                      color:'#004F97',
                    }}>
                      Filtrele
                    </Text>
                    <TouchableOpacity 
                      style={{
                        width:24,
                        height:24,
                      }}
                      onPress={() => {
                        console.log('close');
                        setFilterModalVisible(false);}}>                  
                        <Image 
                        source={require('../../assets/img/export/close.png')}
                        style={{
                          width: 24,
                          height: 24,
                          resizeMode: 'contain',
                        }}
                      />
                    </TouchableOpacity>
                  </View>
                  <View style={{
                    flexDirection:'row',
                    justifyContent:'space-between',
                    alignItems:'center',
                    marginBottom:16,
                    paddingTop:24,
                    paddingBottom:24,
                    borderTopWidth:1,
                    borderTopColor:'#E4E4E8',
                    borderBottomWidth:1,
                    borderBottomColor:'#E4E4E8',
                  }}>
                    <Text style={{
                      fontSize:16,
                      lineHeight:16,
                      color:'#004F97',
                    }}>
                      Payfour'a özel
                    </Text>
                    <Text style={{
                      fontSize:14,
                      lineHeight:16,
                      color:'#909EAA',
                    }}>
                      Tümü
                    </Text>
                    
                  </View>
                  <View style={{
                      marginBottom:24,
                      alignItems:'center',
                      flexDirection:'row'
                    }}>
                      <Pressable
                        style={{
                          width:24,
                          height:24,
                          marginRight:8,
                          backgroundColor:isSpecial ? '#015096':'#fff',
                          borderWidth:1, 
                          borderColor:'#DADEE7',
                          borderRadius:5,
                          alignItems:'center',
                          justifyContent:'center'
                        }}
                        onPress={()=> setIsSpecial(!isSpecial)}>
                        <Image
                          source={require('../../assets/img/export/check.png')}
                          style={{
                            width: isSpecial ? 14 : 0,
                            height: isSpecial ? 10 : 0,
                            resizeMode: 'contain',
                          }}
                        />
                      </Pressable>
                      
                      <Text style={{
                        fontSize:14,fontWeight:'700', color:'#0B1929', marginBottom:4
                      }}>
                      Sana Özel
                      </Text>
                    </View>
                    <View style={{
                      marginBottom:24,
                      alignItems:'center',
                      flexDirection:'row'
                    }}>
                      <Pressable
                        style={{
                          width:24,
                          height:24,
                          marginRight:8,
                          backgroundColor:isCashback ? '#015096':'#fff',
                          borderWidth:1, 
                          borderColor:'#DADEE7',
                          borderRadius:5,
                          alignItems:'center',
                          justifyContent:'center'
                        }}
                        onPress={()=> setIsCashback(!isCashback)}>
                        <Image
                          source={require('../../assets/img/export/check.png')}
                          style={{
                            width: isCashback ? 14 : 0,
                            height: isCashback ? 10 : 0,
                            resizeMode: 'contain',
                          }}
                        />
                      </Pressable>
                      
                      <Text style={{
                        fontSize:14,fontWeight:'700', color:'#0B1929', marginBottom:4
                      }}>
                      Cashback Kampanyaları
                      </Text>
                    </View>
                    <View style={{
                      marginBottom:24,
                      alignItems:'center',
                      flexDirection:'row'
                    }}>
                      <Pressable
                        style={{
                          width:24,
                          height:24,
                          marginRight:8,
                          backgroundColor:isPartnership ? '#015096':'#fff',
                          borderWidth:1, 
                          borderColor:'#DADEE7',
                          borderRadius:5,
                          alignItems:'center',
                          justifyContent:'center'
                        }}
                        onPress={()=> setIsPartnership(!isPartnership)}>
                        <Image
                          source={require('../../assets/img/export/check.png')}
                          style={{
                            width: isPartnership ? 14 : 0,
                            height: isPartnership ? 10 : 0,
                            resizeMode: 'contain',
                          }}
                        />
                      </Pressable>
                      
                      <Text style={{
                        fontSize:14,fontWeight:'700', color:'#0B1929', marginBottom:4
                      }}>
                      İş Birlikleri
                      </Text>
                    </View>
                    <View style={{
                      marginBottom:24,
                      alignItems:'center',
                      flexDirection:'row'
                    }}>
                      <Pressable
                        style={{
                          width:24,
                          height:24,
                          marginRight:8,
                          backgroundColor:isAward ? '#015096':'#fff',
                          borderWidth:1, 
                          borderColor:'#DADEE7',
                          borderRadius:5,
                          alignItems:'center',
                          justifyContent:'center'
                        }}
                        onPress={()=> setIsAward(!isAward)}>
                        <Image
                          source={require('../../assets/img/export/check.png')}
                          style={{
                            width: isAward ? 14 : 0,
                            height: isAward ? 10 : 0,
                            resizeMode: 'contain',
                          }}
                        />
                      </Pressable>
                      
                      <Text style={{
                        fontSize:14,fontWeight:'700', color:'#0B1929', marginBottom:4
                      }}>
                      Puan Kampanyaları
                      </Text>
                    </View>
                    <View style={{
                      marginBottom:24,
                      alignItems:'center',
                      flexDirection:'row'
                    }}>
                      <Pressable
                        style={{
                          width:24,
                          height:24,
                          marginRight:8,
                          backgroundColor:isPaymentOfEase ? '#015096':'#fff',
                          borderWidth:1, 
                          borderColor:'#DADEE7',
                          borderRadius:5,
                          alignItems:'center',
                          justifyContent:'center'
                        }}
                        onPress={()=> setIsPaymentOfEase(!isPaymentOfEase)}>
                        <Image
                          source={require('../../assets/img/export/check.png')}
                          style={{
                            width: isPaymentOfEase ? 14 : 0,
                            height: isPaymentOfEase ? 10 : 0,
                            resizeMode: 'contain',
                          }}
                        />
                      </Pressable>
                      
                      <Text style={{
                        fontSize:14,fontWeight:'700', color:'#0B1929', marginBottom:4
                      }}>
                      Ödeme Kolaylığı Kampanyaları
                      </Text>
                    </View>
                  
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
                        marginTop:60,
                      },
                    ]}
                    onPress={() => setFilterData()}>
                    <Text
                      style={{fontSize: 14, color: '#ffffff'}}>
                      Kampanyaları Göster
                    </Text>
                  </TouchableOpacity>
               
              </View>
            </View>
      </Modal>  
      <Modal
            animationType="slide"
            transparent={true}
            visible={orderModalVisible}
            onRequestClose={() => {
              setOrderModalVisible(!orderModalVisible);
            }}>
            <View
              style={{
                flex: 1,                
                justifyContent: 'flex-end',
                alignItems: 'flex-end',
                backgroundColor: 'rgba(92, 92, 92, 0.56)',
              }}>
              <View
                style={{
                  backgroundColor:'#fff',
                  borderTopLeftRadius: 24,
                  borderTopRightRadius: 24,
                  paddingTop: 30,
                  paddingBottom: 16,
                  paddingLeft: 16,
                  paddingRight: 16,
                  width: '100%',
                }}>
                  <View style={{
                    flexDirection:'row',
                    justifyContent:'space-between',
                    alignItems:'center',
                    marginBottom:16,
                  }}>
                    <Text style={{
                      fontSize:14,
                      lineHeight:16,
                      color:'#004F97',
                    }}>
                      Sırala
                    </Text>
                    <TouchableOpacity 
                      style={{
                        width:24,
                        height:24,
                      }}
                      onPress={() => {
                        console.log('close');
                        setOrderModalVisible(false);}}>                  
                        <Image 
                        source={require('../../assets/img/export/close.png')}
                        style={{
                          width: 24,
                          height: 24,
                          resizeMode: 'contain',
                        }}
                      />
                    </TouchableOpacity>
                  </View>
                  
                  <TouchableOpacity style={{
                    flexDirection:'row',
                    alignItems:'center',
                    paddingTop:8,
                    paddingBottom:8,
                    backgroundColor: orderType === 'DateDescending' ? '#F2F4F6' : '#fff'
                  }}
                  onPress={()=>{
                    setOrderType('DateDescending');
                    console.log(orderType)
                    }}>
                    <View style={{
                      width:24, height:24, borderRadius:24, borderWidth:1, borderColor:'#004F97', marginRight:8,
                    }}
                    onPress={() => {
                      setOrderType('DateDescending');
                      console.log(orderType)
                      }}>
                        
                      <View style={{
                        width:12, 
                        height:12, 
                        borderRadius:12, 
                        backgroundColor:'#004F97', 
                        position:'absolute', 
                        top:5, 
                        left:5,
                        display: orderType === 'DateDescending' ? 'flex' : 'none'}}></View>
                    </View>
                      <Text style={{
                        fontSize:16,fontWeight:'700', color:'#004F97', marginBottom:4
                      }}>
                      Tarihe göre en yeni
                      </Text>
                      
                  </TouchableOpacity>
                  <TouchableOpacity style={{
                    flexDirection:'row',
                    alignItems:'center',
                    paddingTop:8,
                    paddingBottom:8,
                    backgroundColor: orderType === 'DateAscending' ? '#F2F4F6' : '#fff'
                  }}
                  onPress={()=>{
                    setOrderType('DateAscending');
                    console.log(orderType);
                  }
                  }>
                    <View style={{
                      width:24, height:24, borderRadius:24, borderWidth:1, borderColor:'#004F97', marginRight:8,
                    }}
                    onPress={() => {
                      setOrderType('DateAscending');
                      console.log(orderType);
                      }}>
                        
                      <View style={{
                        width:12, 
                        height:12, 
                        borderRadius:12, 
                        backgroundColor:'#004F97', 
                        position:'absolute', 
                        top:5, 
                        left:5,
                        display: orderType === 'DateAscending' ? 'flex' : 'none'}}></View>
                    </View>
                      <Text style={{
                        fontSize:16,fontWeight:'700', color:'#004F97', marginBottom:4
                      }}>
                      Tarihe göre en eski
                      </Text>
                      
                  </TouchableOpacity>
                  <TouchableOpacity style={{
                    flexDirection:'row',
                    alignItems:'center',
                    paddingTop:8,
                    paddingBottom:8,
                    backgroundColor: orderType === 'BrandAscending' ? '#F2F4F6' : '#fff'
                  }}
                  onPress={()=>setOrderType('BrandAscending')}>
                    <View style={{
                      width:24, height:24, borderRadius:24, borderWidth:1, borderColor:'#004F97', marginRight:8,
                    }}
                    onPress={() => {
                      setOrderType('BrandAscending');
                      }}>
                        
                      <View style={{
                        width:12, 
                        height:12, 
                        borderRadius:12, 
                        backgroundColor:'#004F97', 
                        position:'absolute', 
                        top:5, 
                        left:5,
                        display: orderType === 'BrandAscending' ? 'flex' : 'none'}}></View>
                    </View>
                      <Text style={{
                        fontSize:16,fontWeight:'700', color:'#004F97', marginBottom:4
                      }}>
                      Markalara göre A-Z
                      </Text>
                      
                  </TouchableOpacity>
                  <TouchableOpacity style={{
                    flexDirection:'row',
                    alignItems:'center',
                    paddingTop:8,
                    paddingBottom:8,
                    backgroundColor: orderType === 'BrandDescending' ? '#F2F4F6' : '#fff'
                  }}
                  onPress={()=>setOrderType('BrandDescending')}>
                    <View style={{
                      width:24, height:24, borderRadius:24, borderWidth:1, borderColor:'#004F97', marginRight:8,
                    }}
                    onPress={() => {
                      setOrderType('BrandDescending');
                      }}>
                        
                      <View style={{
                        width:12, 
                        height:12, 
                        borderRadius:12, 
                        backgroundColor:'#004F97', 
                        position:'absolute', 
                        top:5, 
                        left:5,
                        display: orderType === 'BrandDescending' ? 'flex' : 'none'}}></View>
                    </View>
                      <Text style={{
                        fontSize:16,fontWeight:'700', color:'#004F97', marginBottom:4
                      }}>
                      Markalara göre Z-A
                      </Text>
                      
                  </TouchableOpacity>
                  
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
                        marginTop:60,
                      },
                    ]}
                    onPress={() => setFilterData()}>
                    <Text
                      style={{fontSize: 14, color: '#ffffff'}}>
                      Kampanyaları Göster
                    </Text>
                  </TouchableOpacity>
               
              </View>
            </View>
      </Modal>    
      <Loader loading={loading} />
      <SubtabHeaderWithSearch routetarget={"Discover"} name="Kampanyalar" count="0" openCallback={onSearchPress} inputCallback={onInput} searchCallback={onSearch} closeCallback={onSearchClose} eraseCallback={onErase}/>
      <LinearGradient colors={['#fcfcfd', '#fbfbfd']} 
      style={{
        position:'absolute',
        width:'100%',
        height:'100%',
        top:60,
        zIndex:0,
        
      }}
      >
  
      </LinearGradient>
      <View style={{
        position:'absolute',
        top:60,
        left:0,
        backgroundColor:'#fff',
        padding:16,
        paddingTop:0,
        display:showSearch? 'flex' : 'none',
        width:'100%',
        height:'100%',
        zIndex:10,
      }}>
        <View style={{
          width:'100%',
          height:16,
          // backgroundColor:'#ff0000',
          // shadowColor:'#000000',
          // shadowOffset:{
          //   width:0,
          //   height:20,
          // },
          // shadowOpacity:0.5,
          // shadowRadius:5,
          // elevation:10,
        }}>
          <Text style={{
            fontSize:14,
            fontWeight:700,
            color:'#0B1929',
            marginBottom:12
          }}>
            Popüler Aramalar
          </Text>
        </View>
        <View style={{flexDirection:'row', flexWrap:'nowrap'}}>
        {
           popularSearches.map((data, i) => {
              console.log("popularSearches "+popularSearches.length);
              console.log("data "+data);
            return (
              popularSearches.length > 0 ? 
              <TouchableOpacity key={"a"+popularSearches[i]} style={{
                paddingTop:13,
                paddingBottom:13,
                paddingLeft:12,
                paddingRight:12,
                borderRadius:6,
                backgroundColor:'#DFF0FF',
                marginLeft:8,
                marginBottom:12,
              }}
              onPress={()=> searchKeyword(popularSearches[i])}>
                <Text style={{
                  fontSize:12,
                  color:'#004F97'
                }}>
                  {popularSearches[i]}
                </Text>
              </TouchableOpacity>
              : <View></View>
            )
          })
          }
        </View>
        {renderSuggestionItems()}
      </View>
      <View style={{padding:16,}}>
        <View style={{borderRadius:16}}>          
          <View style={{
            padding:8,
            borderRadius:8,
            backgroundColor:'#fff',
            flexDirection:'row',
            justifyContent:'space-between',
            alignItems:'center',
            width:'100%',
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.15,
            shadowRadius: 3.84,
            elevation: 8,
          }}>
            <TouchableOpacity 
            style={{
              alignItems:'center', 
              justifyContent:'center',
              borderRadius:8,
              height:46,
              width:'50%',
              backgroundColor: transactionType==='all'? '#004F97' : '#fff',
            }}
            onPress={()=>{
              setTransactionType('all');
              getCampaigns(false);
            }}
            >
              <Text style={{
                fontSize:12,
                color: transactionType==='all'? '#fff':'#909EAA',
              }}
              >
                Tümü
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
            style={{
              alignItems:'center', 
              justifyContent:'center',
              borderRadius:8,
              height:46,
              width:'50%',
              backgroundColor: transactionType==='special'? '#004F97' : '#fff',
            }}
            onPress={()=>{
              setTransactionType('special');
              getCampaigns(true);
            }}
            >
              <Text style={{
                fontSize:12,
                color: transactionType==='special'? '#fff':'#909EAA',
              }}
              >
                Payfour'a Özel
              </Text>
            </TouchableOpacity>            

          </View>
          
        </View>
      </View>
      <View style={{
        backgroundColor:'#fff',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        paddingLeft:16,
        paddingRight:16,
      }}>
        <TouchableOpacity 
            style={{
              alignItems:'center', 
              justifyContent:'center',
              flexDirection:'row',
              borderRadius:8,
              height:46,
              width:'50%',
              backgroundColor:'#fff',
            }}
            onPress={()=>{
              setFilterModalVisible(true);
            }}
            >
              <Text style={{
                fontSize:14,
                color: '#909EAA',
                marginRight:16,
              }}
              >
                Filtrele
              </Text>
              <Image 
              source={require('../../assets/img/export/icon_filter.png')}
              style={{
                resizeMode:'contain',
                width:24,
                height:24,
              }}></Image>
            </TouchableOpacity>
            <View style={{width:1,height:24, backgroundColor:'#E4E4E8',}}></View>
            <TouchableOpacity 
            style={{
              alignItems:'center', 
              justifyContent:'center',
              flexDirection:'row',
              borderRadius:8,
              height:46,
              width:'50%',
              backgroundColor: '#fff',
            }}
            onPress={()=>{
              setOrderModalVisible(true);
            }}
            >
              <Text style={{
                fontSize:14,
                color: '#909EAA',
                marginRight:16,
              }}
              >
                Sırala
              </Text>
              <Image 
              source={require('../../assets/img/export/icon_order.png')}
              style={{
                resizeMode:'contain',
                width:24,
                height:24,
              }}></Image>
            </TouchableOpacity>
      </View>
      <View style={{
        paddingTop:12,
        paddingBottom:100,
        paddingLeft:16,
        paddingRight:16,
        flex:1,
        width:'100%',
      }}
      >
        {renderCampaigns()} 
      </View>  
         
    </SafeAreaView>
  );

}
const CampaignDetail = ({navigation, route}) => {
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [joined, setJoined] = useState(false);
  const [campaignDetailData, setCampaignDetailData] = useState({title:'', longDescription:'', imageUrl:'https://reimg-carrefour.mncdn.com/bannerimage/Carre4433_0_MC/8862580539442.jpg', time:'', barLines:[], targetAward:0, memberCurrentCount:0});
  const [modalVisible, setModalVisible] = useState(false);
  const [copyModalVisible, setCopyModalVisible] = useState(false);
  const [codeModalVisible, setCodeModalVisible] = useState(false);
  const [rulesModalVisible, setRulesModalVisible] = useState(false);
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [isAllStores, setIsAllStores] = useState(false);
  const [barLines, setBarLines] = useState([]);
  const [barNums, setBarNums] = useState([]);
  const [referral, setReferral] = useState('');
  const [campaignCode, setCampaignCode] = useState('');

  useEffect(() => {   
    const unsubscribe = navigation.addListener('focus', () => {
      // do something
      console.log('campaign detail');
      console.log(navigation);
      console.log(route);
      console.log(route.params);
      console.log(route.params.id);
      //console.log(Dimensions.get('window').width);
      console.log('https://payfourapp.test.kodegon.com/api/campaigns/'+route.params.id)
        AsyncStorage.getItem('token').then(value =>{
          const config = {
            headers: { Authorization: `Bearer ${value}` }
          }          
          axios.get('https://payfourapp.test.kodegon.com/api/campaigns/'+route.params.id, config).then(response => {
            //console.log(response.data);
            console.log(response.data.data);
            
            setShowMore(false);
            let sl = response.data.data;
            let dt = new Date(sl.expireDate);
            let tdt = new Date();
            let t = (((dt.getDate()<10)? "0"+dt.getDate() : dt.getDate())) +'.'+(((dt.getMonth()+1)<10)? "0"+(dt.getMonth()+1) :(dt.getMonth()+1))+'.'+dt.getFullYear();
            sl.time = t;
            const diffInMs   = new Date(sl.expireDate) - new Date();
            const diffInDays = parseInt(diffInMs / (1000 * 60 * 60 * 24));            
            console.log("diffindays");
            console.log(diffInDays);
            console.log("title :" +sl.title);
            sl.diff = diffInDays;
            sl.expired = (dt.getTime() < tdt.getTime());
            const re = /<p>/gi;
            const re2 = /<\/p>/gi;
            sl.longDescription = sl.longDescription.replace(re, "<div>");
            sl.longDescription = sl.longDescription.replace(re2, "</div>");
            sl.howTo = sl.howTo.replace(re, "<div>");
            sl.howTo = sl.howTo.replace(re2, "</div>");
            sl.terms = sl.terms.replace(re, "<div>");
            sl.terms = sl.terms.replace(re2, "</div>");
            console.log(sl.longDescription);
            console.log(sl.howTo);
            console.log(sl.terms);
            console.log("targetCount");
            console.log(sl.targetCount);
            sl.barLines = [];
            let lineArr = [];

            for(var i=0; i < parseInt(sl.targetCount)+1; i++){
              console.log(i);
              sl.barLines.push({point: i, key:"barLine"+i});
            }
            //sl.barLines = lineArr;
            //setBarLines(lineArr);
            console.log("sl.barLines");
            console.log(sl.barLines);
            setCampaignDetailData(sl);
            setIsAllStores(sl.isAllStores);

            /*if(response.data.data.balance != null){
              let b = parseFloat(response.data.data.balance).toFixed(2).replace('.', ',');
              setBalance(b);
            }
            setLoading(false);
            checkCampaigns();*/
          })
          .catch(error => {
            console.error("Error sending data: ", error);
            let msg="";
            (error.response.data.errors.message) ? msg += error.response.data.errors.message+"\n" : msg += "Ödeme hatası \n"; (error.response.data.errors.paymentError) ? msg += error.response.data.errors.paymentError+"\n" : msg += ""; Alert.alert(msg);
          })        });
      
    });
    return unsubscribe;
  }, [route.params?.id]);

  // const renderBarlines  = campaignDetailData.barLines.map(line => 
  //   <View key={line.point}
  //   style={{
  //     position:'absolute',
  //     top:0,
  //     left:(Dimensions.get('window').width - 64) / barLines.length * line.point,
  //     height:16,
  //     width:1,
  //     backgroundColor: '#ff0000'
  //   }}>
  //     <span>{line.point}</span>
  //   </View>
  // )
  const joinCampaign = ()=>{
    setLoading(true);
    AsyncStorage.getItem('token').then(value =>{
      const config = {
        headers: { Authorization: `Bearer ${value}` }
      };
      let dataToSend = {
        campaignId: route.params.id, 
        code: "",
      };    

    console.log("forgot data");
    console.log(dataToSend);
    //https://payfourapp.test.kodegon.com/api/auth/addcustomerbasic
    axios.post('https://payfourapp.test.kodegon.com/api/campaigns/participate', dataToSend, config)
      .then(response => {
        console.log(response.data);
        console.log(response.data.data);
        setLoading(false);
        setJoined(true);
        //AsyncStorage.setItem('accessToken', response.data.data.accessToken).then(() =>{
          //navigation.navigate("LoginWithPasswordScreen");
        //})
      })
      .catch(error => {
        setLoading(false);
        console.error("Error sending data: ", error);
        console.log(error.response);
        let msg="";
        (error.response.data.errors.message) ? msg += error.response.data.errors.message+"\n" : msg += "Ödeme hatası \n"; (error.response.data.errors.paymentError) ? msg += error.response.data.errors.paymentError+"\n" : msg += ""; Alert.alert(msg);
      });
    });
  }
  const copyCode = ()=>{
    Clipboard.setString(referral);
    setSuccessModalVisible(true);
  }
  const sendCode = ()=>{
    setCodeModalVisible(false);
    setLoading(true);
    /*{
  "campaignId": 0,
  "code": "string"
}*/
    AsyncStorage.getItem('token').then(value =>{
      const config = {
        headers: { Authorization: `Bearer ${value}` }
      };
    let dataToSend = {
      campaignId: route.params.id, 
      code: campaignCode,
    };    

    console.log("send campaign code");
    console.log(dataToSend);
    //https://payfourapp.test.kodegon.com/api/auth/addcustomerbasic
    axios.post('https://payfourapp.test.kodegon.com/api/campaigns/participate', dataToSend, config)
      .then(response => {
        console.log(response.data);
        console.log(response.data.data);
        setLoading(false);
        setJoined(true);
        //AsyncStorage.setItem('accessToken', response.data.data.accessToken).then(() =>{
          //navigation.navigate("LoginWithPasswordScreen");
        //})
      })
      .catch(error => {
        setLoading(false);
        console.error("Error sending data: ", error);
        console.log(error.response);
        let msg="";
        (error.response.data.errors.message) ? msg += error.response.data.errors.message+"\n" : msg += "Ödeme hatası \n"; (error.response.data.errors.paymentError) ? msg += error.response.data.errors.paymentError+"\n" : msg += ""; Alert.alert(msg);
      });
    });
  }
  const renderBarNums = () =>{
    
    return(
      <View></View>
    )
  }
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      
      <Modal
          animationType="slide"
          transparent={true}
          visible={successModalVisible}
          onRequestClose={() => {
            setSuccessModalVisible(!successModalVisible);
          }}>
            <View
              style={{
                flex: 1,                
                justifyContent: 'flex-end',
                alignItems: 'flex-end',
                backgroundColor: 'rgba(92, 92, 92, 0.56)',
              }}>
          
      
      
      <View style={{
        borderTopLeftRadius:24,
        borderTopRightRadius:24,
        backgroundColor:'#fff',
        paddingTop:32,
        paddingBottom:32,
        paddingLeft:16,
        paddingRight:16,
        position:'absolute',
        bottom:0,
        width:Dimensions.get('window').width

      }}>       
        
        <View>
        <Text style={{fontSize:16, color:'#004F97', textAlign:'center', fontWeight:'500', marginBottom:48}}>
        Kodunuz başarıyla kopyalandı.
        </Text>        
        </View>
        <TouchableOpacity
          style={[regstyles.buttonStyle, {padding:0, marginLeft:0,marginRight:0, marginBottom: 10, backgroundColor: '#004F97', flex:1}]}              
          activeOpacity={0.5}
          onPress={()=>{
            console.log("close success");
            setCopyModalVisible(false);
            setSuccessModalVisible(false);
            setRulesModalVisible(false);
            }}>
          <Text style={regstyles.buttonTextStyle}>Kapat</Text>
        </TouchableOpacity>
      </View>
      </View>
      </Modal>
      <Modal
            animationType="slide"
            transparent={true}
            visible={copyModalVisible}
            onRequestClose={() => {
              setCopyModalVisible(!copyModalVisible);
            }}>
            <View
              style={{
                flex: 1,  
                flexDirection:'column',              
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
                  width:Dimensions.get('window').width
                }}>
                  
                  <View style={{
                      flexDirection:'row',
                      justifyContent:'space-between',
                      }}>
                        <Text style={{
                          fontSize:14,
                          fontWeight:'700',
                          color:'#004F97',
                          lineHeight:20,
                          textAlign:'left',
                          marginBottom:24,
                        }}>
                          {campaignDetailData.title}
                        </Text>
                        <TouchableOpacity 
                      style={{
                        width:24,
                        height:24,
                      }}
                      onPress={() => {
                        console.log('close');
                        setCopyModalVisible(false);}}>                  
                        <Image 
                        source={require('../../assets/img/export/close.png')}
                        style={{
                          width: 24,
                          height: 24,
                          resizeMode: 'contain',
                        }}
                      />
                    </TouchableOpacity>
                       </View> 
                <View style={{marginBottom:24}}>
                <View style={[regstyles.registerInputStyle, {borderColor: '#EBEBEB',paddingBottom:0, height:60, paddingTop:24, 
                  paddingLeft:16, flexDirection:'row', justifyContent:'space-between', alignItems:'center'}]}>                     
                    <Text style={{                                           
                        fontSize: 12,
                        lineHeight:12, 
                        padding:0,
                        color: '#909EAA', 
                        position:'absolute',
                        top:14,                     
                        left:16,
                        pointerEvents:"none",
                    }}>
                      Kampanya Kodu
                    </Text>
                    <Text style={{color:'#0B1929', fontSize:14, fontWeight:700}}>
                      {campaignDetailData.campaignContentCode}
                    </Text>
                      
                      <TouchableOpacity style={{
                        position:'absolute',
                        top:10,
                        right:10,
                        width:107,
                        height:40,
                        alignItems:'center',
                        justifyContent:'center',
                        flexDirection:'row',
                        borderRadius:6,
                        borderWidth:1,
                        borderColor:'#004F97',
                      }}
                      onPress={()=> {
                        console.log("referral");
                        console.log(referral);
                        copyCode()}}>
                        <Image
                          source={require('../../assets/img/export/copytoclipboard.png')}
                          style={{
                            width:24,
                            height:24,
                            marginRight:8
                          }}
                        />
                        <Text style={{
                          fontSize:12,
                          color:'#004F97',
                          fontWeight:'700',
                        }}>
                          Kopyala
                        </Text>
                      </TouchableOpacity>
                  </View>
                      </View>
                  </View>
                  
               
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
               </ScrollView>
            </View>
      </Modal>
      <Modal
            animationType="slide"
            transparent={true}
            visible={codeModalVisible}
            onRequestClose={() => {
              setCodeModalVisible(!codeModalVisible);
            }}>
            <View
              style={{
                flex: 1,  
                flexDirection:'column',              
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
                  width:Dimensions.get('window').width
                }}>
                  
                  <View style={{
                      flexDirection:'row',
                      justifyContent:'space-between',
                      }}>
                        <Text style={{
                          fontSize:14,
                          fontWeight:'700',
                          color:'#004F97',
                          lineHeight:20,
                          textAlign:'left',
                          marginBottom:24,
                        }}>
                          {campaignDetailData.title}
                        </Text>
                        <TouchableOpacity 
                      style={{
                        width:24,
                        height:24,
                      }}
                      onPress={() => {
                        console.log('close');
                        setCodeModalVisible(false);}}>                  
                        <Image 
                        source={require('../../assets/img/export/close.png')}
                        style={{
                          width: 24,
                          height: 24,
                          resizeMode: 'contain',
                        }}
                      />
                    </TouchableOpacity>
                       </View> 
                <View style={{marginBottom:24}}>
                <View style={[regstyles.registerInputStyle, {borderColor: '#EBEBEB', height:60, 
                  paddingLeft:16, flexDirection:'row', justifyContent:'space-between', alignItems:'center'}]}>                     
                    <TextInput
                        style={[
                          Platform.OS == "ios"
                            ? registerStyles.inputIos
                            : registerStyles.inputAndroid,
                        {color:'#0B1929'}]
                        }
                        onChangeText={(code) =>
                          setCampaignCode(code)
                        }
                        placeholder="Kodu Girin"
                        placeholderTextColor="#7E797F"
                        keyboardType="normal"
                        onSubmitEditing={Keyboard.dismiss}
                        blurOnSubmit={false}
                        underlineColorAndroid="#f000"
                        returnKeyType="next"
                      />
                  </View>
                      </View>
                  </View>
                  
               
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
                  onPress={() => sendCode()}>
                  <Text
                    style={{fontSize: 14, color: '#ffffff'}}>
                    Gönder
                  </Text>
                </TouchableOpacity>
               </View>
               </ScrollView>
            </View>
      </Modal>
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
                flexDirection:'column',              
                justifyContent: 'flex-end',
                alignItems: 'flex-end',
                backgroundColor: 'rgba(0, 0, 0, 0.6)',
              }}>              
              <View
                style={{
                  width:Dimensions.get('window').width,
                  backgroundColor:'#fff',
                  borderTopLeftRadius: 24,
                  borderTopRightRadius: 24,
                  paddingTop: 33,
                  paddingLeft: 16,
                  paddingRight: 16,
                  
                }}>
                  
                  <View style={{
                      flexDirection:'row',
                      justifyContent:'space-between',
                      }}>
                        <Text style={{
                          fontSize:14,
                          fontWeight:'700',
                          color:'#004F97',
                          lineHeight:20,
                          textAlign:'left',
                          marginBottom:24,
                        }}>
                          Kampanya Kuralları
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
                        source={require('../../assets/img/export/close.png')}
                        style={{
                          width: 24,
                          height: 24,
                          resizeMode: 'contain',
                        }}
                      />
                    </TouchableOpacity>
                       </View> 
                <View style={{marginBottom:24}}>
                        <Text style={{
                          fontSize:12,
                          fontWeight:'700',
                          color:'#004F97',
                          marginBottom:8,
                        }}>
                          Nasıl Katılırım ?
                        </Text>
                        <HTMLView
                        value={campaignDetailData.howTo}
                        stylesheet={htmlStyles}
                      />     
               
                      </View>
                      <View style={{paddingBottom:18}}>
                        <Text style={{
                          fontSize:12,
                          fontWeight:'700',
                          color:'#004F97',
                          marginBottom:8
                        }}>
                          Ne Kazanırım ?
                        </Text>
                        <HTMLView
                          value={campaignDetailData.terms}
                          stylesheet={htmlStyles}
                        />   
                      </View>
                  </View>
                  
               
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
                  onPress={() => {
                    setRulesModalVisible(false);}
                  }>
                  <Text
                    style={{fontSize: 14, color: '#ffffff'}}>
                    Kapat
                  </Text>
                </TouchableOpacity>
               </View>
            </View>
      </Modal>
      <Loader loading={loading} />      
      
      <SubtabHeader routetarget={route.params.source? "discover" : "CampaignList"} name="Kampanya Detayı" count="0" />

      <ScrollView
        keyboardShouldPersistTaps="handled"
        style={[styles.scrollView, {width: '100%', }]}>
        <View style={{paddingBottom:120}}>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 22,
            }}>
              <View style={{
                position:'absolute',
                top:0,
                left:0,
                width:'100%',
                height:'100%',
                backgroundColor:campaignDetailData.expired?  'rgba(0,0,0,0.5)' : 'none',
                zIndex:2,
              }}></View>
            <Image
              source={{uri: campaignDetailData =={} ? '' : campaignDetailData.imageUrl}}
              style={{
                width: '100%',
                height:Dimensions.get('window').width*0.466
              }}
              resizeMode={'cover'}
            />
          </View> 
          
          <View style={{
            backgroundColor:'#F2F4F6',
            paddingTop:16,
            paddingBottom:16,
            paddingLeft:24,
            paddingRight:24,
            display: campaignDetailData.campaignType ==2 ? 'flex' : 'none',

          }}>
            <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
              <View style={{width:Dimensions.get('window').width - 120}}>
                <Text style={{
                  fontSize:12,
                  lineHeight:16,
                  color:'#0B1929',
                  textAlign:'center',
                  marginBottom:12,
                }}>
                  Kampaya kapsamında {campaignDetailData.targetCount - campaignDetailData.memberCurrentCount} alışveriş daha yapın toplam 
                  <Text style={{fontWeight:700, color:'#004F97'}}>{campaignDetailData.targetAward} TL CarrefourSA Puan</Text> kazanın.
                </Text>
                <View style={{paddingBottom:20}}>
                
                  
                  <View style={{
                    width:'100%',
                    height:8,
                    backgroundColor:'#fff',
                    borderRadius:12
                    }}>
                    {/* barbg */}
                    <View style={{
                      width:'100%',
                      height:8,
                      position:'absolute',
                      top:0,
                      left:0,
                      zIndex:5,
                      borderRadius:12
                    }}>
                      {/* barfill */}
                      
                      <LinearGradient 
                      start={{x: 0.0, y: 0.0}} end={{x: 1.0, y: 0.0}}
                      locations={[0,0.34,1]}
                      colors={['#7EBEF5', '#005BAA', '#ED1C67']} 
                      style={{
                        width:campaignDetailData.barLines.length > 0 ? (Dimensions.get('window').width - 120) / (campaignDetailData.barLines.length-1) * campaignDetailData.memberCurrentCount :0,
                        height:8,
                        borderTopLeftRadius:12,
                        borderBottomLeftRadius:12,
                      }}>

                      </LinearGradient>
                    </View>
                    <View style={{
                      width:'100%',
                      height:8,
                      position:'absolute',
                      top:0,
                      left:0,
                      borderRadius:12,
                      zIndex:6
                    }}>
                      {/* barlines */}
                      {
                      [...Array(campaignDetailData.barLines.length).keys()].map(key => {
                        console.log("barLines ");
                        console.log(campaignDetailData.barLines);
                        console.log("barLines "+campaignDetailData.barLines.length);
                        console.log("key "+key);
                        console.log(campaignDetailData.barLines[key].key);
                      return (
                        campaignDetailData.barLines.length > 0 && key != 0? 
                        <View key={campaignDetailData.barLines[key].key}
                        style={{
                          position:'absolute',
                          top:0,
                          //left:20 * campaignDetailData.barLines[key].point,
                          left: campaignDetailData.barLines.length > 0 ? (Dimensions.get('window').width - 120) / (campaignDetailData.barLines.length-1) * campaignDetailData.barLines[key].point : 0,
                          height:8,
                          width:1,
                          backgroundColor: '#fff'
                        }}>
                          <Text>{campaignDetailData.barLines[key].point}</Text>
                        </View>
                        : <View></View>
                      )
                    })
                    }
                      
                    </View>
                    <View style={{
                      width:'100%',
                      height:8,
                      position:'absolute',
                      top:0,
                      left:0,
                      borderRadius:12
                    }}>
                      {/* barlines */}
                      {
                      [...Array(campaignDetailData.barLines.length).keys()].map(key => {
                        console.log("barLines ");
                        console.log(campaignDetailData.barLines);
                        console.log("barLines "+campaignDetailData.barLines.length);
                        console.log("key "+key);
                        console.log(campaignDetailData.barLines[key].key);
                      return (
                        campaignDetailData.barLines.length > 0 && key != 0? 
                        <View key={campaignDetailData.barLines[key].key}
                        style={{
                          position:'absolute',
                          top:0,
                          //left:20 * campaignDetailData.barLines[key].point,
                          left: (Dimensions.get('window').width - 120) / (campaignDetailData.barLines.length-1) * campaignDetailData.barLines[key].point,
                          height:8,
                          width:1,
                          backgroundColor: '#fff'
                        }}>
                          <Text style={{
                            fontSize:10,
                            color:'#004F97',
                            
                          }}>{campaignDetailData.barLines[key].point}</Text>
                        </View>
                        : <View></View>
                      )
                    })
                    }
                      
                    </View>
                    <View style={{
                      width:'100%',
                      height:8,
                      position:'absolute',
                      top:0,
                      left:0,
                      borderRadius:12
                    }}>
                    {
                      [...Array(campaignDetailData.barLines.length).keys()].map(key => {
                        console.log("barLines ");
                        console.log(campaignDetailData.barLines);
                        console.log("barLines "+campaignDetailData.barLines.length);
                        console.log("key "+key);
                        console.log(campaignDetailData.barLines[key].key);
                      return (
                        campaignDetailData.barLines.length > 0? 
                        <View key={campaignDetailData.barLines[key].key}
                        style={{
                          position:'absolute',
                          top:20,
                          //left:20 * campaignDetailData.barLines[key].point,
                          left: (Dimensions.get('window').width - 128) / (campaignDetailData.barLines.length-1) * campaignDetailData.barLines[key].point,
                          height:16,
                          width:12,
                        }}>
                          <Text style={{
                            fontSize:10,
                            color:'#004F97', 
                            textAlign:'center',
                          }}>{campaignDetailData.barLines[key].point}</Text>
                        </View>
                        : <View></View>
                      )
                    })
                    }
                    </View>
                  </View>

                  
                </View>
              </View>
              <View style={{width:45, height:45, alignItems:'center', justifyContent:'center'}}>
                      <Image 
                        source={require('../../assets/img/export/main_campaign_badge.png')}
                        style={{
                          resizeMode:'contain',
                          width:45,
                          height:45,
                          top:0,
                          left:0,
                          position:'absolute',

                        }}>
                        </Image>
                        <View style={{}}>
                          <Text style={{color:'#fff', fontSize:10, fontWeight:'700', textAlign:'center'}}>{campaignDetailData.targetAward} TL</Text>
                          <Text style={{color:'#fff', fontSize:8, textAlign:'center'}}>Puan</Text>
                        </View>
              </View>
            </View>
          </View>
            
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'flex-start',
              paddingTop: 16,
              paddingLeft: 16,
              paddingRight: 16,
              width: '100%',
              paddingBottom: 12,
            }}>
              <View style={{
                flexDirection:'row',
                alignItems:'center',
                justifyContent:'space-between',
                marginBottom:12,
                width:'100%',
              }}>
              <Text style={{
                fontSize:16,
                fontWeight:'500',
                color:'#28303F',
                paddingRight:16,
                textAlign:'left',
              }}>{campaignDetailData.title}</Text>
                <TouchableOpacity style={{}}>
                  <Image
                    source={require('../../assets/img/export/campaign_detail_icon2.png')}
                    style={{
                      width: 32,
                      height:32
                    }}
                />
                </TouchableOpacity>
            </View>
            <View style={{
                display:'flex',
                width:'100%',
                flexDirection:'row',
                alignItems:'center',
                justifyContent:'space-between',
                marginBottom:12,
              }}>
                <View style={{
                  flexDirection:'row',
                  alignItems:'center',
                }}>
                  <Image
                    source={require('../../assets/img/export/time-oclock.png')}
                    style={{
                      width: 10,
                      height:10,
                      marginRight:8,
                    }}
                  />
                  <Text style={{fontSize:10, color:'#004F97'}}>Son gün {campaignDetailData.time}</Text>
                </View>
                <View style={{
                  height:20,
                  paddingLeft:8,
                  paddingRight:8,
                  borderRadius:4,
                  alignItems:'center',
                  justifyContent:'center',
                  backgroundColor:'#FFF4CD',
                  display :campaignDetailData.diff > 20? 'none' : 'flex'}}>
                  <Text style={{
                    fontSize:12, 
                    fontWeight:500, 
                    color:'#FFA908',
                    
                    }}>Son {parseInt(campaignDetailData.diff)} Gün</Text>
                </View>
              </View>
            <View style={{marginBottom:12}}>
              {/* 1 Nisan - 15 Mayıs 2024 tarihleri arasında, Payfour anlaşmalı Shell istasyonlarından tek seferde ve farklı günlerde gerçekleştirilecek 
              <Text style={{fontSize:12, color:'#0B1929', fontWeight:'700'}}>750 TL ve üzeri 4. akaryakıt ya da otogaz alışverişine,</Text> Payfour anlaşmalı Shell istasyonlarından yapılacak yakıt alışverişlerinde kullanılmak üzere 400 TL CarrefourSA Puan! */}
              <HTMLView
                value={campaignDetailData.longDescription}
                stylesheet={htmlStyles}
              /> 
              {/* <View style={{display: showMore ? 'flex':'none', fontSize:12, color:'#909EAA'}}>
                <HTMLView
                value={campaignDetailData.howTo}
                stylesheet={htmlStyles}
              />     
               <HTMLView
                value={campaignDetailData.terms}
                stylesheet={htmlStyles}
              />
                </View> */}
            </View>
            {/* <View style={{width:'100%', marginBottom:12}}>
              <TouchableOpacity 
              style={{justifyContent:'flex-start'}}
              onPress={()=> showMore?setShowMore(false):setShowMore(true)}
              >
              <Text style={{fontSize:12, color:'#004F97', textAlign:'left'}}>Daha fazla göster</Text>
              </TouchableOpacity>
            </View>           */}
          </View>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 22,
            }}>
            <Image
              source={require('../../assets/img/export/campaign_map.png')}
              style={{
                width: '100%',
                height:Dimensions.get('window').width*0.533
              }}
              resizeMode={'cover'}
            />
            <TouchableOpacity style={{
              position:'absolute',
              bottom:16,
              width:198,
              height:40,
              borderRadius:6,
              borderWidth:1,
              borderColor:'#004F97',
              backgroundColor:'#fff',
              alignItems:'center',
              justifyContent:'center',
              flexDirection:'row', 
              display:isAllStores? 'flex' : 'none'           
              }}>
                <Image
                  source={require('../../assets/img/export/map-location.png')}
                  style={{
                    width: 16,
                    height:16,
                    marginRight:4
                  }}
                />
                <Text style={{fontSize:12, color:'#004F97', fontWeight:'500'}}>Geçerli Şubeler için Tıkla</Text>
            </TouchableOpacity>
          </View> 
          <View style={{paddingLeft:16, paddingRight:16}}>
          <TouchableOpacity
            style={{
              marginBottom:12,
              borderWidth:1,
              borderColor:'#004F97',
              borderRadius:8,
              width:'100%',
              height:52,
              marginBottom:16,
              flexDirection:'row',
              alignItems:'center',
              justifyContent:'center',
              backgroundColor: joined? '#004F97' : '#fff',
              display: campaignDetailData.campaignContentType == 2 ? 'flex' : 'none',
            }}
          onPress={()=> joinCampaign()}>
            <Image
              source={require('../../assets/img/export/checkmark.png')}
              style={{
                width: 24,
                height:24,
                marginRight:8,
                display:joined?'flex':'none',
              }}
            />
            <Text style={{
              fontSize:14, 
              fontWeight:500, 
              color:joined?'#fff' : '#004F97'}}>
              {joined?  'Katıldın': 'Kampanyaya Katıl'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              marginBottom:12,
              borderWidth:1,
              borderColor:'#004F97',
              borderRadius:8,
              width:'100%',
              height:52,
              marginBottom:16,
              flexDirection:'row',
              alignItems:'center',
              justifyContent:'center',
              backgroundColor: joined? '#004F97' : '#fff',
              display: campaignDetailData.campaignContentType == 6 ? 'flex' : 'none',
            }}
          onPress={()=> setCopyModalVisible(true)}>
            <Image
              source={require('../../assets/img/export/checkmark.png')}
              style={{
                width: 24,
                height:24,
                marginRight:8,
                display:joined?'flex':'none',
              }}
            />
            <Text style={{
              fontSize:14, 
              fontWeight:500, 
              color:joined?'#fff' : '#004F97'}}>
              Kodu Al
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              marginBottom:12,
              borderWidth:1,
              borderColor:'#004F97',
              borderRadius:8,
              width:'100%',
              height:52,
              marginBottom:16,
              flexDirection:'row',
              alignItems:'center',
              justifyContent:'center',
              backgroundColor: joined? '#004F97' : '#fff',
              display: campaignDetailData.campaignContentType == 5 ? 'flex' : 'none',
            }}
          onPress={()=> setCodeModalVisible(true)}>
            <Image
              source={require('../../assets/img/export/checkmark.png')}
              style={{
                width: 24,
                height:24,
                marginRight:8,
                display:joined?'flex':'none',
              }}
            />
            <Text style={{
              fontSize:14, 
              fontWeight:500, 
              color:joined?'#fff' : '#004F97'}}>
              Kodu Gir
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width:'100%',
              height:48,
              alignItems:'center',
              justifyContent:'center',
            }}
            onPress={()=> setRulesModalVisible(true)}>
            <Text style={{
              fontSize:14, 
              fontWeight:500, 
              color:'#004F97'
            }}>
              Kampanya Kuralları
            </Text>
          </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const CampaignScreen = ({navigation}) => {
  

  return (
    <Stack.Navigator initialRouteName="CampaignList">
      <Stack.Screen
        name="CampaignList"
        component={CampaignList}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CampaignDetail"
        component={CampaignDetail}
        options={{headerShown: false}}
      />
      
    </Stack.Navigator>
  );
};
const slstyles = {
  slider: {
    backgroundColor: 'transparent',
    overflow: 'hidden',
    width: '100%',
    height: Dimensions.get('window').width*0.492,
  },
  slide: {
    width: '100%',
    paddingTop:12,
    paddingBottom:16,
    paddingLeft:16,
    paddingRight:16,
    // alignItems: 'center',
    // justifyContent: 'center',

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor:'#fff',
    borderRadius:8,
    marginBottom:16,
  },
  slideImg:{
    width: '100%',
    height:Dimensions.get('window').width*0.5,
    borderRadius:4,
    marginBottom:16,
  },
  text: {
    color: 'white',
    fontSize: 30,
  },
}
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
const htmlStyles = StyleSheet.create({
  marginBottom:0,
  paddingBottom:0,
  textAlign:'justify',
  p: {
    margin:0,padding:0,
  },
  div:{
    marginBottom:8,
  },

});
export default CampaignScreen;
