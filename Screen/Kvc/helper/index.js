import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'react-native-axios';
import { Alert } from 'react-native';

export const apiRequest = async ({ url, method = 'GET', params = {}, data = {}, headers = {} }) => {
  // console.log(`apiRequest - Method: ${method}, URL: ${url}`);
  
  const token = await AsyncStorage.getItem('token');
  
  // console.log("TOKEN", token);
  
  const defaultHeaders = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
    ...headers,
  };

  const config = {
    method: method.toUpperCase(),
    url: `https://payfourapp.test.kodegon.com/api${url}`,
    headers: defaultHeaders,
    params,
    ...(method.toUpperCase() !== 'GET' && method.toUpperCase() !== 'HEAD' && { data }), // Body sadece GET/HEAD dışındakilerde
  };

  try {
    const response = await axios(config);
    if (response && response.data) {
      // console.log('Response:', response.data);
      return response.data;
    }
  } catch (error) {
    // console.error(`Error in ${method} ${url}:`, error);

    if (error.response && error.response.data) {
      return error.response.data;
    }

    // Eğer hata verisi yoksa, genel bir hata mesajı döndür
    return { success: false, message: 'An unexpected error occurred.' };
  }
};


export const customAlert = ({ title = "Mesaj", message, button = "Tamam"}) => {
  Alert.alert(
    title,
    message,
    [{ text: button }]
  );

}
