import SwiftUI

struct OCRInfoView: View {
    var body: some View {
        BaseLayoutView(title: "Kimliğini Doğrula") {
            VStack(spacing: 16) {
                // Kamera Başlığı
                Text("Kamera ile Kimlik Doğrulama")
                .font(.system(size: 16, weight: .medium))
                    .foregroundColor(colorFromHex("#004F97"))
                    .multilineTextAlignment(.center)
                
                // NFC Görseli
                Image("kyc_ocr_info")
                    .resizable()
                    .scaledToFit()
                    .frame(height: 205)
                    .padding(.vertical, 8)
                
                // Kimlik Kameraya Okut Başlığı
                Text("Kimliğini kameraya okut")
                    .font(.system(size: 16, weight: .medium))
                    .foregroundColor(colorFromHex("#004F97"))
                    .multilineTextAlignment(.center)
            }
            .padding(.top, 64) // Top padding azaltıldı
            
            Spacer()

            VStack(spacing: 12) {
                // Devam Et Butonu

                Button(action: {
                
                }) {
                    NavigationLink(
                        destination: OCRSuccessView()
                    ) {
                        Text("Devam Et")
                            .frame(maxWidth: .infinity)
                            .frame(height: 52)
                            .background(colorFromHex("#004F97"))
                            .font(.system(size: 16, weight: .medium))
                            .foregroundColor(.white)
                            .cornerRadius(10)
                    }
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
