package com.carrefour.payfour

import android.annotation.TargetApi
import android.content.Intent
import android.os.Bundle
import android.view.KeyEvent
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import com.facebook.react.ReactApplication
import com.facebook.react.ReactNativeHost
import com.facebook.react.modules.core.PermissionAwareActivity
import com.facebook.react.modules.core.PermissionListener

class CustomReactFragment : Fragment(), PermissionAwareActivity {

    companion object {
        const val ARG_COMPONENT_NAME = "arg_component_name"
        const val ARG_LAUNCH_OPTIONS = "arg_launch_options"

        @JvmStatic
        fun newInstance(componentName: String, launchOptions: Bundle): CustomReactFragment {
            val fragment = CustomReactFragment()
            val args = Bundle().apply {
                putString(ARG_COMPONENT_NAME, componentName)
                putBundle(ARG_LAUNCH_OPTIONS, launchOptions)
            }
            fragment.arguments = args
            return fragment
        }
    }

    private var mReactDelegate: CustomReactDelegate? = null
    private var mPermissionListener: PermissionListener? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        val mainComponentName = arguments?.getString(ARG_COMPONENT_NAME)
        val launchOptions = arguments?.getBundle(ARG_LAUNCH_OPTIONS)

        requireNotNull(mainComponentName) { "Cannot loadApp if component name is null" }

        mReactDelegate = CustomReactDelegate(
            requireActivity(),
            reactNativeHost,
            mainComponentName,
            launchOptions
        )
    }

    private val reactNativeHost: ReactNativeHost
        get() = (requireActivity().application as ReactApplication).reactNativeHost

    private val reactDelegate: CustomReactDelegate
        get() = mReactDelegate ?: throw IllegalStateException("ReactDelegate is not initialized")

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?
    ): View? {
        reactDelegate.loadApp()
        return reactDelegate.mReactRootView
    }

    override fun onResume() {
        super.onResume()
        reactDelegate.onHostResume()
    }

    override fun onPause() {
        super.onPause()
        reactDelegate.onHostPause()
    }

    override fun onDestroy() {
        super.onDestroy()
        reactDelegate.onHostDestroy()
    }

    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)
        reactDelegate.onActivityResult(requestCode, resultCode, data, false)
    }

    //override fun onBackPressed(): Boolean {
        //return reactDelegate.onBackPressed()
    //}

    //override fun onKeyUp(keyCode: Int, event: KeyEvent?): Boolean {
        //return reactDelegate.shouldShowDevMenuOrReload(keyCode, event)
    //}

    override fun onRequestPermissionsResult(requestCode: Int, permissions: Array<String>, grantResults: IntArray) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults)
        if (mPermissionListener?.onRequestPermissionsResult(requestCode, permissions, grantResults) == true) {
            mPermissionListener = null
        }
    }

    override fun checkPermission(permission: String, pid: Int, uid: Int): Int {
        return requireActivity().checkPermission(permission, pid, uid)
    }

    @TargetApi(23)
    override fun checkSelfPermission(permission: String): Int {
        return requireActivity().checkSelfPermission(permission)
    }

    @TargetApi(23)
    override fun requestPermissions(permissions: Array<String>, requestCode: Int, listener: PermissionListener) {
        mPermissionListener = listener
        requestPermissions(permissions, requestCode)
    }

    class Builder {
        private var mComponentName: String? = null
        private var mLaunchOptions: Bundle? = null

        fun setComponentName(componentName: String): Builder {
            mComponentName = componentName
            return this
        }

        fun setLaunchOptions(launchOptions: Bundle): Builder {
            mLaunchOptions = launchOptions
            return this
        }

        fun build(): CustomReactFragment {
            requireNotNull(mComponentName) { "Component name must be set" }
            return CustomReactFragment.newInstance(mComponentName!!, mLaunchOptions ?: Bundle())
        }
    }
}
