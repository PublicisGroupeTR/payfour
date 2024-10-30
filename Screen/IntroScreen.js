/* eslint-disable react-native/no-inline-styles */
// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React, {useState, useEffect, useRef} from 'react';
import {ActivityIndicator, View, StyleSheet, Image, ImageBackground, TouchableOpacity, Text, Dimensions} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Swiper from 'react-native-swiper';


const IntroScreen = ({navigation}) => {
  //State for ActivityIndicator animation
  const [animating, setAnimating] = useState(true);
  const [slideEnd, setSlideEnd] = useState(false);
  const sliderRef = useRef();
  useEffect(() => {
    setTimeout(() => {
      setAnimating(false);
      console.log('intro');
    }, 5000);
  }, [navigation]);

  const skipIntro = ()=>{
    AsyncStorage.getAllKeys((err, keys) => {
      AsyncStorage.multiGet(keys, (err, stores) => {
        let obj = {};
        stores.map((result, i, store) => {
          // get at each store's key/value so you can work with it
          
          let key = store[i][0];
          let value = store[i][1];
          obj[key] = value;          
        });

        console.log("storage");
        console.log(obj);
        console.log(obj.uniqueMPANumber);
        console.log(obj.phone);
        if (obj.phone !== 'null' && obj.uniqueMPANumber !== 'null' && obj.phone !== undefined && obj.uniqueMPANumber !== undefined &&obj.phone !== 'undefined' && obj.uniqueMPANumber !== 'undefined'){
          //navigation.replace('LoginWithPasswordScreen')
          navigation.navigate('Auth', { screen: 'LoginWithPasswordScreen' })
          //navigation.navigate('Auth', { screen: 'RegisterScreen' })
          //navigation.navigate('Auth', { screen: 'BiometricsScreen' })
        }else{
          navigation.navigate('Auth', { screen: 'LoginScreen' });
        }
      })
    })
  }
  return (
    <View style={styles.container}>
      <ImageBackground
       style={[styles.bgimg, {flex:1, width:'100%'}]}
       resizeMode="cover"
       source={require('../assets/img/export/tutorial_bg.png')}>
        <View style={{
          flexDirection:'row',
          justifyContent:'space-between',
          alignItems:'center',
          paddingRight:16,
        }}>
        <Image
          source={require('../assets/img/export/payfour_logo.png')}
          style={{width: 113, height:40, resizeMode: 'contain', margin: 30}}
        />
        <TouchableOpacity style={{
          width:57,
          height:28,
          backgroundColor:'#dce9f3',
          borderRadius:16,
          alignItems:'center',
          justifyContent:'center',
        }}
        onPress={skipIntro}>
          <Text style={{fontSize:14, color:'#004F97'}}>Atla</Text>
        </TouchableOpacity>
        </View>
        <Swiper 
        style={styles.wrapper}
        ref={sliderRef}
        loop={false}
        onMomentumScrollEnd={(e, state, context) =>{
          /*console.log('index:', state.index);
          console.log('total:', state.total);
          let end = (state.index+1) == state.total;
          console.log("end? "+end);*/
          //console.log(sliderRef.current.);
        }}
        onIndexChanged={(index) =>{
          console.log('index:', index);
          let end =  index ==3;
          console.log("end? "+end);
          setSlideEnd(end);
        }}
        dot={
          <View
            style={{
              backgroundColor: "#004F97",
              width: 6,
              height: 6,
              borderRadius: 4,
              marginLeft: 6,
              marginRight: 6,
              marginTop: 3,
              marginBottom: 3
            }}
          />
        }
        activeDot={
          <View
            style={{
              backgroundColor: '#fff',
              width: 32,
              height: 6,
              borderRadius: 6,
              marginLeft: 6,
              marginRight: 6,
              marginTop: 3,
              marginBottom: 3
            }}
          />
        }>
          <View style={styles.slide1}>
            <View style={styles.header}>
              <Text style={styles.text}>Karşınızda
              Payfour!</Text>
            </View>
            <Image
          source={require('../assets/img/export/tut1.png')}
          style={{
            width: Dimensions.get('window').height*0.461, 
            height:Dimensions.get('window').height * 0.418, 
            resizeMode: 'contain'}}
          /> 
          <View style={styles.bottomTextHolder}>
            <Text style={[styles.bottomText, {fontSize:18}]}>
            Artık <Text style={{fontWeight:'700'}}>CarrefourSA </Text>alışverişleriniz size özel kampanyalar ve finansal çözümler ile hem daha eğlenceli hem de daha kazançlı olacak.
            </Text>
          </View>
          </View>
          <View style={styles.slide2}>
            <View style={styles.header}>
              <Text style={styles.text}>%10 Nakit İade 
              Avantajı!</Text>
            </View>
            <Image
          source={require('../assets/img/export/tut2.png')}
          style={{
            width: Dimensions.get('window').height*0.461, 
            height:Dimensions.get('window').height * 0.418, 
            resizeMode: 'contain'}}
        />
        <View style={styles.bottomTextHolder}>
            <Text style={[styles.bottomText, {fontSize:18}]}>
            Payfour ile ödemelerinizde <Text style={{fontWeight:'700'}}>%3 nakit </Text>iade kazanın! 
            Üstelik Payfour Platin üyelerine özel <Text style={{fontWeight:'700'}}>%10 nakit </Text>iade sizleri bekliyor!
            </Text>
          </View>
          </View>
          <View style={styles.slide3}>
            <View style={styles.header}>
              <Text style={styles.text}>CarrefourSA Puan
              Kazanın!</Text>
            </View>
            <Image
          source={require('../assets/img/export/tut3.png')}
          style={{
            width: Dimensions.get('window').height*0.461, 
            height:Dimensions.get('window').height * 0.418, 
            resizeMode: 'contain'}}
        />
        <View style={styles.bottomTextHolder}>
            <Text style={styles.bottomText}>
            <Text style={{fontWeight:'700'}}>Payfour </Text>ile yapacağınız alışverişlerde CarrefourSA Puan kazanabilir ve sonraki alışverişlerinizde dilediğiniz gibi harcayabilirsiniz.
          
            </Text>
          </View>
          </View>
          <View style={styles.slide4}>
            <View style={styles.header}>
              <Text style={styles.text}>Alışverişini Şimdi,
              Ödemesini Sonra Yap</Text>
            </View>
            <Image
          source={require('../assets/img/export/tut4.png')}
          style={{
            width: Dimensions.get('window').height*0.461, 
            height:Dimensions.get('window').height * 0.418, 
            resizeMode: 'contain'}}
        />
        <View style={styles.bottomTextHolder}>
            <Text style={styles.bottomText}>
            <Text style={{fontWeight:'700'}}>Payfour </Text> ile yapacağınız alışverişlerde size özel hazır limitinizi hemen öğrenebilir, uygun taksit ve vade seçenekleriyle anında kredi kullanabilirsiniz.
            </Text>
          </View>
          </View>
        </Swiper>
      {/* <ActivityIndicator
        animating={animating}
        color="#ffffff"
        size="large"
        style={styles.activityIndicator}
      /> */}
      <View style={{
        height:68,
        paddingTop:0,
        paddingBottom:32,
        paddingLeft:24,
        paddingRight:24, 
      }}>
        {slideEnd
        ? <TouchableOpacity style={{
          
          backgroundColor:'#004F97',
          alignItems:'center',
          justifyContent:'center',
          borderRadius:8,
          width:'100%',
          height:52
        }}
        onPress={skipIntro}>
          <Text style={{color:'#fff', fontSize:14}}>
            Giriş Yap / Üye Ol
          </Text>
        </TouchableOpacity>
        : 
        <TouchableOpacity style={{flexDirection:'row', alignItems:'center', justifyContent:'flex-end', paddingRight:16, height:52}}
        onPress={()=> console.log(sliderRef.current.scrollBy(1))}>
        <Text style={{color:'#004F97', marginRight:8, fontSize:16}}>
            Sonraki
          </Text>
          <Image
          source={require('../assets/img/export/right_arrow_blue.png')}
          style={{width: 24, height:24, resizeMode: 'contain'}}
        />
        </TouchableOpacity>
      }

      </View>
      </ImageBackground>
    </View>
  );
};

export default IntroScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#254f8e',
  },
  activityIndicator: {
    alignItems: 'center',
    height: 80,
  },
  wrapper: {},
  slide1: {
    flex: 1,
    //justifyContent: 'center',
    alignItems: 'center',
  },
  slide2: {
    flex: 1,
    //justifyContent: 'center',
    alignItems: 'center',
  },
  slide3: {
    flex: 1,
    //justifyContent: 'center',
    alignItems: 'center',
  },
  slide4: {
    flex: 1,
    //justifyContent: 'center',
    alignItems: 'center',
  },
  header:{
    justifyContent: 'center',
    alignItems: 'center',
    height:Dimensions.get('window').height*0.098,
    width:'100%'
  },
  text: {
    color: '#004F97',
    fontSize: Dimensions.get('window').height*0.039,
    fontWeight: 'bold',
    textAlign:'center',
    paddingLeft:32,
    paddingRight:32,
  },
  bottomTextHolder:{
    paddingLeft:24,
    paddingRight:24,
  },
  bottomText:{
    color:'#004F97',
    fontSize:16,
    textAlign:'center',
  }
})
