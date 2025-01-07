import React from 'react';
import { View, StyleSheet, Text, Pressable, Image, TouchableOpacity } from 'react-native';
import { FontFamilies } from '../helper/index.js';

const KycCheckbox = ({
    show,
    onPress,
    text,
    textOpen,
    isFullClick,
    isValid,
    alreadyConfirm
}) => {

    const Content = () => {

        const pressablePress = () => {
            if (textOpen && !show && !alreadyConfirm) {
                textOpen()
                return
            }
            onPress()
        }

        return (
            <>
                <TouchableOpacity
                    style={[style.checkbox, {
                        backgroundColor: show ? '#015096' : '#dadee7',
                        borderColor: isValid == false ? "#E94B43" : "#dadee7"
                    }]}
                    disabled={isFullClick}
                    onPress={pressablePress}>
                    <Image
                        source={require('../../../assets/img/export/check.png')}
                        style={{
                            width: show ? 14 : 0,
                            height: show ? 10 : 0,
                            resizeMode: 'contain',
                        }}
                    />
                </TouchableOpacity>
                {textOpen ?
                    <TouchableOpacity onPress={textOpen}>
                        <Text style={[style.text, { textDecorationLine: 'underline', color:"#004F97", fontFamily: FontFamilies.UBUNTU.medium, fontWeight:600  }]}>
                            {text}
                        </Text>
                    </TouchableOpacity>
                    :
                    <Text style={[style.text]}>
                        {text}
                    </Text>
                }
            </>
        );
    };

    return !isFullClick ? (
        <View style={style.container}>
            <Content />
        </View>
    ) 
    :
    (
        <TouchableOpacity onPress={onPress} style={style.container}>
            <Content />
        </TouchableOpacity>
    )
};

const style = StyleSheet.create({
    container: {
        alignItems: 'center',
        flexDirection: 'row',
    },
    checkbox: {
        width: 20,
        height: 20,
        marginRight: 8,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth:1,
    },
    text: {
        fontWeight: '300',
        color: '#1E242F',
        fontSize: 12,
    },
});

export default KycCheckbox;
