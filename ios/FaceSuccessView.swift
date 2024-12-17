import SwiftUI

struct FaceSuccessView: View {
    var body: some View {
        BaseLayoutView(title: "İşlem Başarılı") {
            VStack {
                VStack(spacing: 16) {
                    // Üst Görsel
                    Image("kyc_success")
                        .resizable()
                        .scaledToFit()
                        .frame(width: 120, height: 120)
                        .padding(.top, 50)

                    // Başlık
                    Text("Hazırsınız")
                        .font(.system(size: 16, weight: .medium))
                        .foregroundColor(colorFromHex("#004F97"))
                        .multilineTextAlignment(.center)
                        .padding(.top, 24)

                    // Alt Başlık
                    Text("Kimlik doğrulama işleminiz başarıyla tamamlandı.")
                        .font(.system(size: 12, weight: .medium))
                        .foregroundColor(colorFromHex("#0B1929"))
                        .multilineTextAlignment(.center)
                        .padding(.bottom, 4)

                    // Açıklama Metni
                    Text("En avantajlı kredi fırsatları için Dgfin’e başvurabilirsiniz.")
                        .font(.system(size: 12, weight: .regular))
                        .foregroundColor(colorFromHex("#909EAA"))
                        .multilineTextAlignment(.center)
                }

                Spacer()

                VStack(spacing: 12) {
                  
                  Button(action: {
                      print("Devam Et butonuna basıldı!")
                  }) {
                      Text("Tamam")
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
