import SwiftUI


func colorFromHex(_ hex: String) -> Color {
    // # karakterini kaldır ve beyaz boşlukları temizle
    let hexCleaned = hex.trimmingCharacters(in: .whitespacesAndNewlines).replacingOccurrences(of: "#", with: "")
    
    // Geçerli bir hex kodu olup olmadığını kontrol et
    guard hexCleaned.count == 6 else {
        return Color.black // Varsayılan bir renk döndür
    }
    
    // Scanner kullanarak hex değerini oku
    var rgbValue: UInt64 = 0
    let scanner = Scanner(string: hexCleaned)
    guard scanner.scanHexInt64(&rgbValue) else {
        return Color.black // Varsayılan bir renk döndür
    }
    
    // RGB değerlerini ayıkla
    let red = Double((rgbValue >> 16) & 0xFF) / 255.0
    let green = Double((rgbValue >> 8) & 0xFF) / 255.0
    let blue = Double(rgbValue & 0xFF) / 255.0
    
    // Color nesnesini oluştur ve döndür
    return Color(red: red, green: green, blue: blue)
}
