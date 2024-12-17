import React from 'react';
import {StyleSheet, Platform, KeyboardAvoidingView} from 'react-native';
import Loader from '../Components/Loader.js';
import SubtabHeader from '../Components/SubtabHeader.js';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';

const KvcLayout = ({title, children, disableScroll, loading}) => {
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaProvider style={[styles.main, { paddingBottom: insets.bottom}]}>
        <SubtabHeader isKycPage name={title} count="0" />
        {loading && <Loader loading={loading} />}
        <SafeAreaProvider>
            {!disableScroll ?
                <KeyboardAwareScrollView
                    keyboardDismissMode='interactive'
                    keyboardShouldPersistTaps={"handled"}
                    bounces={false}
                    contentContainerStyle={[styles.content]}
                    enableResetScrollToCoords={false}
                    scrollEventThrottle={1}>
                    {children}
                </KeyboardAwareScrollView>
                :
                <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? 'padding' : undefined}>
                    {children}
                </KeyboardAvoidingView>
            }
        </SafeAreaProvider>
    </SafeAreaProvider>
  );
};

export default KvcLayout;

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: '#efeff3'
    },
    container:{
        flex:1
    },
    content:{
        width:"100%"
    }
});
