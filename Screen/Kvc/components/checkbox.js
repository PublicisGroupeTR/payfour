import React from 'react';
import { TextInput, Keyboard, View, StyleSheet, Text, Pressable, Image, TouchableOpacity } from 'react-native';

const KvcCheckbox = ({
    show,
    onPress,
    text,
    textOpen,
    isFullClick
}) => {

    const Content = () => {
        return (
            <>
                <Pressable
                    style={[style.checkbox, {
                        backgroundColor: show ? '#015096' : '#dadee7',
                    }]}
                    disabled={isFullClick}
                    onPress={onPress}>
                    <Image
                        source={require('../../../assets/img/export/check.png')}
                        style={{
                            width: show ? 14 : 0,
                            height: show ? 10 : 0,
                            resizeMode: 'contain',
                        }}
                    />
                </Pressable>

                {textOpen ?
                    <TouchableOpacity onPress={textOpen}>
                        <Text style={style.text}>
                            {text}
                        </Text>
                    </TouchableOpacity>
                    :
                    <Text style={style.text}>
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
        justifyContent: 'center'
    },
    text: {
        fontWeight: '300',
        color: '#1E242F',
        fontSize: 12,
    },
});

export default KvcCheckbox;
