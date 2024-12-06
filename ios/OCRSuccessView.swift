import SwiftUI

struct OCRSuccessView: View {
    var body: some View {
      NavigationView {
            ZStack {
                // Arka plan rengi
                Color.white
                    .edgesIgnoringSafeArea(.all)
                
                VStack(spacing: 0) {
                    // Subtab Header
                    SubtabHeaderView(name: "Kimliğini Doğrula")
                    
                    VStack(spacing: 16) {
                        VStack() {
                            // Kamera Başlığı
                          
                            // NFC Görseli
                            Image("kvc_nfc")
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
                    .padding(24)
                    .frame(maxHeight: .infinity)
                    .background(
                        RoundedRectangle(cornerRadius: 16)
                            .fill(Color.white)
                    )
                    .padding(.top, 16) // Üst
                    .padding(.leading, 16) // Sol
                    .padding(.bottom, 0) // Alt
                    .padding(.trailing, 16) // Sağ
                    .frame(maxHeight: .infinity)
                    .background(
                    colorFromHex("#EFEFF3")
                            .edgesIgnoringSafeArea(.all) // Arka planın ekranı kaplamasını sağlar
                    )
                }
                .frame(maxHeight: .infinity) // Tüm içeriği ekranın tamamına yayar
            }
        }.navigationBarHidden(true)
    }
}
