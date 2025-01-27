import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  NativeModules,
  NativeEventEmitter,
  TouchableOpacity,
  Image,
  Platform
} from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import KvcLayout from './KvcLayout.js';
import { apiRequest, customAlert, FontFamilies } from './helper/index.js';

const VerifyScreen = ({ navigation, route }) => {

  const isFocused = useIsFocused();
  const { EventEmitter } = NativeModules;
  // const [allData, setAllData] = useState({
  //   "birthDate": "2001-10-10T00:00:00.000Z",
  //   "commercialElectronic": true,
  //   "crmCustomerId": "15628932",
  //   "defaultBankAccountNumber": "3594488206101",
  //   "educationlevel": "5d18065a-742c-5c06-6e45-aa7d8ae95499",
  //   "email": "Test@test.com",
  //   "firstName": "Mahmut Bilal",
  //   "gender": "Male",
  //   "incometypesSelected": [
  //     5,
  //     6
  //   ],
  //   "isStudent": false,
  //   "lastName": "TEKİROĞLU",
  //   "monthlyAverage": "10000",
  //   "occupation": "5d1912c0-3818-7d03-f337-9ad31752832a",
  //   "occupationrole": "18f1e288-4786-404b-a879-83272a1b96b2",
  //   "payfourId": 3583,
  //   "phone": "+905533600910",
  //   "referenceId": "01948d90-3314-738b-a983-88631b02c0d9",
  //   "referralCode": "PYF2jzBnEzjQhS7",
  //   "registrationCompleted": true,
  //   "segment": 1,
  //   "segmentInfo": {
  //     "autoRenew": false,
  //     "isAnnual": false,
  //     "segment": 1,
  //     "startDateUTC": "2024-11-19T06:54:35.5703137"
  //   },
  //   "selectedaAreements": [
  //     "ETK",
  //     "GKS",
  //     "USAGR"
  //   ],
  //   "tckn": "64317832464",
  //   "tempToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImFwcGx5bG9hbnwwMTk0OGQ4Zi03NTFiLTcxM2UtYWNjYi1lMjg5ZjkwNTVmM2QiLCJtZW1iZXJpZCI6IjM1ODMiLCJleHAiOjE3Mzc1NDUzODQsImlzcyI6IlBheWZvdXJBcHBTZXJ2aWNlIiwiYXVkIjoiUGF5Zm91clRlbXBUb2tlbiJ9.-wFTiLKxxPoBGflTjuq7TxA_7b00SG-bFWrd7pLBNZE",
  //   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVtcGFudW1iZXIiOiI3OTUxYTMyOGM5NmU5ZDI2YTg4ODUwMmYyYTE1M2EzODY5OWQ2ZDMzMTIzMTQ5MmFhMWYzYWZkMzQzYmU4ZWFlIiwiZGV2aWNlSWQiOiIxMjc4IiwidG9rZW5pZCI6IjVhYTNkNDRiLWQ2NjMtNGI4Zi1kYTA0LTA4ZGQzYWNkYTUyNyIsIm1lbWJlcmlkIjoiMzU4MyIsImV4cCI6MTczNzU0NDc2OSwiaXNzIjoiUGF5Zm91ckFwcFRva2VuIiwiYXVkIjoiUGF5Zm91ckFwcFNlcnZpY2UifQ.gF2qpvGS7fhxJBJWUfPfKTu8n9_2VI1Ry96TwAx9C3Y",
  //   "transactionVolume": "1000",
  //   "transactionsNumbers": "5",
  //   "userBirthplace": "Adana"
  // });
  const [allData, setAllData] = useState();

  const startKyc = async () => {
    if (!allData) {
      return
    }

    // console.log(allData)

    if (Platform.OS == 'ios') {
      NativeModules.ModuleIOS.viewDidLoadNative(JSON.stringify(allData))
    } else {
      NativeModules.EnQualifyModuleAndroid.openNativeActivity(JSON.stringify(allData))
    }
  }

  const getData = async () => {
    const token = await AsyncStorage.getItem('token');
    const params = route.params
    let data = {}
    if (params) {
      if (params.user) {
        data = { ...data, ...params.user }
      }
      if (params.incometypesSelected) {
        data = { ...data, ...{ incometypesSelected: params.incometypesSelected } }
      }
      if (params.data) {
        data = { ...data, ...params.data }
      }
      if (params.referenceId) {
        data = { ...data, ...{ referenceId: params.referenceId } }
      }
      if (params.selectedaAreements) {
        data = { ...data, ...{ selectedaAreements: params.selectedaAreements } }
      }
        if (params.tempToken) {
        data = { ...data, ...{ tempToken: params.tempToken } }
      }
      if (token) {
        data = { ...data, ...{ token: token } }
      }
      setAllData(data)
    }
  }

  const getNewReferenceId = async () => {
    const data = {
        tempToken: allData.tempToken,
        tckn: allData.tckn,
        birthDate: allData.birthDate,
        email: allData.email,
        isPotential: false
    }

    console.log("getNewReferenceId", data)
    const response = await apiRequest({
      url: '/loans/verifycustomer',
      method: 'POST',
      data: data
    });
    if (response.success) {
     setAllData({...allData, ...response.data})
    } else {
      customAlert({ title: "Hata", message: response.errors.message })
    }
  } 

  const goBack = () => {
    navigation.goBack()
  }

  useEffect(() => {

    const eventEmitter = new NativeEventEmitter(EventEmitter);
    const subscription = eventEmitter.addListener('EnQualifyResult', (data) => { 
      console.log(data)
      switch(data.status) {
        case "succeeded":
          navigation.navigate('TabNavigationRoutes', { 
            screen: 'discover',
          })
          break;
        case "canceled":
          getNewReferenceId()
          break;
        default:
          console.log(data)
      }
    });
  
    // Cleanup
    return () => {
      subscription.remove();
    };
  }, [allData]);

  useEffect(() => {
    if (isFocused) {
      getData()
    }
  }, [isFocused])

  return (
    <KvcLayout disableScroll title={"Kullanıcı Onayı"}>
      <View style={styles.main}>
        <View style={styles.container}>
          <View style={styles.content}>
            <Image
              source={require('../../assets/img/kyc_onay.png')}
              style={styles.image}
            />
            <Text style={styles.title}>Onayın Gerekiyor</Text>
            <Text style={styles.text}>Kimlik tespiti sürecinde, uzaktan kimlik tespitinin yapılması amacıyla biyometrik verilerinin Dgpara Ödeme ve Elektronik Para Kuruluşu Anonim Şirketi (“Dgpara”) ve Dgpara’nın yalnızca bu amaçla sınırlı olarak yetkilendirdiği üçüncü kişiler tarafından işlenmesine onay veriyorum.</Text>
          </View>
          <View style={styles.bottom}>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={goBack}
                style={[styles.buttonStyle, { backgroundColor: '#fff', borderWidth: 1, borderColor: '#004F97' }]}
                activeOpacity={0.5}
              >
                <Text style={[styles.buttonTextStyle, { color: '#004F97' }]}>Vazgeç</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => startKyc()}
                style={[styles.buttonStyle, {}]}
                activeOpacity={0.5}
              >
                <Text style={styles.buttonTextStyle}>Onayla</Text>
              </TouchableOpacity>
            </View>
            <Image
              source={require('../../assets/img/dgfin_legal.png')}
              style={styles.dgfin}
            />
          </View>
        </View>
      </View>
    </KvcLayout>
  );
};

export default VerifyScreen;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  main: {
    flex: 1,
    padding: 16,
    paddingBottom:8,
    backgroundColor:"#efeff3"
  },
  container: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 24,
    flex: 1,
    justifyContent: "space-between"
  },
  content: {
    paddingTop: 64,
    alignItems: "center"
  },
  image: {
    width: 120,
    height: 120
  },
  title: {
    color: '#004F97',
    fontFamily: FontFamilies.UBUNTU.medium,
    fontWeight: '500',
    fontSize: 16,
    marginTop: 24,
    marginBottom: 8
  },
  text: {
    color: "#909EAA",
    fontFamily: FontFamilies.UBUNTU.normal,
    fontWeight: '400',
    fontSize: 12,
    textAlign: "center"
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 12
  },
  buttonStyle: {
    flex: 1,
    backgroundColor: '#004F97',
    borderWidth: 0,
    color: '#FFFFFF',
    height: 52,
    alignItems: 'center',
    justifyContent:"center",
    borderRadius: 10,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 15,
    fontFamily: 'Ubuntu-Bold',
    fontWeight: '500',
    fontSize: 14,
  },
  bottom: {
    gap: 12
  },
  dgfin: {
    width: "100%",
    height: 77
  }
});
