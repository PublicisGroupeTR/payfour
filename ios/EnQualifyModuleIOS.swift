import Foundation
import SwiftUI

@objc(EnQualifyModuleIOS)
class EnQualifyModuleIOS: NSObject {
    @objc func showOCR() {
        DispatchQueue.main.async {
            if let rootVC = UIApplication.shared.keyWindow?.rootViewController {
                // SwiftUI görünümünü oluştur
                let swiftUIView = OCRInfoView()
                let hostingController = UIHostingController(rootView: swiftUIView)
                
                // Tam ekran modal sunum stili
                hostingController.modalPresentationStyle = .fullScreen
                
                // Görünümü sun
                rootVC.present(hostingController, animated: true, completion: nil)
            }
        }
      
      
    }
}
