import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
import Pdf from "react-native-pdf";
import { FontFamilies } from './helper/index.js';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useIsFocused } from '@react-navigation/native';

const AgreementsView = ({ route, navigation }) => {
  const base64 = route.params.base64
  const data = route.params.data
  const insets = useSafeAreaInsets();
  const isFocused = useIsFocused();
  const [buttonActive, setButtonActive] = useState(false) 
  
  const goBack = (id) => {
    navigation.navigate({
      name: 'IdentityForm',
      params: { agreementId: id },
      merge: true, // Mevcut parametreleri korur ve yenilerini ekler
    });
  }

  useEffect(()=>{
    if (isFocused) {
      setButtonActive(false)
    }
  },[isFocused])

  const source = {
    uri: "data:application/pdf;base64," + base64,
    cache: true,
  };

  return (
    <View style={[styles.container, {paddingTop: insets.top, paddingBottom: insets.bottom}]}>
      <View style={styles.header}>
        <Text style={styles.title}>{data.name}</Text>
        <TouchableOpacity onPress={()=> goBack("")} style={styles.iconContainer}>
          <Image
            source={require("../../assets/img/remove.png")}
            style={styles.icon} />
        </TouchableOpacity>
      </View>
      <Pdf
        source={source}
        onError={(error) => {
          console.log(error);
        }}
        onPageChanged={(currentPage, totalPage)=> {
          if (currentPage == totalPage) {
            setButtonActive(true)
          }
        }}
        style={styles.pdf}
        horizontal={false} 
        enablePaging={false}
      />
      {/* <View style={{height:200}}>

      </View> */}
      <TouchableOpacity
        onPress={()=>goBack(data.id)}
        disabled={!buttonActive}
        style={[styles.buttonStyle, { opacity : buttonActive ? 1 : .5  }]}
        activeOpacity={0.5}
      >
        <Text style={styles.buttonTextStyle}>Okudum, Onaylıyorum</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pdf: {
    flex: 1,
    width: "100%",
    paddingBottom:52,
  },
  header: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 24,
    gap: 24,
  },
  title: {
    color: '#0B1929',
    fontFamily: FontFamilies.UBUNTU.medium,
    fontWeight: '500',
    fontSize: 16,
    width: "80%"
  },
  iconContainer: {
    width: 36,
    height: 36,
    justifyContent:"center",
    alignItems:"center"
  },
  icon: {
    width: 24,
    height: 24
  },
  buttonStyle: {
    backgroundColor: '#004F97',
    borderWidth: 0,
    color: '#FFFFFF',
    height: 52,
    alignItems: 'center',
    borderRadius: 10,
    justifyContent: "center",
    margin:12
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 15,
    fontFamily: FontFamilies.UBUNTU.medium,
    fontWeight: '500',
    fontSize: 14,
  },
});

export default AgreementsView;
