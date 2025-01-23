/* eslint-disable react-native/no-inline-styles */
// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React, {useState, useEffect, useRef} from 'react';
import {View, StyleSheet, Text, SafeAreaView, Image, Linking, FlatList, TouchableOpacity, Dimensions} from 'react-native';
import Loader from '../Components/Loader.js';
import SubtabHeader from '../Components/SubtabHeader.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'react-native-axios';
import { apiGet, apiPut } from '../utils/api.js';
//const { showError } = useError();
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

const MapScreen = ({navigation, route}) => {
  const [loading, setLoading] = useState(false);
  const [markerData, setMarkerData] = useState([]);
  const [coord, setCoord] = useState({lat:41.037266, long:28.9836977});
  
  const mapRef = useRef(null);
  const scrollRef = useRef();
  useEffect(() => {   
    const unsubscribe = navigation.addListener('focus', () => {
      // do something
      AsyncStorage.getItem('token').then(value =>{
        const config = {
          headers: { Authorization: `Bearer ${value}` }
        };
        //apiGet('notifications?page=1&pageSize=12', onGetNotifications);
        
      });
      console.log("Geolocation.setRNConfiguration");
      Geolocation.setRNConfiguration(
        config={
          skipPermissionRequests: false,
          authorizationLevel: 'auto',
          enableBackgroundLocationUpdates: false,
          locationProvider: 'auto'
        }
      )
        
        Geolocation.getCurrentPosition(info => {
          console.log(info);
          getMarkers(info.coords.latitude, info.coords.longitude);
          //getMarkers(41.037266, 28.9836977);
        });
      
    });
    return unsubscribe;
  }, [route]);
  
  const getMarkers = (lat, long)=>{
    console.log("getMarkers "+lat+" > "+long);
    setCoord({lat:lat, long:long});
    setLoading(true);
    apiGet('stores/nearbies?currentLatitude='+lat+'&currentLongitude='+long+'&radiusInKm=5', onStores, onStoresError);
  }
  const onStores = (response) =>{
    console.log("onStores");
    setLoading(false);
    console.log(response.data.data);
    setMarkerData(response.data.data);
    const coordinates = response.data.data.map((marker) => ({
      latitude: marker.latitude,
      longitude: marker.longitude,
    }));
    mapRef.current.fitToCoordinates(coordinates, {
      edgePadding: { top: 50, right: 50, bottom: 50, left: 50 }, // Add padding around the edges
      animated: true, // Smooth zoom animation
    });
  }
  const onStoresError = () =>{
    setLoading(false);
  }
  const renderMarkers = () => {
    console.log("renderMarkers");
    console.log(markerData.length);
    if (markerData.length >0) {
      [...Array(markerData.length).keys()].map(key => {
      return (
        <Marker
          key={markerData[key].key}
          coordinate={{ latitude: markerData[key].latitude, longitude: markerData[key].longitude }}
          title= {markerData[key].storeName}
          description={markerData[key].address}
        >
          <Image source={require('../../assets/img/export/map_pin.png')} style={{height: 46, width:40 }} />
        </Marker>
       
      )
    })
    } else {
      return (
        <View></View>
      );
    }
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <Loader loading={loading} />
      
      <SubtabHeader routetarget="Discover" name="En Yakın CarrefourSA Mağazaları" count="0" />
      
    <View style={styles.container}>
     <MapView
     ref={mapRef}
       provider={PROVIDER_GOOGLE} // remove if not using Google Maps
       style={styles.map}
       region={{
         latitude: coord.lat,
         longitude: coord.long,
         latitudeDelta: 0.015,
         longitudeDelta: 0.0121,
       }}
     >
      {/* <Marker
          coordinate={{ latitude: 41.037266, longitude: 28.9836977 }}
          title="Marker Title"
          description="Marker Description"
        >
          <Image source={require('../../assets/img/export/map_pin.png')} style={{height: 46, width:40 }} />
          </Marker> */}
          {
          [...Array(markerData.length).keys()].map(key => {
          return (
            <Marker
              key={markerData[key].storeCode}
              coordinate={{ latitude: markerData[key].latitude, longitude: markerData[key].longitude }}
              title= {markerData[key].storeName}
              description={markerData[key].address}
            >
              <Image source={require('../../assets/img/export/map_pin.png')} style={{height: 46, width:40 }} />
            </Marker>
          
          )
        })
      }
     </MapView>
   </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex:1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
 });
export default MapScreen;
