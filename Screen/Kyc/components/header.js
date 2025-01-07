import React from 'react';
import {StyleSheet, View, TouchableOpacity, Image, Text} from 'react-native';
import { FontFamilies } from '../helper/index.js';

const KycHeader = props => {
  const {number, title, text, ...attributes} = props;

  return (
    <View style={styles.header}>
        <View style={styles.titleContainer}>
            <View style={styles.numberContainer}>
                <Text style={styles.number}>{number}</Text>
            </View>
            <Text style={styles.title}>{title}</Text>
        </View>
        {text && <Text style={styles.text}>{text}</Text>}
    </View>
  );
};

export default KycHeader;

const styles = StyleSheet.create({
    header:{
        paddingVertical:16,
        paddingHorizontal:22,
        gap:8
      },
      titleContainer:{
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center",
        gap:8
      },
      title:{
        color:"#004F97",
        fontWeight:"500",
        fontFamily: FontFamilies.UBUNTU.bold,
        fontSize:16
      },
      numberContainer:{
        width:32,
        height:32,
        backgroundColor:"#FFFFFF",
        borderRadius:10000,
        justifyContent:"center",
        alignItems:"center"
      },
      number:{
        color:"#004F97",
        fontWeight:"500",
        fontFamily: FontFamilies.UBUNTU.bold,
        fontSize:16
      },
      text:{
        color:"#909EAA",
        fontWeight:"400",
        fontFamily: FontFamilies.UBUNTU.normal,
        fontSize:12,
        textAlign:"center"
      }
});
