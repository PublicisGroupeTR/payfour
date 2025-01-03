import AVFoundation
import CoreNFC
import EnQualify
import Foundation
import React
import UIKit

  @objc(ModuleIOS)
  class ModuleIOS: NSObject {
  
    @objc
    func viewDidLoadNative() {
      print("viewDidLoadNative called")
    }

    @objc
    func startVerification() {
      print("startVerification called")
   
    }

    @available(iOS 13.0, *)
    @objc
     func openOcrController() {
         DispatchQueue.main.async {
             // Root ViewController'ı al
             guard let rootVC = UIApplication.shared.connectedScenes
                 .compactMap({ ($0 as? UIWindowScene)?.windows.first?.rootViewController })
                 .first else {
                 print("Root ViewController bulunamadı.")
                 return
             }

             // UINavigationController kontrolü
             if let navigationController = rootVC as? UINavigationController {
                 let storyboard = UIStoryboard(name: "OcrInfo", bundle: nil)
                 if let ocrVC = storyboard.instantiateViewController(withIdentifier: "OcrInfo") as? OcrInfo {
                     navigationController.pushViewController(ocrVC, animated: true)
                 } else {
                     print("OcrController storyboard'da bulunamadı.")
                 }
             } else {
                 print("Root ViewController bir UINavigationController değil.")
             }
         }
     }
  }
//
//
//@objc(ModuleIOS)
//class ModuleIOS: BaseViewController, EnVerifyDelegate {
//
// var agentRequestType: AgentRequestType = .none
// var isNFCRetry: Bool = false
//
// func idSelfVerifyReady() {
//   print("idSelfVerifyReady")
// }
//
// func callWait() {
//   print("callWait")
// }
//
// func callStart() {
//   print("callStart")
// }
//
// func idTypeCheck() {
//   print("idTypeCheck")
// }
//
// func idTypeCheckCompleted() {
//   print("idTypeCheckCompleted")
// }
//
// func idFakeCheck() {
//   print("idFakeCheck")
// }
//
// func idFakeCheckCompleted() {
//   print("idFakeCheckCompleted")
// }
//
// func idFront() {
//   print("idFront")
// }
//
// func idFrontCompleted() {
//   print("idFrontCompleted")
// }
//
// func idBack() {
//   print("idBack")
// }
//
// func idBackCompleted() {
//   print("idBackCompleted")
// }
//
// func idDocCompleted() {
//   print("idDocCompleted")
// }
//
// func nfcVerify() {
//   print("nfcVerify")
// }
//
// func nfcVerifyCompleted() {
//   print("nfcVerifyCompleted")
// }
//
// func faceDetect() {
//   print("faceDetect")
// }
//
// func faceDetectCompleted() {
//   print("faceDetectCompleted")
// }
//
// func smileDetect() {
//   print("smileDetect")
// }
//
// func smileDetectCompleted() {
//   print("smileDetectCompleted")
// }
//
// func eyeClose() {
//   print("eyeClose")
// }
//
// func eyeCloseDetected() {
//   print("eyeCloseDetected")
// }
//
// func faceUp() {
//   print("faceUp")
// }
//
// func faceUpDetected() {
//   print("faceUpDetected")
// }
//
// func faceLeft() {
//   print("faceLeft")
// }
//
// func faceLeftDetected() {
//   print("faceLeftDetected")
// }
//
// func faceRight() {
//   print("faceRight")
// }
//
// func faceRightDetected() {
//   print("faceRightDetected")
// }
//
// func eyeCloseInterval() {
//   print("eyeCloseInterval")
// }
//
// func eyeCloseIntervalDetected() {
//   print("eyeCloseIntervalDetected")
// }
//
// func eyeOpenInterval() {
//   print("eyeOpenInterval")
// }
//
// func eyeOpenIntervalDetected() {
//   print("eyeOpenIntervalDetected")
// }
//
// func hangupLocal() {
//   print("hangupLocal")
// }
//
// func hangupRemote() {
//   print("hangupRemote")
// }
//
// func failure() {
//   print("failure")
// }
//
// func tokenError() {
//   print("tokenError")
// }
//
// func noConnectionError() {
//   print("noConnectionError")
// }
//
// func idFakeDetected() {
//   print("idFakeDetected")
// }
//
// func idDocStoreCompleted() {
//   print("idDocStoreCompleted")
// }
//
// func nfcStoreCompleted() {
//   print("nfcStoreCompleted")
// }
//
// func faceStoreCompleted() {
//   print("faceStoreCompleted")
// }
//
// func idTypeBackCheck() {
//   print("idTypeBackCheck")
// }
//
// func nfcCompleted() {
//   print("nfcCompleted")
// }
//
// func faceCompleted() {
//   print("faceCompleted")
// }
//
// func idVerifyExited() {
//   print("idVerifyExited")
// }
//
// func timeoutFailure() {
//   print("timeoutFailure")
// }
//
// func idCheckFailure() {
//   print("idCheckFailure")
// }
//
// func tokenFailure() {
//   print("tokenFailure")
// }
//
// func connectionFailure() {
//   print("connectionFailure")
// }
//
// func nfcFailure() {
//   print("nfcFailure")
// }
//
// func nfcBACDATAFailure() {
//   print("nfcBACDATAFailure")
// }
//
// func faceLivenessCheckFailure() {
//   print("faceLivenessCheckFailure")
// }
//
// func idRetry() {
//   print("idRetry")
// }
//
// func nfcRetry() {
//   print("nfcRetry")
// }
//
// func faceRetry() {
//   print("faceRetry")
// }
//
// func hostConnected() {
//   print("hostConnected")
// }
//
// func resolutionChanged() {
//   print("resolutionChanged")
// }
//
// func callConnectionFailure() {
//   print("callConnectionFailure")
// }
//
// func integrationAddCompleted() {
//   print("integrationAddCompleted")
// }
//
// func integrationAddFailure() {
//   print("integrationAddFailure")
// }
//
// func resultGetCompleted(_ value: EnQualify.EnverifyVerifyCallResult?) {
//   print("resultGetCompleted")
// }
//
// func resultGetFailure() {
//   print("resultGetFailure")
// }
//
// func sessionStartFailure() {
//   print("sessionStartFailure")
// }
//
// func sessionStartCompleted(sessionUid: String) {
//   print("sessionStartCompleted")
// }
//
// func getAuthTokenFailure() {
//   print("getAuthTokenFailure")
// }
//
// func getAuthTokenCompleted() {
//   print("getAuthTokenCompleted")
// }
//
// func getSettingsCompleted() {
//   print("getSettingsCompleted")
// }
//
// func getSettingsFailure() {
//   print("getSettingsFailure")
// }
//
// func roomIDSendFailure() {
//   print("roomIDSendFailure")
// }
//
// func roomIDSendCompleted() {
//   print("roomIDSendCompleted")
// }
//
// func idDocStoreFailure() {
//   print("idDocStoreFailure")
// }
//
// func addChipStoreFailure() {
//   print("addChipStoreFailure")
// }
//
// func addChipStoreCompleted() {
//   print("addChipStoreCompleted")
// }
//
// func addFaceCompleted() {
//   print("addFaceCompleted")
// }
//
// func addFaceFailure() {
//   print("addFaceFailure")
// }
//
// //  func requestVideoAudioPermissionsResult(_ granted: Bool) {
// //    print("requestVideoAudioPermissionsResult")
// //  }
//
// func forceHangup() {
//   print("forceHangup")
// }
//
// func idTextRecognitionTimeout() {
//   print("idTextRecognitionTimeout")
// }
//
// func callSessionCloseResult(status: EnQualify.EnVerifyCallSessionStatusTypeEnum) {
//   print("callSessionCloseResult")
// }
//
// func dismissBeforeAnswered() {
//   print("dismissBeforeAnswered")
// }
//
// func dismissCallWait() {
//   print("dismissCallWait")
// }
//
// func screenRecorderOnStart() {
//   print("screenRecorderOnStart")
// }
//
// func screenRecorderOnComplete() {
//   print("screenRecorderOnComplete")
// }
//
// func screenRecorderOnError(eventData: NSError?) {
//   print("screenRecorderOnError")
// }
//
// func screenRecorderOnAppend() {
//   print("screenRecorderOnAppend")
// }
//
// func cardFrontDetectStarted() {
//   print("cardFrontDetectStarted")
// }
//
// func cardFrontDetected() {
//   print("cardFrontDetected")
// }
//
// func cardBackDetectStarted() {
//   print("cardBackDetectStarted")
// }
//
// func cardBackDetected() {
//   print("cardBackDetected")
// }
//
// func cardHoloDetectStarted() {
//   print("cardHoloDetectStarted")
// }
//
// func cardHoloDetected() {
//   print("cardHoloDetected")
// }
//
// func videoUploadSuccess() {
//   print("videoUploadSuccess")
// }
//
// func videoUploadFailure() {
//   print("videoUploadFailure")
// }
//
// func maximumCallTimeExpired() {
//   print("maximumCallTimeExpired")
// }
//
// func currentThermalState(state: String) {
//   print("currentThermalState")
// }
//
// func documentSignSuccess() {
//   print("documentSignSuccess")
// }
//
// func documentSingFailure() {
//   print("documentSingFailure")
// }
//
// func appointmentTolerance(time: Int) {
//   print("appointmentTolerance")
// }
//
// func agentMessageRequest(message: String) {
//   print("agentMessageRequest")
// }
//
// func addGenericIdDocCompleted(with data: [String: String]) {
//   print("addGenericIdDocCompleted")
// }
//
// func addGenericIdDocFailure() {
//   print("addGenericIdDocFailure")
// }
//
// func capturePhotoCompleted() {
//   print("capturePhotoCompleted")
// }
//
// func capturePhotoFailure() {
//   print("capturePhotoFailure")
// }
//
// func captureVideoCompleted() {
//   print("captureVideoCompleted")
// }
//
// func captureVideoFailure() {
//   print("captureVideoFailure")
// }
//
// func photoLibraryAuthorization(status: String) {
//   print("photoLibraryAuthorization")
// }
//
// func addGenericPassportCompleted() {
//   print("addGenericPassportCompleted")
// }
//
// func addGenericPassportFailure() {
//   print("addGenericPassportFailure")
// }
//
// // Örnek zorunlu metodlar
// func luminosityAnalyzed(result: String) {
//   print("Luminosity analyzed: \(result)")
// }
//
// func agentRequest(eventData: String) {
//   print("Agent request: \(eventData)")
// }
//
// func idVerifyReady() {
//   print("ID Verify Ready")
// }
//
// // Eksik metodları tamamlayın
// func someMissingMethod() {
//   // Gerekli işlemler
// }
//
// override func viewDidLoad() {
//   super.viewDidLoad()
//   // Additional setup
// }
// 
// @objc func viewDidLoadNative() {
//   getAppSettings(){
//     DispatchQueue.main.async {
//       
//       print("viewDidLoadNative")
//
//       self.setCustomerInformation()
//       print("viewDidLoadNative setCustomerInformation")
//       let holoDetectionType = "HOLO_ANY_DETECT"
//       EnVerifyCustomerCard.shared.setHoloDetectionType(holoDetectionType: holoDetectionType)
//       EnVerifyCustomerCard.shared.setDetectionThreshold(threshold: 0.9)
//       if EnVerify.checkPermissions() {
//         let referenceUUID = UUID().uuidString
//         
//         print("referenceUUID", referenceUUID)
//         if (!EnVerify.idvSettings(domainName: UserDefaults.standard.string(forKey: "domainName"),
//                                   certificateNames: ["dgfinansman"],
//                                   aiUsername: UserDefaults.standard.string(forKey: "aiUserName"),
//                                   aiPassword: UserDefaults.standard.string(forKey: "aiPassword"),
//                                   signalingServer: UserDefaults.standard.string(forKey: "signalServer"),
//                                   stunServer: UserDefaults.standard.string(forKey: "stunServer"),
//                                   turnServer: UserDefaults.standard.string(forKey: "turnServer"),
//                                   turnUsername: UserDefaults.standard.string(forKey: "turnServerUser"),
//                                   turnPassword: UserDefaults.standard.string(forKey: "turnServerKey"),
//                                   backOfficeBasePath: UserDefaults.standard.string(forKey: "apiServer"),
//                                   userNameForToken: UserDefaults.standard.string(forKey: "apiServerUser"),
//                                   referenceID: referenceUUID
//                                  )) {
//           print("Check settings")
//           return
//         }
//
//         self.setSettings()
//         print("setSettings")
//         
//         print("aiUserName", UserDefaults.standard.string(forKey: "aiUserName"))
//         // self._startVerification()
//        DispatchQueue.main.async {
//
//          print(self)
//          guard EnVerify.idVerifyStart(self) else {return}
//          EnVerify.requestVideoAudioPermissions()
//        }
//       } else {
//         self.presentCameraSettings(vc: self)
//       }
//     }
//   }
// }
//
// func presentCameraSettings(vc: UIViewController) {
//   let alertController = UIAlertController(
//     title: "uyarı",
//     message:
//       "Kamera veya Mikrofon Kapalı \n\n Lütfen Ayarlar Ekranına Girin \n Kamera ve Mikrofonu Açıp, Uygulamayı Tekrar Çalıştırın.",
//     preferredStyle: .alert)
//   alertController.addAction(
//     UIAlertAction(title: "ayarlar", style: .cancel) { _ in
//       if let url = URL(string: UIApplication.openSettingsURLString) {
//         UIApplication.shared.open(
//           url, options: [:],
//           completionHandler: { _ in
//
//           })
//       }
//     })
//   vc.present(alertController, animated: true)
// }
//
// func requestVideoAudioPermissionsResult(_ granted: Bool) {
//   if !EnVerify.checkPermissions() {
//     DispatchQueue.main.async {
//       self.presentCameraSettings(vc: self)
//     }
//   }
// }
//
// @objc func startVerification() {
//   DispatchQueue.main.async {
//     self._startVerification()
//   }
// }
//
// func _startVerification() {
//   agentRequestType = .busy
//   print("_startVerification")
//   DispatchQueue.main.async {
//     print("guard")
//     guard EnVerify.selfServiceStart(self) else { return }
//   }
// }
//
// private func setCustomerInformation() {
//   // data RN tarafından beslenicek
//   EnVerify.callType = "NewCustomer"
//   EnVSession.setUserName("Nadir")
//   EnVSession.setUserSurname("Kılınç")
//   EnVerify.identityNo = "49867297574"
//   EnVerify.identityType = "T.C Kimlik Kartı"
//   EnVerify.sessionAddPhone = "5555555555"
//   EnVerify.sessionAddEmail = "enqura@enqura.com"
// }
//
//   @objc private func setSettings() {
////    setEnverifyButtons()
//   guard let path = Bundle.main.path(forResource: "test", ofType: "mov") else { return }
//   EnVerify.agentDummyVideoPlayer = AVPlayer(url: URL(fileURLWithPath: path)) // add .mov video player
//   EnVerify.agentDummyImage = UIImage(named: "imgLaunch") // add img player
// }
// 
// private func getAppSettings(completionHandler: @escaping () -> Void) {
//   EnVerify.setMSPrivateKey(value: "1234567890123456789012345678901234567890")
//   EnVerify.setSSLPinning(required: true)
//   EnVerify.setShowLogs(value: true)
//   AppSettings().getConfigurations(){ bool in
//     EnVerify.getAuthTokenBeforeSDK(UserDefaults.standard.string(forKey: "apiServerUser"), UserDefaults.standard.string(forKey: "apiServer") ?? ""){(_) -> () in
//       completionHandler()
//     }
//   }}
//}
//
//// @objc(EnQualifyModuleIOS)
//// class EnQualifyModuleIOS: BaseViewController, EnVerifyDelegate {
//
////   // Kamera ve mic izni iste
//
////   var agentRequestType: AgentRequestType = .none
////   var isNFCRetry: Bool = false
//
////   func luminosityAnalyzed(result: String) {
////     print("Ortam Işığı \(result)")
////     if result.contains("DARK") {
////       luminosityAnalyzedPopup()
////     }
////   }
//
////   func agentRequest(eventData: String) {
////     if !EnVSession.isFrontCameraOpen() {
////       frontCameraErrorPopup()
////       return
////     }
//
////     switch (eventData) {
////     case "livenessControlRetried".lowercased():
////       agentRequestType = .liveness
////       faceRetry()
////       break
////     case "nfcRetried".lowercased():
////       agentRequestType = .nfc
////       nfcRetry()
////       break
////     case "ocrRetried".lowercased():
////       agentRequestType = .ocr
////       idRetry()
////       break
////     case "faceRecognitionRetried".lowercased():
////       agentRequestType = .faceRecognition
////       faceRetry()
////       break
////     case "backToVideoCall".lowercased():
////       agentRequestType = .agent
////       EnVerify.startVideoChat()
////       break
////     default:
////       agentRequestType = .agent
////       debugPrint( "unknown agent request eventData: " + eventData)
////       break
////     }
////   }
//
////   public func idVerifyReady() {
////     debugPrint("Id verify started : " + EnVSession.getId())
////   }
//
////   func idSelfVerifyReady() {
////     print("idSelfVerifyReady")
////     EnVerify.idTypeCheckFrontStart()
////   }
//
////   func callWait() {
////     //TODO: Agent beklerken gözükmesi gereken ekran çağırılacak.
////     DispatchQueue.main.async {
////       if let appDelegate: AppDelegate = UIApplication.shared.delegate as? AppDelegate{
//
////         appDelegate.navigateToSelectedView("WaitingAgent", nil, nil)
////       }
////     }
////   }
//
////   func callStart() {
////     popFrontViewController("MainVCView") {
////       EnVerify.startVideoChat()
////     }
////     EnVerify.startTimer()
////   }
//
////   func idTypeCheck() {
////     debugPrint("id type check started")
////     if agentRequestType == .ocr {
////       EnVerify.setSpeaker(soundOn: false)
////     } else {
////       EnVerify.setSpeaker(soundOn: true)
////       EnVerify.startLuminosityAnalyzer()
////     }
////   }
//
////   func idTypeCheckCompleted() {
////     debugPrint("id type check completed")
////     EnVerify.idFakeCheckStart()
////   }
//
////   func idFakeCheck() {
////     debugPrint("fake check")
////   }
//
////   func idFakeCheckCompleted() {
////     debugPrint("fake check completed")
////     EnVerify.idFrontStart()
////   }
//
////   func idFront() {
////     debugPrint("idFront start")
////   }
//
////   func idFrontCompleted() {
////     print("idFrontCompleted")
////     EnVerify.idBackStart()
////   }
//
////   func idBack() {
////     debugPrint("back start")
////   }
//
////   func idBackCompleted() {
////     EnVerify.idDocStore()
////   }
//
////   func idDocCompleted() {
////     //MARK: Kimlik bilgilerini ekranda gösterdikten sonra onayla ya basınca burası çalışır.
////     DispatchQueue.main.asyncAfter(deadline: .now() + 0.3) {
////       if self.agentRequestType == .ocr {
////         self.agentRequestType = .agent
////         EnVerify.startVideoChat()
////       } else {
////         if #available(iOS 13.0, *) {
////           if NFCTagReaderSession.readingAvailable {
////             let nfcStart = EnVerify.nfcStart()
////             print("nfcStart :\(nfcStart)")
////             if nfcStart != NFCStartResponseType.success.rawValue {
////               EnVerify.faceDetectStart()
////             }
////           }
////         } else {
////           EnVerify.faceDetectStart()
////         }
////       }
////     }
////   }
//
////   func nfcVerify() {
////     debugPrint("nfcVerify start")
////     if agentRequestType == .nfc {
////         EnVerify.setSpeaker(soundOn: false)
////     } else{
////         EnVerify.setSpeaker(soundOn: true)
////     }
//
////     if isNFCRetry {
////       DispatchQueue.main.asyncAfter(deadline: .now() + 0.3) {
////         if let appDelegate: AppDelegate = UIApplication.shared.delegate as? AppDelegate{
//
////           print("NFC scan açıldı")
////           appDelegate.navigateToSelectedView("NFCScan", nil, nil)
////         }
////       }
////     } else {
////       DispatchQueue.main.asyncAfter(deadline: .now() + 0.3) {
////         if let appDelegate: AppDelegate = UIApplication.shared.delegate as? AppDelegate{
////           print("NFC scan açıldı")
//
////           appDelegate.navigateToSelectedView("NFCScan", nil, nil)
////         }
////       }
////     }
////   }
//
////   func nfcVerifyCompleted() {
////     debugPrint("Nfc completed : " + EnVerifyCustomerChip.shared.getIdentityType())
////     EnVerify.nfcStore()
////   }
//
////   func faceDetect() {
////     if agentRequestType == .faceRecognition || agentRequestType == .liveness {
////       EnVerify.setSpeaker(soundOn: false)
////     } else {
////       EnVerify.setSpeaker(soundOn: true)
////     }
////   }
//
////   func faceDetectCompleted() {
////     if agentRequestType == .faceRecognition {
////       agentRequestType = .agent
////       EnVerify.startVideoChat()
////     } else {
////       EnVerify.faceStore()
////       EnVerify.smileDetectStart()
////     }
////   }
//
////   func smileDetect() {
////     debugPrint("smileDetect start")
////   }
//
////   func smileDetectCompleted() {
////     debugPrint("smileDetectCompleted completed")
////     //MARK: "0" Zor değer.
//// //    userManager.getLivenessValue() == 0 ? EnVerify.eyeCloseIntervalStart() : EnVerify.eyeCloseStart()
////   }
//
////   func eyeClose() {
////     debugPrint("eyeClose start")
////   }
//
////   func eyeCloseDetected() {
////     debugPrint("Eye close completed" + String(EnVerifyCustomerFace.shared.getChipConfidence()))
////     EnVerify.faceCompleteStart()
////   }
//
////   func faceUp() {
//
////   }
//
////   func faceUpDetected() {
////     EnVerify.faceCompleteStart()
////   }
//
////   func faceLeft() {
//
////   }
//
////   func faceLeftDetected() {
////     EnVerify.faceCompleteStart()
////   }
//
////   func faceRight() {
//
////   }
//
////   func faceRightDetected() {
////     EnVerify.faceCompleteStart()
////   }
//
////   func eyeCloseInterval() {
//
////   }
//
////   func eyeCloseIntervalDetected() {
////     EnVerify.eyeOpenIntervalStart()
////   }
//
////   func eyeOpenInterval() {
//
////   }
//
////   func eyeOpenIntervalDetected() {
////     randomLiveness()
////   }
//
////   //MARK: Random Liveness
////   private func randomLiveness() {
////     let randDetection = Int.random(in: 1..<4)
////     switch (randDetection) {
////     case 1:
////       EnVerify.faceUpStart()
////       break
////     case 2:
////       EnVerify.faceLeftStart()
////       break
////     case 3:
////       EnVerify.faceRightStart()
////       break
////     default:
////       EnVerify.faceRightStart()
////       break
////     }
////   }
//
////   func hangupLocal() {
////     print("Hangup Local Start")
////     DispatchQueue.main.asyncAfter(deadline: .now() + 0.3) {
////       EnVerify.onHangupCall()
////       EnVerify.onExitCall()
////       self.popMainViewController("DD4") {
////         print("dd4 ekrana basıldı")
////       }
////     }
////   }
//
////   func hangupRemote() {
////     print("Hangup Remote Start")
////     DispatchQueue.main.asyncAfter(deadline: .now() + 0.3) {
////       EnVerify.onExitCall()
////       self.popMainViewController("DD4") {
////         print("dd4 ekrana basıldı")
////       }
////     }
////   }
//
////   func failure() {
////     print("Failure start")
////     print("Failure agentRequestType ", agentRequestType)
////   }
//
////   func tokenError() {
//
////   }
//
////   func noConnectionError() {
//
////   }
//
////   func idFakeDetected() {
////     debugPrint("fake detected")
////   }
//
////   func idDocStoreCompleted() {
////     DispatchQueue.main.asyncAfter(deadline: .now() + 0.3) {
////       if let appDelegate: AppDelegate = UIApplication.shared.delegate as? AppDelegate{
//
////         appDelegate.navigateToSelectedView("OCRResult", nil, nil)
////       }
////     }
////   }
//
////   func nfcStoreCompleted() {
////     DispatchQueue.main.asyncAfter(deadline: .now() +  0.3) {
////       if self.isNFCRetry {
////         self.isNFCRetry = false
////         self.navController?.popViewController(animated: true)
////       }
////       //TODO: NFC RESULT EKRANI GÖSTERILECEK -> ONAYLA BUTONUNDA ONCONFIRMNFC TEKRARLA BUTONUNDA ONRETRYNFC CAGIRILACAK.
////       if let appDelegate: AppDelegate = UIApplication.shared.delegate as? AppDelegate{
//
////         appDelegate.navigateToSelectedView("NFCResult", nil, nil)
////       }
////     }
////   }
//
////   func faceStoreCompleted() {
////     //MARK: Tekrarlamadan gelindiğini anlamak için.
//// //    debugPrint("agentRequestType : \(agentRequestType)")
//// //    if userManager.getFaceUploadDataState() {
//// //      userManager.setFaceUploadDataState(value: false)
//// //    } else {
//// //      DispatchQueue.main.asyncAfter(deadline: .now() + 0.3) {
//// //        //TODO: Face Result ekranı çağırılacak, devam butonunda onConfirmFaceWithOutPop çağırılacak tekrarlamak için onRetryFace çağırılacak.
//// //        if let appDelegate: AppDelegate = UIApplication.shared.delegate as? AppDelegate{
//// //
//// //          appDelegate.navigateToSelectedView("FaceResult", nil, nil)
//// //        }
//// //      }
//// //    }
////   }
//
////   func idTypeBackCheck() {
////     debugPrint("id type back check started")
////   }
//
////   func nfcCompleted() {
////     debugPrint("agentRequestType : \(agentRequestType)")
////     DispatchQueue.main.asyncAfter(deadline: .now() + 0.3) {
////       if self.agentRequestType == .nfc {
////         self.navController?.popViewController(animated: true)
////         EnVerify.startVideoChat()
////         self.uploadFaceData()
////       } else {
////         self.popFrontViewController("MainSSView") {
////           EnVerify.faceDetectStart()
////         }
////       }
////     }
////   }
//
////   private func uploadFaceData() {
////     if agentRequestType == .nfc {
////       agentRequestType = .agent
//// //      UserManager.shared.setFaceUploadDataState(value: true)
////       EnVerify.uploadFaceData()
////     }
////   }
//
////   func faceCompleted() {
////     //MARK: Tekrarlamadan gelindiğini anlamak için.
////     debugPrint("agentRequestType : \(agentRequestType)")
////     DispatchQueue.main.asyncAfter(deadline: .now() + 0.3) {
////       self.navController?.popViewController(animated: true)
//
////       if self.agentRequestType == .liveness {
////         EnVerify.startVideoChat()
////       } else{
////         if let appDelegate: AppDelegate = UIApplication.shared.delegate as? AppDelegate{
//
////           appDelegate.navigateToSelectedView("RoutingAgent", nil, nil)
////         }
////         self.agentRequestType = .agent
////         EnVerify.stopSSStartVC(self)
////         EnVerify.onStartCall()
////       }
////       self.agentRequestType = .agent
////     }
////   }
//
////   func idVerifyExited() {
////     print("Enverify Exit")
////   }
//
////   func timeoutFailure() {
////     if agentRequestType == .ocr || EnVerify.isCallAnswered {
////       //TODO: tekrar mı edecek, iptal mi edecek ekran gerekli --> FAIL EKRANI
////     } else {
////       EnVerify.handleFail()
////     }
////   }
//
////   func idCheckFailure() {
////     if agentRequestType == .ocr || EnVerify.isCallAnswered {
////       //TODO: tekrar mı edecek, iptal mi edecek ekran gerekli --> FAIL EKRANI
////     } else {
////       EnVerify.handleFail()
////     }
////   }
//
////   func tokenFailure() {
////     return
////   }
//
////   func connectionFailure() {
////     debugPrint("connectionFailure")
////   }
//
////   func nfcFailure() {
////     print("agentRequestType \(agentRequestType)")
////     DispatchQueue.main.asyncAfter(deadline: .now() + 0.3) {
////       self.popFrontViewController("MainSSView") {
////         if let appDelegate: AppDelegate = UIApplication.shared.delegate as? AppDelegate{
//
////           appDelegate.navigateToSelectedView("NFCFail", nil, nil)
////           EnVerify.handleFail() // for stopping loop.
////         }
////       }
////     }
////   }
//
////   func nfcBACDATAFailure() {
////     agentRequestType = .agent
////     print(#function)
////   }
//
////   func faceLivenessCheckFailure() {
////     if EnVerifyCustomerFace.shared.isHashSuccess() {
////       print("isHashSuccess", EnVerifyCustomerFace.shared.isHashSuccess())
////     }
//
////     DispatchQueue.main.asyncAfter(deadline: .now() + 0.3) {
////       if let appDelegate: AppDelegate = UIApplication.shared.delegate as? AppDelegate{
//
////         appDelegate.navigateToSelectedView("FaceFail", nil, nil)
////         EnVerify.handleFail() // for stopping loop.
////       }
////     }
////   }
//
////   func idRetry() {
////     print(#function)
////     EnVerify.idTypeCheckFrontStart()
////   }
//
////   func nfcRetry() {
////     if #available(iOS 13.0, *) {
////       var nfcStart = EnVerify.nfcStart()
////       print("nfcStart: \(nfcStart)")
//
////       if nfcStart != NFCStartResponseType.success.rawValue {
////         return
////       }
////     } else {
////       return
////     }
////   }
//
////   func faceRetry() {
////     EnVerify.faceDetectStart()
////   }
//
////   func hostConnected() {
//
////   }
//
////   func resolutionChanged() {
////     let videoSize = EnVSession.getVideoSize()
////     print("Resolution changed: ", videoSize)
////   }
//
////   func callConnectionFailure() {
////     EnVerify.noConnectionAction()
////     DispatchQueue.main.asyncAfter(deadline: .now() + 4) {
////       EnVerify.handleCallFail()
////     }
////   }
//
////   func integrationAddCompleted() {
////     print("integrationAddCompleted")
////   }
//
////   func integrationAddFailure() {
////     print("integrationAddFailure")
////   }
//
////   func resultGetCompleted(_ value: EnQualify.EnverifyVerifyCallResult?) {
////     if let model = value, let message = model.result {
////         print("resultGetCompleted : \(message)")
////     }
////   }
//
////   func resultGetFailure() {
////     EnVerify.onExitCall()
////   }
//
////   func sessionStartFailure() {
////     print("SESSIONFAIL")
////   }
//
////   func sessionStartCompleted(sessionUid: String) {
////     sendRequestIntegration()
////   }
//
////   func getAuthTokenFailure() {
//
////   }
//
////   func getAuthTokenCompleted() {
//
////   }
//
////   func roomIDSendFailure() {
//
////   }
//
////   func roomIDSendCompleted() {
//
////   }
//
////   func idDocStoreFailure() {
////     if self.agentRequestType == .ocr || EnVerify.isCallAnswered {
////       DispatchQueue.main.asyncAfter(deadline: .now() + 0.3) {
////         if let appDelegate: AppDelegate = UIApplication.shared.delegate as? AppDelegate{
//
////           appDelegate.navigateToSelectedView("OCRFail", nil, nil)
////         }
////       }
////     } else {
////         EnVerify.handleFail()
////     }
////   }
//
////   func addChipStoreFailure() {
////     EnVerify.handleFail()
////   }
//
////   func addChipStoreCompleted() {
//
////   }
//
////   func addFaceCompleted() {
//
////   }
//
////   func addFaceFailure() {
////     EnVerify.handleFail()
////   }
//
//// func requestVideoAudioPermissionsResult(_ granted: Bool) {
////   if !EnVerify.checkPermissions() {
////     DispatchQueue.main.async {
////       self.presentCameraSettings(vc: self)
////     }
////   }
//// }
//
////   func forceHangup() {
////     print("Force Hangup Start")
////     EnVerify.onHangupCall()
////   }
//
////   func idTextRecognitionTimeout() {
////     //MARK: kaldığı yerden devam etmesi için kapatıldı.
////     if self.agentRequestType == .ocr || EnVerify.isCallAnswered {
////         //TODO: OCR FAIL EKRANI GELECEK
////       DispatchQueue.main.asyncAfter(deadline: .now() + 0.3) {
////         if let appDelegate: AppDelegate = UIApplication.shared.delegate as? AppDelegate{
//
////           appDelegate.navigateToSelectedView("OCRFail", nil, nil)
////           EnVerify.handleFail() // for stopping loop.
////         }
////       }
////     } else {
////       DispatchQueue.main.asyncAfter(deadline: .now() + 0.3) {
////         if let appDelegate: AppDelegate = UIApplication.shared.delegate as? AppDelegate{
//
////           appDelegate.navigateToSelectedView("OCRFail", nil, nil)
////           EnVerify.handleFail() // for stopping loop.
////         }
////       }
////     }
////   }
//
////   func callSessionCloseResult(status: EnQualify.EnVerifyCallSessionStatusTypeEnum) {
//
////   }
//
////   func dismissBeforeAnswered() {
//
////   }
//
////   func dismissCallWait() {
//
////   }
//
////   func screenRecorderOnStart() {
////     print("screenRecorderOnStart")
////   }
//
////   func screenRecorderOnComplete() {
////     debugPrint("File path recording : filepath")
////   }
//
////   func screenRecorderOnError(eventData: String) {
////     debugPrint("screenRecorderOnError eventData: ", eventData)
////   }
//
////   func screenRecorderOnAppend() {
//
////   }
//
////   func cardFrontDetectStarted() {
////     EnVerify.startCardHoloDetect()
////   }
//
////   func cardFrontDetected() {
//
////   }
//
////   func cardBackDetectStarted() {
////     debugPrint("Card Back Detect Started")
////   }
//
////   func cardBackDetected() {
////     debugPrint("Card Back Detected")
////   }
//
////   func cardHoloDetectStarted() {
////     debugPrint("Card Holo Detect Started")
////   }
//
////   func cardHoloDetected() {
////     debugPrint("Card Holo Detected")
////   }
//
////   func videoUploadSuccess() {
////     debugPrint("video upload success")
////   }
//
////   func videoUploadFailure() {
////     debugPrint("video upload failure")
////   }
//
////   func maximumCallTimeExpired() {
////     hangupLocal()
////     maximumCallTimePopup()
////   }
//
////   override public func viewDidLoad() {
////     super.viewDidLoad()
////       print("View did load çalıştı")
//
////     view.backgroundColor = .white
//
////   }
//
//// @objc func viewDidLoadNative() {
////   getAppSettings {
////     DispatchQueue.main.async {
//
////       // self.setCustomerInformation()
////       let holoDetectionType = "HOLO_ANY_DETECT"
////       EnVerifyCustomerCard.shared.setHoloDetectionType(holoDetectionType: holoDetectionType)
////       EnVerifyCustomerCard.shared.setDetectionThreshold(threshold: 0.9)
////       if EnVerify.checkPermissions() {
////         let referenceUUID = UUID().uuidString
////         if !EnVerify.idvSettings(
////           domainName: UserDefaults.standard.string(forKey: "domainName"),
////           certificateNames: ["enqura", "enqura1"],
////           aiUsername: UserDefaults.standard.string(forKey: "aiUserName"),
////           aiPassword: UserDefaults.standard.string(forKey: "aiPassword"),
////           signalingServer: UserDefaults.standard.string(forKey: "signalServer"),
////           stunServer: UserDefaults.standard.string(forKey: "stunServer"),
////           turnServer: UserDefaults.standard.string(forKey: "turnServer"),
////           turnUsername: UserDefaults.standard.string(forKey: "turnServerUser"),
////           turnPassword: UserDefaults.standard.string(forKey: "turnServerKey"),
////           backOfficeBasePath: UserDefaults.standard.string(forKey: "apiServer"),
////           userNameForToken: UserDefaults.standard.string(forKey: "apiServerUser"),
////           referenceID: referenceUUID
////         ) {
////           print("Check settings")
////           return
////         }
//
////         self.setSettings()
////         DispatchQueue.main.async {
////           guard EnVerify.idVerifyStart(self) else { return }
////           EnVerify.requestVideoAudioPermissions()
////         }
////       } else {
////         self.presentCameraSettings(vc: self)
////       }
////     }
////   }
//// }
//
//// func presentCameraSettings(vc: UIViewController) {
////   let alertController = UIAlertController(
////     title: "uyarı",
////     message:
////       "Kamera veya Mikrofon Kapalı \n\n Lütfen Ayarlar Ekranına Girin \n Kamera ve Mikrofonu Açıp, Uygulamayı Tekrar Çalıştırın.",
////     preferredStyle: .alert)
////   alertController.addAction(
////     UIAlertAction(title: "ayarlar", style: .cancel) { _ in
////       if let url = URL(string: UIApplication.openSettingsURLString) {
////         UIApplication.shared.open(
////           url, options: [:],
////           completionHandler: { _ in
//
////           })
////       }
////     })
////   vc.present(alertController, animated: true)
//// }
//
////   private func setEnverifyButtons() {
//// //    EnVerify.iconStartButton(iconStartButton)
//// //    EnVerify.iconExitButton(iconExitButton)
//// //    EnVerify.iconCallButton(iconCallButton)
//// //    EnVerify.iconHangupButton(iconHangupButton)
//// //    EnVerify.iconRetryButton(iconRetryButton)
//// //    EnVerify.iconExitRetryButton(iconExitRetryButton)
//// //    EnVerify.iconHangupChatButton(iconHangupChatButton)
//// //    EnVerify.iconHangupRetryButton(iconHangupRetryButton)
//// //    EnVerify.iconRotateButton(iconRotateButton)
//// //    EnVerify.iconChatRotateButton(iconChatRotateButton)
////   }
//
////   @objc private func setSettings() {
////     setEnverifyButtons()
////     guard let path = Bundle.main.path(forResource: "test", ofType: "mov") else { return }
////     EnVerify.agentDummyVideoPlayer = AVPlayer(url: URL(fileURLWithPath: path)) // add .mov video player
////     EnVerify.agentDummyImage = UIImage(named: "imgLaunch") // add img player
////   }
//
////   @objc public func startNFCService() {
//
////     print("startNFCService")
////   }
//
//// private func getAppSettings(completionHandler: @escaping () -> Void) {
////   EnVerify.setMSPrivateKey(value: "1234567890123456789012345678901234567890")
////   EnVerify.setSSLPinning(required: true)
////   EnVerify.setShowLogs(value: true)
////   AppSettings().getConfigurations()
//// }
//
//// @objc func startVerification() {
////   DispatchQueue.main.async {
////     self._startVerification()
////   }
//// }
//
//// func _startVerification() {
////   agentRequestType = .busy
//
////   DispatchQueue.main.async {
////     guard EnVerify.selfServiceStart(self) else { return }
////   }
//// }
//
//// private func setCustomerInformation() {
////   // data RN tarafından beslenicek
////   EnVerify.callType = "NewCustomer"
////   EnVSession.setUserName("Nadir")
////   EnVSession.setUserSurname("Kılınç")
////   EnVerify.identityNo = "49867297574"
////   EnVerify.identityType = "T.C Kimlik Kartı"
////   EnVerify.sessionAddPhone = "5555555555"
////   EnVerify.sessionAddEmail = "enqura@enqura.com"
//// }
//
////   private func sendRequestIntegration() {
////     let name = "Nadir"
////     let surname = "Kılınç"
//
////     //MARK: - Coming From KPSInfo viewcontroller
////     let serialNumber = "A18N96415"
////     let expiryDate = "26.03.2029"
////     let birthday = "22.10.1996"
////     let gender = "Erkek"
//
////     let nationalityCode = "TR"
////     let reqModel = EnVerifyCallIDRegistrationModel(fatherName: "Enqura",
////                                                    motherName: "Enqrua",
////                                                    birthPlace: "Istanbul",
////                                                    registrationPlaceFamilyRow: "1",
////                                                    registrationPlacePersonalRow: "1",
////                                                    identificationCardSerial: serialNumber,
////                                                    identificationCardRecord: "1",
////                                                    identityType: "T.C Kimlik Kartı",
////                                                    identityNo: "49867297574",
////                                                    documentNo: "1234567890",
////                                                    name: name,
////                                                    surname: surname,
////                                                    gender: gender,
////                                                    birthDate: birthday,
////                                                    nationality: "TR",
////                                                    issuedBy: "Enqura",
////                                                    issuedDate: "24.11.2028",
////                                                    expireDate: expiryDate)
//
////     let addressModel = EnVerifyCallAddressRegistrationModel(addressType: "Ev",
////                                                             district: "Türkiye",
////                                                             districtCode: "1",
////                                                             street: "Türkiye",
////                                                             streetCode: "1",
////                                                             villageCode: "1",
////                                                             addressDetail: "Türkiye",
////                                                             townCode: "1",
////                                                             town: "Türkiye",
////                                                             city: "Türkiye",
////                                                             cityCode: "1",
////                                                             country: "Türkiye",
////                                                             countryCode: "1")
//
////     let data: String = "{\"VideoKayıtOnayı\":\"Alındı\",\"KvkkOnayı\":\"Alındı\"}"
////     EnVerify.integrationAdd(type: "Session", callType: "NewCustomer", phone: "05399999999", email: "info@enqura.com", data: data, addressRegistration: addressModel, iDRegistration: reqModel)
////   }
//
////   @objc func OCRCompleteNative() {
////     print(#function)
////     DispatchQueue.main.asyncAfter(deadline: .now() + 0.3) {
////       EnVerify.onConfirmDocWithoutPop()
////     }
////   }
//
////   // Bu fonksiyon gidicek, onConfirmDoc da çağırılacak
////   @objc func NFCStartNative() {
////     print(#function)
////     if #available(iOS 13.0, *) {
////       let nfcStart = EnVerify.nfcStart()
////       if nfcStart != NFCStartResponseType.success.rawValue {
////         EnVerify.faceDetectStart()
////       }
////     } else {
////       EnVerify.faceDetectStart()
////     }
////   }
//
////   @objc func onRetryDocNative() {
////     print(#function)
////     EnVerify.onRetryDoc()
////   }
//
////   @objc func faceStartNative() {
////     DispatchQueue.main.asyncAfter(deadline: .now() + 0.3) {
////       print(#function)
////       EnVerify.onConfirmNFC()
////     }
////   }
//
////   @objc func NFCRetryNative() {
////     DispatchQueue.main.asyncAfter(deadline: .now() + 0.3) {
////       print(#function)
//
////       self.isNFCRetry = true
////       EnVerify.onRetryNFC()
////     }
////   }
//
////   @objc func faceRetryNative() {
////     navController?.popViewController(animated: true) {
////       EnVerify.faceDetectStart()
////     }
////   }
//
////   @objc func videoCallStartNative() {
////     DispatchQueue.main.asyncAfter(deadline: .now() + 0.3) {
////       print(#function)
//
////       EnVerify.onConfirmFaceWithOutPop()
////     }
////   }
//
////   @objc func callCancelNative() {
////     EnVerify.isCallCancelled = true
////     EnVerify.callSessionClose(finished: false)
////   }
//
////   @objc func failOCRDismissButtonInCall() {
////     if agentRequestType == .ocr || EnVerify.isCallAnswered {
////       agentRequestType = .agent
////       popFrontViewController("MainVCView") {
////         EnVerify.startVideoChat()
////         EnVerify.agentRequestCompleted()
////       }
////     } else {
////       //TODO: tüm ekranları kapatıp ana ekrana dönmek gerekli
////       DispatchQueue.main.async {
////         self.popMainViewController("DD4") {
////           print("dd4 ekrana basıldı")
////         }
////       }
////     }
////   }
//
////   @objc func failNFCDismissButtonInCall() {
////     if agentRequestType == .nfc || EnVerify.isCallAnswered {
////       agentRequestType = .agent
////       popFrontViewController("MainVCView") {
////         EnVerify.startVideoChat()
////         EnVerify.agentRequestCompleted()
////       }
////     } else {
////       //TODO: tüm ekranları kapatıp ana ekrana dönmek gerekli
////       DispatchQueue.main.async {
////         self.popMainViewController("DD4") {
////           print("dd4 ekrana basıldı")
////         }
////       }
////     }
////   }
//
////   @objc func failFaceDismissButtonInCall() {
////     if agentRequestType == .faceRecognition || agentRequestType == .liveness || EnVerify.isCallAnswered {
////       agentRequestType = .agent
////       popFrontViewController("MainVCView") {
////         EnVerify.startVideoChat()
////         EnVerify.agentRequestCompleted()
////       }
////     } else {
////       //TODO: tüm ekranları kapatıp ana ekrana dönmek gerekli
////       DispatchQueue.main.async {
////         self.popMainViewController("DD4") {
////           print("dd4 ekrana basıldı")
////         }
////       }
////     }
////   }
//
////   @objc func goToRoutingAgent() {
////     DispatchQueue.main.asyncAfter(deadline: .now() + 0.001) {
////       EnVerify.stopSSStartVC(self)
////       EnVerify.onStartCall()
////     }
////   }
//// }
