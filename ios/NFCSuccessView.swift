import SwiftUI

struct NFCSuccessView: View {
    var body: some View {
        BaseLayoutView(title: "Yüzünü Tanıt") {
            VStack() {
                // Üst Görsel ve Metinler
                VStack(spacing: 16) {
                    // Üst Görsel
                    Image("kyc_face")
                        .resizable()
                        .scaledToFit()
                        .frame(width: 120, height: 120)

                    // Başlık
                    Text("Yüz tanıma ve canlılık testini yap")
                        .font(.system(size: 16, weight: .medium))
                        .foregroundColor(colorFromHex("#004F97"))
                        .multilineTextAlignment(.center)
                    
                    // Açıklama Metinleri
                    VStack(spacing: 8) {
                        Text("Yüz tanıma ve canlılık testi için hazır mısın?")
                            .font(.system(size: 12, weight: .regular))
                            .foregroundColor(colorFromHex("#909EAA"))
                            .multilineTextAlignment(.center)

                        Text("Ekrandaki yönlendirmeleri uygulayarak testi tamamlayabilirsin. Test boyunca yeterince aydınlık bir ortamda olman önemli.")
                            .font(.system(size: 12, weight: .regular))
                            .foregroundColor(colorFromHex("#909EAA"))
                            .multilineTextAlignment(.center)
                    }
                }
                .padding(.top, 64)

                Spacer()

                // Alt Bölüm
                VStack(spacing: 12) {
                    // Alt Açıklama
                    Text("Devam Et seçiminden sonra kameran açılacaktır.")
                        .font(.system(size: 12, weight: .regular))
                        .foregroundColor(colorFromHex("#909EAA"))
                        .multilineTextAlignment(.center)

                    // Devam Et Butonu
                    Button(action: {
                        print("Devam Et butonuna basıldı!")
                    }) {
                        Text("Devam Et")
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
                }
            }
            
          
        }
    }
}
