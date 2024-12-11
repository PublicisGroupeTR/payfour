import SwiftUI

struct FaceErrorView: View {
    var body: some View {
        BaseLayoutView(title: "Yüzünü Tanıt") {
            VStack {
                VStack(spacing: 16) {
                    // Üst Görsel
                    Image("kyc_face_error")
                        .resizable()
                        .scaledToFit()
                        .frame(width: 120, height: 120)
                        .padding(.top, 50)

                    // Başlık
                    Text("Yüz Algılanamadı")
                        .font(.system(size: 16, weight: .medium))
                        .foregroundColor(colorFromHex("#004F97"))
                        .multilineTextAlignment(.center)
                        .padding(.top, 24)

                    // Açıklama Metni
                    Text("Lütfen işlem onaylanana kadar karanlık bir yerde olmadığından emin ol ve yönergeleri tamamla.")
                        .font(.system(size: 12, weight: .regular))
                        .foregroundColor(colorFromHex("#909EAA"))
                        .multilineTextAlignment(.center)
                        .padding(.horizontal)
                }

                Spacer()

                VStack(spacing: 12) {
                    // Düğmeler
                    HStack(spacing: 12) {
                        // Vazgeç Butonu
                        Button(action: {
                            print("Vazgeç butonuna basıldı!")
                        }) {
                            Text("Vazgeç")
                                .frame(maxWidth: .infinity)
                                .frame(height: 52)
                                .background(Color.white)
                                .font(.system(size: 14, weight: .medium))
                                .foregroundColor(colorFromHex("#004F97"))
                                .overlay(
                                    RoundedRectangle(cornerRadius: 10)
                                        .stroke(colorFromHex("#004F97"), lineWidth: 1)
                                )
                                .cornerRadius(10)
                        }

                        // Tekrar Dene Butonu
                        Button(action: {
                            print("Tekrar Dene butonuna basıldı!")
                            // NativeModules.EnQualifyModuleAndroid.startNFC() burada uygulanabilir.
                        }) {
                            Text("Tekrar Dene")
                                .frame(maxWidth: .infinity)
                                .frame(height: 52)
                                .background(colorFromHex("#004F97"))
                                .font(.system(size: 14, weight: .medium))
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
}
