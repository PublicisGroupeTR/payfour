import React from 'react';
import { TextInput, Keyboard, View, StyleSheet, Text } from 'react-native';

const KvcTextInput = ({
  value,
  onChange,
  placeholder,
  disable,
  placeholderTextColor = '#909EAA',
  keyboardType = 'default',
  returnKeyType = 'next',
  propsStyle = {},
  isValid = false,
  title
}) => {
  return (
    <View style={style.wrapper}>
        { title && 
            <Text style={style.title}>
                {title}
            </Text>
        }

        <TextInput
          style={[title ? style.inputStyleTitle : style.inputStyle, isValid === false && style.borderError, {
            ...propsStyle,
            
          }]}
          editable={!disable}
          value={value}
          onChangeText={onChange}
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor}
          keyboardType={keyboardType}
          onSubmitEditing={Keyboard.dismiss}
          blurOnSubmit={false}
          underlineColorAndroid="#f000"
          
          returnKeyType={returnKeyType}
        />
    </View>
  );
};

const style = StyleSheet.create({
    wrapper:{
        width:"100%"
    },
    title:{
        fontSize: 12,
        lineHeight: 12,
        padding: 0,
        position: "absolute",
        color: '#909EAA',
        top: 12,
        left: 16,
        zIndex:1
    },
    inputStyle: {
        borderColor: '#E4E4E8',
        backgroundColor: '#fff',
        paddingTop: 17,
        paddingBottom: 17,
        paddingLeft: 16,
        paddingRight: 16,
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 16,
    },
    inputStyleTitle: {
        borderColor: '#E4E4E8',
        backgroundColor: '#fff',
        paddingTop: 22,
        paddingBottom: 12,
        paddingLeft: 16,
        paddingRight: 16,
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 16,
    },
    borderError:{
      borderColor:"#E94B43"
    }
})
  

export default KvcTextInput;
