package com.carrefour.payfour

import android.content.Context
import android.util.AttributeSet
import android.view.MotionEvent
import com.facebook.react.ReactRootView

class CustomReactRootView : ReactRootView {

    constructor(context: Context) : super(context)

    constructor(context: Context, attrs: AttributeSet) : super(context, attrs)

    // Eğer style parametreli constructor kullanmak isterseniz, aşağıdaki constructor'ı aktif edebilirsiniz:
    // constructor(context: Context, attrs: AttributeSet, defStyle: Int) : super(context, attrs, defStyle)

    override fun onTouchEvent(ev: MotionEvent): Boolean {
        super.onTouchEvent(ev)
        return false // MotionEvent'i işleme almayıp, devre dışı bırakıyoruz
    }
}
