import React, { useEffect, useState, useRef } from 'react';
import { View, Image, Pressable, TouchableOpacity, Text, Dimensions, StyleSheet, SafeAreaView, KeyboardAvoidingView } from 'react-native';
import { styles } from '../Components/Styles.js';
import Loader from '../Components/Loader.js';
import { ScrollView } from 'react-native-gesture-handler';

import SubtabHeader from '../Components/SubtabHeader.js';
import KycTextInput from './components/input.js';
import KycHeader from './components/header.js';
import { apiRequest, customAlert, validateFormData } from './helper/index.js';
import { FontFamilies } from '../../constants/fonts.js';
import { Dropdown } from 'react-native-element-dropdown';
import KycCheckbox from './components/checkbox.js';

const IdentityDetailForm = ({ route, navigation }) => {
  const user = route.params.user
  const verifyData = route.params.data
  const selectedaAreements = route.params.selectedaAreements

  const [educationlevels, setEducationlevels] = useState();
  const [occupationroles, setOccupationroles] = useState();
  const [occupations, setOccupations] = useState();
  const [incometypes, setIncometypes] = useState([]);
  const [incometypesSelected, setIncometypesSelected] = useState([]);
  const [incometypesSelectedValid, setIncometypesSelectedValid] = useState(true);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    userBirthplace: { value: "", isValid: true },
    educationlevel: { value: "", isValid: true },
    occupationrole: { value: "", isValid: true },
    occupation: { value: "", isValid: true },
    monthlyAverage: { value: "", isValid: true },
    transactionVolume: { value: "", isValid: true },
    transactionsNumbers: { value: "", isValid: true },
  });

  const handleChange = (key, value) => {
    // Eğer belirli alanlardan biri ise yalnızca sayıları kabul et
    if (["monthlyAverage", "transactionVolume", "transactionsNumbers"].includes(key)) {
      const numericValue = value.replace(/[^0-9]/g, "");
      if (numericValue.length > 9) {
        return
      }

      setFormData((prevData) => {
        return {
          ...prevData,
          [key]: {
            isValid: true,
            value: numericValue,
          },
        };
      });
    } else {
      // Diğer alanlar için olduğu gibi kaydet
      setFormData((prevData) => {
        return {
          ...prevData,
          [key]: {
            isValid: true,
            value: value,
          },
        };
      });
    }
  };

  const toggleIncomeType = (id) => {
    setIncometypesSelected((prevSelected) => {
      if (prevSelected.includes(id)) {
        // ID listede varsa, çıkar
        return prevSelected.filter((itemId) => itemId !== id);
      } else {
        // ID listede yoksa, ekle
        setIncometypesSelectedValid(true)
        return [...prevSelected, id];
      }
    });
  };

  const sendData = async () => {

    const updatedData = validateFormData(formData);
    setFormData(updatedData);

    if (Object.values(updatedData).some((field) => field.isValid === false)) {
      return;
    }

    if (incometypesSelected.length == 0) {
      setIncometypesSelectedValid(false)
      return;
    }

    const data = {
      userBirthplace:formData.userBirthplace.value,
      monthlyAverage:formData.monthlyAverage.value,
      transactionVolume:formData.transactionVolume.value,
      transactionsNumbers:formData.transactionsNumbers.value,
      occupation:formData.occupation.value,
      occupationrole:formData.occupationrole.value,
      educationlevel:formData.educationlevel.value,
    }

    setLoading(true)
    navigation.navigate('Kyc', {
      screen: 'VerifyScreen', params: {
        user: user,
        selectedaAreements: selectedaAreements,
        incometypesSelected: incometypesSelected,
        data: data,
        referenceId: verifyData.referenceId
      }
    })
    setLoading(false)
  };

  const renderDropdownItem = item => {
    return (
      <View
        key={item.id}
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
          {item.name}
        </Text>
      </View>
    );
  };

  const getData = async () => {
    setLoading(true)
    const educationlevels = await apiRequest({ url: '/loans/educationlevels' });
    const occupationroles = await apiRequest({ url: '/loans/occupationroles' });
    const occupations = await apiRequest({ url: '/loans/occupations' });
    const incometypes = await apiRequest({ url: '/loans/incometypes' });
    if (educationlevels && educationlevels.data) {
      setEducationlevels(educationlevels.data)
    }
    if (occupationroles && occupationroles.data) {
      setOccupationroles(occupationroles.data)
    }
    if (occupations && occupations.data) {
      setOccupations(occupations.data)
    }
    if (incometypes && incometypes.data) {
      setIncometypes(incometypes.data)
    }
    setLoading(false)
  }

  useEffect(() => {
    getData()
  }, [])


  return (
    <SafeAreaView style={istyles.main}>
      <SubtabHeader isKycPage name="Kimlik Bilgilerim" count="0" />
      <Loader loading={loading} />

      <ScrollView keyboardShouldPersistTaps="handled" style={[styles.scrollView, { paddingBottom: 32 }]}>
        <KeyboardAvoidingView enabled>
          <View style={istyles.container}>
            <KycHeader number="3" title="Bilgilerini Tamamla"></KycHeader>
            <View style={istyles.form}>

              <KycTextInput
                value={formData.userBirthplace.value}
                isValid={formData.userBirthplace.isValid}
                onChange={(value) => handleChange("userBirthplace", value)}
                placeholder="Doğum Yeri"
              />

              {occupations && <Dropdown
                style={[istyles.inputStyle, formData.occupation.isValid === false  && istyles.borderError, { height: 66 }]}
                placeholderStyle={{
                  fontSize: 14,
                  color: '#909EAA',
                }}
                selectedTextStyle={{
                  fontSize: 14,
                  color: '#1D1D25',
                }}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={occupations}
                maxHeight={300}
                labelField="name"
                valueField="id"
                placeholder={'Meslek'}
                value={formData.occupation.value}
                onChange={(item) => handleChange("occupation", item.id)}
                renderItem={renderDropdownItem}
              />}
              {educationlevels && <Dropdown
                style={[istyles.inputStyle, formData.educationlevel.isValid === false  && istyles.borderError, { height: 66 }]}
                placeholderStyle={{
                  fontSize: 14,
                  color: '#909EAA',
                }}
                selectedTextStyle={{
                  fontSize: 14,
                  color: '#1D1D25',
                }}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={educationlevels}
                maxHeight={300}
                labelField="name"
                valueField="id"
                placeholder={'Eğitim Durumu'}
                value={formData.educationlevel.value}
                onChange={(item) => handleChange("educationlevel", item.id)}
                renderItem={renderDropdownItem}
              />}
              {occupationroles && <Dropdown
                style={[istyles.inputStyle, formData.occupationrole.isValid === false  && istyles.borderError, { height: 66 }]}
                placeholderStyle={{
                  fontSize: 14,
                  color: '#909EAA',
                }}
                selectedTextStyle={{
                  fontSize: 14,
                  color: '#1D1D25',
                }}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={occupationroles}
                maxHeight={300}
                labelField="name"
                valueField="id"
                placeholder={'Unvan'}
                value={formData.occupationrole.value}
                onChange={(item) => handleChange("occupationrole", item.id)}
                renderItem={renderDropdownItem}
              />}

              {incometypes && <View style={istyles.incometypesContainer}>
                <Text style={istyles.incometypesTitle}>Gelir Kaynaklarınız</Text>
                <View style={istyles.incometypesBody}>
                  {incometypes.map((item, index) =>
                    <View key={index} style={istyles.incometypesItem}>
                      <KycCheckbox isFullClick text={item.text} isValid={incometypesSelectedValid} show={incometypesSelected?.find(x => x == item.id)} onPress={() => toggleIncomeType(item.id)}></KycCheckbox>
                    </View>
                  )}
                </View>

              </View>}

              <KycTextInput
                value={formData.monthlyAverage.value}
                isValid={formData.monthlyAverage.isValid}
                onChange={(value) => handleChange("monthlyAverage", value)}
                placeholder="Aylık Ortalama Net Gelir"
                keyboardType='numeric'
              />

              <KycTextInput
                value={formData.transactionVolume.value}
                isValid={formData.transactionVolume.isValid}
                onChange={(value) => handleChange("transactionVolume", value)}
                placeholder="Tahmini Aylık İşlem Hacmi"
                keyboardType='numeric'
              />

              <KycTextInput
                value={formData.transactionsNumbers.value}
                isValid={formData.transactionsNumbers.isValid}
                onChange={(value) => handleChange("transactionsNumbers", value)}
                placeholder="Tahmini Aylık İşlem Sayısı"
                keyboardType='numeric'
              />

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

export default IdentityDetailForm;

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
    marginTop: 0
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
  incometypesContainer: {
    marginBottom: 12
  },
  incometypesTitle: {
    marginBottom: 12,
    color: "#909EAA",
    fontFamily: FontFamilies.UBUNTU.medium,
    fontWeight: '400',
    fontSize: 12,
  },
  incometypesBody: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    justifyContent: "space-between",
    width: Dimensions.get('window').width - 32,
    position: "relative",
  },
  incometypesItem: {
    width: (Dimensions.get('window').width - 44) / 2,
  },
  borderError:{
    borderColor:"#E94B43"
  }
})