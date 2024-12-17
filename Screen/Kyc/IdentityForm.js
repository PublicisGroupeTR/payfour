import React, { useEffect, useState } from 'react';
import { View, Image, TouchableOpacity, Text, StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';

import MaskInput from 'react-native-mask-input';
import KycTextInput from './components/input.js';
import KycCheckbox from './components/checkbox.js';
import KycHeader from './components/header.js';
import { apiRequest, customAlert, validateFormData, isValidEmail, formatDate } from './helper/index.js';
import { FontFamilies } from '../../constants/fonts.js';
import KvcLayout from './KvcLayout.js';

const IdentityForm = ({ route, navigation }) => {

  const tempToken = route.params.tempToken
  const user = route.params.user
  // console.log(tempToken)
  // console.log(user)
  // const tempToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImFwcGx5bG9hbnwwMTkzYWY5Ny1mMTU0LTczZTYtOGI1ZC02YjIyYjlhOWI2M2IiLCJtZW1iZXJpZCI6IjM1ODMiLCJleHAiOjE3MzM4MjE0MDIsImlzcyI6IlBheWZvdXJBcHBTZXJ2aWNlIiwiYXVkIjoiUGF5Zm91clRlbXBUb2tlbiJ9.yortaIurPVV3Efu7bpRoQPmZbx-l0dhxpUd538ceYiY"
  // const user = {"birthDate": "2001-10-10T00:00:00", "cityCode": 6, "commercialElectronic": true, "crmCustomerId": "15628932", "defaultBankAccountNumber": "3594488206101", "districtCode": 74, "email": "", "firstName": "Mahmut Bilal", "gender": "Male", "isStudent": false, "lastName": "TEKİROĞLU", "payfourId": 3583, "phone": "+905533600910", "referralCode": "PYF2jzBnEzjQhS7", "registrationCompleted": true, "segment": 1}
  // 64317832464

  const [loading, setLoading] = useState(false);
  const [agreements, setAgreements] = useState();

  const [formData, setFormData] = useState({
    userTCKN: { value: "64317832464", isValid: true },
    userName: { value: user.firstName, isValid: true },
    userLastName: { value: user.lastName, isValid: true },
    userEmail: { value: user.email, isValid: true },
    userPhone: { value: user.phone, isValid: true },
    userBirth: { value: user.birthDate ? formatDate(user.birthDate) : "", isValid: true },
  });

  const handleChange = (key, value) => {
    setFormData((prevData) => {
      let formattedValue = value;
      const isValidDate = validateDate(value);

      if (key === "userName" || key === "userLastName") {
        formattedValue = value.replace(/[^a-zA-ZğüşöçıİĞÜŞÖÇ ]/g, "");
      }

      if (key == "userBirth") {
        formattedValue = value.split("T")[0]
      }

      return {
        ...prevData,
        [key]: {
          isValid: key == "userBirth" ? isValidDate : true,
          value: formattedValue,
        },
      };
    });
  };

  const sendData = async () => {

    const updatedData = validateFormData(formData);

    updatedData.userBirth.isValid = validateDate(updatedData.userBirth.value)
    updatedData.userEmail.isValid = isValidEmail(updatedData.userEmail.value)

    setFormData(updatedData);

    const mandatoryAgreements = agreements.filter((agreement) =>
      [1].includes(agreement.necessity)
    );

    const unselectedMandatoryAgreements = mandatoryAgreements.filter(
      (agreement) => !agreement.selected
    );

    const updatedAgreements = agreements.map((agreement) => {
      if (unselectedMandatoryAgreements.some((unselected) => unselected.id === agreement.id)) {
        return {
          ...agreement,
          isValid: false,
        };
      }
      return agreement;
    });

    setAgreements([...updatedAgreements])

    if (Object.values(updatedData).some((field) => field.isValid === false)) {
      return;
    }

    if (unselectedMandatoryAgreements.length != 0) {
      return
    }

    const formattedDate = dateControl(formData.userBirth.value)

    const data = {
      tempToken: tempToken,
      tckn: formData.userTCKN.value,
      birthDate: formattedDate,
      email: formData.userEmail.value,
      isPotential: false
    }

    const selectedaAreements = agreements.filter((item) => item.selected === true).map((item) => item.code);

    setLoading(true)
    const response = await apiRequest({
      url: '/loans/verifycustomer',
      method: 'POST',
      data: data
    });
    if (response.success) {
      navigation.navigate('Kyc', {
        screen: 'AddressInfo', params: {
          user: user,
          data: response.data,
          selectedaAreements: selectedaAreements
        }
      })
    } else {
      customAlert({ title: "Hata", message: response.errors.message })
    }
    setLoading(false)
  };

  const getAgrements = async () => {
    setLoading(true)
    const response = await apiRequest({ url: '/loans/consentlist' });
    if (response.data) {
      const data = []
      await response.data.filter(x => x.isActive).forEach(element => {
        data.push({
          ...element,
          selected: false,
          isValid: true
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
          ? { ...agreement, selected: !agreement.selected, isValid: true }
          : agreement
      )
    );
  };

  const selectedAgreement = async (value) => {
    if (!value.templateDesignId) {
      return
    }
    setLoading(true)
    const response = await apiRequest({
      url: '/loans/consentdata/' + value.templateDesignId,
    });

    if (response.data) {
      navigation.navigate('Kyc', {
        screen: 'AgreementsView', params: {
          data: value,
          base64: response.data.documentContext,
        }
      })
    }
    setLoading(false)
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

  const validateDate = (date) => {
    const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
    if (!regex.test(date)) return false;

    const [, day, month, year] = date.match(regex);
    const dayNum = parseInt(day, 10);
    const monthNum = parseInt(month, 10);
    const yearNum = parseInt(year, 10);

    // Gün, ay ve yıl kontrolleri
    if (dayNum < 1 || dayNum > 31) return false;
    if (monthNum < 1 || monthNum > 12) return false;
    if (yearNum < 1900) return false;

    // Geçerli bir tarih kontrolü
    const isValidFullDate = new Date(`${yearNum}-${monthNum}-${dayNum}`);
    return (
      isValidFullDate.getFullYear() === yearNum &&
      isValidFullDate.getMonth() + 1 === monthNum &&
      isValidFullDate.getDate() === dayNum
    );
  };

  useEffect(() => {
    getAgrements()
  }, [])

  return (
    <KvcLayout title="Kimlik Bilgilerim" loading={loading}>
      <View style={istyles.container}>
        <KycHeader number="1" title="Bilgilerini Tamamla" text="Kimlik kartındaki bilgiler alındı, şimdi kalanları tamamla"></KycHeader>
        <View style={istyles.form}>
          <MaskInput
            style={[istyles.inputStyle, formData.userTCKN.isValid === false && istyles.borderError]}
            value={formData.userTCKN.value}
            onChangeText={(masked, unmasked) => handleChange("userTCKN", unmasked)}
            placeholder="T.C Kimlik Numarası"
            placeholderTextColor="#909EAA"
            keyboardType="numeric"
            mask={[/[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/]}
          />

          {/* Ad */}
          <KycTextInput
            isValid={formData.userName.isValid}
            value={formData.userName.value}
            onChange={(value) => handleChange("userName", value)}
            placeholder="Ad"
            keyboardType="default"
          />

          {/* Soyad */}
          <KycTextInput
            isValid={formData.userLastName.isValid}
            value={formData.userLastName.value}
            onChange={(value) => handleChange("userLastName", value)}
            placeholder="Soyad"
            keyboardType="default"
          />

          {/* Telefon Numarası */}
          <MaskInput
            style={[istyles.inputStyle, formData.userPhone.isValid === false && istyles.borderError]}
            value={formData.userPhone.value}
            onChangeText={(masked, unmasked) => handleChange("userPhone", unmasked)}
            placeholder="Telefon No"
            keyboardType="numeric"
            placeholderTextColor="#909EAA"
            mask={['+', '9', '0', ' ', '(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/]}
          />

          <View style={[istyles.inputStyle, formData.userBirth.isValid === false && istyles.borderError, Platform.OS == "ios" ? { paddingTop: 26, paddingBottom: 12 } : {paddingBottom: 0, paddingLeft: 12}]}>
            <Text style={istyles.bhirtDateText}>
              Doğum Tarihi (GG/AA/YYYY)
            </Text>
            <MaskInput
              value={formData.userBirth.value}
              placeholder='GG/AA/YYYY'
              onChangeText={(masked, unmasked) => handleChange("userBirth", masked)}
              keyboardType="numeric"
              mask={[/\d/, /\d/, "/", /\d/, /\d/, "/", /\d/, /\d/, /\d/, /\d/]}
            />
          </View>

          <KycTextInput
            isValid={formData.userEmail.isValid}
            style={istyles.inputStyle}
            value={formData.userEmail.value}
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
                    <Text onPress={item.templateDesignId ? () => selectedAgreement(item) : undefined} style={[istyles.agreementsInfoText, item.templateDesignId && { textDecorationLine: 'underline', color: "#004F97" }]}>{item.name}</Text>
                  </View>
                  :
                  <KycCheckbox
                    key={index}
                    show={item.selected}
                    isValid={item.isValid}
                    isFullClick={!item.templateDesignId}
                    onPress={() => changeAgreement(item.id)}
                    textOpen={item.templateDesignId ? () => selectedAgreement(item) : undefined}
                    text={item.name}
                  ></KycCheckbox>
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
    </KvcLayout>
  );
};
export default IdentityForm;

const istyles = StyleSheet.create({
  main: {
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
  bhirtDateTitle: {
    fontSize: 12,
    lineHeight: 12,
    padding: 0,
    position: "absolute",
    color: '#909EAA',
    top: 14,
    left: 16
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
    justifyContent: "center"
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
  agreementsContainer: {
    gap: 16,
    width: "100%",
    paddingRight: 16,
    marginBottom: 24
  },
  agreementsInfo: {
    flexDirection: "row",
    gap: 8
  },
  agreementsInfoText: {
    fontWeight: '300',
    color: '#1E242F',
    fontSize: 12,
  },
  agreementsImage: {
    width: 20,
    height: 20,
  },
  pdf: {
    flex: 1,
    width: "100%",
  },
  borderError: {
    borderColor: "#E94B43"
  }
})
