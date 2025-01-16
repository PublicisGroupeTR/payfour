// BaseViewController.swift

import UIKit
import EnQualify

class BaseViewController: UIViewController {
    static var navController: UINavigationController? {
        return EnVerify.getNavigationController()
    }

    static func popFrontViewController(_ upTo: String, afterAction: @escaping () -> Void) {
        let frontScreens = Array(getTopMostClassNames().reversed())
        print("frontScreens: \(frontScreens)")
        for (_, element) in frontScreens.enumerated() {
            if element != upTo {
                navController?.popViewController(animated: true)
            } else {
                afterAction()
                return
            }
        }
    }

    static func popMainViewController(_ upTo: String, afterAction: @escaping () -> Void) {
        let frontScreens = Array(getTopMostReactClassNames().reversed())
        print("frontScreens: \(frontScreens)")
        for (_, element) in frontScreens.enumerated() {
            if element != upTo {
                print("element name", element)
                navController?.popViewController(animated: true)
            } else {
                afterAction()
                return
            }
        }
    }

    static func frontCameraErrorPopup(from viewController: UIViewController) {
        viewController.openAlert(title: "",
                                 message: "Hata",
                                 alertStyle: .alert,
                                 actionTitles: ["Kapat"],
                                 actionStyles: [.default],
                                 actions: [{ _ in }])
    }

    static func maximumCallTimePopup(from viewController: UIViewController) {
        DispatchQueue.main.asyncAfter(deadline: .now() + 0.3) {
            viewController.openAlert(title: "The Processing time has expired.",
                                     message: "Your transaction has been terminated.",
                                     alertStyle: .alert,
                                     actionTitles: ["Kapat"],
                                     actionStyles: [.default],
                                     actions: [{ _ in }])
        }
    }

    static func luminosityAnalyzedPopup(from viewController: UIViewController) {
        DispatchQueue.main.asyncAfter(deadline: .now() + 0.3) {
            viewController.openAlert(title: "Uyarı",
                                     message: "Ortam ışığı karanlık",
                                     alertStyle: .alert,
                                     actionTitles: ["Kapat"],
                                     actionStyles: [.default],
                                     actions: [{ _ in }])
        }
    }

    static func setConfigurationValues() {
        EnVerify.setShowLogs(value: true)
        EnVerify.setSpeaker(soundOn: true)
        EnVerify.setTimerForAliveness(timerCountInSeconds: EnVerify.calibrationValues.timeout ?? .zero)
        EnVerify.setEyeCloseTolerance(value: 4)
        EnVerify.setMediaServer(mediaServerState: UserDefaults.standard.bool(forKey: "enableMediaServer"))
        EnVerify.setHashCheck(hashCheck: true)
        EnVerify.setScreenRecordAudioEnabled(state: true)
        EnVerify.setVideoBitrate(rate: 1000)
    }

    private static func getTopMostClassNames() -> [String] {
        var views: [String] = []
        if let vc = topMostController() as? UINavigationController {
            let topVCs = vc.viewControllers
            for element in topVCs {
                let className = NSStringFromClass((element.classForCoder))
                let trimClassName = className.components(separatedBy: ".").last!
                views.append(trimClassName)
            }
        }
        return views
    }

    private static func getTopMostReactClassNames() -> [String] {
        var views: [String] = []
        if let vc = topMostController() as? UINavigationController {
            let topVCs = vc.viewControllers
            for element in topVCs {
                views.append(element.myComputedProperty)
            }
        }
        return views
    }

    private static func topMostController() -> UIViewController? {
        guard let window = UIApplication.shared.keyWindow, let rootViewController = window.rootViewController else {
            return nil
        }

        var topController = rootViewController
        while let newTopController = topController.presentedViewController {
            topController = newTopController
        }

        return topController
    }
}

extension UIViewController {
    public func openAlert(title: String,
                          message: String,
                          alertStyle: UIAlertController.Style,
                          actionTitles: [String],
                          actionStyles: [UIAlertAction.Style],
                          actions: [((UIAlertAction) -> Void)]) {

        let alertController = UIAlertController(title: title, message: message, preferredStyle: alertStyle)
        for (index, indexTitle) in actionTitles.enumerated() {
            let action = UIAlertAction(title: indexTitle, style: actionStyles[index], handler: actions[index])
            alertController.addAction(action)
        }
        self.present(alertController, animated: true)
    }

    private static var _myComputedProperty = [String: String]()

    var myComputedProperty: String {
        get {
            let tmpAddress = String(format: "%p", unsafeBitCast(self, to: Int.self))
            return UIViewController._myComputedProperty[tmpAddress] ?? ""
        }
        set(newValue) {
            let tmpAddress = String(format: "%p", unsafeBitCast(self, to: Int.self))
            UIViewController._myComputedProperty[tmpAddress] = newValue
        }
    }
}

extension UINavigationController {
    func popViewController(animated: Bool, completion: @escaping () -> Void) {
        DispatchQueue.main.asyncAfter(deadline: .now() + 0.1) {
            self.popViewController(animated: animated)

            if animated, let coordinator = self.transitionCoordinator {
                coordinator.animate(alongsideTransition: nil) { _ in
                    completion()
                }
            } else {
                completion()
            }
        }
    }
}


// import UIKit
// import EnQualify

// class BaseViewController: UIViewController {
//   var navController = EnVerify.getNavigationController()

//   func popFrontViewController(_ upTo: String, afterAction: () -> Void) {
//     let frontScreens = Array(self.getTopMostClassNames().reversed())
//     print("frontScreens: \(frontScreens)")
//     for (_, element) in frontScreens.enumerated() {
//       if element != upTo {
//         navController?.popViewController(animated: true)
//       } else {
//         afterAction()
//         return
//       }
//     }
//   }

//   func popMainViewController(_ upTo: String, afterAction: () -> Void) {
//     let frontScreens = Array(self.getTopMostReactClassNames().reversed())
//     print("frontScreens: \(frontScreens)")
//     for (_, element) in frontScreens.enumerated() {
//       if element != upTo {
//         print("element name", element)
//         navController?.popViewController(animated: true)
//       } else {
//         afterAction()
//         return
//       }
//     }
//   }

//   func frontCameraErrorPopup() {
//     openAlert(title: "",
//               message: "Hata",
//               alertStyle: .alert,
//               actionTitles: ["Kapat"],
//               actionStyles: [.default],
//               actions: [{_ in }])
//   }

//   func maximumCallTimePopup() {
//     DispatchQueue.main.asyncAfter(deadline: .now() + 0.3) {
//       self.openAlert(title: "The Processing time has expired.",
//                      message: "Your transaction has been terminated.",
//                      alertStyle: .alert,
//                      actionTitles: ["Kapat"],
//                      actionStyles: [.default],
//                      actions: [
//                       {_ in }])
//     }
//   }

//   func luminosityAnalyzedPopup() {
//     DispatchQueue.main.asyncAfter(deadline: .now() + 0.3) {
//       self.openAlert(title: "Uyarı",
//                      message: "Ortam ışığı karanlık",
//                      alertStyle: .alert,
//                      actionTitles: ["Kapat"],
//                      actionStyles: [.default],
//                      actions: [
//                       {_ in }])
//     }
//   }

//   func setConfigurationValues() {
//           EnVerify.setShowLogs(value: true)
//           EnVerify.setSpeaker(soundOn: true)
//           EnVerify.setTimerForAliveness(timerCountInSeconds: EnVerify.calibrationValues.timeout ?? .zero) // Ayarlarda yok istenirse burada setlenebilir.
//   //        EnVerify.setSmilingCalibration(value: userManager.getSmilingCalibrationValue() ?? 0.7) // 0 easy - 1.0 hard (default 0.7)
//   //        EnVerify.setEyeCloseCalibration(value: userManager.getEyeCloseCalibrationValue() ?? 0.3) // 0 hard - 1.0 easy (default 0.3)
//   //        EnVerify.setLivenessCalibration(value: userManager.getLivenessCalibrationValue() ?? 3) // 0 easy - 10 hard (default 3)
//   //        EnVerify.setFaceAngleCalibration(value: userManager.getFaceAngleCalibrationValue() ?? 3) // 0 hard - 10 easy (default 3)
//   //        EnVerify.setEyeCloseMaxTime(value: userManager.getEyeCloseMaxTimeValue() ?? 4) // 0 easy - 10 hard (default 4)
//   //        EnVerify.setOCRMode(value: userManager.getOCRValue() ?? 0) // (TR_FAST_MODE=0) (TR_STRICT_MODE=1)
//   //        EnVerify.setOCRCheckSize(value: userManager.getOCRCheckValue() ?? 50) // 20 hard - 50 easy (default 50)
//           EnVerify.setEyeCloseTolerance(value: 4) // 1 hard - 10 easy (default 4)
//           EnVerify.setMediaServer(mediaServerState:  UserDefaults.standard.bool(forKey: "enableMediaServer"))
//           EnVerify.setHashCheck(hashCheck: true) // default false // SDK'dan AI backendine gönderilen yüz resimlerinin ve dönen benzerlik sonuçlarının HASH'lenerek data integrity kontrolü eklenmesi.
//           //let videoBitrate = UserDefaults.standard.string(forKey: "videoBitrate") ?? "1000"

//           //        EnVerify.setICERelay(iceRelayState: true)
//           //        EnVerify.setNetworkListeningActive(value: true) // default false // - connection tipi değiştiğinde connectionTypeChanged tetiklenir
//           //        EnVerify.setICEHost(iceHostState: Bool)
//           //        EnVerify.setCallWaitTimeout(value: 300) // default servisten geliyor.
//           //        EnVerify.setSSStartButtons(buttonState: false) // Start ve ExitButtonu disable ediyor. Böylece ekranda bu butonları anlık da olsa görmüyorsunuz
//           //        EnVerify.setViewerWidthRatio(local: 0.20, remote: 0.30) // Temsilci görüntüsünün  büyüklüğü set edebilirsiniz.
//           //        EnVerify.setViewerLocationRatio(x: 0.65, y: 0.02) // Temsilci resminin ekranda hangi pozisyonda olacağı set edebilirsiniz.
//           EnVerify.setScreenRecordAudioEnabled(state: true) // default false, ekran kaydı öncesinde bu fonksiyon ile bu özellik set edilmelidir.
//           EnVerify.setVideoBitrate(rate: 1000) // default 1000
//           //        EnVerify.setAgentFullScreen(agentFullScreenState: false)
//       }
// }

// extension UIViewController {
//   func topMostController() -> UIViewController? {
//     guard let window = UIApplication.shared.keyWindow, let rootViewController = window.rootViewController else {
//       return nil
//     }

//     var topController = rootViewController
//     while let newTopController = topController.presentedViewController {
//       topController = newTopController
//     }

//     return topController
//   }

//   func getTopMostClassNames() -> [String] {
//     var views: [String] = []
//     if let vc = topMostController() as? UINavigationController {
//       let topVCs = vc.viewControllers
//       for (_, element) in topVCs.enumerated() {
//         let className = NSStringFromClass((element.classForCoder))
//         let trimClassName = className.components(separatedBy: ".").last!
//         views.append(trimClassName)
//       }
//     }
//     return views
//   }

//   func getTopMostReactClassNames() -> [String] {
//     var views: [String] = []
//     if let vc = topMostController() as? UINavigationController {
//       let topVCs = vc.viewControllers
//       for (_, element) in topVCs.enumerated() {
//         let className = NSStringFromClass((element.classForCoder))
//         let trimClassName = className.components(separatedBy: ".").last!
//         views.append(element.myComputedProperty)
//       }
//     }
//     return views
//   }

//   public func openAlert(title: String,
//                         message: String,
//                         alertStyle:UIAlertController.Style,
//                         actionTitles:[String],
//                         actionStyles:[UIAlertAction.Style],
//                         actions: [((UIAlertAction) -> Void)]){

//     let alertController = UIAlertController(title: title, message: message, preferredStyle: alertStyle)
//     for(index, indexTitle) in actionTitles.enumerated(){
//       let action = UIAlertAction(title: indexTitle, style: actionStyles[index], handler: actions[index])
//       alertController.addAction(action)
//     }
//     self.present(alertController, animated: true)
//   }

//   private static var _myComputedProperty = [String:String]()

//           var myComputedProperty: String {
//               get {
//                   let tmpAddress = String(format: "%p", unsafeBitCast(self, to: Int.self))
//                   return UIViewController._myComputedProperty[tmpAddress] ?? ""
//               }
//               set(newValue) {
//                   let tmpAddress = String(format: "%p", unsafeBitCast(self, to: Int.self))
//                   UIViewController._myComputedProperty[tmpAddress] = newValue
//               }
//           }
// }

// extension UINavigationController {
//   func popViewController(animated: Bool, completion: @escaping () -> Void) {
//     DispatchQueue.main.asyncAfter(deadline: .now() + 0.1) {
//       self.popViewController(animated: animated)

//       if animated, let coordinator = self.transitionCoordinator {
//         coordinator.animate(alongsideTransition: nil) { _ in
//           completion()
//         }
//       } else {
//         completion()
//       }
//     }
//   }
// }
