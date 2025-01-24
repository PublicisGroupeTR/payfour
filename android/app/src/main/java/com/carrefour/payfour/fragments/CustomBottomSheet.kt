package com.carrefour.payfour
import android.app.Dialog
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import com.google.android.material.bottomsheet.BottomSheetDialogFragment
import android.widget.TextView
import android.widget.Button
import com.carrefour.payfour.R

class CustomBottomSheet : BottomSheetDialogFragment() {

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        return inflater.inflate(R.layout.bottom_sheet_layout, container, false)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        // Başlık ve açıklama düzenlenebilir
        val title = view.findViewById<TextView>(R.id.bottom_sheet_title)
        val description = view.findViewById<TextView>(R.id.bottom_sheet_description)

        // Evet butonu
        view.findViewById<Button>(R.id.bottom_sheet_yes_button).setOnClickListener {
            dismiss() // Dialog kapatılır
            performYesAction()
        }

        // Vazgeç butonu
        view.findViewById<Button>(R.id.bottom_sheet_cancel_button).setOnClickListener {
            dismiss() // Dialog kapatılır
        }
    }

    private fun performYesAction() {
        // "Evet, Eminim" butonuna tıklandığında yapılacak işlemler
        println("Evet butonuna tıklandı.")
    }
}
