package com.carrefour.payfour

import android.app.Activity
import android.util.Log
import android.content.Intent
import android.os.Bundle
import android.view.KeyEvent
import android.view.MotionEvent
import android.view.View
import com.facebook.infer.annotation.Assertions
import com.facebook.react.ReactInstanceManager
import com.facebook.react.ReactNativeHost
import com.facebook.react.devsupport.DoubleTapReloadRecognizer
import com.facebook.react.modules.core.DefaultHardwareBackBtnHandler

class CustomReactDelegate(
    private val mActivity: Activity,
    private val mReactNativeHost: ReactNativeHost,
    private val mMainComponentName: String?,
    private val mLaunchOptions: Bundle?
) {

    public var mReactRootView: CustomReactRootView? = null
    private val mDoubleTapReloadRecognizer = DoubleTapReloadRecognizer()

    fun onHostResume() {
        if (getReactNativeHost().hasInstance()) {
            if (mActivity !is DefaultHardwareBackBtnHandler) {
                throw ClassCastException("Host Activity does not implement DefaultHardwareBackBtnHandler")
            }
            getReactNativeHost().reactInstanceManager.onHostResume(mActivity, mActivity as DefaultHardwareBackBtnHandler)
        }
    }

    fun onHostPause() {
        if (getReactNativeHost().hasInstance()) {
            getReactNativeHost().reactInstanceManager.onHostPause(mActivity)
        }
    }

    fun onHostDestroy() {
        mReactRootView?.unmountReactApplication()
        mReactRootView = null
        if (getReactNativeHost().hasInstance()) {
            getReactNativeHost().reactInstanceManager.onHostDestroy(mActivity)
        }
    }

    fun onBackPressed(): Boolean {
        return if (getReactNativeHost().hasInstance()) {
            getReactNativeHost().reactInstanceManager.onBackPressed()
            true
        } else {
            false
        }
    }

    fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?, shouldForwardToReactInstance: Boolean) {
        if (getReactNativeHost().hasInstance() && shouldForwardToReactInstance) {
            getReactNativeHost().reactInstanceManager.onActivityResult(mActivity, requestCode, resultCode, data)
        }
    }

    fun loadApp() {
        loadApp(mMainComponentName ?: throw IllegalStateException("Cannot load app without component name"))
    }

    fun loadApp(appKey: String) {
        if (mReactRootView != null) {
            throw IllegalStateException("Cannot loadApp while app is already running.")
        } else {
            Log.i("Test", "Bilal load")
            mReactRootView = createRootView().apply {
                setOnTouchListener { _, event -> false }
            }
            mReactRootView?.startReactApplication(getReactNativeHost().reactInstanceManager, appKey, mLaunchOptions)
        }
    }

    fun getReactRootView(): CustomReactRootView? {
        return mReactRootView
    }

    protected fun createRootView(): CustomReactRootView {
        Log.i("Test", "Bilal load 2")
        return CustomReactRootView(mActivity)
    }

    fun shouldShowDevMenuOrReload(keyCode: Int, event: KeyEvent?): Boolean {
        if (getReactNativeHost().hasInstance() && getReactNativeHost().useDeveloperSupport) {
            if (keyCode == 82) {
                getReactNativeHost().reactInstanceManager.showDevOptionsDialog()
                return true
            }
            val didDoubleTapR = mDoubleTapReloadRecognizer.didDoubleTapR(keyCode, mActivity.currentFocus)
            if (didDoubleTapR) {
                getReactNativeHost().reactInstanceManager.devSupportManager.handleReloadJS()
                return true
            }
        }
        return false
    }

    private fun getReactNativeHost(): ReactNativeHost {
        return mReactNativeHost
    }

    fun getReactInstanceManager(): ReactInstanceManager {
        return getReactNativeHost().reactInstanceManager
    }
}
