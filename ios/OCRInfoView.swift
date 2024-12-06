import SwiftUI

struct OCRInfoView: View {
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
