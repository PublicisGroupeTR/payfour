import SwiftUI

struct NFCErrorView: View {
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
                    Text("Kimlik Kartın Okunamadı")
                        .font(.system(size: 16, weight: .medium))
                        .foregroundColor(colorFromHex("#004F97"))
                        .multilineTextAlignment(.center)
                        .padding(.top, 24)

                    // Açıklama Metni
                    Text("Lütfen işlem tamamlana kadar kimlik kartını telefonun NFC (Yakın Alan İletişim) alanından çekme.")
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
                        // NativeModules.EnQualifyModuleAndroid.openNativeActivity() çağrısı burada uygulanabilir.
                    }) {
                        Text("Tekrar Dene")
                            .frame(maxWidth: .infinity)
                            .frame(height: 52)
                            .background(colorFromHex("#004F97"))
                            .font(.system(size: 14, weight: .medium))
                            .foregroundColor(.white)
                            .cornerRadius(10)
                    }

                    // Görüntülü Görüşme Butonu
                    Button(action: {
                        print("Call Centar Ara")
                    }) {
                        HStack(spacing: 12) {
                            Image("video_icon")
                                .resizable()
                                .scaledToFit()
                                .frame(width: 24, height: 24)
                            Text("Görüntülü görüşme")
                                .font(.system(size: 14, weight: .medium))
                                .foregroundColor(colorFromHex("#004F97"))
                        }
                        .frame(maxWidth: .infinity)
                        .frame(height: 52)
                        .background(Color.white)
                        .overlay(
                            RoundedRectangle(cornerRadius: 10)
                                .stroke(colorFromHex("#004F97"), lineWidth: 1)
                        )
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
