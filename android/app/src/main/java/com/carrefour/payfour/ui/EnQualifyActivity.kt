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
                // backButton()
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
        val customDataObject: JSONObject = JSONObject(customData)
        // customDataObject.getString("referenceId"),

        Log.i(tag, "${object {}.javaClass.enclosingMethod?.name}")
        enVerifyApi = EnVerifyApi.getInstance()
        vSession = VSession.getInstance()

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
                setIsSSLPinningRequired(false, false)
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
        Log.i("Custom", "TEST-KVC retryNFC")

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
        Log.i("Custom", "TEST-KVC completeLoanaAplication start")
        val token = customDataObject.getString("token")
        // Log.i("Custom", "TEST-KVC token " + token)
    
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
                            Log.i("Custom", "TEST-KVC completeloanapplication Response: $responseBody")
                    
                            try {
                                // Yanıtı JSON olarak parse et
                                val jsonResponse = JSONObject(responseBody)
                                val success = jsonResponse.optBoolean("success", false)
                    
                                if (success) {
                                    Log.i("Custom", "TEST-KVC completeloanapplication Success: true")
                                    enVerifyApi.replaceFragment(FragmentFaceSuccess())
                                    
                                } else {
                                    enVerifyApi.replaceFragment(FragmentKYCError())
                                    Log.i("Custom", "TEST-KVC completeloanapplication Success: false")
                                }
                            } catch (e: Exception) {
                                Log.e("Custom", "TEST-KVC JSON parse error: ${e.message}")
                                enVerifyApi.replaceFragment(FragmentKYCError())
                            }
                        } else {
                            Log.e("Custom", "TEST-KVC Response body is null")
                            enVerifyApi.replaceFragment(FragmentKYCError())
                        }
                    } else {
                        // Başarısız yanıt durumunda
                        Log.i("Custom", "TEST-KVC Request failed with code: ${response.code}")
                        enVerifyApi.replaceFragment(FragmentKYCError())
                    }
                }
            })
        } else {
            Log.i("Custom", "TEST-KVC  Token not found")
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
            Log.e("Custom", "TEST-KVC kycError: $e")
            if (isSdkInitialized) {
                enVerifyApi.replaceFragment(FragmentKYCError())
            }
        }
    }
    
    fun replaceReactNativeFragment(pageId: String) {
        val customDataObject: JSONObject = JSONObject(customData)

        val reactNativeFragment = CustomReactFragment.Builder()
            .setComponentName(pageId)
            .setLaunchOptions(getLaunchOptions(customDataObject.getString("referenceId")))  // Buradan React Native'de açılan view'a props olarak data gönderilebiliyor.
            .build()
        
        enVerifyApi.replaceFragment(reactNativeFragment)
    }

    private fun getLaunchOptions(message: String): Bundle {
        val options = Bundle()
        options.putString("kvcResult", message)
        return options
    }

    public fun exitSdk() {
        Log.i("Custom", "TEST-KVC exitSdk")

        enVerifyApi.closeSession(false)
        enVerifyApi.exitSelfService()
        enVerifyApi.destroy()
        finish()
    }

    public fun backButton() {
        Log.i("Custom", "TEST-KVC backButton")

        // Mevcut fragment'i al
        val currentFragment = supportFragmentManager.findFragmentById(R.id.enQualifyFragmentContainer)
    
        if (currentFragment != null) {
            val currentFragmentName = currentFragment::class.java.simpleName

        Log.i("Custom", "TEST-KVC currentFragmentName " + currentFragmentName)
            
            // Eğer mevcut fragment belirli bir türdeyse, exitSdk() çağır
            if (currentFragmentName == "FragmentOCRInfo" || currentFragmentName == "FragmentKYCError" || currentFragmentName == "FragmentNFCRequired") {
                exitSdk()
            } else if ( currentFragmentName == "FragmentFaceSuccess") {
                replaceReactNativeFragment("Payfour")
            }else {
                // Geçilecek bir sonraki fragment'i belirle
                val nextFragment = when (currentFragment) {
                    is FragmentOCRSuccess -> FragmentOCRInfo()
                    is FragmentOCRError -> FragmentOCRInfo()
                    is FragmentNFCSuccess -> FragmentOCRSuccess()
                    is FragmentNFCClosed -> FragmentOCRSuccess()
                    is FragmentNFCError -> FragmentOCRSuccess()
                    is FragmentNFCRead -> FragmentOCRSuccess()
                    is FragmentFaceError -> FragmentNFCSuccess()
                    else -> FragmentOCRInfo()
                }
    
                // Fragment geçişini gerçekleştir
                supportFragmentManager.beginTransaction()
                    .replace(R.id.enQualifyFragmentContainer, nextFragment)
                    .commit()
            }
        } else {
            exitSdk()
        }
    }

    override fun onFailure(p0: IDVerifyState?, p1: IDVerifyFailureCode?, p2: String?) {
        //Tüm fail ekranlara buradan custom view açılabilir
        Log.i("Custom", "TEST-KVC \nonFailure: " +
            "\nidVerifyState:\t\t${p0}" +
            "\nidVerifyFailureCode:\t${p1}" +
            "\ns:\t\t\t\t\t$p2"
        )

        // Tüm fail ekranlara buradan custom view açılabilir
        when (p1) {
            IDVerifyFailureCode.AuthFailureError -> {
                Log.d("IDVerify", "TEST-KVC AuthFailureError")
                enVerifyApi.handleFail(IDVerifyFailureCode.AuthFailureError)
                kycError()
            }
            IDVerifyFailureCode.ServerError -> {
                Log.d("IDVerify", "TEST-KVC ServerError")
                enVerifyApi.handleFail(IDVerifyFailureCode.ServerError)
                kycError()
            }
            IDVerifyFailureCode.NetworkError -> {
                Log.d("IDVerify", "TEST-KVC NetworkError")
                enVerifyApi.handleFail(IDVerifyFailureCode.NetworkError)
                kycError()
            }
            IDVerifyFailureCode.ParseError -> {
                Log.d("IDVerify", "TEST-KVC ParseError")
                enVerifyApi.handleFail(IDVerifyFailureCode.ParseError)
                kycError()
            }
            IDVerifyFailureCode.CustomerStateNotFound -> {
                Log.d("IDVerify", "TEST-KVC CustomerStateNotFound")
                enVerifyApi.handleFail(IDVerifyFailureCode.CustomerStateNotFound)
                kycError()
            }
            IDVerifyFailureCode.NFCUndefined -> {
                Log.d("IDVerify", "TEST-KVC NFCUndefined")
                enVerifyApi.handleFail(IDVerifyFailureCode.NFCUndefined)
                enVerifyApi.addFragment(FragmentNFCError())
            }
            IDVerifyFailureCode.NFCKeysFailure -> {
                Log.d("IDVerify", "TEST-KVC NFCKeysFailure")
                enVerifyApi.handleFail(IDVerifyFailureCode.NFCKeysFailure)
                enVerifyApi.addFragment(FragmentNFCError())
            }
            IDVerifyFailureCode.NFCTimeout -> {
                Log.d("IDVerify", "TEST-KVC NFCTimeout")
                enVerifyApi.handleFail(IDVerifyFailureCode.NFCTimeout)
                enVerifyApi.addFragment(FragmentNFCError())
            }
            IDVerifyFailureCode.EyeCloseCheckFailure, IDVerifyFailureCode.RightEyeCloseCheckFailure, IDVerifyFailureCode.LeftEyeCloseCheckFailure, IDVerifyFailureCode.SmilingCheckFailure, IDVerifyFailureCode.faceNotFound -> {
                Log.d("IDVerify", "TEST-KVC FaceErrorOccurred")
                enVerifyApi.handleFail(IDVerifyFailureCode.faceNotFound)
                enVerifyApi.addFragment(FragmentFaceError())
            }
            IDVerifyFailureCode.IDTextRecognitionTimeout -> {
                Log.d("IDVerify", "TEST-KVC IDTextRecognitionTimeout")
                enVerifyApi.handleFail(IDVerifyFailureCode.IDTextRecognitionTimeout)
                enVerifyApi.addFragment(FragmentOCRError())
            }
            IDVerifyFailureCode.FakeIDCheckFailure -> {
                Log.d("IDVerify", "TEST-KVC FakeIDCheckFailure")
                enVerifyApi.handleFail(IDVerifyFailureCode.FakeIDCheckFailure)
                enVerifyApi.addFragment(FragmentOCRError())
            }
            IDVerifyFailureCode.NoConnectionError -> {
                Log.d("IDVerify", "TEST-KVC NoConnectionError")
                enVerifyApi.handleFail(IDVerifyFailureCode.NoConnectionError)
                kycError()
            }
            IDVerifyFailureCode.TimeoutError -> {
                Log.d("IDVerify", "TEST-KVC TimeoutError")
                enVerifyApi.handleFail(IDVerifyFailureCode.TimeoutError)
                kycError()
            }
            IDVerifyFailureCode.TxtBackFail -> {
                Log.d("IDVerify", "TEST-KVC TxtBackFail")
                enVerifyApi.handleFail(IDVerifyFailureCode.TxtBackFail)
                kycError()
            }
            IDVerifyFailureCode.IDConnectionError -> {
                Log.d("IDVerify", "TEST-KVC IDConnectionError")
                enVerifyApi.handleFail(IDVerifyFailureCode.IDConnectionError)
                enVerifyApi.addFragment(FragmentOCRError())
            }
            IDVerifyFailureCode.NFCConnectionError -> {
                Log.d("IDVerify", "TEST-KVC NFCConnectionError")
                enVerifyApi.handleFail(IDVerifyFailureCode.NFCConnectionError)
                kycError()
            }
            IDVerifyFailureCode.FaceAngleFailure -> {
                Log.d("IDVerify", "TEST-KVC FaceAngleFailure")
                enVerifyApi.handleFail(IDVerifyFailureCode.FaceAngleFailure)
                enVerifyApi.addFragment(FragmentFaceError())
            }
            IDVerifyFailureCode.FaceConnectionError -> {
                Log.d("IDVerify", "TEST-KVC FaceConnectionError")
                enVerifyApi.handleFail(IDVerifyFailureCode.FaceConnectionError)
                kycError()
            }
            IDVerifyFailureCode.CertificationError -> {
                Log.d("IDVerify", "TEST-KVC CertificationError")
                enVerifyApi.handleFail(IDVerifyFailureCode.CertificationError)
            }
            IDVerifyFailureCode.DeviceNotSupported -> {
                Log.d("IDVerify", "TEST-KVC DeviceNotSupported")
                kycError()
            }
            else -> {
                Log.d("IDVerify", "TEST-KVC UnknownError: $p1")
                kycError()
                enVerifyApi.handleFail(p1)
            }
        }
    }

    override fun onCertificateSucceed() {
        Log.i("Custom", "TEST-KVC onCertificateSucceed")
    }

    override fun onCertificateFailed() {
        Log.i("Custom", "TEST-KVC onCertificateFailed")
    }

    override fun onSessionStartSucceed(p0: Boolean, p1: String?) {
        Log.i("Custom", "TEST-KVC onSessionStartSucceed " + p1)
        isSdkInitialized = true
    }

    override fun onSessionStartFailed() {
        Log.i("Custom", "TEST-KVC onSessionStartFailed")
        isSdkInitialized = false
        kycError()
    }

    private fun addIntegration() {
        val customDataObject: JSONObject = JSONObject(customData)
        // Log.i("Custom", "TEST-KVC addIntegration " + customData)

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
            })
    
            put("incomes", JSONArray().apply {
                put(JSONObject().apply {
                    put("currencyNumber", "949")
                    put("sourceOfIncome", customDataObject.getString("incometypesSelected"))
                    put("EstimatedTransactionVolume", customDataObject.getString("incometypesSelected"))
                    put("monthlyAmount",  customDataObject.getString("transactionVolume"))
                    put("TransactionCount", customDataObject.getString("transactionsNumbers"))
                })
            })
    
            put("consents", JSONArray(listOf("KVKK", "GKS")))
        }
    
        val jsonString = jsonData.toString()
    
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
        Log.i("Custom", "TEST-KVC onIntegrationSucceed")
        enVerifyApi.closeSession(true)
    }

    override fun onIntegrationFailed() {
        Log.i("Custom", "TEST-KVC onIntegrationFailed")
        kycError()
    }

    override fun selfServiceReady() {
        Log.i("Custom", "TEST-KVC selfServiceReady")
        enVerifyApi.replaceFragment(FragmentOCRInfo())
    }

    override fun idVerifyReady() {
        Log.i("Custom", "TEST-KVC idVerifyReady")
    }

    override fun idSelfVerifyReady() {
        Log.i("Custom", "TEST-KVC idSelfVerifyReady")
    }

    override fun idRetry() {
        enVerifyApi.startIDTypeCheckFront()
        Log.i("Custom", "TEST-KVC idRetry")
    }

    override fun idFrontCompleted() {
        Log.i("Custom", "TEST-KVC idFrontCompleted")
    }

    override fun idTypeVerified() {
        Log.i("Custom", "TEST-KVC idTypeVerified")
        enVerifyApi.startIDDoc();
    }

    override fun idDocCompleted() {
        Log.i("Custom", "TEST-KVC idDocCompleted")
    }

    override fun idDocStored() {
        Log.i("Custom", "TEST-KVC idDocStored")
        enVerifyApi.confirmVerification(IDVerifyState.IDDOC_VERIFIED)
    }

    override fun idDocStoreFailed() {
        Log.i("Custom", "TEST-KVC idDocStoreFailed")
        enVerifyApi.replaceFragment(FragmentOCRError())
    }

    override fun idDocVerified() {
        Log.i("Custom", "TEST-KVC idDocVerified")
        enVerifyApi.replaceFragment(FragmentOCRSuccess())
    }

    override fun nfcReady() {
        Log.i("Custom", "TEST-KVC nfcReady")
    }

    override fun nfcCompleted() {
        Log.i("Custom", "TEST-KVC nfcCompleted")
    }

    override fun nfcStored() {
        Log.i("Custom", "TEST-KVC nfcStored")
        enVerifyApi.confirmVerification(IDVerifyState.NFC_VERIFIED)
    }

    override fun nfcStoreFailed() {
        Log.i("Custom", "TEST-KVC nfcStoreFailed")
        enVerifyApi.replaceFragment(FragmentNFCError())
    }

    override fun nfcBACDataFailure() {
        Log.i("Custom", "TEST-KVC nfcBACDataFailure")
    }

    override fun nfcVerified() {
        Log.i("Custom", "TEST-KVC nfcVerified")
        enVerifyApi.replaceFragment(FragmentNFCSuccess())
    }

    override fun nfcRetry() {
        checkNFCState()
        startNFC()
        Log.i("Custom", "TEST-KVC nfcRetry")
    }

    override fun faceReady() {
        Log.i("Custom", "TEST-KVC faceReady")
    }

    override fun fakeChecked() {
        Log.i("Custom", "TEST-KVC fakeChecked")
    }

    override fun faceDetected() {
        Log.i("Custom", "TEST-KVC faceDetected")
        enVerifyApi.eyeCloseIntervalDetect()
    }

    
    override fun eyeCloseDetected() {
        Log.i("Custom", "TEST-KVC eyeCloseDetected")
    }
    
    override fun rightEyeCloseDetected() {
        Log.i("Custom", "TEST-KVC rightEyeCloseDetected")
    }
    
    override fun leftEyeCloseDetected() {
        Log.i("Custom", "TEST-KVC leftEyeCloseDetected")
    }
    
    override fun retryFaceVerification() {
        Log.i("Custom", "TEST-KVC retryFaceVerification")
    }
    
    override fun eyeCloseIntervalDetected() {
        Log.i("Custom", "TEST-KVC eyeCloseIntervalDetected")
        enVerifyApi.smileDetect()
    }

    override fun smileDetected() {
        Log.i("Custom", "TEST-KVC smileDetected")
        enVerifyApi.setFaceCompleted()
    }

    override fun faceCompleted() {
        Log.i("Custom", "TEST-KVC faceCompleted")
    }
    
    override fun faceStoreCompleted() {
        Log.i("Custom", "TEST-KVC faceStoreCompleted")
    }

    override fun faceStored() {
        Log.i("Custom", "TEST-KVC faceStored")
        enVerifyApi.confirmVerification(IDVerifyState.FACE_VERIFIED)
    }

    override fun faceStoreFailed() {
        Log.i("Custom", "TEST-KVC faceStoreFailed")
        enVerifyApi.replaceFragment(FragmentFaceError())
    }

    override fun faceRetry() {
        Log.i("Custom", "TEST-KVC faceRetry")
        enVerifyApi.startFaceDetect()
    }

    override fun faceVerified() {
        Log.i("Custom", "TEST-KVC faceVerified")
        addIntegration();
    }
    
    override fun onNewIntent(intent: Intent) {
        Log.i("Custom", "TEST-KVC onNewIntent")
        super.onNewIntent(intent)
        setIntent(intent)
    }

    override fun callSessionCloseResult(p0: CloseSessionStatus?) {
        Log.i("Custom", "TEST-KVC callSessionCloseResult")
        if(p0 == CloseSessionStatus.CLOSED) {
            Log.i("Custom", "TEST-KVC callSessionCloseResult CLOSED")
            completeLoanaAplication()
        } else {
            Log.i("Custom", "TEST-KVC callSessionCloseResult else")
            isSdkInitialized = false
            kycError()
        }
    }

    override fun restartVerification() {
        Log.i("Custom", "TEST-KVC restartVerification")
    }

    //NOT USING

    override fun faceRightDetected() {
        Log.i("Custom", "TEST-KVC faceRightDetected")
        //enVerifyApi.faceLeftDetect()
    }
    
    override fun faceLeftDetected() {
        Log.i("Custom", "TEST-KVC faceLeftDetected")
        //enVerifyApi.faceUpDetect()
    }

    override fun faceUpDetected() {
        Log.i("Custom", "TEST-KVC faceUpDetected")
    }

    override fun videoCallReady() {
        Log.i("Custom", "TEST-KVC videoCallReady")
    }

    override fun retryNFCVerification() {
        Log.i("Custom", "TEST-KVC retryNFCVerification")
    }

    override fun retryTextVerification() {
        Log.i("Custom", "TEST-KVC retryTextVerification")
    }

    override fun localHangedUp() {
        Log.i("Custom", "TEST-KVC localHangedUp")
    }

    override fun callWait() {
        Log.i("Custom", "TEST-KVC callWait")
    }

    override fun callStarted() {
        Log.i("Custom", "TEST-KVC callStarted")
    }

    override fun remoteHangedUp() {
        Log.i("Custom", "TEST-KVC remoteHangedUp")
    }

    override fun resolutionChanged() {
        Log.i("Custom", "TEST-KVC resolutionChanged")
    }

    override fun forceHangup() {
        Log.i("Custom", "TEST-KVC forceHangup")
    }

    override fun agentRequest(p0: String?) {
        Log.i("Custom", "TEST-KVC agentRequest " + p0)
    }

    override fun cardFrontDetected() {
        Log.i("Custom", "TEST-KVC cardFrontDetected")
    }

    override fun cardBackDetected() {
        Log.i("Custom", "TEST-KVC cardBackDetected")
    }

    override fun cardHoloDetected() {
        Log.i("Custom", "TEST-KVC cardHoloDetected")
    }

    override fun screenRecorderOnStart() {
        Log.i("Custom", "TEST-KVC screenRecorderOnStart")
    }

    override fun screenRecorderOnComplete() {
        Log.i("Custom", "TEST-KVC screenRecorderOnComplete")
    }

    override fun screenRecorderOnError(p0: Int, p1: String?) {
        Log.i("Custom", "TEST-KVC screenRecorderOnError " + p1)
    }

    override fun screenRecorderOnAppend() {
        Log.i("Custom", "TEST-KVC screenRecorderOnAppend")
    }

    override fun onResultGetSucceed(p0: VerifyCallResultModel?) {
        Log.i("Custom", "TEST-KVC onResultGetSucceed")
    }

    override fun onResultGetFailed() {
        Log.i("Custom", "TEST-KVC onResultGetFailed")
    }

    override fun onRoomIDSendSucceed() {
        Log.i("Custom", "TEST-KVC onRoomIDSendSucceed")
    }

    override fun onRoomIDSendFailed() {
        Log.i("Custom", "TEST-KVC onRoomIDSendFailed")
    }

    override fun agentCameraDisabled() {
        Log.i("Custom", "TEST-KVC agentCameraDisabled")
    }

    override fun agentCameraEnabled() {
        Log.i("Custom", "TEST-KVC agentCameraEnabled")
    }

    override fun maximumCallTimeExpired() {
        Log.i("Custom", "TEST-KVC maximumCallTimeExpired")
    }

    override fun onVideoAddSucceed() {
        Log.i("Custom", "TEST-KVC onVideoAddSucceed")
    }

    override fun onVideoAddFailure(p0: String?) {
        Log.i("Custom", "TEST-KVC onVideoAddFailure " + p0)
    }

    override fun signingSucceed() {
        Log.i("Custom", "TEST-KVC signingSucceed")
    }

    override fun signingFailed() {
        Log.i("Custom", "TEST-KVC signingFailed")
    }

    override fun sessionUpdateSucceed() {
        Log.i("Custom", "TEST-KVC sessionUpdateSucceed")
    }

    override fun sessionUpdateFailed() {
        Log.i("Custom", "TEST-KVC sessionUpdateFailed")
    }

    override fun onNonIcaoStarted() {
        Log.i("Custom", "TEST-KVC onNonIcaoStarted")
    }

    override fun onNonIcaoCompleted() {
        Log.i("Custom", "TEST-KVC onNonIcaoCompleted")
    }

    override fun onNonIcaoStored() {
        Log.i("Custom", "TEST-KVC onNonIcaoStored")
    }

    override fun onNonIcaoStoreFailed() {
        Log.i("Custom", "TEST-KVC onNonIcaoStoreFailed")
    }

    override fun onBackPressed() {
        // super.onBackPressed()
    }

    override fun invokeDefaultOnBackPressed() {
        //super.invokeDefaultOnBackPressed()
    }
}