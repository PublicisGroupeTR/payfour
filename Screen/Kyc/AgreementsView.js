import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
import Pdf from "react-native-pdf";
import { FontFamilies } from '../../constants/fonts.js';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const AgreementsView = ({ route, navigation }) => {
  const base64 = route.params.base64
  const data = route.params.data
  const insets = useSafeAreaInsets();

  const source = {
    uri: "data:application/pdf;base64," + base64,
    cache: true,
  };
  return (
    <View style={[styles.container, {paddingTop: insets.top}]}>
      <View style={styles.header}>
        <Text style={styles.title}>{data.name}</Text>
        <TouchableOpacity onPress={()=> navigation.goBack()} style={styles.iconContainer}>
          <Image
            source={require("../../assets/img/remove.png")}
            style={styles.icon} />
        </TouchableOpacity>
      </View>
      <Pdf
        source={source}
        onLoadComplete={(numberOfPages) => {
        }}
        onError={(error) => {
          console.log(error);
        }}
        style={styles.pdf}
        horizontal={false} 
        enablePaging={false}
      />
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
  }
});

export default AgreementsView;
