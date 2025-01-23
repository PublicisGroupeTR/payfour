package com.carrefour.payfour

import android.util.Log
import android.widget.Button
import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageView
import android.widget.LinearLayout
import android.widget.RelativeLayout
import android.widget.TextView
import androidx.core.content.ContextCompat
import androidx.core.view.get
import com.carrefour.payfour.R
import com.carrefour.payfour.ui.EnQualifyActivity
import com.google.android.material.progressindicator.LinearProgressIndicator
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch

import android.content.Intent
import android.net.Uri
import android.content.Context

class FragmentNFCError : Fragment() {
    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        return inflater.inflate(R.layout.fragment_nfc_error, container, false)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

      
        val subHeader = view.findViewById<LinearLayout>(R.id.lytSubtabHeader)
        val subtabHeaderButton = subHeader.findViewById<RelativeLayout>(R.id.subHeaderBackButton)

        subtabHeaderButton.setOnClickListener{
            backButtonClick()
        }

        val button: Button = view.findViewById(R.id.retryButton)
        button.setOnClickListener {
            buttonClick()
        }

        val buttonCallCenter: LinearLayout = view.findViewById(R.id.videoCallButton)
        buttonCallCenter.setOnClickListener {
            buttonClickCallCenter()
        }
     
    }

    public fun buttonClick() {
        (activity as? EnQualifyActivity)?.startNFC()
    }

    public fun backButtonClick() {
        (activity as? EnQualifyActivity)?.exitSdk()
    }

    public fun buttonClickCallCenter() {
        val ctx = requireContext()
        makePhoneCall(ctx, "+4441000")    
    }

    fun makePhoneCall(context: Context, phoneNumber: String) {
        try {
            if (phoneNumber.isNotEmpty()) {
                val callIntent = Intent(Intent.ACTION_DIAL).apply {
                    data = Uri.parse("tel:$phoneNumber")
                }
                context.startActivity(callIntent)
            } else {
                // Numara boşsa bir mesaj göster
            Log.i("Custom", "TEST-KYC call center error")

            }
        } catch (e: Exception) {
            Log.i("Custom", "TEST-KYC call center error 2")
        }
    }
}