/* eslint-disable prettier/prettier */
import {
  StyleSheet
} from 'react-native';
const registerStyles = StyleSheet.create({
  registerInputStyle:{
  backgroundColor:'#fff',
  paddingTop:10,
  paddingBottom:8,
  paddingLeft:12,
  paddingRight:12,
  borderWidth: 1,
  borderRadius: 10,
  marginBottom:16,
  minHeight:60
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
  marginLeft: 35,
  marginRight: 35,
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
  inputAndroid:{
  fontSize: 16,
  lineHeight:8,
  padding:0,
  color: '#015096',
  },
  inputIos:{
  fontSize: 16,
  lineHeight:18,
  padding:0,
  paddingTop:24,
  marginTop:4,
  color: '#015096',
  paddingTop:5,
  paddingBottom:5,
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
export {
  registerStyles
};