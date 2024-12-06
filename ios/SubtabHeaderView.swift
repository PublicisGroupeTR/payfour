import SwiftUI

struct SubtabHeaderView: View {
   @Environment(\.presentationMode) var presentationMode
  
    var name: String
  
    var body: some View {
        HStack(spacing: 12) {
            // Başlık
          
          Button(action: {
            print("Devam Et butonuna basıldı!")
            presentationMode.wrappedValue.dismiss()
          }) {
            Image("arrow_back")
                .resizable()
                .scaledToFit()
                .frame(height: 24)
            
              Text(name)
                  .font(.headline)
                  .foregroundColor(.black)
          }
    
          Spacer()
            
         
        }
        .padding()
        .background(Color.white)
    }
}
