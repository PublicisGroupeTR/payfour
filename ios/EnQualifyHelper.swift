import UIKit
import SwiftUI

class EnQualifyHelper {
    private static var hostingControllers: [String: UIHostingController<AnyView>] = [:]

    // Sayfayı Göster
    static func showPage(_ pageName: String, view: AnyView) {
        DispatchQueue.main.async {
            if let rootVC = UIApplication.shared.keyWindow?.rootViewController {
                let hostingController = UIHostingController(rootView: view)
                hostingController.modalPresentationStyle = .fullScreen
                hostingControllers[pageName] = hostingController
                rootVC.present(hostingController, animated: true, completion: nil)
            }
        }
    }

    // Sayfayı Kapat
    static func closePage(_ pageName: String?) {
        DispatchQueue.main.async {
            if let pageName = pageName {
                // Belirtilen sayfayı kapat
                if let hostingController = hostingControllers[pageName] {
                    hostingController.dismiss(animated: true) {
                        hostingControllers[pageName] = nil
                    }
                }
            } else {
                // Tüm açık sayfaları kapat
                for (key, hostingController) in hostingControllers {
                    hostingController.dismiss(animated: true) {
                        hostingControllers[key] = nil
                    }
                }
            }
        }
    }
}
