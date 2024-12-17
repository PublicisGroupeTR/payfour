import SwiftUI

struct NFCReadView: View {
    var body: some View {
        BaseLayoutView(title: "Yüzünü Tanıt") {
            VStack {
                VStack(spacing: 16) {
                    Text("Taramaya hazır")
                        .font(.system(size: 26, weight: .medium))
                        .foregroundColor(colorFromHex("#8F8E94"))
                        .padding(.top, 42)

                    Image("read_icon")
                        .resizable()
                        .scaledToFit()
                        .frame(width: 108, height: 108)
                        .padding(.vertical, 8)

                    Text("Telefonunuzu kimliği yaklaştırın.")
                        .font(.system(size: 16, weight: .medium))
                        .foregroundColor(colorFromHex("#222222"))
                        .multilineTextAlignment(.center)
                        .padding(.top, 24)

                    ProgressBarView() // İlerleme Çubuğu
                        .padding(.top, 50)
                }

                Spacer()

                VStack(spacing: 12) {
                    Button(action: {
                        // İptal Et işlemi
                        print("İptal Et butonuna basıldı!")
                    }) {
                        Text("İptal Et")
                            .frame(maxWidth: .infinity)
                            .frame(height: 52)
                            .background(colorFromHex("#D5D4DB").opacity(0.5))
                            .font(.system(size: 16, weight: .medium))
                            .foregroundColor(colorFromHex("#222222"))
                            .cornerRadius(10)
                    }
                }
            }
        }
    }
}

struct ProgressBarView: View {
    var body: some View {
        HStack(spacing: 8) {
            ProgressStepView(step: "1", isActive: true, title: "1.Aşama")
            ProgressDashedLineView(isActive: true)
            ProgressStepView(step: "2", isActive: false, title: "2.Aşama")
            ProgressDashedLineView(isActive: false)
            ProgressStepView(step: "3", isActive: false, title: "3.Aşama")
            ProgressDashedLineView(isActive: false)
            ProgressStepView(step: "4", isActive: false, title: "4.Aşama")
        }
    }
}

struct ProgressStepView: View {
    var step: String
    var isActive: Bool
    var title: String

    var body: some View {
        VStack(spacing: 4) {
            Circle()
                .fill(isActive ? colorFromHex("#004F97").opacity(0.1) : colorFromHex("#909EAA").opacity(0.1))
                .frame(width: 32, height: 32)
                .overlay(
                    Text(step)
                        .font(.system(size: 18, weight: .medium))
                        .foregroundColor(isActive ? colorFromHex("#004F97") : colorFromHex("#909EAA"))
                )
            Text(title)
                .font(.system(size: 10, weight: .medium))
                .foregroundColor(isActive ? colorFromHex("#004F97") : colorFromHex("#909EAA"))
                .multilineTextAlignment(.center)
        }
    }
}

struct ProgressDashedLineView: View {
    var isActive: Bool

    var body: some View {
        Rectangle()
            .frame(height: 1)
            .foregroundColor(isActive ? colorFromHex("#004F97") : colorFromHex("#909EAA"))
            .overlay(
                DashStyle()
                    .stroke(isActive ? colorFromHex("#004F97") : colorFromHex("#909EAA"), style: StrokeStyle(lineWidth: 1, dash: [5]))
            )
            .padding(.horizontal, 8)
    }
}

struct DashStyle: Shape {
    func path(in rect: CGRect) -> Path {
        var path = Path()
        let dashWidth: CGFloat = 5
        let spaceWidth: CGFloat = 5
        var currentX: CGFloat = 0

        while currentX < rect.width {
            path.move(to: CGPoint(x: currentX, y: rect.midY))
            path.addLine(to: CGPoint(x: min(currentX + dashWidth, rect.width), y: rect.midY))
            currentX += dashWidth + spaceWidth
        }

        return path
    }
}
