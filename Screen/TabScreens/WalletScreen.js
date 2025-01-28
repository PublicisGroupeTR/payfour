/* eslint-disable react-native/no-inline-styles */
// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React, {useEffect, useState, useRef, useCallback} from 'react';
import {
  View,
  Text,
  SafeAreaView, 
  FlatList,
  Dimensions,
  Image,
  Modal,
  StyleSheet,
  Alert,
  TouchableOpacity,
  KeyboardAvoidingView,
  TextInput,
  Keyboard
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import {SelectList} from 'react-native-dropdown-select-list';
import {Dropdown} from 'react-native-element-dropdown';

import {createStackNavigator} from '@react-navigation/stack';
import {styles} from '../Components/Styles.js';
import Loader from '../Components/Loader';
import SubtabHeader from '../Components/SubtabHeader';
import {ScrollView} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'react-native-axios';
import Clipboard from '@react-native-clipboard/clipboard';
import MasterpassScreen2 from './MasterpassScreen2';
import CreditScreen from './CreditScreen';
import CreditOtpScreen from './CreditScreens/CreditOtpScreen.js';
import CreditChangePasswordScreen from './CreditScreens/CreditChangePasswordScreen.js';
import CreditPasswordOtpScreen from './CreditScreens/CreditPasswordOtpScreen.js';
import CreditInstallmentsScreen from './CreditScreens/CreditInstallmentsScreen.js';

const Stack = createStackNavigator();
const Balance = ({navigation, route}) => {
  const [token, setToken] = React.useState('');
  //const [filterType, setFilterType] = React.useState('all');
  const [selected, setSelected] = React.useState({"key": "today", "value": "Bugün"});
  const [loading, setLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  // const [successModalVisible, setSuccessModalVisible] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  
  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);
  const width = Dimensions.get('window').width;
  const carouselRef = React.useRef(null);
  const [noData, setNoData] = useState(false);
  const [newData, setNewData] = useState(true);
  const [canceled, setCanceled] = useState(false);
  const scrollRef = useRef();
  const ddRef = useRef();  
  const [walletData, setWalletData] = React.useState([
    {
      id: 0,
      brand: '...',
      click: '0',
      pay: '0 TL',
    },
  ]);

  const [transactionType, setTransactionType] = React.useState('all');
  const [filterType, setFilterType] = React.useState('week');
  const [filterName, setFilterName] = React.useState('Son 7 Gün');
  const [tempType, setTempType] = React.useState('all');

  const [filterObj, setFilterObj] = React.useState({'time':'week', 'name':'Son 7 Gün', 'transaction':'all'}); 
  const filterData = [
    {
      key: 'today',
      value: 'Bugün',
    },
    {
      key: 'yesterday',
      value: 'Dün',
    },
    {
      key: 'week',
      value: 'Son 7 Gün',
    },
    {
      key: 'twoweeks',
      value: 'Son 15 Gün',
    },    
    {
      key: 'thism',
      value: 'Son 30 Gün',
    },
  ];
  //const [setPage, setSetPage] = useState(1);
  const [activePage, setActivePage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);


  const [ibanModalVisible, setIbanModalVisible] = useState(false);
  const [iban, setIban] = useState('');

  useEffect(() => {   
    console.log("<<<<<<<<<<<<< Wallet");
    console.log(navigation);
    console.log(route);
    console.log("<<<<<<<<<<<<< Wallet");

    const unsubscribe = navigation.addListener('focus', () => {
        setFilterObj({'time':'week', 'name':'Son 7 Gün', 'transaction':'all'});
        setFilterType('week');
        setFilterName('Son 7 Gün');
        setPage();
        return unsubscribe;
    }, [navigation]);
  });

  const setPage = () => {
    console.log('setPage '+(activePage+1));
    console.log('setPage '+selected);
    console.log('newData '+newData);
    if(!newData){
    if((activePage+1)<=totalPages){
      setActivePage((activePage+1));

    let sel = selected;
    console.log("selected : ");
    console.log(sel);
    getPaymentData(selected, token, (activePage+1));
    }
  }
    
  }
  const _renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setNewData(true);
          setActiveIndex(index);
          getPaymentData(index);
        }}>
        <View
          style={{
            backgroundColor: '#e8e8e8',
            borderRadius: 30,
            height: 30,
            paddingTop: 5,
            paddingBottom: 5,
            paddingLeft: 20,
            paddingRight: 20,
            marginLeft: 0,
            marginRight: 10,
            marginBottom: 30,
            borderWidth: 1,
            borderColor: activeIndex === index ? '#1d1d25' : '#e8e8e8',
          }}>
          <Text
            style={{
              fontSize: 12,
              fontWeight: '700',
              color: '#1d1d25',
              textAlign: 'center',
            }}>
            {item.value}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  const setFilterData = (type, cancels) =>{
    console.log(filterType);
    setFilterType(type);
    getPaymentData(type, cancels);
    setFilterModalVisible(false);
  }
  const getPaymentData = async (range, cancels, user, pg) => {
    console.log('getPaymentData');
    console.log(range);
    console.log('selected');
    console.log(selected);

    console.log("+++++++++");
    console.log(filterObj);
    //cancels = canceled;
    //cancels = transactionType == "Canceled" ? true : false;
    range = filterObj.time;
    cancels = filterObj.transaction == "canceled" ? true : false;
    console.log(">>>>>>>>");
    console.log(transactionType);
    if(filterObj.transaction == "waiting"){
      getPendings();
    }else{
    console.log(cancels);

    //setLoading(true);
    let date = new Date();
    let endDate =
      date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
    console.log('endDate');
    console.log(endDate);

    let startDate = '';
    let mult = 0;
    //let rtext = 'Bugün';
    let qpath = '';
    let calcDate;
    switch (range) {
      case 'today':
        setFilterName('Bugün');
        startDate = endDate;        
        break;
      case 'yesterday':
        setFilterName('Dün');
        calcDate = new Date(Date.now() - 1 * 24 * 60 * 60 * 1000);
        startDate =
          calcDate.getFullYear() +
          '-' +
          (calcDate.getMonth() + 1) +
          '-' +
          calcDate.getDate();
          endDate = startDate;        
        break;
      case 'week':
        setFilterName('Son 7 Gün');
        calcDate = new Date(Date.now() - 6 * 24 * 60 * 60 * 1000);
        startDate =
          calcDate.getFullYear() +
          '-' +
          (calcDate.getMonth() + 1) +
          '-' +
          calcDate.getDate();        
        break;
      case 'twoweeks':
        setFilterName('Son 15 Gün');
          calcDate = new Date(Date.now() - 14 * 24 * 60 * 60 * 1000);
          startDate =
            calcDate.getFullYear() +
            '-' +
            (calcDate.getMonth() + 1) +
            '-' +
            calcDate.getDate();        
          break;
      case 'month':
        setFilterName('Son 30 Gün');
        calcDate = new Date(Date.now() - 29 * 24 * 60 * 60 * 1000);
        startDate =
          calcDate.getFullYear() +
          '-' +
          (calcDate.getMonth() + 1) +
          '-' +
          calcDate.getDate();        
        break;
      case 'thism':
        setFilterName('Son 30 Gün');
        startDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-01';        
        break;
    }

    
    console.log('path');
    qpath = 'https://api-app.payfour.com/api/account/gettransactions?startDate='+startDate+'&endDate='+endDate+'&page=0&size=100';
    console.log(qpath);

    AsyncStorage.getItem('token').then(value =>{
      const config = {
        headers: { Authorization: `Bearer ${value}` }
      };

      axios.get(qpath, config).then(response => {
        console.log(response.data);
        console.log(response.data.data.items);
        console.log("<<<<<<<<<<");
        console.log(transactionType);
        console.log(cancels);
        cancels = filterObj.transaction == "canceled" ? true : false;
        console.log("cancels? ")
        console.log(cancels);
        formatData(response.data.data.items, cancels);        
        setLoading(false);
        getIban();
      })
      .catch(error => {
        console.error("Error sending data: ", error);
        let msg="";
        (error.response.data.errors.message) ? msg += error.response.data.errors.message+"\n" : msg += "Ödeme hatası \n"; (error.response.data.errors.paymentError) ? msg += error.response.data.errors.paymentError+"\n" : msg += ""; Alert.alert(msg);
      });

    });
  }
  };
  const getPendings = () =>{
    AsyncStorage.getItem('token').then(value =>{
      const config = {
        headers: { Authorization: `Bearer ${value}` }
      };

      axios.get('https://api-app.payfour.com/api/account/getpendingorders?page=0&pageSize=12', config).then(response => {
        console.log(response.data);
        console.log(response.data.data.items);
        formatData(response.data.data.items);        
        setLoading(false);
        //getIban();
      })
      .catch(error => {
        console.error("Error sending data: ", error);
        let msg="";
        (error.response.data.errors.message) ? msg += error.response.data.errors.message+"\n" : msg += "Ödeme hatası \n"; (error.response.data.errors.paymentError) ? msg += error.response.data.errors.paymentError+"\n" : msg += ""; Alert.alert(msg);
      });

    });
  }
  
  const formatData = (data, cancels) =>{
    console.log("format data");
    console.log(cancels);
    /*{
        "refNumber": 85000000022114,
        "dateTime": "2024-08-27T23:44:52.027",
        "amount": 100,
        "balance": 2369,
        "txnTypeId": 512,
        "txnName": "PaymentCash",
        "txnCategoryId": 1,
        "txnCategoryName": "Alışveriş"
      }*/
     let tmArr =[];
     for(var i=0;i < data.length;i++){
        let d = new Date(data[i].dateTime);
        let ds = checkZero(d.getDate())+'.'+checkZero((d.getMonth()+1))+'.'+d.getFullYear()+" / "+checkZero(d.getHours())+":"+checkZero(d.getMinutes());
        console.log(ds);
        //let as = checkCurrency(data[i].amount);
        /*[{"actionTypeId": 6, 
        "actionTypeName": "Provision", 
        "amount": 540, "childCount": 0, 
        "dateTime": "2024-10-04T10:45:54.887", 
        "description": "", "firmRefNumber": 0, 
        "refNumber": 1391, 
        "sourceOwnerName": "Kagan Cam", 
        "targetOwnerName": "Kagan Cam"}]*/
        let f = new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', currencyDisplay:'code',minimumFractionDigits:2 }).format(
          data[i].amount,
        )
      let fr= f.replace('TRY', '').trim();
        let tmObj = {
          amount: fr+"TL",
          date: ds,
          name: data[i].txnName ? data[i].txnName : "Provizyon",
          refno: data[i].firmRefNumber == 0 ? data[i].refNumber : data[i].firmRefNumber,
          category:  data[i].txnCategoryId ? data[i].txnCategoryId : data[i].actionTypeId
        }
        if(cancels){
          if(data[i].txnCategoryId == 8) tmArr.push(tmObj);
       }else tmArr.push(tmObj);
     }
     console.log("arr");
     console.log(tmArr);
     setWalletData(tmArr);
  }
  const checkCurrency = data =>{
    if(parseInt(data) < 1000){
      let arr= data.toString().split(".");
      console.log(arr);
      //let add = arr[1] ? ","+arr[1] : ",00";
      let frc;
      if(arr[1]){
        frc = arr[1] < 10 ? arr[1]+"0":arr[1];
      }
      let add = arr[1] ? ","+frc : ",00";
      return arr[0]+add+"TL"
    }else{
      let arr= data.toString().split(".");
      console.log(arr)
      let t = Math.floor(parseInt(data) / 1000);
      let o = parseInt(data) - (t*1000);
      let b;
      if(o < 1){
        b = "000";
      }else if(o < 10){
        b = "00"+o
      }else if(o < 100){
        b="0"+o;
      }else b = o
      let frc;
      if(arr[1]){
        frc = arr[1] < 10 ? arr[1]+"0":arr[1];
      }
      let add = arr[1] ? ","+frc : ",00";
      let f = t+"."+b+add+"TL"
      console.log(f)
      return f;
    }
  }
  const checkZero = data =>{
    if(parseInt(data) < 10){
      return "0"+parseInt(data);
    }else return data;
  }
  const formatPayment = payment =>{
    let ta = String(payment).split('.');
          let tb = Math.floor(parseInt(ta[0])/1000);
          //console.log("tb : "+tb);
          let tc = parseInt(ta[0]) - (tb*1000);
          if(ta[0] > 999){
            if(tc < 10){
              tc = "00"+tc;
            } else if(tc < 100){
              tc = "0"+tc;
            }
          }
          let xtr = "00";
          if(ta[1] != null && ta[1] != undefined){
            
            if(ta[1].length < 2)ta[1] = ta[1]+"0";
            xtr = ta[1];
          }
          //console.log("tc : "+tc);
          if(tb > 999){
            let mil=Math.floor(parseInt(tb)/1000);
            let tho = parseInt(tb) - (mil*1000);
            tb = mil + "."+tho;
          }
          let td = tb > 0 ? tb + "." : "";
          let total = td+tc+","+xtr+" TL";
          return total;
  };
  const tokenize = user => {
    setToken(user);
  };

  const getIban = () =>{
    AsyncStorage.getItem('token').then(value =>{
      const config = {
        headers: { Authorization: `Bearer ${value}` }
      };
      console.log(value);
    axios.get('https://api-app.payfour.com/api/account/getuser', config)
      .then(response => {
        console.log(response);
        console.log(response.data);
        if(response.data.success){
          //navigation.navigate('Success');
          //setPayfourId(response.data.data.payfourId);
          setIban(response.data.data.defaultBankAccountNumber);
          setLoading(false);
        }else{
          setLoading(false);
          console.log("NO SUCCESSS")
          console.log(response);
          Alert.alert(response.data.data.errors.message);
        }
      })
      .catch(error => {
        setLoading(false);
        console.error("Error sending data: ", error);
        console.error("Error sending data: ", error.response);
        console.error("Error sending data: ", error.response.data.errors.message);
        //console.log(JSON.parse(error.response));
        let msg="";
        (error.response.data.errors.message) ? msg += error.response.data.errors.message+"\n" : msg += "Ödeme hatası \n"; (error.response.data.errors.paymentError) ? msg += error.response.data.errors.paymentError+"\n" : msg += ""; Alert.alert(msg);

        
        //Alert.alert("Error sending data: ", error);
      });
    });
  }
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {  
        setTransactionType('all');    
        getPaymentData('week', 0);
      
    });
    return unsubscribe;
  }, [navigation]);
  const findVal = () => {
    console.log('findVal');
    console.log(selected);
    getPaymentData(selected);
  };
  
  const Item = ({amount, date, name, refno, category}) => (
    <View 
      key={refno}
      style={{
        borderRadius:16,
        height:72,
        width:'100%',
        backgroundColor:'#fff',
        padding:16,
        paddingRight:24,
        marginBottom:16,
      }}>
      <View style={{
        width:'100%',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
      }}>
        <View style={{marginBottom:8}}>
          <View style={{
            width:'100%',
            flexDirection:'row',
            alignItems:'center',
            justifyContent:'space-between',
            marginBottom:8,
          }}>
            <Text style={{fontSize:12, color:'#0B1929'}}>
              {name}
            </Text>
            <Text style={{fontSize:14, color: category == 1 || category == 6? '#F85064' : '#00bf97'}}>
              {category == 1|| category == 6 ? "-":"+"}{amount}
            </Text>
          </View>
          <View style={{
            width:'100%',
            flexDirection:'row',
            alignItems:'center',
            justifyContent:'space-between'
          }}>
            <Text style={{fontSize:12, color:'#909EAA'}}>
              Ref No: {refno}
            </Text>
            <Text style={{fontSize:12, color:'#909EAA'}}>
            {date}
            </Text>
          </View>
        </View>
        {/* <TouchableOpacity style={{
          width: 24,
          height: 24,
        }}>
          <Image 
          source={require('../../assets/img/export/arrow_right_dark.png')}
          style={{
            width: 24,
            height: 24,
            resizeMode: 'contain',
          }}
          />
        </TouchableOpacity> */}
      </View>
      </View>
  );
  const renderItem = item => {
    return (
      <View
        style={{
          padding: 18,
          height: 54,
          color: '#1D1D25',
        }}>
        <Text
          style={{
            fontSize: 12,
            color: '#1D1D25',
          }}>
          {item.value}
        </Text>
      </View>
    );
  };
  const renderWallet = () => {
    if (walletData.length >0) {
      return (
        
        <FlatList
            data={walletData}
            ref={scrollRef}
            renderItem={({item}) => (
              <Item amount={item.amount} name={item.name} date={item.date} refno={item.refno} key={item.refno} category={item.category}/>
            )}
            keyExtractor={item => item.refno}
            style={{paddingLeft: 30,
              paddingRight: 30, marginLeft:-30, marginRight:-30}}
            onEndReached={setPage}
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
              fontSize: 14,
              color: '#0B1929',
              fontWeight: '700',
              paddingLeft: 20,
            }}>
            Bu tarihte herhangi bir işlem bulunamadı.
          </Text>
        </View>
      );
    }
  };
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
                  paddingTop: 16,
                  paddingBottom: 16,
                  paddingLeft: 16,
                  paddingRight: 16,
                  width: '100%',
                }}>
                  <View style={{
                    flexDirection:'row',
                    justifyContent:'flex-end',
                  }}>
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
                  
                  <TouchableOpacity style={{
                    flexDirection:'row',
                    alignItems:'center',
                    paddingTop:8,
                    paddingBottom:8,
                    backgroundColor: filterType === 'today' ? '#F2F4F6' : '#fff'
                  }}
                  onPress={()=>{
                    let fl = filterObj;
                    fl.time='today';
                    setFilterObj(fl);
                    setFilterType('today');}}>
                    <View style={{
                      width:24, height:24, borderRadius:24, borderWidth:1, borderColor:'#004F97', marginRight:8,
                    }}
                    onPress={() => {
                      setFilterType('today');
                      let fl = filterObj;
                      fl.time='today';
                      setFilterObj(fl);
                      console.log(filterType)
                      }}>
                        
                      <View style={{
                        width:12, 
                        height:12, 
                        borderRadius:12, 
                        backgroundColor:'#004F97', 
                        position:'absolute', 
                        top:5, 
                        left:5,
                        display: filterType === 'today' ? 'flex' : 'none'}}></View>
                    </View>
                      <Text style={{
                        fontSize:16,fontWeight:'700', color:'#004F97', marginBottom:4
                      }}>
                      Bugün
                      </Text>
                      
                  </TouchableOpacity>
                  <TouchableOpacity style={{
                    flexDirection:'row',
                    alignItems:'center',
                    paddingTop:8,
                    paddingBottom:8,
                    backgroundColor: filterType === 'yesterday' ? '#F2F4F6' : '#fff'
                  }}
                  onPress={()=>{
                    setFilterType('yesterday');
                    let fl = filterObj;
                    fl.time='yesterday';
                    setFilterObj(fl);
                  }}>
                    <View style={{
                      width:24, height:24, borderRadius:24, borderWidth:1, borderColor:'#004F97', marginRight:8,
                    }}
                    onPress={() => {
                      setFilterType('yesterday');
                      let fl = filterObj;
                      fl.time='yesterday';
                      setFilterObj(fl);
                      console.log(filterType);
                      }}>
                        
                      <View style={{
                        width:12, 
                        height:12, 
                        borderRadius:12, 
                        backgroundColor:'#004F97', 
                        position:'absolute', 
                        top:5, 
                        left:5,
                        display: filterType === 'yesterday' ? 'flex' : 'none'}}></View>
                    </View>
                      <Text style={{
                        fontSize:16,fontWeight:'700', color:'#004F97', marginBottom:4
                      }}>
                      Dün
                      </Text>
                      
                  </TouchableOpacity>
                  <TouchableOpacity style={{
                    flexDirection:'row',
                    alignItems:'center',
                    paddingTop:8,
                    paddingBottom:8,
                    backgroundColor: filterType === 'week' ? '#F2F4F6' : '#fff'
                  }}
                  onPress={()=>{
                    setFilterType('week');
                    let fl = filterObj;
                    fl.time='week';
                    setFilterObj(fl);
                    }}>
                    <View style={{
                      width:24, height:24, borderRadius:24, borderWidth:1, borderColor:'#004F97', marginRight:8,
                    }}
                    onPress={() => {
                      setFilterType('week');
                      let fl = filterObj;
                      fl.time='week';
                      setFilterObj(fl);
                      }}>
                        
                      <View style={{
                        width:12, 
                        height:12, 
                        borderRadius:12, 
                        backgroundColor:'#004F97', 
                        position:'absolute', 
                        top:5, 
                        left:5,
                        display: filterType === 'week' ? 'flex' : 'none'}}></View>
                    </View>
                      <Text style={{
                        fontSize:16,fontWeight:'700', color:'#004F97', marginBottom:4
                      }}>
                      Son 7 Gün
                      </Text>
                      
                  </TouchableOpacity>
                  <TouchableOpacity style={{
                    flexDirection:'row',
                    alignItems:'center',
                    paddingTop:8,
                    paddingBottom:8,
                    backgroundColor: filterType === 'twoweeks' ? '#F2F4F6' : '#fff'
                  }}
                  onPress={()=>{
                    setFilterType('twoweeks');
                    let fl = filterObj;
                    fl.time='twoweeks';
                    setFilterObj(fl);
                    }}>
                    <View style={{
                      width:24, height:24, borderRadius:24, borderWidth:1, borderColor:'#004F97', marginRight:8,
                    }}
                    onPress={() => {
                      setFilterType('twoweeks');
                      let fl = filterObj;
                      fl.time='twoweeks';
                      setFilterObj(fl);
                      }}>
                        
                      <View style={{
                        width:12, 
                        height:12, 
                        borderRadius:12, 
                        backgroundColor:'#004F97', 
                        position:'absolute', 
                        top:5, 
                        left:5,
                        display: filterType === 'twoweeks' ? 'flex' : 'none'}}></View>
                    </View>
                      <Text style={{
                        fontSize:16,fontWeight:'700', color:'#004F97', marginBottom:4
                      }}>
                      Son 15 Gün
                      </Text>
                      
                  </TouchableOpacity>
                  <TouchableOpacity style={{
                    flexDirection:'row',
                    alignItems:'center',
                    paddingTop:8,
                    paddingBottom:8,
                    backgroundColor: filterType === 'month' ? '#F2F4F6' : '#fff'
                  }}
                  onPress={()=>{
                    setFilterType('month');
                    let fl = filterObj;
                    fl.time='month';
                    setFilterObj(fl);
                  }}>
                    <View style={{
                      width:24, height:24, borderRadius:24, borderWidth:1, borderColor:'#004F97', marginRight:8,
                    }}
                    onPress={() => {
                      setFilterType('month');
                      let fl = filterObj;
                      fl.time='month';
                      setFilterObj(fl);
                      }}>
                        
                      <View style={{
                        width:12, 
                        height:12, 
                        borderRadius:12, 
                        backgroundColor:'#004F97', 
                        position:'absolute', 
                        top:5, 
                        left:5,
                        display: filterType === 'month' ? 'flex' : 'none'}}></View>
                    </View>
                      <Text style={{
                        fontSize:16,fontWeight:'700', color:'#004F97', marginBottom:4
                      }}>
                      Son 30 Gün
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
                      },
                    ]}
                    onPress={() => {                      
                      console.log("filterdataobj");
                      console.log(filterObj);
                      setFilterData(filterType);
                    }}>
                    <Text
                      style={{fontSize: 14, color: '#ffffff'}}>
                      Tamam
                    </Text>
                  </TouchableOpacity>
               
              </View>
            </View>
      </Modal> 
      
      <Loader loading={loading} />
      <SubtabHeader routetarget="Discover" name="İşlemlerim" count="0" />
      <LinearGradient colors={['#d4dde9', '#ecedf2']} 
      style={{
        position:'absolute',
        width:'100%',
        height:'100%',
        top:60,
        zIndex:0,
        
      }}
      >
  
      </LinearGradient>
      <View style={{padding:16,}}>
        <View style={{borderRadius:16}}>
          
          <View style={{
            padding:8,
            borderTopLeftRadius:8,
            borderTopRightRadius:8,
            backgroundColor:'#fff',
            flexDirection:'row',
            justifyContent:'space-between',
            width:'100%'
          }}>
            <TouchableOpacity 
            style={{
              alignItems:'center', 
              justifyContent:'center',
              borderRadius:8,
              height:46,
              width:'33%',
              backgroundColor: transactionType==='all'? '#DFF0FF' : '#fff',
            }}
            onPress={()=>{
              if(transactionType != 'all'){
                setTransactionType('all');
                let fl = filterObj;
                fl.transaction='all';
                setFilterObj(fl);
                //setCanceled(false);
                /*{'time':'week', 'name':'Son 7 Gün', 'transaction':'all'}*/
                setFilterData(filterType);
                forceUpdate();
              }
            }
            }
            >
              <Text style={{
                fontSize:12,
                color: transactionType==='all'? '#004F97':'#909EAA',
              }}
              >
                Tamamlanan
              </Text>
            </TouchableOpacity>
            <TouchableOpacity 
            style={{
              alignItems:'center', 
              justifyContent:'center',
              borderRadius:8,
              height:46,
              width:'33%',
              backgroundColor: transactionType==='waiting'? '#DFF0FF' : '#fff',
            }}
            onPress={()=>{
              if(transactionType != 'waiting'){
              setTransactionType('waiting');
              //setCanceled(false);
              let fl = filterObj;
              fl.transaction='waiting';
              setFilterObj(fl);

              forceUpdate();
              getPendings();
              }
            }}
            >
              <Text style={{
                fontSize:12,
                color: transactionType==='waiting'? '#004F97':'#909EAA',
              }}
              >
                Bekleyen
              </Text>
            </TouchableOpacity>
            <TouchableOpacity 
            style={{
              alignItems:'center', 
              justifyContent:'center',
              borderRadius:8,
              height:46,
              width:'33%',
              backgroundColor: transactionType==='canceled'? '#DFF0FF' : '#fff',
            }}
            onPress={()=>
              {
                if(transactionType != 'canceled'){
                setTransactionType('canceled');
                //setCanceled(true);
                let fl = filterObj;
                fl.transaction='canceled';
                setFilterObj(fl);

                forceUpdate();
                setFilterData(filterType, true);}
              }
              }
            >
              <Text style={{
                fontSize:12,
                color: transactionType==='canceled'? '#004F97':'#909EAA',
              }}
              >
                İptal Edilen
              </Text>
            </TouchableOpacity>

          </View>
          <View style={{
            flexDirection:'row',
            backgroundColor:'#F2F4F6',
            borderBottomLeftRadius:8,
            borderBottomRightRadius:8,
            padding:8,
            paddingLeft:16,
            borderTopWidth:1,
            borderTopColor:'#E4E4E8',
            alignItems:'center',
            justifyContent:'space-between',
            display:filterData.transaction == 'waiting' || transactionType==='waiting'? 'none':'flex',
          }}>
            <Text style={{
              color:'#0B1929',
              fontSize:12,
              fontWeight:'500',
            }}>
              Dönem Seçiniz
            </Text>
            <TouchableOpacity style={{
              width:160,
              height:32,
              borderRadius:4,
              backgroundColor:'#fff',
              padding:4,
              paddingLeft:16,
              flexDirection:'row',
              alignItems:'center',
              justifyContent:'space-between',
              
            }}
            onPress={()=> setFilterModalVisible(true)}
            >
              <Text style={{
                fontSize:12,
                color:'#909EAA'
              }}>
                {filterName}
              </Text>
              <Image 
              source={require('../../assets/img/export/arrow_down.png')}
              style={{
                width: 24,
                height: 24,
                resizeMode: 'contain',
              }}
            />
            </TouchableOpacity>
          </View>
        </View>
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
        {renderWallet()} 
      </View>  
         
    </SafeAreaView>
  );
};
const Waiting = ({route, navigation}) => {
  const [loading, setLoading] = useState(false);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [cashModalVisible, setCashModalVisible] = useState(false);
  const [creditModalVisible, setCreditModalVisible] = useState(false);
  const [iban, setIban] = useState('');
  const [payfourId, setPayfourId] = useState('');
  const [userTCKN, setUserTCKN] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [secureText, setSecureText] = useState(true);
  const [userTCKNError, setUserTCKNError] = useState(false);
  const [userPasswordError, setUserPasswordError] = useState(false);

  const [payStatus, setPayStatus] = useState(3);
  const [payText, setPayText] = useState('Hemen Başvur');
  const [available, setAvailable] = useState('0,00');
  const [payMode, setPayMode] = useState('wallet');
  const [amount, setAmount] = useState('0,00');
  const [balance, setBalance] = useState('0,00');
  const [ibanModalVisible, setIbanModalVisible] = useState(false);
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [showTooltip1, setShowTooltip1] = useState(false);
  const [showTooltip2, setShowTooltip2] = useState(false);
  const [showTooltip3, setShowTooltip3] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      console.log(">>>>>>>>>>>>>>> check waiting");
      console.log(route);
      console.log(route.params);

      //setLoading(true);
      let b = parseFloat(route.params.amount).toFixed(2);
        //let fb = checkCurrency(b);
        /*setBalance(fb);
        let amo = checkCurrency(route.params.amount);*/
        //console.log("formatted "+fb);
        let f = new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', currencyDisplay:'code',minimumFractionDigits:2 }).format(
          b,
        )
      let fr= f.replace('TRY', '').trim();
      setAmount(fr);

    AsyncStorage.getItem('token').then(value =>{
      const config = {
        headers: { Authorization: `Bearer ${value}` }
      };
      console.log(value);
    axios.get('https://api-app.payfour.com/api/account/getuser', config)
      .then(response => {
        console.log(response);
        console.log(response.data);
        let rd = response.data.data;
        console.log("channelType");
        console.log(route.params.channelTypeId);
        console.log("***************");
        console.log(rd.loanApplication);
        console.log(rd.potentialLimit);
        /*setUserCreditData(rd.loanApplication);
        setUserLimitData(rd.potentialLimit);*/

        if(route.params.channelTypeId == 1 || route.params.channelTypeId == 2 ||route.params.channelTypeId == 3){
          console.log("no credit payment");
          setPayStatus(0);
        }else if(response.data.success){
          //navigation.navigate('Success');

          
          /*console.log("cases");
          console.log(rd.potentialLimit);
          console.log((rd.potentialLimit != null && rd.potentialLimit !=  'undefined' && rd.potentialLimit != undefined));
          console.log(rd.loanApplication);
          console.log((rd.loanApplication != null && rd.loanApplication !=  'undefined' && rd.loanApplication != undefined));
          if((rd.potentialLimit != null && rd.potentialLimit !=  'undefined' && rd.potentialLimit != undefined) || (rd.loanApplication != null && rd.loanApplication !=  'undefined' && rd.loanApplication != undefined))
            {
            if((rd.potentialLimit != null && rd.potentialLimit !=  'undefined' && rd.potentialLimit != undefined)  && rd.loanApplication == null){
              setPayStatus(1);
            }else if(rd.potentialLimit == null){
              setPayStatus(2);
            }
          }else{
            console.log("limit öğren");
            setPayStatus(2);
          }*/
          // else if(response.data.loanApplication.firstLimit == null){

          // }else if(response.data.loanApplication.)
          //setPayStatus(4);
          setPayfourId(rd.payfourId);
          setIban(rd.defaultBankAccountNumber);
          setLoading(false);
          //checkCurrentBalance();
          checkCurrentLimit(rd.loanApplication, rd.potentialLimit);
        }else{
          setLoading(false);
          console.log("NO SUCCESSS")
          console.log(response);
          Alert.alert(rd.errors.message);
        }
      })
      .catch(error => {
        setLoading(false);
        console.error("Error sending data: ", error);
        console.error("Error sending data: ", error.response);
        console.error("Error sending data: ", error.response.data.errors.message);
        //console.log(JSON.parse(error.response));
        let msg="";
        (error.response.data.errors.message) ? msg += error.response.data.errors.message+"\n" : msg += "Ödeme hatası \n"; (error.response.data.errors.paymentError) ? msg += error.response.data.errors.paymentError+"\n" : msg += ""; Alert.alert(msg);

        
        //Alert.alert("Error sending data: ", error);
      });
    });

    });
    return unsubscribe;
  }, [navigation]);
  const checkCurrentLimit = (userCreditData, userLimitData) => {
    console.log("checkCurrentLimit");
    console.log(userCreditData);
    console.log(userLimitData);
    console.log("-------");
    AsyncStorage.getItem('token').then(value =>{
      const config = {
        headers: { Authorization: `Bearer ${value}` }
      };

      axios.get('https://api-app.payfour.com/api/loans/getavailablecreditlimit', config).then(response => {
        console.log("getavailablecreditlimit");
        console.log(response.data);
        console.log(response.data.data);
        if(response.data.data.availableAllotmentAmount){
          setAvailable(new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', currencyDisplay:'code',minimumFractionDigits:2 }).format(
            response.data.data.availableAllotmentAmount,
          ).replace('TRY', '').trim())
        }
        setTimeout(function(){setLoading(false);},1500)
        checkUserCreditStatus(userCreditData, userLimitData, response.data.data);
        checkCurrentBalance();
      })
      .catch(error => {
        console.error("Error sending data: ", error);
        let msg="";
        (error.response.data.errors.message) ? msg += error.response.data.errors.message+"\n" : msg += "Ödeme hatası \n"; (error.response.data.errors.paymentError) ? msg += error.response.data.errors.paymentError+"\n" : msg += ""; Alert.alert(msg);
        checkCurrentBalance();
      });

    });
  }
  const checkUserCreditStatus= (userCreditData, userLimitData, availableLimit) =>{
    console.log("checkUserCreditStatus");
    console.log(userCreditData);
    console.log(userLimitData);
    console.log("-------");
    console.log(availableLimit);
    console.log("-------");
    /*userLimitData = 1000;
    userCreditData = null;
    availableLimit.availableAllotmentAmount = 5;*/
    let hasCredit = (userCreditData != null && userCreditData != undefined && userCreditData != "undefined");
    let hasActiveCredit = hasCredit && userCreditData.status == 2;
    let hasLimit = (userLimitData != null && userLimitData != undefined && userLimitData != "undefined");
    let hasAvailable = availableLimit.availableAllotmentAmount > 0 && availableLimit.availableAllotmentAmount >= route.params.amount;

    console.log(hasLimit);
    console.log(hasCredit);
    console.log(hasActiveCredit);
    console.log(hasAvailable);
    setLoading(false);
    if((!hasLimit && !hasCredit) || (hasCredit && !hasActiveCredit)){
        setPayStatus(2);
        setPayText("Limitini Öğren");      
    }else if(hasLimit && !hasCredit){
        setPayStatus(1);
        setPayText("Hemen Başvur");
    }else{
      if(hasAvailable){
        setPayStatus(3);
        setPayText("Hemen Öde");
      }else{
        setPayStatus(4);
        setPayText("Taksit Öde");
      }
    }
    console.log("PAYSTATUS");
    console.log(payStatus);
    setTimeout(function(){setLoading(false);},1000)
  }
  
    const checkCurrency = data =>{
      if(parseInt(data) < 1000){
        let arr= data.toString().split(".");
        console.log(arr);
        //let add = arr[1] ? ","+arr[1] : ",00";
        let frc;
        if(arr[1]){
          frc = arr[1] < 10 ? arr[1]+"0":arr[1];
        }
        let add = arr[1] ? ","+frc : ",00";
        return arr[0]+add
      }else{
        let arr= data.toString().split(".");
        console.log(arr)
        let t = Math.floor(parseInt(data) / 1000);
        let o = parseInt(data) - (t*1000);
        let b;
        if(o < 1){
          b = "000";
        }else if(o < 10){
          b = "00"+o
        }else if(o < 100){
          b="0"+o;
        }else b = o
        let frc;
        if(arr[1]){
          frc = arr[1] < 10 ? arr[1]+"0":arr[1];
        }
        let add = arr[1] ? ","+frc : ",00";
        let f = t+"."+b+add
        console.log(f)
        return f;
      }
    }
  const checkCurrentBalance = () => {
    console.log("checkCurrentBalance!");
    setLoading(false);
    AsyncStorage.getItem('token').then(value =>{
      const config = {
        headers: { Authorization: `Bearer ${value}` }
      };

      axios.get('https://api-app.payfour.com/api/account/getbalance', config).then(response => {
        console.log(response.data);
        console.log(response.data.data);
        if(response.data.data.balance != null){
          let b = parseFloat(response.data.data.balance).toFixed(2);
          let f = new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', currencyDisplay:'code',minimumFractionDigits:2 }).format(
            b,
          )
        let fr= f.replace('TRY', '').trim();
          //let fb=checkCurrency(b);
          setBalance(fr);
        }
        setLoading(false);
        setTimeout(function(){setLoading(false);},1500)
        if(route.params){
          if(route.params.payment) setAddModalVisible(true);
        }
      })
      .catch(error => {
        setLoading(false);
        setTimeout(function(){setLoading(false);},1500)
        console.error("Error sending data: ", error);
        let msg="";
        (error.response.data.errors.message) ? msg += error.response.data.errors.message+"\n" : msg += "Ödeme hatası \n"; (error.response.data.errors.paymentError) ? msg += error.response.data.errors.paymentError+"\n" : msg += ""; Alert.alert(msg);
      });

    });
  }
  const setCreditLogin = () =>{
    let err = false;
    if(userTCKN.length < 4){
      setUserTCKNError(true);
      err = true;
    }
    if(userPassword.length < 4){
      setUserPasswordError(true);
      err = true;
    }
    if(!err){
      setLoading(true);
      setCreditModalVisible(false);
      AsyncStorage.getItem('token').then(value =>{
        const config = {
          headers: { Authorization: `Bearer ${value}` }
        };
        console.log(value);
        let dataToSend ={        
          userName: userTCKN,
          password: userPassword       
        }
      console.log(dataToSend)
      axios.post('https://api-app.payfour.com/api/loans/sendotpforlogin', dataToSend, config)
        .then(response => {
          setLoading(false);
          console.log(response);
          console.log(response.data);
          /*{"data": {"passwordMustBeRenewed": false, "transactionId": "def0605a415f6b12830a487c4b64e13b74c774a89b6af939a0315ab3c8d5309cWi3YoPqM8KwziFTEpl0cWA==LNeccJqFAlZO9tgclQbiP6gHhI62FSL7Ss3ZQEu+Cayz0GCTziPq+0GX7qRYFqv2reN9tFL/wGIGmgVNZEwghQ=="}, "status": 200, "success": true}*/
          if(response.data.data.passwordMustBeRenewed){
            console.log("renew credit password");
            navigation.navigate('CreditChangePasswordScreen', {
              params:{
                //transactionId:response.data.data.transactionId,
                userName: userTCKN,
                paymentId: route.params.paymentId,
                amount:amount
              }
            })
          }else{
            AsyncStorage.getItem('phone').then((ph) =>{
              navigation.navigate('CreditOtpScreen', {
                params:{
                  transactionId:response.data.data.transactionId,
                  paymentId: route.params.paymentId,
                  amount:amount,
                  phone:ph
                }
              })
            })
          }
          setTimeout(function(){setLoading(false);},1500)
        })
        .catch(error => {
          setLoading(false);
          setTimeout(function(){setLoading(false);},1500)
          console.error("Error sending data: ", error);
          console.error("Error sending data: ", error.response);
          console.error("Error sending data: ", error.response.data.errors.message);
          //console.log(JSON.parse(error.response));
          let msg="";
          (error.response.data.errors.message) ? msg += error.response.data.errors.message+"\n" : msg += "Ödeme hatası \n"; (error.response.data.errors.paymentError) ? msg += error.response.data.errors.paymentError+"\n" : msg += ""; Alert.alert(msg);

          
          //Alert.alert("Error sending data: ", error);
        });
      });
    }
  }
  const handleSubmitPress = (type) =>{
    console.log('credit handleSubmitPress');
    console.log(payMode);
    (type == 'credit')? setPayMode('credit'):setPayMode('wallet');
    if(type != 'credit'){
      
      setLoading(true);

      AsyncStorage.getItem('token').then(value =>{
        const config = {
          headers: { Authorization: `Bearer ${value}` }
        };
        console.log(value);
        let dataToSend ={
          paymentId:route.params.paymentId
        }
      console.log(dataToSend)
      axios.post('https://api-app.payfour.com/api/payments/approvewithbalance', dataToSend, config)
        .then(response => {
          console.log(response);
          console.log(response.data);
          if(response.data.success){
            //navigation.navigate('Success');
            setSuccessModalVisible(true);
            setLoading(false);
          }else{
            setLoading(false);
            console.log("NO SUCCESSS")
            console.log(response);
            Alert.alert(response.data.data.errors.message);
          }
        })
        .catch(error => {
          setLoading(false);
          console.error("Error sending data: ", error);
          console.error("Error sending data: ", error.response);
          console.error("Error sending data: ", error.response.data.errors.message);
          //console.log(JSON.parse(error.response));
          let msg="";
          (error.response.data.errors.message) ? msg += error.response.data.errors.message+"\n" : msg += "Ödeme hatası \n"; (error.response.data.errors.paymentError) ? msg += error.response.data.errors.paymentError+"\n" : msg += ""; Alert.alert(msg);

          
          //Alert.alert("Error sending data: ", error);
        });
      });
    }else{
      console.log('credit switch');
      console.log(payStatus);
      //setCreditModalVisible(true);
      switch (payStatus){
        case 1:
          navigation.navigate('CreditScreen', { 
            screen: 'IntroSonraOde',
          })
          break;
        case 2:
          navigation.navigate('CreditScreen', { 
            screen: 'IntroHazirLimit',
          })
          //setCreditModalVisible(true);
          break;      
        case 3:
          setCreditModalVisible(true);
          break;
        case 4:
          console.log("Taksit Öde");
          break;
        default:
          setCreditModalVisible(true);
          break;
      }
    }
  }
const handleSubmitCancel = () =>{
    setLoading(true);

    AsyncStorage.getItem('token').then(value =>{
      const config = {
        headers: { Authorization: `Bearer ${value}` }
      };
      console.log(value);
      let dataToSend ={
        paymentId:route.params.paymentId
      }
    console.log(dataToSend)
    axios.post('https://api-app.payfour.com/api/payments/reject', dataToSend, config)
      .then(response => {
        console.log(response);
        console.log(response.data);
        if(response.data.success){
          //navigation.navigate('Success');
          //setSuccessModalVisible(true);

          setLoading(false);
          navigation.navigate('Discover');
        }else{
          setLoading(false);
          console.log("NO SUCCESSS")
          console.log(response);
          Alert.alert(response.data.data.errors.message);
        }
      })
      .catch(error => {
        setLoading(false);
        console.error("Error sending data: ", error);
        console.error("Error sending data: ", error.response);
        console.error("Error sending data: ", error.response.data.errors.message);
        //console.log(JSON.parse(error.response));
        let msg="";
        (error.response.data.errors.message) ? msg += error.response.data.errors.message+"\n" : msg += "Ödeme hatası \n"; (error.response.data.errors.paymentError) ? msg += error.response.data.errors.paymentError+"\n" : msg += ""; Alert.alert(msg);

        
        //Alert.alert("Error sending data: ", error);
      });
    });
  }

  const renderButtonText = () =>{
    console.log("renderButtonText");
    console.log(payStatus);

    let text = "";
    switch(payStatus){
      case 1:
        "Hemen Başvur";
        break;
      case 2:
        "Limitini Öğren";
        break;      
      case 3:
        "Hemen Öde";
        break;
      case 4:
        "Taksit Öde"
        break;
      default:
        "Hemen Öde";
        break;
    }
    return(<Text style={{fontSize:12, color:'#004F97'}}>              
      {text}
    </Text>)
  }
  return(
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      
      <Modal
            animationType="slide"
            transparent={true}
            visible={addModalVisible}
            onRequestClose={() => {
              setAddModalVisible(!addModalVisible);
            }}>
            <View
              style={{
                flex: 1,                
                justifyContent: 'flex-end',
                alignItems: 'flex-end',
                backgroundColor: 'rgba(0, 79, 151, 0.6)',
              }}>
              <View
                style={{
                  backgroundColor:'#fff',
                  borderTopLeftRadius: 24,
                  borderTopRightRadius: 24,
                  paddingTop: 68,
                  paddingBottom: 16,
                  paddingLeft: 16,
                  paddingRight: 16,
                  width: '100%',
                }}>
                  <View style={{
                      marginBottom:16,
                      }}>
                        <Text style={{
                          fontSize:16,
                          fontWeight:'700',
                          color:'#004F97',
                          lineHeight:20,
                          textAlign:'center',
                        }}>
                          Para Yükle
                        </Text>
                        <Text style={{
                          fontSize:14,
                          lineHeight:20,
                          color:'#909eaa',
                          paddingLeft:24,
                          paddingRight:24,
                          textAlign:'center',
                          marginBottom:26,
                        }}>
                          Cüzdana para yüklemek için yükleme yöntemini seçiniz.
                      </Text>
                      
                      <View style={{
                        padding:16,
                        borderRadius:8,
                        borderColor:'#E4E4E8',
                        borderWidth:1,                        
                        marginBottom:12,
                      }}>
                        <TouchableOpacity
                            
                            onPress={()=>{
                              setAddModalVisible(false);
                              setCashModalVisible(false);
                              navigation.navigate('MasterpassScreen2',  {
                                
                                  screen: 'ListCards',
                                  params: {
                                    card: 'true',
                                  },
                                }) 
                              
                            }}>
                        <View style={{
                          flexDirection:'row',
                          alignItems:'center',
                          justifyContent:'space-between',
                          paddingBottom:8,                          
                        }}>
                          <View style={{
                            flexDirection:'row',
                            alignItems:'center',
                          }}>
                            <Image
                              source={require('../../assets/img/export/add_masterpass.png')}
                              style={{
                                width: 24,
                                height: 24,
                                resizeMode: 'contain',
                                marginRight:8,
                              }}
                            />
                            <Text style={{
                              fontSize:14,
                              color:'#004F97',
                            }}>
                              Banka / Kredi Kartı ile Yükle
                            </Text>
                          </View>
                          
                            <Image
                                source={require('../../assets/img/export/arrow_right_dark.png')}
                                style={{
                                  width: 24,
                                  height: 24,
                                  resizeMode: 'contain',
                                }}
                              />
                          
                      </View>
                      </TouchableOpacity>
                        <Text style={{
                          fontSize:14,
                          color:'#909eaa',
                          borderTopWidth:1,
                          borderTopColor:'#E4E4E8',
                          paddingTop:8,
                        }}>
                          Masterpass’e kayıtlı kredi ya da banka kartı bilgilerin ile hızlıca para yükleyebilirsiniz.
                        </Text>
                      </View>
                      <View style={{
                        padding:16,
                        borderRadius:8,
                        borderColor:'#E4E4E8',
                        borderWidth:1,
                        marginBottom:12,
                      }}>
                        
                        <TouchableOpacity
                            
                            onPress={() => {
                              setAddModalVisible(false);
                              setIbanModalVisible(true);}}>
                        <View style={{
                          flexDirection:'row',
                          alignItems:'center',
                          justifyContent:'space-between',
                          paddingBottom:8,                          
                        }}>
                          
                          <View style={{
                            flexDirection:'row',
                            alignItems:'center',
                          }}>
                            <Image
                              source={require('../../assets/img/export/add_iban.png')}
                              style={{
                                width: 24,
                                height: 24,
                                resizeMode: 'contain',
                                marginRight:8,
                              }}
                            />
                            <Text style={{
                              fontSize:14,
                              color:'#004F97',
                            }}>
                              Havale / EFT ile Yükle
                            </Text>
                          </View>
                          
                            <Image
                                source={require('../../assets/img/export/arrow_right_dark.png')}
                                style={{
                                  width: 24,
                                  height: 24,
                                  resizeMode: 'contain',
                                }}
                              />
                          
                      </View>
                      </TouchableOpacity>
                        <Text style={{
                          fontSize:14,
                          color:'#909eaa',
                          borderTopWidth:1,
                          borderTopColor:'#E4E4E8',
                          paddingTop:8,
                        }}>
                          Belirtilen IBAN numarasına Havale / EFT yoluyla para göndererek para yükleyebilirsiniz.
                        </Text>
                      </View>
                      <View style={{
                        padding:16,
                        borderRadius:8,
                        borderColor:'#E4E4E8',
                        borderWidth:1,
                      }}>
                        <TouchableOpacity                            
                            onPress={() => {
                              setAddModalVisible(false);
                              setCashModalVisible(true);}}>
                        <View style={{
                          flexDirection:'row',
                          alignItems:'center',
                          justifyContent:'space-between',
                          paddingBottom:8,                          
                        }}>
                          <View style={{
                            flexDirection:'row',
                            alignItems:'center',
                          }}>
                            <Image
                              source={require('../../assets/img/export/add_register.png')}
                              style={{
                                width: 24,
                                height: 24,
                                resizeMode: 'contain',
                                marginRight:8,
                              }}
                            />
                            <Text style={{
                              fontSize:14,
                              color:'#004F97',
                            }}>
                              Kasadan Para Yükle
                            </Text>
                          </View>
                          
                            <Image
                                source={require('../../assets/img/export/arrow_right_dark.png')}
                                style={{
                                  width: 24,
                                  height: 24,
                                  resizeMode: 'contain',
                                }}
                              />
                          
                      </View>
                      </TouchableOpacity>
                        <Text style={{
                          fontSize:14,
                          color:'#909eaa',
                          borderTopWidth:1,
                          borderTopColor:'#E4E4E8',
                          paddingTop:8,
                        }}>
                          Kasadan para yüklemek için kasadaki görevliye payfour bilgilerinizi veriniz.
                        </Text>
                      </View>
                      
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
                    },
                  ]}
                  onPress={() => setAddModalVisible(false)}>
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
            visible={cashModalVisible}
            onRequestClose={() => {
              setCashModalVisible(!cashModalVisible);
            }}>
            <View
              style={{
                flex: 1,                
                justifyContent: 'flex-end',
                alignItems: 'flex-end',
                backgroundColor: 'rgba(0, 79, 151, 0.6)',
              }}>
              <View
                style={{
                  backgroundColor:'#fff',
                  borderTopLeftRadius: 24,
                  borderTopRightRadius: 24,
                  paddingTop: 16,
                  paddingBottom: 16,
                  paddingLeft: 16,
                  paddingRight: 16,
                  width: '100%',
                }}>
                  
                  <View style={{
                    paddingTop:24,
                    paddingBottom:24,
                    alignItems:'center',
                    justifyContent:'center',
                  }}>
                    <Image 
                        source={require('../../assets/img/export/payfourid_icon.png')}
                        style={{
                          width: 93,
                          height: 93,
                          resizeMode: 'contain',
                          marginBottom:14,
                        }}
                        />
                  </View>
                  <View style={{
                      marginBottom:24,
                      }}>
                        <Text style={{
                          fontSize:20,
                          fontWeight:'700',
                          color:'#004F97',
                          marginBottom:16,
                          textAlign:'center',
                        }}>
                          Payfour ile online ya da 
                          kasada ödeme yapabilirsiniz!
                        </Text>
                        <Text style={{
                          fontSize:16,
                          lineHeight:20,
                          color:'#004F97',
                          paddingLeft:24,
                          paddingRight:24,
                          textAlign:'center',
                          marginBottom:26,
                        }}>
                          Mağazalarımızdan veya CarrefourSA'ya ait online platformlardan yapacağınız alışverişlerinizi Payfour ile ödemek için aşağıdaki Payfour numarasını veya telefon numaranızı kasiyere söylemeniz veya platformlardaki ilgili alana girmeniz yeterli olacaktır.
                      </Text>
                      <View style={{
                        padding:16,
                        borderRadius:8,
                        backgroundColor:'#F2F4F6',
                        flexDirection:'row',
                        alignItems:'center',
                        justifyContent:'center',
                      }}>
                        <Text style={{
                          fontSize:16,
                          color:'#0B1929',
                        }}>
                          Payfour No:
                        </Text>
                        <Text style={{
                          fontSize:16,
                          color:'#004F97',
                        }}>
                          {payfourId}
                        </Text>
                      </View>
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
                    },
                  ]}
                  onPress={() => setCashModalVisible(false)}>
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
            visible={ibanModalVisible}
            onRequestClose={() => {
              setIbanModalVisible(!ibanModalVisible);
            }}>
            <View
              style={{
                flex: 1,                
                justifyContent: 'flex-end',
                alignItems: 'flex-end',
                backgroundColor: 'rgba(0, 79, 151, 0.6)',
              }}>
              <View
                style={{
                  backgroundColor:'#fff',
                  borderTopLeftRadius: 24,
                  borderTopRightRadius: 24,
                  paddingTop: 16,
                  paddingBottom: 16,
                  paddingLeft: 16,
                  paddingRight: 16,
                  width: '100%',
                }}>
                  
                  <View style={{
                    paddingTop:24,
                    paddingBottom:24,
                    alignItems:'center',
                    justifyContent:'center',
                  }}>
                    <Image 
                        source={require('../../assets/img/export/payfoureft_icon.png')}
                        style={{
                          width: 93,
                          height: 93,
                          resizeMode: 'contain',
                          marginBottom:14,
                        }}
                        />
                  </View>
                  <View style={{
                      marginBottom:24,
                      }}>
                        <Text style={{
                          fontSize:20,
                          fontWeight:'700',
                          color:'#004F97',
                          marginBottom:16,
                          textAlign:'center',
                        }}>
                          Havale / EFT Para yükleme bilgileri
                        </Text>
                        <Text style={{
                          fontSize:12,
                          color:'#909EAA',
                          paddingLeft:24,
                          paddingRight:24,
                          textAlign:'center',
                          marginBottom:26,
                        }}>
                          Payfour hesabına para yüklemek için, bankacılık uygulamanıza giriş yaparak size ait banka hesabınız üzerinden aşağıda yer alan hesap bilgilerini kullanarak yükleme yapabilirsiniz.
                      </Text>
                      <Text style={{
                          fontSize:14,
                          fontWeight:'700',
                          color:'#004F97',
                          marginBottom:8,
                          textAlign:'left',
                        }}>
                          Vakıfbank
                        </Text>
                        <View style={[regstyles.registerInputStyle, {borderColor: '#EBEBEB', paddingBottom:10, paddingTop:28,}]}>                       
                      <Text style={{                                           
                          fontSize: 12,
                          lineHeight:12, 
                          padding:0,
                          color: '#909EAA', 
                          position:'absolute',
                          top:14,                     
                          left:14
                      }}>
                        IBAN numarası
                      </Text>
                      <Text
                        style={{                      
                          fontSize: 14,
                          padding:0,
                          color: '#0B1929',
                        }}
                      >
                        TR810001500158007331469750
                      </Text>
                      <TouchableOpacity style={{
                        width:30,
                        height:30,
                        alignItems:'center',
                        justifyContent:'center',
                        position:'absolute',
                        right:10,
                        top:'90%'
                      }}
                      onPress={()=> {
                        Clipboard.setString('TR810001500158007331469750')
                        setShowTooltip1(true);
                        setTimeout(function(){
                          setShowTooltip1(false);
                        }, 3000);
                      }}>
                        <View style={{
                          position:'absolute',
                          backgroundColor:'#004F97',
                          borderRadius:8,
                          width:65,
                          alignItems:'center',
                          justifyContent:'center',
                          padding:4,
                          top:-24,
                          display: showTooltip1 ? 'flex':'none',
                        }}>
                          <Text style={{color:'#fff', fontSize:11}}>Kopyalandı</Text>
                        </View>
                        <Image 
                        source={require('../../assets/img/export/copytoclipboard.png')}
                        style={{
                          width: 16,
                          height: 16,
                          resizeMode: 'contain',
                        }}
                      />
                      </TouchableOpacity>
                    </View>
                    <View style={[regstyles.registerInputStyle, {borderColor: '#EBEBEB', paddingBottom:10,paddingTop:28,}]}>                       
                      <Text style={{                                           
                          fontSize: 12,
                          lineHeight:12, 
                          padding:0,
                          color: '#909EAA', 
                          position:'absolute',
                          top:14,                     
                          left:14
                      }}>
                        Alıcı hesap Adı
                      </Text>
                      <Text
                        style={{                      
                          fontSize: 14,
                          padding:0,
                          color: '#0B1929',
                          width:'80%'
                        }}
                      >
                        CarrefourSA Carrefour Sabancı Ticaret Merkezi A.Ş.
                      </Text>
                      <TouchableOpacity style={{
                        width:30,
                        height:30,
                        alignItems:'center',
                        justifyContent:'center',
                        position:'absolute',
                        right:10,
                        top:'70%'
                      }}
                      onPress={()=> {Clipboard.setString('CarrefourSA Carrefour Sabancı Ticaret Merkezi A.Ş.')
                        setShowTooltip2(true);
                        setTimeout(function(){
                          setShowTooltip2(false);
                        }, 3000);
                      }}>
                        <View style={{
                          position:'absolute',
                          backgroundColor:'#004F97',
                          borderRadius:8,
                          width:65,
                          alignItems:'center',
                          justifyContent:'center',
                          padding:4,
                          top:-24,
                          display: showTooltip2 ? 'flex':'none',
                        }}>
                          <Text style={{color:'#fff', fontSize:11}}>Kopyalandı</Text>
                        </View>
                        <Image 
                        source={require('../../assets/img/export/copytoclipboard.png')}
                        style={{
                          width: 16,
                          height: 16,
                          resizeMode: 'contain',
                        }}
                      />
                      </TouchableOpacity>
                    </View>
                    <View style={[regstyles.registerInputStyle, {borderColor: '#EBEBEB', paddingBottom:10,paddingTop:28,}]}>                       
                      <Text style={{                                           
                          fontSize: 12,
                          lineHeight:12, 
                          padding:0,
                          color: '#909EAA', 
                          position:'absolute',
                          top:14,                     
                          left:14
                      }}>
                        Açıklama
                      </Text>
                      <Text
                        style={{                      
                          fontSize: 14,
                          padding:0,
                          color: '#0B1929',
                          width:'80%'
                        }}
                      >
                        {iban}
                      </Text>
                      <TouchableOpacity style={{
                        width:30,
                        height:30,
                        alignItems:'center',
                        justifyContent:'center',
                        position:'absolute',
                        right:10,
                        top:'90%'
                      }}
                      onPress={()=> {Clipboard.setString(iban)
                        setShowTooltip3(true);
                        setTimeout(function(){
                          setShowTooltip3(false);
                        }, 3000);
                      }}>
                        <View style={{
                          position:'absolute',
                          backgroundColor:'#004F97',
                          borderRadius:8,
                          width:65,
                          alignItems:'center',
                          justifyContent:'center',
                          padding:4,
                          top:-24,
                          display: showTooltip3 ? 'flex':'none',
                        }}>
                          <Text style={{color:'#fff', fontSize:11}}>Kopyalandı</Text>
                        </View>
                        <Image 
                        source={require('../../assets/img/export/copytoclipboard.png')}
                        style={{
                          width: 16,
                          height: 16,
                          resizeMode: 'contain',
                        }}
                      />
                      </TouchableOpacity>
                    </View>
                      {/* <View style={{
                        padding:16,
                        borderRadius:8,
                        backgroundColor:'#F2F4F6',
                        flexDirection:'row',
                        alignItems:'center',
                        justifyContent:'center',
                      }}>
                        <Text style={{
                          fontSize:16,
                          color:'#0B1929',
                        }}>
                        </Text>
                        <Text style={{
                          fontSize:16,
                          color:'#004F97',
                        }}>
                          {iban}
                        </Text>
                      </View> */}
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
                    },
                  ]}
                  onPress={() => setIbanModalVisible(false)}>
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
          visible={successModalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setSuccessModalVisible(!successModalVisible);
          }}>
            <View style={{flex: 1, backgroundColor: '#004F97'}}>
          <SubtabHeader routetarget="discover" name="Keşfet" count="0" mode="dark"/>
          
      <View style={{paddingTop:136, marginBottom:60, alignItems:'center'}}>
          <Image
            source={require('../../assets/img/export/payment_top_white.png')}
            style={{
              width: 311,
              height: 56,
              resizeMode:'contain',
            }}
          />
      </View>
      <View style={{
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'column',
      }}>
        <Image
          source={require('../../assets/img/export/payfour_logo_w.png')}
          style={{
            width: 119,
            height: 42,
            resizeMode:'contain',
            marginBottom:4,
          }}
        />
        <Text style={{fontSize:32, color:'#fff', textAlign:'center'}}>
          Teşekkürler!
        </Text>
      </View>
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
        width:'100%'

      }}>
        <View style={{alignItems:'center', marginBottom:16}}>
          <Image
              source={require('../../assets/img/export/payment_success.png')}
              style={{
                width: 80,
                height: 80,
                resizeMode:'contain',
              }}
          />
        </View>
        <View>
        <Text style={{fontSize:16, color:'#004F97', textAlign:'center', fontWeight:'500', marginBottom:16}}>
          Ödemeniz başarılı bir şekilde gerçekleşti
        </Text>
        <Text style={{fontSize:14, color:'#909EAA', textAlign:'center', marginBottom:24}}>
          Dilerseniz bir sonraki alışverişiniz için önceden hazır limitinizi öğrenebilir ve kasa işlemlerini kısa sürede tamamlayabilirsiniz.
        </Text>
        
        </View>
        <TouchableOpacity
          style={[regstyles.buttonStyle, {padding:0, marginLeft:0,marginRight:0, marginBottom: 10, backgroundColor: '#004F97', flex:1}]}              
          activeOpacity={0.5}
          onPress={()=>{
            console.log("close success");
            setSuccessModalVisible(false);
            navigation.navigate('Balance');
            }}>
          <Text style={regstyles.buttonTextStyle}>Kapat</Text>
        </TouchableOpacity>
      </View>
      </View>
      </Modal>
      <Modal
            animationType="slide"
            transparent={true}
            visible={creditModalVisible}
            onRequestClose={() => {
              setCreditModalVisible(!creditModalVisible);
            }}>
              
            <View
              style={{
                flex: 1,                
                justifyContent: 'flex-end',
                alignItems: 'flex-end',
                backgroundColor: 'rgba(92, 92, 92, 0.56)',
              }}>
                <KeyboardAvoidingView enabled behavior='padding' style={{flex:1,justifyContent: 'flex-end',
                alignItems: 'flex-end',width:Dimensions.get('screen').width}}>
              <View
                style={{
                  backgroundColor:'#fff',
                  borderTopLeftRadius: 24,
                  borderTopRightRadius: 24,
                  paddingTop: 16,
                  paddingBottom: 16,
                  paddingLeft: 16,
                  paddingRight: 16,
                  width: '100%',
                }}>
                  <View style={{
                    flexDirection:'row',
                    justifyContent:'flex-end',
                  }}>
                    <TouchableOpacity 
                      style={{
                        width:24,
                        height:24,
                      }}
                      onPress={() => {
                        console.log('close');
                        setCreditModalVisible(false);
                        //navigation.navigate('discover')
                        }}>                  
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
                    paddingTop:24,
                    paddingBottom:24,
                    alignItems:'center',
                    justifyContent:'center',
                  }}>
                    <Image 
                        source={require('../../assets/img/export/information_large.png')}
                        style={{
                          width: 80,
                          height: 80,
                          resizeMode: 'contain',
                          marginBottom:16,
                        }}
                        />
                        <Text style={{
                          fontSize:14,
                          fontWeight:'700',
                          lineHeight:20,
                          color:'#0B1929',
                          marginBottom:8,
                        }}>
                          Bilgilerini Gir
                        </Text>
                        <Text style={{
                          fontSize:14,
                          lineHeight:20,
                          color:'#909EAA',
                          paddingLeft:24,
                          paddingRight:24,
                          textAlign:'center',
                        }}>
                          Alışveriş kredisi kullanabilmek için bilgilerini girmen gereklidir.
                      </Text>
                  </View>
                  
                  
                  <View style={[regstyles.registerInputStyle, {borderColor: userTCKNError ? '#ff0000' :'#EBEBEB',}]}>            
                    <TextInput
                      style={{                      
                        fontSize: 14,
                        lineHeight:16, 
                        padding:0,
                        color: '#909EAA',
                      }}
                      onChangeText={UserTCKN => setUserTCKN(UserTCKN)}
                      placeholder="TCKN" //12345
                      placeholderTextColor="#909EAA"
                      keyboardType="default"
                      onSubmitEditing={Keyboard.dismiss}
                      blurOnSubmit={false}
                      underlineColorAndroid="#f000"
                      returnKeyType="next"
                    />
                  </View>
                  <View style={[regstyles.registerInputStyle, {marginBottom:12, borderColor: userPasswordError ? '#ff0000' : '#EBEBEB',}]}>                  
                    
                    <TouchableOpacity
                      style={{
                        position: 'absolute',
                        top: 20,
                        right: 20,
                        zIndex: 10,
                      }}
                      onPress={() => setSecureText(!secureText)}>
                        {secureText? <Image 
                      source={require('../../assets/img/export/eye_off.png')}
                      style={{
                        width:24,
                        height:24
                      }}>
                      </Image> : 
                      <Image 
                      source={require('../../assets/img/export/eye.png')}
                      style={{
                        width:24,
                        height:24
                      }}>
                      </Image>}
                      {/* <Image
                        source={require('../../../assets/img/export/eye.png')}
                        style={{
                          width: 24,
                          height: 24,
                          resizeMode: 'contain',
                        }}
                      /> */}
                    </TouchableOpacity>
                    <TextInput
                      style={{                      
                        fontSize: 14,
                        lineHeight:16, 
                        padding:0,
                        color: '#909EAA',
                      }}
                      maxLength={6}
                      onFocus={() => setUserPasswordError(false)}
                      onChangeText={UserCurrentPassword => setUserPassword(UserCurrentPassword)}
                      placeholder="Şifre" //12345
                      placeholderTextColor="#909EAA"
                      keyboardType="numeric"
                      onSubmitEditing={Keyboard.dismiss}
                      blurOnSubmit={false}
                      secureTextEntry={secureText}
                      underlineColorAndroid="#f000"
                      returnKeyType="next"
                    />
                    
                    </View>
                  
                <View style={{
                  flexDirection:'row',
                  alignItems:'flex-start',
                  paddingTop:16,
                  marginBottom:24,
                  paddingRight:16,
                }}>
                  <Image 
                    source={require('../../assets/img/export/information.png')}
                    style={{
                      width: 16,
                      height: 16,
                      resizeMode: 'contain',
                      marginRight:10,
                    }}
                    />
                    <Text style={{
                          fontSize:14,
                          lineHeight:14,
                          color:'#909EAA',
                        }}>                          
                          Hazır Limit başvuru anında oluşturduğun şifreni girmen gerekmektedir.
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
                    },
                  ]}
                  onPress={() => setCreditLogin()}>
                  <Text
                    style={{fontSize: 14, color: '#ffffff'}}>
                    Alışveriş Kredisi ile Öde
                  </Text>
                </TouchableOpacity>
               
              </View>
              </KeyboardAvoidingView>
            </View>
            
      </Modal>
      <Loader loading={loading} />
      <SubtabHeader routetarget="Balance" name="Ödeme İşlemi" count="0" />
      <LinearGradient colors={['#d4dde9', '#ecedf2']} 
      style={{
        position:'absolute',
        width:'100%',
        height:'100%',
        top:60,
        zIndex:0,
        
      }}
      >
  
      </LinearGradient>
      <ScrollView style={{
        paddingTop:12,
        paddingBottom:12,
        paddingLeft:16,
        paddingRight:16,
        flex:1,
        width:'100%',
      }}>
      <View style={{}}>    
        <View style={{
          borderRadius:16,
          paddingLeft:16,
          paddingRight:16,
          paddingTop:24,
          paddingBottom:24,
          backgroundColor:'#fff',
          alignItems:'center',
          marginBottom:16,
          }}>
            <Text style={{fontSize:14,fontWeight:'700', textAlign:'center', color:'#4c4c4c'}}>
              {route.params.storeName? route.params.storeName : route.params.storeCode}
            </Text>
            <Text style={{fontSize:14, textAlign:'center', color:'#4c4c4c', marginBottom:32, paddingLeft:24, paddingRight:24,}}>
              mağazasından alışveriş yaptığınız için teşekkür ederiz.
            </Text>
            <Text style={{fontSize:18,fontWeight:'700', textAlign:'center', color:'#004F97'}}>
              Ödenecek Tutar
            </Text>
            <View style={{flexDirection:'row',alignItems:'flex-end',}}>
              <Text style={{fontSize:32, fontWeight:'700', color:'#004F97'}}>
                {new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', currencyDisplay:'code',minimumFractionDigits:2 }).format(
                  parseFloat(route.params.amount).toFixed(2),
                ).replace('TRY', '').trim()}
                <Text style={{fontSize:16, fontWeight:'700', verticalAlign:'sub', color:'#004F97'}}>
                  TL
                </Text>
              </Text>
              
            </View>
        </View>
          <View style={{

          }}>
            <Text style={{fontSize:14,fontWeight:'700', textAlign:'center', color:'#4c4c4c',marginBottom:16,}}>
              Ödeme Yöntemi
            </Text>
        </View>
        <View style={{
          backgroundColor:'#fff',
          borderRadius:8,
          padding:12,
          marginBottom:10,
          flexDirection:'row',
          justifyContent:'space-between',
          alignItems:'center',
        }}>
          <View style={{
            flexDirection:'row',
            alignItems:'center',
          }}>
            <TouchableOpacity style={{
              width:24, height:24, borderRadius:24, borderWidth:1, borderColor:'#004F97', marginRight:8,
            }}
            onPress={()=> setPayMode('wallet')}>
              <View style={{width:12, height:12, borderRadius:12, backgroundColor:'#004F97', position:'absolute', top:5, left:5, display:payMode == 'wallet'? 'flex':'none'}}></View>
            </TouchableOpacity>
            <View style={{}}>
              <Text style={{
                fontSize:16,fontWeight:'700', color:'#004F97', marginBottom:4
              }}>
              Cüzdan ile
              </Text>
              <Text style={{
                fontSize:12,
                color:'#909EAA',
              }}>
                Bakiye: {balance} TL
              </Text>
            </View>
          </View>
          <TouchableOpacity style={{
            justifyContent:'center',
            alignItems:'center',
            borderRadius:6,
            borderWidth:1,
            borderColor:'#004F97',
            height:40,
            width:115
          }}
          onPress={() =>{
            console.log("ödeme add modal");
            setAddModalVisible(true);
          }}>
            <Text style={{fontSize:12, color:'#004F97'}}>
              +  Para Yükle
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{
          backgroundColor:'#fff',
          borderRadius:8,
          padding:12,
          marginBottom:10,
          flexDirection:'row',
          justifyContent:'space-between',
          alignItems:'center',
          display:payStatus != 0? 'flex':'none',
        }}>
          <View style={{
            flexDirection:'row',
            alignItems:'center',
          }}>
            <TouchableOpacity style={{
              width:24, height:24, borderRadius:24, borderWidth:1, borderColor:'#004F97', marginRight:8,
            }}
            onPress={()=> setPayMode('credit')}>
              <View style={{width:12, height:12, borderRadius:12, backgroundColor:'#004F97', position:'absolute', top:5, left:5, display:payMode == 'credit'? 'flex':'none'}}></View>
            </TouchableOpacity>
            <View style={{}}>
              <Text style={{
                fontSize:16,fontWeight:'700', color:'#004F97', marginBottom:4
              }}>
              Alışveriş Kredisi ile
              </Text>
              {available != 0 || payStatus == 1 || payStatus == 2?
              <Text style={{
                fontSize:12,
                color:'#909EAA',
              }}>
                {available} TL ön onaylı kredi
              </Text>
              :
              <Text style={{
                fontSize:12,
                color:'#909EAA',
              }}>
                Yeterli limitiniz bulunmamaktadır.
              </Text>
              }
            </View>
          </View>
          <TouchableOpacity style={{
            justifyContent:'center',
            alignItems:'center',
            borderRadius:6,
            borderWidth:1,
            borderColor:'#004F97',
            height:40,
            width:115
          }}
          onPress={()=>{
            /*if(payStatus == 3){
              setCreditModalVisible(true);
            }*/
            setPayMode('credit');
            handleSubmitPress('credit');
          }}
          >
            {(payStatus == 3)?
            <Text style={{fontSize:12, color:'#004F97'}}>              
              Hemen Öde
            </Text>
            :
            <Text style={{fontSize:12, color:'#004F97'}}>              
              Hemen Başvur
            </Text>
            }
            {/* {renderButtonText} */}
          </TouchableOpacity>
        </View>       
      </View>
      <View style={{flexDirection:'row', marginBottom: 120}}>
      <TouchableOpacity
            style={[regstyles.buttonStyle, {padding:0, marginLeft:0,marginRight:10, backgroundColor: '#fff',borderWidth:1, borderColor:'#004F97', flex:1}]}              
            activeOpacity={0.5}
            onPress={handleSubmitCancel}>
            <Text style={[regstyles.buttonTextStyle, {color:'#004F97'}]}>Vazgeç</Text>
          </TouchableOpacity>
        <TouchableOpacity
            style={[regstyles.buttonStyle, {padding:0, marginLeft:0,marginRight:0, backgroundColor: '#004F97', flex:1}]}              
            activeOpacity={0.5}
            onPress={()=>handleSubmitPress(payMode)}>
            <Text style={regstyles.buttonTextStyle}>Öde</Text>
          </TouchableOpacity>
      </View>
      </ScrollView>
    </SafeAreaView>
  )

}
const Success = ({route, navigation}) => {
  
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#004F97'}}>
      <View style={{flex: 1, backgroundColor: '#004F97'}}>
          <SubtabHeader routetarget="discover" name="Keşfet" count="0" mode="dark"/>
          
      <View style={{marginBottom:60, alignItems:'center'}}>
          <Image
            source={require('../../assets/img/export/payment_top_white.png')}
            style={{
              width: 311,
              height: 56,
              resizeMode:'contain',
            }}
          />
      </View>
      <View style={{
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'column',
      }}>
        <Image
          source={require('../../assets/img/export/payfour_logo_w.png')}
          style={{
            width: 119,
            height: 42,
            resizeMode:'contain',
            marginBottom:4,
          }}
        />
        <Text style={{fontSize:32, color:'#fff', textAlign:'center'}}>
          Teşekkürler!
        </Text>
      </View>
      <View style={{
        borderTopLeftRadius:24,
        borderTopRightRadius:24,
        backgroundColor:'#fff',
        paddingTop:32,
        paddingBottom:92,
        paddingLeft:16,
        paddingRight:16,
        position:'absolute',
        bottom:0,
        width:'100%'

      }}>
        <View style={{alignItems:'center', marginBottom:16}}>
          <Image
              source={require('../../assets/img/export/payment_success.png')}
              style={{
                width: 80,
                height: 80,
                resizeMode:'contain',
              }}
          />
        </View>
        <View>
        <Text style={{fontSize:16, color:'#004F97', textAlign:'center', fontWeight:'500', marginBottom:16}}>
          Ödemeniz başarılı bir şekilde gerçekleşti
        </Text>
        <Text style={{fontSize:14, color:'#909EAA', textAlign:'center', marginBottom:24}}>
          Dilerseniz bir sonraki alışverişiniz için önceden hazır limitinizi öğrenebilir ve kasa işlemlerini kısa sürede tamamlayabilirsiniz.
        </Text>
        
        </View>
        <TouchableOpacity
          style={[regstyles.buttonStyle, {padding:0, marginLeft:0,marginRight:0, marginBottom: 10, backgroundColor: '#004F97', flex:1}]}              
          activeOpacity={0.5}
          onPress={()=>{
            console.log("close success");
            //setSuccessModalVisible(false);
            navigation.navigate('Balance');
            }}>
          <Text style={regstyles.buttonTextStyle}>Kapat</Text>
        </TouchableOpacity>
      </View>
      </View>
    </SafeAreaView>
  )
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
const WalletScreen = ({navigation}) => {
  // useEffect(() => {
  //   const unsubscribe = navigation.addListener('focus', () => {
  //     navigation.navigate('Balance');
  //   });
  //   return unsubscribe;
  // }, [navigation]);

  return (
    <Stack.Navigator initialRouteName="Balance">
      <Stack.Screen
        name="Balance"
        component={Balance}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Waiting"
        component={Waiting}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Success"
        component={Success}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MasterpassScreen2"
        component={MasterpassScreen2}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CreditScreen"
        component={CreditScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CreditChangePasswordScreen"
        component={CreditChangePasswordScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CreditPasswordOtpScreen"
        component={CreditPasswordOtpScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CreditOtpScreen"
        component={CreditOtpScreen}
        options={{headerShown: false}}
      />   
      <Stack.Screen
        name="CreditInstallmentsScreen"
        component={CreditInstallmentsScreen}
        options={{headerShown: false}}
      />   
    </Stack.Navigator>
  );
};

export default WalletScreen;


