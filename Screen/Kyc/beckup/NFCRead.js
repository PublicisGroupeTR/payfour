/* eslint-disable react-native/no-inline-styles */
// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Button,
  NativeModules,
  TouchableOpacity,
  Image
} from 'react-native';
import SubtabHeader from '../Components/SubtabHeader.js';
import { FontFamilies } from '../../constants/fonts.js';

const NFCRead = () => {


  return (
    <View style={styles.wrapper}>
      <SubtabHeader routetarget="VerifyScreen" name="Yüzünü Tanıt" count="0" />
      <View style={styles.main}>
        <View style={styles.container}>
          <View style={styles.content}>
            <Text style={styles.title}>Taramaya hazır</Text>
            <Image
              source={require('../../assets/img/read_icon.png')}
              style={styles.image}
            />
            <Text style={styles.text}>Telefonunuzu kimliği yaklaştırın.</Text>

            <View style={styles.progress}>
              <View style={styles.progressItem}>
                <View style={[styles.progressCircle, styles.progressCircleActive]}>
                  <Text style={[styles.progressCircleText, styles.progressCircleTextActive]}>1</Text>
                </View>
                <Text style={[styles.progressText, styles.progressTextActive]}>1.Aşama</Text>
              </View>
              <View style={[styles.progressDashed, styles.progressDashedActive]} />
              <View style={styles.progressItem}>
                <View style={styles.progressCircle}>
                  <Text style={styles.progressCircleText}>2</Text>
                </View>
                <Text style={styles.progressText}>2.Aşama</Text>
              </View>
              <View style={styles.progressDashed} />
              <View style={styles.progressItem}>
                <View style={styles.progressCircle}>
                  <Text style={styles.progressCircleText}>3</Text>
                </View>
                <Text style={styles.progressText}>3.Aşama</Text>
              </View>
              <View style={styles.progressDashed} />
              <View style={styles.progressItem}>
                <View style={styles.progressCircle}>
                  <Text style={styles.progressCircleText}>4</Text>
                </View>
                <Text style={styles.progressText}>4.Aşama</Text>
              </View>

            </View>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={() => { }}
              style={[styles.buttonStyle, {}]}
              activeOpacity={0.5}
            >
              <Text style={styles.buttonTextStyle}>İptal Et</Text>
            </TouchableOpacity>
        
          </View>


        </View>
      </View>
    </View>
  );
};

export default NFCRead;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  main: {
    flex: 1,
    padding: 16,
    backgroundColor: "#efeff3"
  },
  container: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 24,
    flex: 1,
    justifyContent: "space-between"
  },
  content: {
    paddingTop: 42,
    alignItems: "center"
  },
  image: {
    width: 108,
    height: 108
  },
  title: {
    color: '#8F8E94',
    fontFamily: FontFamilies.UBUNTU.normal,
    fontWeight: '500',
    fontSize: 26,
    marginBottom: 36
  },
  text: {
    color: "#222222",
    fontFamily: FontFamilies.UBUNTU.normal,
    fontWeight: '500',
    fontSize: 16,
    textAlign: "center",
    marginTop: 24
  },
  buttonContainer: {
    flexDirection: "col",
    gap: 12
  },
  buttonStyle: {
    backgroundColor: '#D5D4DB',
    borderWidth: 0,
    color: '#FFFFFF',
    height: 52,
    alignItems: 'center',
    borderRadius: 10,
    opacity: .5
  },
  buttonTextStyle: {
    color: '#222222',
    paddingVertical: 15,
    fontFamily: FontFamilies.UBUNTU.bold,
    fontWeight: '500',
    fontSize: 16,
  },
  progress: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    marginTop: 50,
    alignItems: "center"
  },
  progressItem: {
    gap: 4,
    width: 45,
    alignItems: "center"
  },
  progressCircle: {
    width: 32,
    height: 32,
    backgroundColor: 'rgba(144, 158, 170, .10)',
    borderRadius: 10000,
    justifyContent: "center",
    alignItems: "center"
  },
  progressCircleActive: {
    backgroundColor: 'rgba(0, 79, 151, .10)',

  },
  progressCircleText: {
    color: '#909EAA',
    fontFamily: FontFamilies.UBUNTU.medium,
    fontWeight: '400',
    fontSize: 18,
  },
  progressCircleTextActive: {
    color: '#004F97',
  },
  progressText: {
    textAlign: "center",
    fontFamily: FontFamilies.UBUNTU.medium,
    fontWeight: '400',
    fontSize: 10,
    color: "#909EAA"
  },
  progressTextActive: {
    color: "#004F97"
  },
  progressDashed: {
    flexGrow: 1,
    height: 1,
    borderWidth: 1,
    borderColor: '#909EAA',  // Kenarlık rengi
    borderRadius: 1,
    borderStyle: 'dashed',
    paddingHorizontal: 5
  },
  progressDashedActive: {
    borderColor: '#004F97',  // Kenarlık rengi
  }
});
