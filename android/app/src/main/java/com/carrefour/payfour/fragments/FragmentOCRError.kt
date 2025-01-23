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

class FragmentOCRError : Fragment() {
    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        return inflater.inflate(R.layout.fragment_ocr_error, container, false)
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

    }

    public fun buttonClick() {
        (activity as? EnQualifyActivity)?.startIdentity()
    }

    public fun backButtonClick() {
        (activity as? EnQualifyActivity)?.exitSdk()
    }
}