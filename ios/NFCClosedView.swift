import SwiftUI

struct NFCClosedView: View {
    var body: some View {
        BaseLayoutView(title: "Kimliğini Doğrula") {
            VStack {
                VStack(spacing: 16) {
                    // Üst Görsel
                    Image("kyc_nfc_error")
                        .resizable()
                        .scaledToFit()
                        .frame(width: 120, height: 120)
                        .padding(.top, 50)

                    // Başlık
                    Text("NFC Özelliğiniz Kapalı")
                        .font(.system(size: 16, weight: .medium))
                        .foregroundColor(colorFromHex("#004F97"))
                        .multilineTextAlignment(.center)
                        .padding(.top, 24)

                    // Açıklama Metni
                    Text("Lütfen NFC özelliğinizi açıp tekrar deneyiniz")
                        .font(.system(size: 12, weight: .regular))
                        .foregroundColor(colorFromHex("#909EAA"))
                        .multilineTextAlignment(.center)
                        .padding(.horizontal)
                }

                Spacer()

                VStack(spacing: 12) {
                    // Tekrar Dene Butonu
                    Button(action: {
                        print("Tekrar Dene butonuna basıldı!")
                        // NativeModules.EnQualifyModuleAndroid.openNativeActivity() işlevi burada çağrılabilir.
                    }) {
                        Text("Tekrar Dene")
                            .frame(maxWidth: .infinity)
                            .frame(height: 52)
                            .background(colorFromHex("#004F97"))
                            .font(.system(size: 14, weight: .medium))
                            .foregroundColor(.white)
                            .cornerRadius(10)
                    }

                    // Alt Görsel
                    Image("dgfin_legal")
                        .resizable()
                        .scaledToFit()
                        .frame(height: 77)
                        .padding(.top, 12)
                }
            }
        }
    }
}
