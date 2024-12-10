import SwiftUI

struct SubtabHeaderView: View {
    var name: String
    var onBackButtonTapped: () -> Void // Geri butonu için closure

    var body: some View {
        HStack(spacing: 12) {
            Button(action: {
              onBackButtonTapped()
            }) {
                Image("arrow_back")
                    .resizable()
                    .scaledToFit()
                    .frame(height: 32)
                    .frame(width: 32)
                Text(name)
                    .font(.headline)
                    .foregroundColor(.black)
            }

            Spacer()
        }
        .padding(.vertical, 10)
        .padding(.horizontal, 16)
        .background(Color.white)
    }
}
