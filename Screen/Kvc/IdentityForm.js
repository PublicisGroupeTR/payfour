import React, { useEffect, useState, useRef } from 'react';
import { Alert, TouchableWithoutFeedback, View, Modal, Image, Pressable,TouchableOpacity, Text, StyleSheet, SafeAreaView,  KeyboardAvoidingView } from 'react-native';
import { styles } from '../Components/Styles.js';
import Loader from '../Components/Loader.js';
import { ScrollView } from 'react-native-gesture-handler';

import MaskInput from 'react-native-mask-input';
import SubtabHeader from '../Components/SubtabHeader.js';
import KvcTextInput from './components/input.js';
import KvcCheckbox from './components/checkbox.js';
import KvcHeader from './components/header.js';
import { apiRequest, customAlert } from './helper/index.js';
import { FontFamilies } from '../../constants/fonts.js';

const IdentityForm = ({ route, navigation }) => {
  const tempToken = route.params.tempToken
  const user = route.params.user

  const [loading, setLoading] = useState(false);
  // const [formData, setFormData] = useState({
  //   userTCKN: "",
  //   userName: user.firstName,
  //   userLastName: user.lastName,
  //   userEmail: user.email,
  //   userPhone: user.phone,
  //   userBirth: user.birthDate ? user.birthDate.splice("T")[0].replace("-","/").split("").reverse().join("") : ""
  // });

  const [formData, setFormData] = useState({
    userTCKN: "",
    userName: user.firstName,
    userLastName: user.lastName,
    userEmail: user.email,
    userPhone: user.phone,
    userBirth: "",
  });
  
  const [agreements, setAgreements] = useState();

  const handleChange = (key, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const dateControl = (birthDate) => {
    try {
      // Tarih formatından "/" karakterlerini kaldır
      let fb = birthDate.replace(/\//g, "");
      // Tarih verilerini ayrıştır
      if (fb.length !== 8) {
        throw new Error("Invalid date format. Expected DD/MM/YYYY.");
      }

      let day = fb.substring(0, 2);
      let month = fb.substring(2, 4);
      let year = fb.substring(4, 8);


      // Tarihi ISO formatına dönüştür
      const dt = `${year}-${month}-${day}`;

      // Geçerli bir tarih oluştur ve ISO formatına çevir
      const d = new Date(dt);
      if (isNaN(d.getTime())) {
        throw new Error("Invalid date. Unable to parse.");
      }

      const fd = d.toISOString();

      return fd
    } catch (error) {
      console.error("Error processing date:", error.message);
    }

  };

  const sendData = async () => {

    const requiredFields = [
      { key: "userTCKN", label: "T.C. Kimlik Numarası" },
      { key: "userName", label: "Ad" },
      { key: "userLastName", label: "Soyad" },
      { key: "userEmail", label: "E-Posta" },
      { key: "userPhone", label: "Telefon Numarası" },
      { key: "userBirth", label: "Doğum Tarihi" },
    ];

    const emptyFields = requiredFields.filter(
      (field) => !formData[field.key] || formData[field.key].trim() === ""
    );

    if (emptyFields.length > 0) {

      customAlert({
          title: "Eksik Alanlar", 
          message: `Lütfen tüm alanları doldurun:\n${emptyFields
          .map((field) => field.label)
          .join(", ")}`
        })
      
      return;
    }
    
    const mandatoryAgreements = agreements.filter((agreement) =>
      [1].includes(agreement.necessity)
    );
  
    const unselectedMandatoryAgreements = mandatoryAgreements.filter(
      (agreement) => !agreement.selected
    );
  
    if (unselectedMandatoryAgreements.length > 0) {
      customAlert({
        title: "Sözleşmeler",
        message: `Lütfen aşağıdaki gerekli sözleşmeleri kabul ediniz: ${unselectedMandatoryAgreements
          .map((agreement) => agreement.name)
          .join(", ")}`,
      });
      return false;
    }

    const formattedDate = dateControl(formData.userBirth)

    const data = {
      tempToken: tempToken,
      tckn: formData.userTCKN,
      birthDate: formattedDate ?? "",
      email: formData.userEmail
    }
    
    setLoading(true)
    const response = await apiRequest({
      url: '/loans/verifycustomer',
      method: 'POST',
      data: data
    });
    if (response.success) {
      navigation.navigate('Kvc', {
        screen: 'AddressInfo', params: {
          user: user,
          tempToken: tempToken,
          data: response.data
        }
      })
    } else {
      customAlert({title:"Hata", message:response.errors.message})
    }
    setLoading(false)
  };

  const getAgrements = async () => {
    setLoading(true)
    const response = await apiRequest({ url: '/loans/consentlist' });
    if (response.data) {
      const data = []
      await response.data.filter(x=> x.isActive).forEach(element => {
        data.push({
          ...element,
          selected: false
        })
      });
      if (data && data.length != 0) {
        setAgreements(data)
      }
    }
   
    setLoading(false)
  };

  const changeAgreement = (id) => {
    setAgreements((prevAgreements) =>
      prevAgreements.map((agreement) =>
        agreement.id === id
          ? { ...agreement, selected: !agreement.selected }
          : agreement
      )
    );
  };
  
  useEffect(() => {
    getAgrements()
  }, [])

  const selectedAgreement = async (value) => {
    if (!value.templateDesignId) {
      return
    }
    setLoading(true)
    const response = await apiRequest({
      url: '/loans/consentdata/' + value.templateDesignId,
    });
    
    if (response.data) {
      navigation.navigate('Kvc', {
        screen: 'AgreementsView', params: {
          data: value,
          base64: response.data.documentContext,
        }
      })
    }
    setLoading(false)
  };

  return (
    <SafeAreaView style={istyles.main}>
      <SubtabHeader isKvcPage name="Kimlik Bilgilerin" count="0" />
      <Loader loading={loading} />
      <ScrollView keyboardShouldPersistTaps="handled" style={[styles.scrollView, { paddingBottom: 32 }]}>
        <KeyboardAvoidingView enabled>
          <View style={istyles.container}>
            <KvcHeader number="1" title="Bilgilerini Tamamla" text="Kimlik kartındaki bilgiler alındı, şimdi kalanları tamamla"></KvcHeader>
            <View style={istyles.form}>

              <MaskInput
                style={istyles.inputStyle}
                value={formData.userTCKN}
                onChangeText={(masked, unmasked) => handleChange("userTCKN", unmasked)}
                placeholder="T.C Kimlik Numarası"
                keyboardType="numeric"
                mask={[/[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/]}
              />

              {/* Ad */}
              <KvcTextInput
                value={formData.userName}
                onChange={(value) => handleChange("userName", value)}
                placeholder="Ad"
                keyboardType="default"
              />

              {/* Soyad */}
              <KvcTextInput
                value={formData.userLastName}
                onChange={(value) => handleChange("userLastName", value)}
                placeholder="Soyad"
                keyboardType="default"
              />

              {/* Telefon Numarası */}
              <MaskInput
                style={istyles.inputStyle}
                value={formData.userPhone}
                onChangeText={(masked, unmasked) => handleChange("userPhone", unmasked)}
                placeholder="Telefon No"
                keyboardType="numeric"
                mask={['+', '9', '0', ' ', '(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/]}
              />

              {/* Doğum Tarihi */}

              <View style={[istyles.inputStyle, { paddingBottom: 0 }]}>
                <Text style={istyles.bhirtDateText}>
                  Doğum Tarihi (GG/AA/YYYY)
                </Text>
                <MaskInput
                  value={formData.userBirth}
                  placeholder='GG/AA/YYYY'
                  onChangeText={(masked, unmasked) => handleChange("userBirth", masked)}
                  keyboardType="numeric"
                  mask={[/\d/, /\d/, "/", /\d/, /\d/, "/", /\d/, /\d/, /\d/, /\d/]}
                />
              </View>

              {/* E-Posta */}
              <KvcTextInput
                style={istyles.inputStyle}
                value={formData.userEmail}
                onChange={(value) => handleChange("userEmail", value)}
                placeholder="E-Posta"
                keyboardType="email-address"
              />

              {agreements && agreements.length !== 0 && (
                <View style={istyles.agreementsContainer}>
                  {agreements.map((item, index) =>
                    item.necessity == 3 ?
                    <View key={index} style={istyles.agreementsInfo}>
                       <Image
                        source={require("../../assets/img/export/information.png")}
                        style={istyles.agreementsImage} />
                      <Text style={istyles.agreementsInfoText}>{item.name}</Text>
                    </View>
                    :
                    <KvcCheckbox key={index} show={item.selected} isFullClick={!item.templateDesignId} onPress={()=>changeAgreement(item.id)} textOpen={ item.templateDesignId ? ()=> selectedAgreement(item): undefined} text={item.name} ></KvcCheckbox>
                  )}
                </View>
              )}

              <View style={istyles.buttonContainer}>
                <TouchableOpacity
                  onPress={sendData}
                  style={[istyles.buttonStyle]}
                  activeOpacity={0.5}
                >
                  <Text style={istyles.buttonTextStyle}>Devam Et</Text>
                </TouchableOpacity>

                <Image
                  source={require('../../assets/img/dgfin_legal.png')}
                  style={istyles.dgfin}
                />
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};
export default IdentityForm;

const istyles = StyleSheet.create({
  main:{
    flex: 1, 
    backgroundColor: '#efeff3'
  },
  container: {
    flex: 1,
    padding: 16
  },
  form: {
    marginTop: 12
  },
  inputStyle: {
    borderColor: '#E4E4E8',
    backgroundColor: '#fff',
    paddingTop: 17,
    paddingBottom: 17,
    paddingLeft: 16,
    paddingRight: 16,
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 16,
  },
  bhirtDateText: {
    fontSize: 12,
    lineHeight: 12,
    padding: 0,
    position: "absolute",
    color: '#909EAA',
    top: 14,
    left: 16
  },
  buttonStyle: {
    backgroundColor: '#004F97',
    borderWidth: 0,
    color: '#FFFFFF',
    height: 52,
    alignItems: 'center',
    borderRadius: 10,
  },

  buttonContainer: {
    width: "100%",
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
  agreementsContainer:{
    gap:16,
    width:"100%",
    paddingRight:16,
    marginBottom:24
  },
  agreementsInfo:{
    flexDirection:"row",
    gap:8
  },
  agreementsInfoText:{
    fontWeight: '300',
    color: '#1E242F',
    fontSize: 12,
  },
  agreementsImage:{
    width: 20,
    height: 20,
  },
  pdf: {
    flex: 1,
    width: "100%",
  },
})

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