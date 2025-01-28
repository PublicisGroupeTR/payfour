import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'react-native-axios';
import { Alert, Platform } from 'react-native';

const isIOS = () => {
  return Platform.OS === 'ios';
};

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
    url: `https://api-app.payfour.com/api${url}`,
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

export const validateFormData = (formData) => {
  const updatedFormData = { ...formData };

  Object.keys(updatedFormData).forEach((key) => {
    const fieldValue = updatedFormData[key]?.value || "";
    updatedFormData[key] = {
      ...updatedFormData[key],
      isValid: fieldValue.trim() === "" ? false : true,
    };
  });

  return updatedFormData;
};

export const formatDate = (dateString) => {
  const date = new Date(dateString);

  const day = String(date.getDate()).padStart(2, '0'); // Gün
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Ay
  const year = date.getFullYear(); // Yıl

  return `${day}/${month}/${year}`;
};

export const isValidEmail = (email) => {
  if (!email || email.length == 0) {
   return false
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const FontFamilies = {
  UBUNTU: {
    light: isIOS() ? 'Ubuntu-Light' : 'UbuntuLight',
    normal: isIOS() ? 'Ubuntu-Regular' : 'UbuntuRegular',
    medium: isIOS() ? 'Ubuntu-Medium' : 'UbuntuMedium',
    bold: isIOS() ? 'Ubuntu-Bold' : 'UbuntuBold',
  }
};
