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

class FragmentFaceSuccess : Fragment() {
    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        return inflater.inflate(R.layout.fragment_face_success, container, false)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        val subHeader = view.findViewById<LinearLayout>(R.id.lytSubtabHeader)
        val subtabHeaderButton = subHeader.findViewById<RelativeLayout>(R.id.subHeaderBackButton)
        val subtabHeaderTitle = subHeader.findViewById<TextView>(R.id.title)

        val goHomeButton: Button = view.findViewById(R.id.goHome)

        subtabHeaderButton.setOnClickListener{
            backButtonClick()
        }

        goHomeButton.setOnClickListener{
            backButtonClick()
        }

        subtabHeaderTitle.text = "İşlem Başarılı"
    }

    public fun backButtonClick() {
        (activity as? EnQualifyActivity)?.sdkSucceeded()
    }
}