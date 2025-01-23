import axios from 'react-native-axios';
import { useError } from '../Contexts/ErrorContext';


  
  // const [loading, setLoading] = useState(false);
 

  export const basicGet = (func, callback)=>{   
//const { showError } = useError(); 
 const path = "https://api-app.payfour.com/api/";
    console.log("basicGet");
    console.log(func);
    console.log(callback);

    axios.get(path+func).then(response => {
        //setLoading(false);
        callback(response);
            /*console.log(response.data);
            console.log(response.data.data);
            //console.log(response.data.data.items);
            let sl = response.data.data;
            for(var i=0; i < sl.length;i++){
              sl[i].key = sl[i].campaignCode;
              let dt = new Date(sl[i].expireDate);
              let t = (((dt.getDate()<10)? "0"+dt.getDate() : dt.getDate())) +'.'+(((dt.getMonth()+1)<10)? "0"+(dt.getMonth()+1) :(dt.getMonth()+1))+'.'+dt.getFullYear();
              sl[i].time = t;
            }
            if(sl.length < 2){
              sl.push({...sl[0]});
              sl.push({...sl[0]});
              sl.push({...sl[0]});
            }else if(sl.length < 3){
              sl.push({...sl[0]});
              sl.push({...sl[1]});
            }else if(sl.length < 4){
              sl.push({...sl[0]});
            }
            for(var i=0; i < sl.length;i++){
              sl[i].uid = "open"+(10+i);
            }
            console.log(sl);
            setSlData(sl);
            setLoading(false);*/
            //showError("test");
          })
          .catch(error => {
            //setLoading(false);
            console.error("Error sending data: ", error);
            console.log(error.response);
            let msg="";
            (error.response.data.errors.message) ? msg += error.response.data.errors.message+"\n" : msg += "Ödeme hatası \n"; (error.response.data.errors.paymentError) ? msg += error.response.data.errors.paymentError+"\n" : msg += ""; 
            //Alert.alert(msg);
            //showError(msg);
            //showError(msg);
          });
  }
  
