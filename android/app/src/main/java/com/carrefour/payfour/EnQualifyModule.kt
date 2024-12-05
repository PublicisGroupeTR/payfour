package com.carrefour.payfour

import android.content.Intent
import com.carrefour.payfour.ui.EnQualifyActivity
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod


class EnQualifyModuleAndroid(reactContext: ReactApplicationContext?) : ReactContextBaseJavaModule(reactContext) {

    override fun getName() = "EnQualifyModuleAndroid"

    @ReactMethod
    public fun openNativeActivity(customData: String){
        val intent = Intent(reactApplicationContext, EnQualifyActivity::class.java)
        intent.putExtra("customData", customData)
        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
        reactApplicationContext.startActivity(intent)
    }
    
    @ReactMethod
    public fun startNFC(){
        val activity = currentActivity as EnQualifyActivity
        activity.startNFC();
    }
    
    @ReactMethod
    public fun startFaceDetect(){
        val activity = currentActivity as EnQualifyActivity
        activity.startFaceDetect();
    }

    @ReactMethod
    public fun startIdentity(){
        val activity = currentActivity as EnQualifyActivity
        activity.startIdentity();
    }

    @ReactMethod
    public fun finishSdk(){
        val activity = currentActivity as EnQualifyActivity
        activity.backButton();
    }

    public fun exitSdk(){
        val activity = currentActivity as EnQualifyActivity
        activity.exitSdk();
    }
}