import React from 'react';
import { View, Image, TouchableOpacity, Text, StyleSheet, SafeAreaView, KeyboardAvoidingView } from 'react-native';
import KycTextInput from './components/input.js';
import KycHeader from './components/header.js';
import { FontFamilies } from '../../constants/fonts.js';
import KvcLayout from './KvcLayout.js';

const AddressInfo = ({ route, navigation }) => {
  const user = route.params?.user
  const data = route.params?.data
  const selectedaAreements = route.params?.selectedaAreements

  const next = async () => {
    navigation.navigate('Kyc', {
      screen: 'IdentityDetailForm', params: {
        user: user,
        selectedaAreements: selectedaAreements,
        data: data
      }
    })
  }

  return (
    <KvcLayout title={"Kimlik Bilgilerin"} loading={false}>
      <View style={istyles.container}>
            <KycHeader number="2" title="Adres Bilgileri"></KycHeader>
            <View style={istyles.form}>
            <KycTextInput
              disable
              title={"İl"}
              value={data.city || ""}
              placeholder="İl"
            />
            <KycTextInput
              disable
              title={"İlçe"}
              value={data.district || ""}
              placeholder="İlçe"
            />
            <KycTextInput
              disable
              title={"Mahalle"}
              value={data.neihgbourhood || ""}
              placeholder="Mahalle"
            />
            <KycTextInput
              disable
              title={"Cadde"}
              value={data.street || ""}
              placeholder="Cadde"
            />
            <KycTextInput
              disable
              title={"Bina No"}
              value={data.building || ""}
              placeholder="Bina No"
            />
            <KycTextInput
              disable
              title={"Daire No"}
              value={data.section || ""}
              placeholder="Daire No"
            />

              <View style={istyles.buttonContainer}>
                <TouchableOpacity
                  onPress={next}
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
export default AddressInfo;

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
  modal:{
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    backgroundColor: 'rgba(92, 92, 92, 0.56)',
  },
  modalBody:{
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 16,
    paddingRight: 16,
    width: '100%',
    height: 500
  }
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