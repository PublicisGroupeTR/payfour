/* eslint-disable react-native/no-inline-styles */
// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  SafeAreaView, 
  FlatList,
  Dimensions,
  Image,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Loader from '../../Components/Loader';
import SubtabHeader from '../../Components/SubtabHeader';
import {ScrollView} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'react-native-axios';

const CreditInstallmentsScreen = ({navigation, route}) => {
  const [selectedItem, setSelectedItem] = React.useState("");
  const [loading, setLoading] = useState(false);
  const width = Dimensions.get('window').width;

  const scrollRef = useRef();

  const [loanId, setLoanId] = useState({'proposalId':'', 'loanCampaignid':''});
  const [installmentArr, setInstallmentArr] = useState([]);

  useEffect(() => {   
    const unsubscribe = navigation.addListener('focus', () => {
        console.log("<<<<<<<<<<<<< CreditInstallmentsScreen");
        console.log(navigation);
        console.log(route);
        console.log(route.params);
        console.log("<<<<<<<<<<<<< CreditInstallmentsScreen");

        getInstallments();
        /*navigation.navigate('wallet',{ 
          screen: 'Success'
        });*/
        return unsubscribe;
    }, [navigation]);
  });

  const getInstallments = () => {
    setLoading(true);
    console.log("getInstallments");
    AsyncStorage.getItem('token').then(value =>{
      const config = {
        headers: { Authorization: `Bearer ${value}` }
      };
      /*{
  "paymentId": 1741,
  "tokenId": "f8cf1721-c680-42fe-9796-ae36349beb9f",
  "firstInstallmentDate": "2024-12-25"
}*/
      let date = new Date(route.params.params.firstInstallmentDate);
      console.log("firstInstallmentDate");
      console.log(date.getDate());
      console.log((date.getMonth()+1));
      console.log(date.getFullYear());
      let d = date.getDate() < 10 ? "0"+date.getDate() : date.getDate();
      let m = (date.getMonth()+1) < 10 ? "0"+(date.getMonth()+1) : (date.getMonth()+1);
      let dt = date.getFullYear()+"-"+m+"-"+d;
      console.log(d)
      const sendData = {
        paymentId:route.params.params.paymentId,
        tokenId:route.params.params.tokenId,
        firstInstallmentDate:dt
      }
      console.log(sendData);
      axios.post('https://payfourapp.test.kodegon.com/api/loans/calculatepaybackplan', sendData, config)
      .then(response => {
        setLoading(false);
          console.log(response.data.data); 
          //console.log(response.data.data.paybackPlanList)

          let proposal = {
            loanProductId:response.data.data.loanProductId,
            proposalId:response.data.data.proposalId
          }
          setLoanId(proposal)
          let installmentsArr = [];
          console.log("*********");
          let data = response.data.data.paybackPlanList;
          for(var i=0; i < data.length;i++){
            console.log(data[i]);
            if(i==0)setSelectedItem(data[i].paybackPlanId);
            
            let tmObj = {};
            tmObj.paybackPlanId = data[i].paybackPlanId;
            tmObj.loanCampaignId = data[i].loanCampaignId;
            tmObj.totalPaymentAmount = data[i].totalPaymentAmount;
            i==data.length-1 ? tmObj.itemLast = true : tmObj.itemLast = false;
            console.log("--------");
            for(var j=0; j < data[i].installments.length;j++){
              console.log(data[i].installments[j]);
              if(j == 0){
                let instdate = new Date(data[i].installments[j].calculateInstallmentDate);
                let instd = instdate.getDate() < 10 ? "0"+instdate.getDate() : instdate.getDate();
                let instm = (instdate.getMonth()+1) < 10 ? "0"+(instdate.getMonth()+1) : (instdate.getMonth()+1);
                let instdt = instd+"-"+instm+"-"+instdate.getFullYear(); 
                tmObj.firstDate = instdt;
              }
              if(j == (data[i].installments.length-1)){
                tmObj.totalInstallments = data[i].installments[j].installmentSequenceNo;
                tmObj.installmentAmount = data[i].installments[j].installmentTotalAmount;
                installmentsArr.push(tmObj);
              }
            }
          }
          console.log('!!!!!!!!!!!!!!!!!!!!');
          console.log(installmentsArr);
          setInstallmentArr(installmentsArr);
        
        if(response.data.error){
          Alert.alert(response.data.error.message);
        }else{
          
          
        }
      })
      .catch(error => {
        setLoading(false);
        
        console.error("Error sending data: ", error);
      });     
    });
  }

  const handleSubmitPress = () =>{
    /*{
    "paymentId": 1741,
    "tokenId": "f8cf1721-c680-42fe-9796-ae36349beb9f",
    "proposalId": "0193ab92-7f75-77ed-9a71-5bf8fcdc4b7d",
    "paybackPlanId": "0193ab92-7fc5-7524-b9c9-b9be1b8afb2b",
    "loanCampaignId": "e75f69d7-8f67-4965-a5e9-9ac0e64532ff"
  }*/
    console.log("sendData");
    let sendData = {
      paymentId:route.params.params.paymentId,
      tokenId:route.params.params.tokenId,
      proposalId:loanId.proposalId,
      loanCampaignId:loanId.loanCampaignid,
      paybackPlanId:selectedItem
    }
    console.log(sendData);
    setLoading(true);
    AsyncStorage.getItem('token').then(value =>{
      const config = {
        headers: { Authorization: `Bearer ${value}` }
      };
      axios.post('https://payfourapp.test.kodegon.com/api/payments/approvewithloan', sendData, config)
      .then(response => {
        setLoading(false);
        console.log("approvewithloan");
        console.log(response);
        console.log(response.data.data);           
        if(response.data.success){
            navigation.navigate('wallet',{ 
              screen: 'Success'
            });
        } else if(response.data.error){
          Alert.alert(response.data.error.message);
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

        
      });
    });

  }
  const handleSubmitCancel = () =>{
    navigation.navigate('discover')
  }
  const Item = ({amount, id, total, count, instdate, itemLast, campaignId}) => (
    <View 
      key={id}
      style={{
        borderRadius:16,
        height:72,
        width:'100%',
        backgroundColor:'#fff',
        padding:16,
        paddingRight:24,
        borderBottomWidth:itemLast ? 0 : 1,
        borderBottomColor:itemLast? '#fff' : '#E4E4E8',
      }}>
      <View style={{
        width:'100%',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
      }}>
        <TouchableOpacity style={{
              width:24, height:24, borderRadius:24, borderWidth:1, borderColor:'#E4E4E8', marginRight:8,
            }}
            onPress={()=> {
              setSelectedItem(id);
              let l = loanId;
              l.loanCampaignid = campaignId;
              setLoanId(l);
              }}>
              <View style={{width:12, height:12, borderRadius:12, backgroundColor:'#004F97', position:'absolute', top:5, left:5, display:selectedItem == id? 'flex':'none'}}></View>
            </TouchableOpacity>
        <View style={{marginBottom:8, width:'90%'}}>
          <View style={{
            width:'100%',
            flexDirection:'row',
            alignItems:'center',
            justifyContent:'space-between',
            marginBottom:8,
            
          }}>
            <Text style={{fontSize:12, color:'#0B1929'}}>
              {count} Taksit
            </Text>
            <Text style={{fontSize:12, color:'#909EAA'}}>
            {total} TL
            </Text>
          </View>
          <View style={{
            width:'100%',
            flexDirection:'row',
            alignItems:'center',
            justifyContent:'space-between'
          }}>
            <Text style={{fontSize:12, color:'#909EAA'}}>              
              İlk Ödeme: {instdate}
            </Text>
            <Text style={{fontSize:12, color:'#909EAA'}}>
            {count} x {amount} TL
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
  const renderInstallments = () => {
    if (installmentArr.length >0) {
      return (
        
        <FlatList
            data={installmentArr}
            ref={scrollRef}
            renderItem={({item}) => (
              <Item amount={item.installmentAmount} id={item.paybackPlanId} total={item.totalPaymentAmount} count={item.totalInstallments} instdate={item.firstDate} itemLast = {item.itemLast} campaignId={item.loanCampaignId}/>
            )}
            keyExtractor={item => item.paybackPlanId}
            style={{paddingLeft: 30,
              paddingRight: 30, marginLeft:-30, marginRight:-30}}
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
            }}>
            Taksit bilgisi bulunamadı.
          </Text>
        </View>
      );
    }
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>      
      <Loader loading={loading} />
      <SubtabHeader routetarget="Wallet" name="İşlem Başarılı" count="0" />
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
        flex:1,
        width:'100%',
        padding:16,
        
      }}>
        <View style={{borderRadius:16,paddingBottom:100}}>
          
          <View style={{
            paddingTop:24,
            paddingBottom:24,
            paddingLeft:16,
            paddingRight:16,
            borderRadius:8,
            backgroundColor:'#fff',
            width:'100%',

          }}>
            <View style={{
              width:'100%',
              flexDirection:'column',
              alignItems:'center',
              justifyContent:'center',
              paddingTop:16,
              marginBottom:12,
            }}>
                <Image
                  source={require('../../../assets/img/export/icon_credit.png')}
                  style={{
                    width: 56,
                    height: 56,
                    resizeMode: 'contain',
                    marginBottom:10,
                  }}
                />
                <Text style={{
                  fontSize:16,
                  fontWeight:'700',
                  textAlign:'center',
                  color:'#004F97',
                  marginBottom:10
                }}>
                  Ödemeniz Hazır
                </Text>
                <Text style={{
                  fontSize:32,
                  fontWeight:'700',
                  textAlign:'center',
                  color:'#004F97',
                }}>
                  {route.params.params.amount} TL
                </Text>
            </View>
            <View style={{
              borderRadius:8,
              backgroundColor:'#F2F9FF',
              padding:12,
              marginBottom:12,
            }}>
              <View style={{
                flexDirection:'row'
              }}>
                <Image
                  source={require('../../../assets/img/export/information_dark.png')}
                  style={{
                    width: 24,
                    height: 24,
                    resizeMode: 'contain',
                    marginRight:8,
                  }}
                />
                <Text style={{
                  fontSize:12,
                  color:'#0B1929',
                  width:'90%',
                }}>
                  Size özel hazır limit tutarınızı <Text style={{fontWeight:'700'}}>12.10.2024</Text> tarihine kadar kullanabilirsiniz. Seçtiğiniz ürüne göre ödeme planınız size özel oluşturulacaktır.
                </Text>
              </View>
            </View>
            <View style={{
              height:34,
              marginBottom:12,
            }}>
              <Text style={{
                color:'#004F97',
                fontSize:16,
                fontWeight:'700',
                textAlign:'center',
              }}>
              Ödemek istediğiniz taksit sayısını seçiniz
              </Text>
            </View>
            {renderInstallments()}
            <TouchableOpacity
            style={[regstyles.buttonStyle, {padding:0, backgroundColor: '#004F97', flex:1, marginBottom:12,marginTop:24,}]}              
            activeOpacity={0.5}
            onPress={handleSubmitPress}>
            <Text style={regstyles.buttonTextStyle}>Başvur</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[regstyles.buttonStyle, {padding:0, backgroundColor: '#fff',borderWidth:1, borderColor:'#004F97', flex:1, marginBottom:12,}]}              
            activeOpacity={0.5}
            onPress={handleSubmitCancel}>
            <Text style={[regstyles.buttonTextStyle, {color:'#004F97'}]}>Vazgeç</Text>
          </TouchableOpacity>
          <View style={{
            padding:16,
            flexDirection:'column',
            alignItems:'center',
            justifyContent:'center'
          }}>
              <Image
                  source={require('../../../assets/img/export/dgfin_logo.png')}
                  style={{
                    width: 73,
                    height: 25,
                    resizeMode: 'contain',
                    marginBottom:6,
                  }}
                />
                <Text style={{
                color:'#909EAA',
                fontSize:12,
                textAlign:'center',
              }}>
              dgfin BDDK onaylı finansman kuruluşudur.
              </Text>
          </View>
          </View>
        </View>
        
        
         </ScrollView>
    </SafeAreaView>
  );
};
export default CreditInstallmentsScreen;
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
