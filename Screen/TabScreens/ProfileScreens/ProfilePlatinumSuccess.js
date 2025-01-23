/* eslint-disable react-native/no-inline-styles */
// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React, {useState, useEffect, useRef} from 'react';
import {ActivityIndicator, View, StyleSheet, Image, ImageBackground, TouchableOpacity, Text, Dimensions} from 'react-native';

const ProfilePlatinumSuccess = ({navigation}) => {
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

 
  return (
    <View style={styles.container}>
      <ImageBackground
       style={[styles.bgimg, {flex:1, width:'100%'}]}
       resizeMode="cover"
       source={require('../../../assets/img/export/tutorial_bg.png')}>
        <View style={{
          flexDirection:'row',
          justifyContent:'space-between',
          alignItems:'center',
          paddingRight:16,
        }}>
        <Image
          source={require('../../../assets/img/export/payfour_logo.png')}
          style={{width: 113, height:40, resizeMode: 'contain', margin: 30, opacity:0}}
        />
        <TouchableOpacity style={{
          width:57,
          height:28,
          backgroundColor:'#dce9f3',
          borderRadius:16,
          alignItems:'center',
          justifyContent:'center',
          opacity:0
        }}
        onPress={()=>{}}>
          <Text style={{fontSize:14, color:'#004F97'}}>Atla</Text>
        </TouchableOpacity>
        </View>
        
          
          <View style={styles.slide4}>
            <View style={styles.header}>
              <Text style={styles.text}>Tebrikler</Text>
              <Text style={styles.text2}>Artık siz de Platin üyesisiniz</Text>
            </View>
            <Image
          source={require('../../../assets/img/export/tut2.png')}
          style={{
            width: Dimensions.get('window').height*0.461, 
            height:Dimensions.get('window').height * 0.418, 
            resizeMode: 'contain'}}
        />
          <View style={styles.bottomTextHolder}>
            <Text style={styles.bottomText}>
            Platinli olmanın ayrıcalıklarını keşfetmeye hemen başlayabilirsiniz.
            </Text>
          </View>
          <View style={{
            width:'100%',
        height:68,
        paddingTop:32,
        paddingBottom:32,
        paddingLeft:24,
        paddingRight:24, 
      }}>
        <TouchableOpacity style={{
          
          backgroundColor:'#004F97',
          alignItems:'center',
          justifyContent:'center',
          borderRadius:8,
          width:'100%',
          height:52
        }}
        //onPress={()=>{navigation.navigate('ProfileHome', { filter:'platinum' })}}
        onPress={() => navigation.navigate('campaign', { 
          screen: 'CampaignList',
          params: {
            filters:{isAw:true, isSp:false}
          }
        })}
        >
          <Text style={{color:'#fff', fontSize:14}}>
          Keşfetmeye Başla
          </Text>
        </TouchableOpacity>   

      </View>
          </View>
       
      
      <View style={{
        height:68,
        paddingTop:0,
        paddingBottom:32,
        paddingLeft:24,
        paddingRight:24, 
      }}>
        <TouchableOpacity style={{
          
          backgroundColor:'#004F97',
          alignItems:'center',
          justifyContent:'center',
          borderRadius:8,
          width:'100%',
          height:52
        }}
        onPress={()=>{}}>
          <Text style={{color:'#fff', fontSize:14}}>
          Keşfetmeye Başla
          </Text>
        </TouchableOpacity>   

      </View>
      </ImageBackground>
    </View>
  );
};

export default ProfilePlatinumSuccess;

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
  text2: {
    color: '#004F97',
    fontSize: Dimensions.get('window').height*0.028,
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
