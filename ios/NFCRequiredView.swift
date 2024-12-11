import SwiftUI

struct NFCRequiredView: View {
  // Geri dönüş için çevresel değişken

    var body: some View {
        BaseLayoutView(title: "Kimliğini Doğrula") {
            VStack {
                VStack(spacing: 16) {
                    // Hata Görseli
                    Image("kyc_nfc_error")
                        .resizable()
                        .scaledToFit()
                        .frame(width: 120, height: 120)
                        .padding(.top, 50)

                    // Başlık
                    Text("Cihazınız NFC'yi desteklemiyor, devam edemezsiniz.")
                        .font(.system(size: 16, weight: .medium))
                        .foregroundColor(colorFromHex("#004F97"))
                        .multilineTextAlignment(.center)
                        .padding(.top, 24)
                }

                Spacer()

                VStack(spacing: 12) {
                    // Geri Dön Butonu
                    Button(action: {
                        
                    }) {
                        Text("Geri Dön")
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
