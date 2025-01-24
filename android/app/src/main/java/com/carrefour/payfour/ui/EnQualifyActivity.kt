package com.carrefour.payfour.ui

import android.os.Bundle
import android.util.Log
import androidx.activity.enableEdgeToEdge
import androidx.activity.OnBackPressedCallback
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat
import com.carrefour.payfour.R
import com.carrefour.payfour.utils.Constants
import com.carrefour.payfour.CustomReactFragment
import com.carrefour.payfour.FragmentKYCError
import com.carrefour.payfour.FragmentOCRSuccess
import com.carrefour.payfour.FragmentOCRInfo
import com.carrefour.payfour.FragmentOCRError
import com.carrefour.payfour.FragmentNFCRead
import com.carrefour.payfour.FragmentNFCSuccess
import com.carrefour.payfour.FragmentNFCError
import com.carrefour.payfour.FragmentNFCClosed
import com.carrefour.payfour.FragmentNFCRequired
import com.carrefour.payfour.FragmentFaceError
import com.carrefour.payfour.FragmentFaceSuccess
import com.carrefour.payfour.EnQualifyModuleAndroid

import com.enqura.enverify.EnVerifyApi
import com.enqura.enverify.EnVerifyCallback
import com.enqura.enverify.models.User
import com.enqura.enverify.models.enums.CloseSessionStatus
import com.enqura.enverify.helpers.DeviceUtils
import com.smartvist.idverify.models.IDVerifyFailureCode
import com.smartvist.idverify.models.IDVerifyState
import com.smartvist.idverify.models.VSession
import io.swagger.client.model.VerifyCallResultModel
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import com.facebook.react.ReactFragment
import com.facebook.react.modules.core.DefaultHardwareBackBtnHandler
import android.content.Intent
import org.json.JSONObject
import org.json.JSONArray

import com.carrefour.payfour.data.models.IDRegistrationModel
import com.carrefour.payfour.data.models.AddressRegistrationModel
import com.google.gson.Gson
import io.swagger.client.JSON
import io.swagger.client.model.VerifyCallAddressRegistrationModel

import android.content.Context
import okhttp3.*
import java.io.IOException
import okhttp3.MediaType.Companion.toMediaTypeOrNull
import okhttp3.RequestBody.Companion.toRequestBody

enum class NFCDeviceState {
    SUITABLE,
    CLOSED,
    NOT
}

class EnQualifyActivity : AppCompatActivity(), EnVerifyCallback, DefaultHardwareBackBtnHandler {

    private val tag = this::class.java.simpleName
    private lateinit var enVerifyApi: EnVerifyApi
    private lateinit var vSession: VSession
    private lateinit var nfcDeviceState: NFCDeviceState
    private var customData: String? = null
    private var isSdkInitialized = false


    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContentView(R.layout.activity_en_qualify)

        customData = intent.getStringExtra("customData")

        onBackPressedDispatcher.addCallback(this, object : OnBackPressedCallback(true) {
            override fun handleOnBackPressed() {

            }
        })

        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main)) { v, insets ->
            val systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars())
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom)
            insets
        }
        Log.i(tag, "${object {}.javaClass.enclosingMethod?.name}")

        initEnQualifyApi()
    }

    private fun initEnQualifyApi() {
        isSdkInitialized = false
        val customDataObject: JSONObject = JSONObject(customData)

        Log.i(tag, "${object {}.javaClass.enclosingMethod?.name}")
        enVerifyApi = EnVerifyApi.getInstance()
        vSession = VSession.getInstance()

        Log.i("Custom", "TEST-KYC referenceId" + customDataObject.getString("referenceId"))
       
        with(enVerifyApi){
            with(Constants.getEnQualifyConfigurationData()){
                reinitialize(null)
                enVerifyApi.init(
                    this@EnQualifyActivity,
                    R.id.enQualifyFragmentContainer,
                    supportFragmentManager,
                    customDataObject.getString("referenceId"),
                    apiServerUser
                )
                setCanAutoClose(true)
                setSpeaker(true)
                setAgentFullScreen(true)
                setBackOfficeBaseUrl(apiServer)
                val aiCertificatesList: Array<String> = arrayOf(aiCertificateName)
                val backOfficeCertificatesList: Array<String> = arrayOf(backOfficeCertificateName)
                setIsSSLPinningRequired(true, true)
                CoroutineScope(Dispatchers.IO).launch {
                    setCertificate(
                        aiCertificatesList,
                        backOfficeCertificatesList
                    )
                }

                val user = User.getInstance()
                user.init(applicationContext)
                user.callType = "NewCustomer"

                startVerify()
            }
        }
    }

    fun startVerify() {
        Log.i(tag, "${object {}.javaClass.enclosingMethod?.name}")
        with(enVerifyApi) {
            with(Constants.getEnQualifyConfigurationData()) {
                setMSPrivateKey(msPrivateKey)
                setDomain(domainName, turnServer, stunServer, signalServer)
                //setCredentials(aiUsername, aiPassword)
                setTurnCredentials(turnServerUser, turnServerKey)
                setMediaServer(isMediaServerEnabled)
                enVerifyApi.startSelfServiceVerify()
            }
        }

        checkNFCState();
    }

    private fun checkNFCState() {
        if (DeviceUtils.deviceHasNFC(this)) {
            nfcDeviceState = if (DeviceUtils.isNFCEnable(this)) {
                NFCDeviceState.SUITABLE
            } else {
                NFCDeviceState.CLOSED
            }
        } else {
            nfcDeviceState = NFCDeviceState.NOT
        }
    }

    fun startIdentity() {
        enVerifyApi.startIDTypeCheckFront()
    }

    fun startNFC() {
        if (VSession.getInstance().isVideoCall) {
            enVerifyApi.restartVideoChat()
        } else {
            when (nfcDeviceState) {
                NFCDeviceState.SUITABLE -> {
                    enVerifyApi.startNFC(FragmentNFCRead())
                }
                NFCDeviceState.CLOSED -> {
                    enVerifyApi.replaceFragment(FragmentNFCClosed())
                }
                NFCDeviceState.NOT -> {
                    enVerifyApi.replaceFragment(FragmentNFCRequired())
                }
            }
        }
    }

    fun retryNFC() {
        Log.i("Custom", "TEST-KYC retryNFC")

        enVerifyApi.confirmVerification(IDVerifyState.NFC_RETRY)
    }

    fun startFaceDetect() {
        enVerifyApi.startFaceDetect()
    }

    fun retryFaceDetect() {
        enVerifyApi.confirmVerification(IDVerifyState.FACE_RETRY)
    }

    fun startVideoCall() {
        // enVerifyApi.startVideoChat();
        // enVerifyApi.startCall();
    }

    fun completeLoanaAplication() {
        val customDataObject: JSONObject = JSONObject(customData)
        Log.i("Custom", "TEST-KYC completeLoanaAplication start")
        val token = customDataObject.getString("token")
        // Log.i("Custom", "TEST-KYC token " + token)
    
        val emptyRequestBody = "".toRequestBody("application/json; charset=utf-8".toMediaTypeOrNull())

        if (token != null) {
            val client = OkHttpClient()
    
            val request = Request.Builder()
                .url("https://payfourapp.test.kodegon.com/api/loans/completeloanapplication/" + customDataObject.getString("referenceId"))
                // .url("https://payfourapp.test.kodegon.com/api/account/getuser")
                .addHeader("Authorization", "Bearer $token")
                .post(emptyRequestBody)  // POST isteği olduğunu belirtiyoruz ve body ekliyoruz
                // .get()
                .build()
    
            client.newCall(request).enqueue(object : Callback {
                override fun onFailure(call: Call, e: IOException) {
                    enVerifyApi.replaceFragment(FragmentKYCError())
                }
    
                override fun onResponse(call: Call, response: Response) {
                    if (response.isSuccessful) {
                        val responseBody = response.body?.string()
                    
                        if (responseBody != null) {
                            Log.i("Custom", "TEST-KYC completeloanapplication Response: $responseBody")
                    
                            try {
                                // Yanıtı JSON olarak parse et
                                val jsonResponse = JSONObject(responseBody)
                                val success = jsonResponse.optBoolean("success", false)
                    
                                if (success) {
                                    Log.i("Custom", "TEST-KYC completeloanapplication Success: true")
                                    enVerifyApi.replaceFragment(FragmentFaceSuccess())
                                    
                                } else {
                                    enVerifyApi.replaceFragment(FragmentKYCError())
                                    Log.i("Custom", "TEST-KYC completeloanapplication Success: false")
                                }
                            } catch (e: Exception) {
                                Log.e("Custom", "TEST-KYC JSON parse error: ${e.message}")
                                enVerifyApi.replaceFragment(FragmentKYCError())
                            }
                        } else {
                            Log.e("Custom", "TEST-KYC Response body is null")
                            enVerifyApi.replaceFragment(FragmentKYCError())
                        }
                    } else {
                        // Başarısız yanıt durumunda
                        Log.i("Custom", "TEST-KYC Request failed with code: ${response.code}")
                        enVerifyApi.replaceFragment(FragmentKYCError())
                    }
                }
            })
        } else {
            Log.i("Custom", "TEST-KYC  Token not found")
            enVerifyApi.replaceFragment(FragmentKYCError())
        }
    }

    fun kycError() {
        try {
            if (isSdkInitialized) {
                exitSdk() // Sadece SDK başlatıldıysa çıkış işlemini yap
            }
            enVerifyApi.replaceFragment(FragmentKYCError())
        } catch (e: Exception) {
            Log.e("Custom", "TEST-KYC kycError: $e")
            if (isSdkInitialized) {
                enVerifyApi.replaceFragment(FragmentKYCError())
            }
        }
    }
    
    fun replaceReactNativeFragment() {
        val customDataObject: JSONObject = JSONObject(customData)

        val reactNativeFragment = CustomReactFragment.Builder()
            .setComponentName("Payfour")
            .setLaunchOptions(getLaunchOptions(""))  // Buradan React Native'de açılan view'a props olarak data gönderilebiliyor.
            .build()
        
        enVerifyApi.replaceFragment(reactNativeFragment)
        EnQualifyModuleAndroid.sendEvent("EnQualifyResult", "succeeded")
    }

    private fun getLaunchOptions(message: String): Bundle {
        val options = Bundle()
        options.putString("kycResult", message)
        return options
    }

    public fun exitSdk() {
        Log.i("Custom", "TEST-KYC exitSdk")
        enVerifyApi.closeSession(false)
        enVerifyApi.exitSelfService()
        enVerifyApi.destroy()
        finish()
        EnQualifyModuleAndroid.sendEvent("EnQualifyResult", "canceled")
    }

    public fun sdkSucceeded() {
        replaceReactNativeFragment()
    }

    override fun onFailure(p0: IDVerifyState?, p1: IDVerifyFailureCode?, p2: String?) {
        //Tüm fail ekranlara buradan custom view açılabilir
        Log.i("Custom", "TEST-KYC \nonFailure: " +
            "\nidVerifyState:\t\t${p0}" +
            "\nidVerifyFailureCode:\t${p1}" +
            "\ns:\t\t\t\t\t$p2"
        )

        // Tüm fail ekranlara buradan custom view açılabilir
        when (p1) {
            IDVerifyFailureCode.AuthFailureError -> {
                Log.d("IDVerify", "TEST-KYC AuthFailureError")
                enVerifyApi.handleFail(IDVerifyFailureCode.AuthFailureError)
                kycError()
            }
            IDVerifyFailureCode.ServerError -> {
                Log.d("IDVerify", "TEST-KYC ServerError")
                enVerifyApi.handleFail(IDVerifyFailureCode.ServerError)
                kycError()
            }
            IDVerifyFailureCode.NetworkError -> {
                Log.d("IDVerify", "TEST-KYC NetworkError")
                enVerifyApi.handleFail(IDVerifyFailureCode.NetworkError)
                kycError()
            }
            IDVerifyFailureCode.ParseError -> {
                Log.d("IDVerify", "TEST-KYC ParseError")
                enVerifyApi.handleFail(IDVerifyFailureCode.ParseError)
                kycError()
            }
            IDVerifyFailureCode.CustomerStateNotFound -> {
                Log.d("IDVerify", "TEST-KYC CustomerStateNotFound")
                enVerifyApi.handleFail(IDVerifyFailureCode.CustomerStateNotFound)
                kycError()
            }
            IDVerifyFailureCode.NFCUndefined -> {
                Log.d("IDVerify", "TEST-KYC NFCUndefined")
                enVerifyApi.handleFail(IDVerifyFailureCode.NFCUndefined)
                enVerifyApi.addFragment(FragmentNFCError())
            }
            IDVerifyFailureCode.NFCKeysFailure -> {
                Log.d("IDVerify", "TEST-KYC NFCKeysFailure")
                enVerifyApi.handleFail(IDVerifyFailureCode.NFCKeysFailure)
                enVerifyApi.addFragment(FragmentNFCError())
            }
            IDVerifyFailureCode.NFCTimeout -> {
                Log.d("IDVerify", "TEST-KYC NFCTimeout")
                enVerifyApi.handleFail(IDVerifyFailureCode.NFCTimeout)
                enVerifyApi.addFragment(FragmentNFCError())
            }
            IDVerifyFailureCode.EyeCloseCheckFailure, IDVerifyFailureCode.RightEyeCloseCheckFailure, IDVerifyFailureCode.LeftEyeCloseCheckFailure, IDVerifyFailureCode.SmilingCheckFailure, IDVerifyFailureCode.faceNotFound -> {
                Log.d("IDVerify", "TEST-KYC FaceErrorOccurred")
                enVerifyApi.handleFail(IDVerifyFailureCode.faceNotFound)
                enVerifyApi.addFragment(FragmentFaceError())
            }
            IDVerifyFailureCode.IDTextRecognitionTimeout -> {
                Log.d("IDVerify", "TEST-KYC IDTextRecognitionTimeout")
                enVerifyApi.handleFail(IDVerifyFailureCode.IDTextRecognitionTimeout)
                enVerifyApi.addFragment(FragmentOCRError())
            }
            IDVerifyFailureCode.FakeIDCheckFailure -> {
                Log.d("IDVerify", "TEST-KYC FakeIDCheckFailure")
                enVerifyApi.handleFail(IDVerifyFailureCode.FakeIDCheckFailure)
                enVerifyApi.addFragment(FragmentOCRError())
            }
            IDVerifyFailureCode.NoConnectionError -> {
                Log.d("IDVerify", "TEST-KYC NoConnectionError")
                enVerifyApi.handleFail(IDVerifyFailureCode.NoConnectionError)
                kycError()
            }
            IDVerifyFailureCode.TimeoutError -> {
                Log.d("IDVerify", "TEST-KYC TimeoutError")
                enVerifyApi.handleFail(IDVerifyFailureCode.TimeoutError)
                kycError()
            }
            IDVerifyFailureCode.TxtBackFail -> {
                Log.d("IDVerify", "TEST-KYC TxtBackFail")
                enVerifyApi.handleFail(IDVerifyFailureCode.TxtBackFail)
                kycError()
            }
            IDVerifyFailureCode.IDConnectionError -> {
                Log.d("IDVerify", "TEST-KYC IDConnectionError")
                enVerifyApi.handleFail(IDVerifyFailureCode.IDConnectionError)
                enVerifyApi.addFragment(FragmentOCRError())
            }
            IDVerifyFailureCode.NFCConnectionError -> {
                Log.d("IDVerify", "TEST-KYC NFCConnectionError")
                enVerifyApi.handleFail(IDVerifyFailureCode.NFCConnectionError)
                kycError()
            }
            IDVerifyFailureCode.FaceAngleFailure -> {
                Log.d("IDVerify", "TEST-KYC FaceAngleFailure")
                enVerifyApi.handleFail(IDVerifyFailureCode.FaceAngleFailure)
                enVerifyApi.addFragment(FragmentFaceError())
            }
            IDVerifyFailureCode.FaceConnectionError -> {
                Log.d("IDVerify", "TEST-KYC FaceConnectionError")
                enVerifyApi.handleFail(IDVerifyFailureCode.FaceConnectionError)
                kycError()
            }
            IDVerifyFailureCode.CertificationError -> {
                Log.d("IDVerify", "TEST-KYC CertificationError")
                enVerifyApi.handleFail(IDVerifyFailureCode.CertificationError)
            }
            IDVerifyFailureCode.DeviceNotSupported -> {
                Log.d("IDVerify", "TEST-KYC DeviceNotSupported")
                kycError()
            }
            else -> {
                Log.d("IDVerify", "TEST-KYC UnknownError: $p1")
                kycError()
                enVerifyApi.handleFail(p1)
            }
        }
    }

    override fun onCertificateSucceed() {
        Log.i("Custom", "TEST-KYC onCertificateSucceed")
    }

    override fun onCertificateFailed() {
        Log.i("Custom", "TEST-KYC onCertificateFailed")
        isSdkInitialized = false
        kycError()
    }

    override fun onSessionStartSucceed(p0: Boolean, p1: String?) {
        Log.i("Custom", "TEST-KYC onSessionStartSucceed " + p1)
        isSdkInitialized = true
    }

    override fun onSessionStartFailed() {
        Log.i("Custom", "TEST-KYC onSessionStartFailed")
        isSdkInitialized = false
        kycError()
    }

    private fun addIntegration() {
        val customDataObject: JSONObject = JSONObject(customData)

        val jsonData = JSONObject().apply {
            put("occupations", JSONArray().apply {
                put(JSONObject().apply {
                    put("occupationTypeId", "5d1816d2-70c7-d5f2-e053-e7b3f2e53410")
                    put("occupationTypeFieldId", customDataObject.getString("occupation"))
                })
                put(JSONObject().apply {
                    put("occupationTypeId", "5d1aa7d4-46a6-f804-395e-2575c967ca97")
                    put("occupationTypeFieldId", customDataObject.getString("occupationrole"))
                })
                put(JSONObject().apply {
                    put("occupationTypeId", "5d17c8ce-efc2-4cd2-55f4-c6998700dcfa")
                    put("occupationTypeFieldId", customDataObject.getString("educationlevel"))
                })
            })
    
            put("incomes", JSONArray().apply {
                put(JSONObject().apply {
                    put("currencyNumber", "949")
                    put("sourceOfIncome", JSONArray().apply {
                        customDataObject.getJSONArray("incometypesSelected").let { jsonArray ->
                            for (i in 0 until jsonArray.length()) {
                                val intValue = jsonArray.getString(i).toIntOrNull() ?: 0
                                put(intValue)
                            }
                        }
                    })
                    put("EstimatedTransactionVolume", customDataObject.getString("transactionVolume").toInt())
                    put("monthlyAmount", customDataObject.getString("monthlyAverage").toInt())
                    put("TransactionCount", customDataObject.getString("transactionsNumbers").toInt())
                })
            })
    
            put("consents", JSONArray().apply {
                customDataObject.getJSONArray("selectedaAreements").let { jsonArray ->
                    for (i in 0 until jsonArray.length()) {
                        put(jsonArray.getString(i))
                    }
                }
            })
            put("PartnerCode", "csa")
        }
    
        val jsonString = jsonData.toString()

        Log.i("Custom", "TEST-KYC addIntegrationData " +  jsonString)

        val adressRegistrationModel = VerifyCallAddressRegistrationModel()
        enVerifyApi.postIntegrationAddRequest(
            "Session",
            customDataObject.getString("referenceId"),
            jsonString,
            null,
            adressRegistrationModel
        )
    }

    override fun onIntegrationSucceed() {
        Log.i("Custom", "TEST-KYC onIntegrationSucceed")
        enVerifyApi.closeSession(true)
    }

    override fun onIntegrationFailed() {
        Log.i("Custom", "TEST-KYC onIntegrationFailed")
        enVerifyApi.exitSelfService()
        enVerifyApi.replaceFragment(FragmentKYCError())
    }

    override fun selfServiceReady() {
        Log.i("Custom", "TEST-KYC selfServiceReady")
        enVerifyApi.replaceFragment(FragmentOCRInfo())
    }

    override fun idVerifyReady() {
        Log.i("Custom", "TEST-KYC idVerifyReady")
    }

    override fun idSelfVerifyReady() {
        Log.i("Custom", "TEST-KYC idSelfVerifyReady")
    }

    override fun idRetry() {
        enVerifyApi.startIDTypeCheckFront()
        Log.i("Custom", "TEST-KYC idRetry")
    }

    override fun idFrontCompleted() {
        Log.i("Custom", "TEST-KYC idFrontCompleted")
    }

    override fun idTypeVerified() {
        Log.i("Custom", "TEST-KYC idTypeVerified")
        enVerifyApi.startIDDoc();
    }

    override fun idDocCompleted() {
        Log.i("Custom", "TEST-KYC idDocCompleted")
    }

    override fun idDocStored() {
        Log.i("Custom", "TEST-KYC idDocStored")
        enVerifyApi.confirmVerification(IDVerifyState.IDDOC_VERIFIED)
    }

    override fun idDocStoreFailed() {
        Log.i("Custom", "TEST-KYC idDocStoreFailed")
        enVerifyApi.replaceFragment(FragmentOCRError())
    }

    override fun idDocVerified() {
        Log.i("Custom", "TEST-KYC idDocVerified")
        enVerifyApi.replaceFragment(FragmentOCRSuccess())
    }

    override fun nfcReady() {
        Log.i("Custom", "TEST-KYC nfcReady")
    }

    override fun nfcCompleted() {
        Log.i("Custom", "TEST-KYC nfcCompleted")
    }

    override fun nfcStored() {
        Log.i("Custom", "TEST-KYC nfcStored")
        enVerifyApi.confirmVerification(IDVerifyState.NFC_VERIFIED)
    }

    override fun nfcStoreFailed() {
        Log.i("Custom", "TEST-KYC nfcStoreFailed")
        enVerifyApi.replaceFragment(FragmentNFCError())
    }

    override fun nfcBACDataFailure() {
        Log.i("Custom", "TEST-KYC nfcBACDataFailure")
    }

    override fun nfcVerified() {
        Log.i("Custom", "TEST-KYC nfcVerified")
        enVerifyApi.replaceFragment(FragmentNFCSuccess())
    }

    override fun nfcRetry() {
        checkNFCState()
        startNFC()
        Log.i("Custom", "TEST-KYC nfcRetry")
    }

    override fun faceReady() {
        Log.i("Custom", "TEST-KYC faceReady")
    }

    override fun fakeChecked() {
        Log.i("Custom", "TEST-KYC fakeChecked")
    }

    override fun faceDetected() {
        Log.i("Custom", "TEST-KYC faceDetected")
        enVerifyApi.eyeCloseIntervalDetect()
    }

    
    override fun eyeCloseDetected() {
        Log.i("Custom", "TEST-KYC eyeCloseDetected")
    }
    
    override fun rightEyeCloseDetected() {
        Log.i("Custom", "TEST-KYC rightEyeCloseDetected")
    }
    
    override fun leftEyeCloseDetected() {
        Log.i("Custom", "TEST-KYC leftEyeCloseDetected")
    }
    
    override fun retryFaceVerification() {
        Log.i("Custom", "TEST-KYC retryFaceVerification")
    }
    
    override fun eyeCloseIntervalDetected() {
        Log.i("Custom", "TEST-KYC eyeCloseIntervalDetected")
        enVerifyApi.smileDetect()
    }

    override fun smileDetected() {
        Log.i("Custom", "TEST-KYC smileDetected")
        enVerifyApi.setFaceCompleted()
    }

    override fun faceCompleted() {
        Log.i("Custom", "TEST-KYC faceCompleted")
    }
    
    override fun faceStoreCompleted() {
        Log.i("Custom", "TEST-KYC faceStoreCompleted")
    }

    override fun faceStored() {
        Log.i("Custom", "TEST-KYC faceStored")
        enVerifyApi.confirmVerification(IDVerifyState.FACE_VERIFIED)
    }

    override fun faceStoreFailed() {
        Log.i("Custom", "TEST-KYC faceStoreFailed")
        enVerifyApi.replaceFragment(FragmentFaceError())
    }

    override fun faceRetry() {
        Log.i("Custom", "TEST-KYC faceRetry")
        enVerifyApi.startFaceDetect()
    }

    override fun faceVerified() {
        Log.i("Custom", "TEST-KYC faceVerified")
        addIntegration();
    }
    
    override fun onNewIntent(intent: Intent) {
        Log.i("Custom", "TEST-KYC onNewIntent")
        super.onNewIntent(intent)
        setIntent(intent)
    }

    override fun callSessionCloseResult(p0: CloseSessionStatus?) {
        Log.i("Custom", "TEST-KYC callSessionCloseResult")
        if(p0 == CloseSessionStatus.CLOSED) {
            Log.i("Custom", "TEST-KYC callSessionCloseResult CLOSED")
            completeLoanaAplication()
        } else {
            Log.i("Custom", "TEST-KYC callSessionCloseResult else")
            enVerifyApi.exitSelfService()
            enVerifyApi.replaceFragment(FragmentKYCError())
        }
    }

    override fun restartVerification() {
        Log.i("Custom", "TEST-KYC restartVerification")
    }

    //NOT USING

    override fun faceRightDetected() {
        Log.i("Custom", "TEST-KYC faceRightDetected")
        //enVerifyApi.faceLeftDetect()
    }
    
    override fun faceLeftDetected() {
        Log.i("Custom", "TEST-KYC faceLeftDetected")
        //enVerifyApi.faceUpDetect()
    }

    override fun faceUpDetected() {
        Log.i("Custom", "TEST-KYC faceUpDetected")
    }

    override fun videoCallReady() {
        Log.i("Custom", "TEST-KYC videoCallReady")
    }

    override fun retryNFCVerification() {
        Log.i("Custom", "TEST-KYC retryNFCVerification")
    }

    override fun retryTextVerification() {
        Log.i("Custom", "TEST-KYC retryTextVerification")
    }

    override fun localHangedUp() {
        Log.i("Custom", "TEST-KYC localHangedUp")
    }

    override fun callWait() {
        Log.i("Custom", "TEST-KYC callWait")
    }

    override fun callStarted() {
        Log.i("Custom", "TEST-KYC callStarted")
    }

    override fun remoteHangedUp() {
        Log.i("Custom", "TEST-KYC remoteHangedUp")
    }

    override fun resolutionChanged() {
        Log.i("Custom", "TEST-KYC resolutionChanged")
    }

    override fun forceHangup() {
        Log.i("Custom", "TEST-KYC forceHangup")
    }

    override fun agentRequest(p0: String?) {
        Log.i("Custom", "TEST-KYC agentRequest " + p0)
    }

    override fun cardFrontDetected() {
        Log.i("Custom", "TEST-KYC cardFrontDetected")
    }

    override fun cardBackDetected() {
        Log.i("Custom", "TEST-KYC cardBackDetected")
    }

    override fun cardHoloDetected() {
        Log.i("Custom", "TEST-KYC cardHoloDetected")
    }

    override fun screenRecorderOnStart() {
        Log.i("Custom", "TEST-KYC screenRecorderOnStart")
    }

    override fun screenRecorderOnComplete() {
        Log.i("Custom", "TEST-KYC screenRecorderOnComplete")
    }

    override fun screenRecorderOnError(p0: Int, p1: String?) {
        Log.i("Custom", "TEST-KYC screenRecorderOnError " + p1)
    }

    override fun screenRecorderOnAppend() {
        Log.i("Custom", "TEST-KYC screenRecorderOnAppend")
    }

    override fun onResultGetSucceed(p0: VerifyCallResultModel?) {
        Log.i("Custom", "TEST-KYC onResultGetSucceed")
    }

    override fun onResultGetFailed() {
        Log.i("Custom", "TEST-KYC onResultGetFailed")
    }

    override fun onRoomIDSendSucceed() {
        Log.i("Custom", "TEST-KYC onRoomIDSendSucceed")
    }

    override fun onRoomIDSendFailed() {
        Log.i("Custom", "TEST-KYC onRoomIDSendFailed")
    }

    override fun agentCameraDisabled() {
        Log.i("Custom", "TEST-KYC agentCameraDisabled")
    }

    override fun agentCameraEnabled() {
        Log.i("Custom", "TEST-KYC agentCameraEnabled")
    }

    override fun maximumCallTimeExpired() {
        Log.i("Custom", "TEST-KYC maximumCallTimeExpired")
    }

    override fun onVideoAddSucceed() {
        Log.i("Custom", "TEST-KYC onVideoAddSucceed")
    }

    override fun onVideoAddFailure(p0: String?) {
        Log.i("Custom", "TEST-KYC onVideoAddFailure " + p0)
    }

    override fun signingSucceed() {
        Log.i("Custom", "TEST-KYC signingSucceed")
    }

    override fun signingFailed() {
        Log.i("Custom", "TEST-KYC signingFailed")
    }

    override fun sessionUpdateSucceed() {
        Log.i("Custom", "TEST-KYC sessionUpdateSucceed")
    }

    override fun sessionUpdateFailed() {
        Log.i("Custom", "TEST-KYC sessionUpdateFailed")
    }

    override fun onNonIcaoStarted() {
        Log.i("Custom", "TEST-KYC onNonIcaoStarted")
    }

    override fun onNonIcaoCompleted() {
        Log.i("Custom", "TEST-KYC onNonIcaoCompleted")
    }

    override fun onNonIcaoStored() {
        Log.i("Custom", "TEST-KYC onNonIcaoStored")
    }

    override fun onNonIcaoStoreFailed() {
        Log.i("Custom", "TEST-KYC onNonIcaoStoreFailed")
    }

    override fun onBackPressed() {
        // super.onBackPressed()
    }

    override fun invokeDefaultOnBackPressed() {
        //super.invokeDefaultOnBackPressed()
    }
}