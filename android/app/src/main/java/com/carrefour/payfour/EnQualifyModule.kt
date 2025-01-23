package com.carrefour.payfour

import android.content.Intent
import android.util.Log
import com.carrefour.payfour.ui.EnQualifyActivity
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.modules.core.DeviceEventManagerModule
import com.facebook.react.bridge.Arguments


class EnQualifyModuleAndroid(reactContext: ReactApplicationContext?) : ReactContextBaseJavaModule(reactContext) {

    override fun getName() = "EnQualifyModuleAndroid"

    init {
        initialize(reactContext!!)
    }

    @ReactMethod
    fun openNativeActivity(customData: String) {
        val intent = Intent(reactApplicationContext, EnQualifyActivity::class.java)
        intent.putExtra("customData", customData)
        intent.flags = Intent.FLAG_ACTIVITY_NEW_TASK
        reactApplicationContext.startActivity(intent)
    }

    @ReactMethod
    fun startNFC() {
        val activity = currentActivity as? EnQualifyActivity
        activity?.startNFC()
    }

    @ReactMethod
    fun startFaceDetect() {
        val activity = currentActivity as? EnQualifyActivity
        activity?.startFaceDetect()
    }

    @ReactMethod
    fun startIdentity() {
        val activity = currentActivity as? EnQualifyActivity
        activity?.startIdentity()
    }

    companion object {
        private var reactContext: ReactApplicationContext? = null

        fun initialize(context: ReactApplicationContext) {
            reactContext = context
        }

        fun sendEvent(eventName: String, status: String) {
            val writableMap = Arguments.createMap()
            writableMap.putString("status", status)

            reactContext?.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
                ?.emit(eventName, writableMap)
        }
    }
}
