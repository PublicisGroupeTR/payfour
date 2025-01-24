package com.carrefour.payfour

import android.app.Dialog
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.graphics.Color
import android.graphics.drawable.ColorDrawable
import com.google.android.material.bottomsheet.BottomSheetDialogFragment
import android.widget.TextView
import android.widget.Button
import android.widget.LinearLayout
import com.carrefour.payfour.ui.EnQualifyActivity

class CustomBottomSheet : BottomSheetDialogFragment() {

    override fun onCreateDialog(savedInstanceState: Bundle?): Dialog {
        val dialog = super.onCreateDialog(savedInstanceState)
    
        // Backdrop (arka karartma) alanını özelleştir
        dialog.window?.setBackgroundDrawable(ColorDrawable(Color.argb(50, 0, 79, 151)))
        
    
        dialog.setOnShowListener {
            val bottomSheet = dialog.findViewById<View>(com.google.android.material.R.id.design_bottom_sheet)
            bottomSheet?.let {
                // Bottom Sheet içeriğini şeffaf yap
                it.setBackgroundColor(Color.TRANSPARENT)
            }
        }
    
        return dialog
    }

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        return inflater.inflate(R.layout.bottom_sheet_layout, container, false)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        // Evet butonu
        val yesButton = view.findViewById<Button>(R.id.bottom_sheet_yes_button)
        yesButton.setOnClickListener {
            dismiss() // Dialog kapatılır
            (activity as? EnQualifyActivity)?.exitSdk()
        }

        val cancelButton = view.findViewById<LinearLayout>(R.id.bottom_sheet_cancel_button)
        cancelButton.setOnClickListener {
            dismiss() // Dialog kapatılır
        }
    }

}
