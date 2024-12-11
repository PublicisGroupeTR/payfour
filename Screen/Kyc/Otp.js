import React, { useEffect, useState, useRef } from 'react';
import { View, Image, TouchableOpacity, Text, StyleSheet, Keyboard } from 'react-native';
import { apiRequest, customAlert } from './helper/index.js';
import { OtpInput } from "react-native-otp-entry";
import { FontFamilies } from '../../constants/fonts.js';
import KvcLayout from './KvcLayout.js';

const KycOtp = ({ navigation }) => {

  const [otpError, setOtpError] = useState(false);
  const [otp, setOtp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState();
  const [transactionId, setTransactionId] = useState();
  const otpInputRef = useRef();
  const [timerCount, setTimerCount] = useState(180);
  const [timerText, setTimerText] = useState("");

  useEffect(() => {
    setLoading(true)
    getUser()
  }, [])

  const getUser = async () => {
    const response = await apiRequest({ url: '/account/getuser' });
    if (response && response.data) {
      setUser(response.data)
      initOtp()
    }
  }

  const initOtp = async () => {
    const response = await apiRequest({
      url: '/loans/sendotpforloanapplication',
      method: 'POST',
    });
    if (response && response.data && response.success) {
      otpInputRef.current.focus()
      setTransactionId(response.data.transactionId)
      setTimerCount(180)
      setTimerText("")
      startOtpTimer()
      setLoading(false)
    } else {
      customAlert({title:"Hata", message:response.errors.message})
      setLoading(false)
      setTimeout(() => {
        navigation.navigate('TabNavigationRoutes', { 
          screen: 'discover',
        })
      }, 1500);
    }
  }

  const sendOtp = async () => {
    setLoading(true)
    if (otp.length != 6) {
      return
    }
    const response = await apiRequest({
      url: '/loans/verifyotpforloanapplication',
      method: 'POST',
      data: {
        transactionId: transactionId,
        code: otp
      }
    });
    if (response.success) {
      navigation.navigate('Kyc', {
        screen: 'IdentityForm', params: {
          user: user,
          tempToken: response.data.tempToken
        }
      })
    } else {
      setOtpError(true)
    }
    setLoading(false)
  }

  const againOtp = async () => {
    setLoading(true)
    initOtp()
  }

  const startOtpTimer = () => {

    setTimerText(
      `${Math.floor(timerCount / 60)
        .toString()
        .padStart(2, "0")}:${(timerCount % 60)
        .toString()
        .padStart(2, "0")}`
    );
  
    const interval = setInterval(() => {
      setTimerCount((lastTimerCount) => {
        if (lastTimerCount <= 0) {
          clearInterval(interval);
          setTimerText("00:00");
          return 0;
        } else {
          const minutes = Math.floor(lastTimerCount / 60);
          const seconds = lastTimerCount % 60;
          setTimerText(
            `${minutes.toString().padStart(2, "0")}:${seconds
              .toString()
              .padStart(2, "0")}`
          );
          return lastTimerCount - 1;
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  };

  return (
    <KvcLayout disableScroll title="Doğrulama Kodu" loading={loading}>
       <View style={istyles.container}>
          <View style={istyles.otpContainer}>
            <Image
              source={require('../../assets/img/kyc_otp.png')}
              style={istyles.otpImage}
            />
            <Text style={istyles.text}>
              <Text style={istyles.phone}>{user?.phone ?? "XXX XX XX"}</Text> numaralı telefonunuza gelen 6 haneli kodu girerek doğrulama işlemini tamamlayınız.
            </Text>
            <OtpInput
              numberOfDigits={6}
              disabled={timerCount == 0}
              focusColor="#015096"
              focusStickBlinkingDuration={500}
              secureTextEntry={false}
              ref={otpInputRef}
              onTextChange={(text) => { setOtpError(false), setOtp(text); }}
              onFilled={(text) => {
                Keyboard.dismiss();
              }}
              textInputProps={{
                accessibilityLabel: "Password",
                secureTextEntry: true,
              }}
              theme={{
                containerStyle:{
                  alignItems:"center",
                  justifyContent:"center",
                  gap:8
                },
                pinCodeContainerStyle: {
                  backgroundColor: '#fff',
                  borderColor: otpError ? '#E42932' : '#909EAA',
                  width: 40,
                  height: 48,
                  borderRadius:8
                },
                pinCodeTextStyle: {
                  fontSize:16,
                  fontWeight:FontFamilies.UBUNTU.bold,
                  color:"#015096",
                },
                focusStickStyle: {},
                focusedPinCodeContainerStyle: {
                  borderColor: "#015096"
                },
              }}
            />
            {otpError && <Text style={[istyles.timer, { color: "#E94B43", marginTop: 8 }]}>Girilen kod hatalı. Lütfen kontrol edin.</Text>}
            {timerText.length != 0 && timerCount != 0 && <Text style={[istyles.timer, { marginTop:16, fontFamily: FontFamilies.UBUNTU.bold }]}>{timerText}</Text>}
            {timerCount == 0 &&
              <TouchableOpacity onPress={againOtp}>
                <Text style={[istyles.timer]}>Yeniden Gönder</Text>
              </TouchableOpacity>
            }

          </View>
          <View style={istyles.buttonContainer}>
            <TouchableOpacity
              disabled={(otp.length != 6)}
              onPress={sendOtp}
              style={[istyles.buttonStyle, otp.length != 6 && { backgroundColor: "#dadee7" }]}
              activeOpacity={0.5}
            >
              <Text style={istyles.buttonTextStyle}>Doğrula</Text>
            </TouchableOpacity>

            <Image
              source={require('../../assets/img/dgfin_legal.png')}
              style={istyles.dgfin}
            />
          </View>

        </View>
    </KvcLayout>
  );
};
export default KycOtp;

const istyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    paddingTop: 32,
    justifyContent: "space-between"
  },
  otpContainer: {
    alignItems: "center"
  },
  text: {
    color: "#909EAA",
    fontWeight: "400",
    fontFamily: FontFamilies.UBUNTU.normal,
    fontSize: 14,
    textAlign: "center",
    marginBottom:24,
    paddingHorizontal:36,
    lineHeight:20
  },
  phone: {
    color: "#0B1929",
    fontWeight: "500",
    fontFamily: FontFamilies.UBUNTU.bold,
    fontSize: 14,
  },
  otpImage: {
    width: 56,
    height: 56,
    objectFit: "cover",
    marginBottom:16
  },
  buttonContainer: {
    flexDirection: "col",
    gap: 12
  },
  buttonStyle: {
    backgroundColor: '#004F97',
    borderWidth: 0,
    color: '#FFFFFF',
    height: 52,
    alignItems: 'center',
    borderRadius: 10,
    justifyContent:"center"
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 15,
    fontFamily: FontFamilies.UBUNTU.medium,
    fontWeight: '500',
    fontSize: 14,
  },
  dgfin: {
    width: "100%",
    height: 77
  },
  timer: {
    color: '#015096',
    fontSize: 14,
    lineHeight: 24,
    textAlign: 'center',
    marginTop:12
  }
})

