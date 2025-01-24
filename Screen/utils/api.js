import axios from 'react-native-axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

  
  // const [loading, setLoading] = useState(false);
  let errorHandler = null;


export const basicGet = (func, callback)=>{   
//const { showError } = useError(); 
 const path = "https://api-app.payfour.com/api/";
    console.log("basicGet");
    console.log(func);
    console.log(callback);

    axios.get(path+func).then(response => {
        //setLoading(false);
        callback(response);
            
          })
          .catch(error => {
            //setLoading(false);
            console.error("Error sending data: ", error);
            console.log(error.response);
            let msg="";
            (error.response.data.errors.message) ? msg += error.response.data.errors.message+"\n" : msg += "Ödeme hatası \n"; (error.response.data.errors.paymentError) ? msg += error.response.data.errors.paymentError+"\n" : msg += ""; 
            errorHandler(msg);            
          });
  }
  export const apiGet = (func, callback, params)=>{   
    //const { showError } = useError(); 
    AsyncStorage.getItem('token').then(value =>{
      
      const config = {
        headers: { Authorization: `Bearer ${value}` }
      };
     const path = "https://api-app.payfour.com/api/";
        console.log("apiGet");
        console.log(func);
        console.log(callback);
        console.log(params);
    
        axios.get(path+func, config).then(response => {
            //setLoading(false);
            callback(response, params);
                
              })
              .catch(error => {
                //setLoading(false);
                console.error("Error sending data: ", error);
                console.log(error.response);
                let msg="";
                (error.response.data.errors.message) ? msg += error.response.data.errors.message+"\n" : msg += "Ödeme hatası \n"; (error.response.data.errors.paymentError) ? msg += error.response.data.errors.paymentError+"\n" : msg += ""; 
                errorHandler(msg);            
              });
        });
      }
      export const basicPost = (func, dataToSend, callback, errorCallback, params)=>{   
        
      const path = "https://api-app.payfour.com/api/";
        console.log("apiPost");
        console.log(func);
        console.log(dataToSend);
        console.log(callback);
        console.log(params);
    
        axios.post(path+func, dataToSend).then(response => {
            //setLoading(false);
            callback(response, params);
                
              })
              .catch(error => {
                //setLoading(false);
                console.log("errorCallback?");
                if(errorCallback) errorCallback();
                console.error("Error sending data: ", error);
                console.log(error.response);
                let msg="";
                (error.response.data.errors.message) ? msg += error.response.data.errors.message+"\n" : msg += "Ödeme hatası \n"; (error.response.data.errors.paymentError) ? msg += error.response.data.errors.paymentError+"\n" : msg += ""; 
                errorHandler(msg);            
              });
        
      }
  export const apiPost = (func, dataToSend, callback, errorCallback, params)=>{   
    //const { showError } = useError(); 
    AsyncStorage.getItem('token').then(value =>{
      
      const config = {
        headers: { Authorization: `Bearer ${value}` }
      };
     const path = "https://api-app.payfour.com/api/";
        console.log("apiPost");
        console.log(func);
        console.log(dataToSend);
        console.log(callback);
        console.log(errorCallback);
        console.log(params);
    
        axios.post(path+func, dataToSend, config).then(response => {
            //setLoading(false);
            callback(response, params);
                
              })
              .catch(error => {
                
                //setLoading(false);
                console.error("Error sending data: ", error);
                console.log(error.response);
                console.log("errorCallback?");
                if(errorCallback) errorCallback();
                let msg="";
                (error.response.data.errors.message) ? msg += error.response.data.errors.message+"\n" : msg += "Ödeme hatası \n"; (error.response.data.errors.paymentError) ? msg += error.response.data.errors.paymentError+"\n" : msg += ""; 
                console.log("msg?");
                console.log(msg);
                console.log("insufficient_balance?");
                console.log(error.response.data.errors.message == "insufficient_balance");
                console.log(error.response.data.errors.paymentError == "Your wallet balance is insufficient");
                if(error.response.data.errors.message == "insufficient_balance" || error.response.data.errors.paymentError == "Your wallet balance is insufficient"){
                  console.log("change msg");
                  msg = "Hesabınızda yeterli bakiye bulunmamaktadır";
                } 
                console.log(msg);
                errorHandler(msg);            
              });
        });
      }
      export const apiPut = (func, dataToSend, callback, errorCallback, params)=>{   
        //const { showError } = useError(); 
        AsyncStorage.getItem('token').then(value =>{
          
          const config = {
            headers: { Authorization: `Bearer ${value}` }
          };
         const path = "https://api-app.payfour.com/api/";
            console.log("apiPost");
            console.log(func);
            console.log(dataToSend);
            console.log(callback);
            console.log(errorCallback);
            console.log(params);
        
            axios.put(path+func, dataToSend, config).then(response => {
                //setLoading(false);
                callback(response, params);
                    
                  })
                  .catch(error => {
                    
                    //setLoading(false);
                    console.error("Error sending data: ", error);
                    console.log(error.response);
                    console.log("errorCallback?");
                    if(errorCallback) errorCallback();
                    let msg="";
                    (error.response.data.errors.message) ? msg += error.response.data.errors.message+"\n" : msg += "Ödeme hatası \n"; (error.response.data.errors.paymentError) ? msg += error.response.data.errors.paymentError+"\n" : msg += ""; 
                    console.log("msg?");
                    console.log(msg);
                    errorHandler(msg);            
                  });
            });
          }
  export const setApiErrorHandler = (handler) => {
    errorHandler = handler;
  };
  
