package com.carrefour.payfour

import android.os.Bundle
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageView
import android.widget.LinearLayout
import android.widget.FrameLayout
import android.widget.RelativeLayout
import android.widget.TextView
import android.widget.Button

import androidx.core.content.ContextCompat
import com.carrefour.payfour.R
import com.enqura.enverify.EnverifyNFCBaseFragment
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import com.carrefour.payfour.ui.EnQualifyActivity

class FragmentNFCRead : EnverifyNFCBaseFragment() {

    private val tag = this::class.java.simpleName

    private lateinit var instructionTextView: TextView
    private lateinit var progressContainer: LinearLayout
    
    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        return inflater.inflate(R.layout.fragment_nfc_read, container, false)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        instructionTextView = view.findViewById(R.id.instructionTextView)
        progressContainer = view.findViewById(R.id.progressContainer)

        val subHeader = view.findViewById<LinearLayout>(R.id.lytSubtabHeader)
        val subtabHeaderButton = subHeader.findViewById<RelativeLayout>(R.id.subHeaderBackButton)

        subtabHeaderButton.setOnClickListener{
            backButtonClick()
        }

        val cancelButton: Button = view.findViewById(R.id.cancelButton)
        cancelButton.setOnClickListener {
            cancelButtonClick()
        }

        requireActivity().intent.action = "android.intent.action.MAIN"
    }

    override fun nfcFragmentView(
        layoutInflater: LayoutInflater?,
        viewGroup: ViewGroup?,
        bundle: Bundle?
    ): View {
        return layoutInflater?.inflate(R.layout.fragment_nfc_read, viewGroup, false)!!
    }

    override fun nfcReadStarted(p0: Int) {
        Log.i("Custom", "TEST-KVC nfcReadStarted")
        updateStep(-2, R.string.nfc_chip_scan_start)
    }

    override fun nfcTagDetected(p0: Int) {
        Log.i("Custom", "TEST-KVC nfcTagDetected")
        updateStep(-2, R.string.nfc_chip_scan_tag_detect)
    }

    override fun nfcFirstLevel(p0: Int) {
        Log.i("Custom", "TEST-KVC nfcFirstLevel")
        updateStep(0, R.string.nfc_chip_scan_s1)
    }

    override fun nfcSecondLevel(p0: Int) {
        Log.i("Custom", "TEST-KVC nfcSecondLevel")
        updateStep(1, R.string.nfc_chip_scan_s2)
    }

    override fun nfcThirdLevel(p0: Int) {
        Log.i("Custom", "TEST-KVC nfcThirdLevel")
        updateStep(2, R.string.nfc_chip_scan_s3)
    }

    override fun nfcFourthLevel(p0: Int) {
        Log.i("Custom", "TEST-KVC nfcFourthLevel")
        updateStep(3, R.string.nfc_chip_scan_s4)
    }

    override fun nfcReadError(p0: Int, p1: String?) {
        Log.i("Custom", "TEST-KVC nfcReadError")
        if (activity != null)
        updateStep(-1, R.string.nfc_chip_scan_error)
    }

    private fun updateStep(stepIndex: Int, instructionResId: Int) {

        CoroutineScope(Dispatchers.Main).launch {

            instructionTextView.setText(instructionResId)

            if (stepIndex == -1) {
                resetSteps()
                instructionTextView.setText(R.string.nfc_chip_scan_error)
            } else if (stepIndex == -2) {

            } else {
                val childCount = progressContainer.childCount
                for (i in 0 until childCount step 2) { // step 2, TextView ve aradaki çizgiyi atlar
                    val stepLayout = progressContainer.getChildAt(i) as LinearLayout
                    val stepCircle = stepLayout.getChildAt(0) as FrameLayout // FrameLayout olarak dönüştür
                    val stepCircleText = stepCircle.getChildAt(0) as TextView // FrameLayout içindeki TextView'e eriş
                    val stepText = stepLayout.getChildAt(1) as TextView // LinearLayout içindeki TextView'e eriş
            
                    if (i / 2 <= stepIndex) {
                        // Aktif aşama
                        stepCircle.setBackgroundResource(R.drawable.progress_circle_active)
                        stepCircleText.setTextColor(ContextCompat.getColor(requireContext(), R.color.nfcColorSelected))
                        stepText.setTextColor(ContextCompat.getColor(requireContext(), R.color.nfcColorSelected))
                    } else {
                        // Pasif aşama
                        stepCircle.setBackgroundResource(R.drawable.progress_circle_inactive)
                        stepCircleText.setTextColor(ContextCompat.getColor(requireContext(), R.color.nfcColorDefault))
                        stepText.setTextColor(ContextCompat.getColor(requireContext(), R.color.nfcColorDefault))
                    }
                }
           
            }

        }
    }
    
    private fun resetSteps() {
        CoroutineScope(Dispatchers.Main).launch {
            val childCount = progressContainer.childCount
            for (i in 0 until childCount step 2) {
                val stepLayout = progressContainer.getChildAt(i) as LinearLayout
                val stepCircle = stepLayout.getChildAt(0) as FrameLayout // FrameLayout olarak dönüştür
                val stepCircleText = stepCircle.getChildAt(0) as TextView // FrameLayout içindeki TextView'e eriş
                val stepText = stepLayout.getChildAt(1) as TextView // LinearLayout içindeki TextView'e eriş
                
                // Pasif duruma döndür
                stepCircle.setBackgroundResource(R.drawable.progress_circle_inactive)
                stepCircleText.setTextColor(ContextCompat.getColor(requireContext(), R.color.nfcColorDefault))
                stepText.setTextColor(ContextCompat.getColor(requireContext(), R.color.nfcColorDefault))
            }
        }
    }

    public fun cancelButtonClick() {
        (activity as? EnQualifyActivity)?.exitSdk()
    }

    public fun backButtonClick() {
        (activity as? EnQualifyActivity)?.backButton()
    }
    
}