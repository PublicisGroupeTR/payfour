import React from 'react';
import { Modal, View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';

const ErrorModal = ({ message, onClose }) => {
  return (
    // <Modal
    //   transparent={true}
    //   visible={!!message}
    //   animationType="slide"
    //   onRequestClose={onClose}
    // >
    //   <View style={styles.modalBackground}>
    //     <View style={styles.modalContainer}>
    //       <Text style={styles.errorMessage}>{message}</Text>
    //       <Button title="Close" onPress={onClose} />
    //     </View>
    //   </View>
    // </Modal>
    <Modal
    animationType="slide"
    transparent={true}
    visible={!!message}
    onRequestClose={onClose}>                     
      
    <View
      style={{
        flex: 1,                
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        backgroundColor: 'rgba(0, 79, 151, 0.6)',
      }}>
      <View
        style={{
          backgroundColor:'#fff',
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          paddingTop: 32,
          paddingBottom: 16,
          paddingLeft: 16,
          paddingRight: 16,
          width: '100%',
        }}>
          
          <View style={{
              marginBottom:24,
              }}>
                <Text style={{
                  fontSize:16,
                  fontWeight:'700',
                  color:'#004F97',
                  marginBottom:16,
                  textAlign:'center',
                }}>
                  {message}
                </Text>
                              
          </View>
          
        <TouchableOpacity
            style={[
              styles.buttonStyle,
              {
                width: '100%',
                height: 52,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderWidth: 2,
                borderColor: '#004F97',
                backgroundColor: '#004F97',
                padding:0,
                borderRadius: 10,
                marginBottom: 25,
              },
            ]}
            onPress={onClose}>
            <Text
              style={{fontSize: 14, color: '#fff'}}>
              Tamam
            </Text>
          </TouchableOpacity>                  
        
      </View>
    </View>
</Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  errorMessage: {
    marginBottom: 20,
    fontSize: 16,
    textAlign: 'center',
  },
});

export default ErrorModal;