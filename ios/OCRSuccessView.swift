import SwiftUI

struct OCRSuccessView: View {
    var body: some View {
        BaseLayoutView(title: "Kimliğini Doğrula") {
            VStack() {
                Image("kyc_nfc")
                    .resizable()
                    .scaledToFit()
                    .frame(height: 120)
                    .frame(width: 120)
                    .padding(.vertical, 8)
                
                // Kimlik Kameraya Okut Başlığı
                Text("Kimliğinizi NFC ile okutunuz")
                    .font(.system(size: 16, weight: .medium))
                    .foregroundColor(colorFromHex("#004F97"))
                    .multilineTextAlignment(.center)
                    .padding(.top, 24)
                    

                Text("Kimlik kartının çipinden bilgilerin okunabilmesi için, kartını telefonun arka yüzünde bulunan Yakın Alan İletişimi (NFC) alanına örnekteki gibi bir süre temas ettirerek bekleyiniz.")
                    .font(.system(size: 12, weight: .medium))
                    .foregroundColor(colorFromHex("#909EAA"))
                    .multilineTextAlignment(.center)
                    .padding(.top, 8)
            }
            .padding(.top, 64) // Top padding azaltıldı
            
            Spacer()

            VStack(spacing: 12) {
                // Devam Et Butonu
                Button(action: {
                    // Devam et işlemi
                    print("Devam Et butonuna basıldı!")
                }) {
                    Text("Devam Et")
                        .frame(maxWidth: .infinity)
                        .frame(height: 52)
                        .background(colorFromHex("#004F97"))
                        .font(.system(size: 16, weight: .medium))
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
