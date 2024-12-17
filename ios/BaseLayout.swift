import SwiftUI

struct BaseLayoutView<Content: View>: View {
    @Environment(\.presentationMode) var presentationMode
    let title: String
    let content: () -> Content

  
    init(title: String, @ViewBuilder content: @escaping () -> Content) {
        self.title = title
        self.content = content
    }

    var body: some View {
      NavigationView {
            ZStack {
                // Arka plan rengi
                Color.white
                    .edgesIgnoringSafeArea(.all)
                
                VStack(spacing: 0) {
                    // Subtab Header
              
                  SubtabHeaderView(name: title) {
                    presentationMode.wrappedValue.dismiss() // Burada istediğiniz aksiyonu yapabilirsiniz
                  }
                    VStack(spacing: 16) {
                        content()
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
