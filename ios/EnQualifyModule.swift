import AVFoundation
import CoreNFC
import EnQualify
import Foundation
import React
import UIKit

// @available(iOS 13.0, *)
// @objc(ModuleIOS)
// class ModuleIOS: RCTEventEmitter, EnVerifyDelegate {

//     static let shared = ModuleIOS()
//     private var kycData: [String: Any]?

//     override func supportedEvents() -> [String]! {
//         return ["onKycProcessUpdate", "onKycProcessCompleted"]
//     }

//     func sendEventToReactNative(eventName: String, body: [String: Any]) {
//         self.sendEvent(withName: eventName, body: body)
//     }

// @objc
// func viewDidLoadNative(_ kycData: String) {

//     if let data = kycData.data(using: .utf8) {
//         do {
//             // JSON verisini Swift Dictionary'e çevir
//             if let json = try JSONSerialization.jsonObject(with: data, options: []) as? [String: Any] {
//                 print("KYC Verisi: \(json)")

//                 self.kycData = json

//                 if let userName = self.kycData?["userName"] as? String {
//                     print("Kullanıcı Adı: \(userName)")
//                 }

//             }
//         } catch {
//             print("JSON Parse Hatası: \(error.localizedDescription)")

//         }
//     } else {
//         // Geçersiz JSON string
//         print("Geçersiz JSON string")
//     }

//     print("viewDidLoadNative called")
//     // React Native'e bir event gönder
//             let data: [String: Any] = [
//                 "status": "started",
//                 "data": kycData
//             ]
//     self.sendEventToReactNative(eventName: "onKycProcessCompleted", body: data)
//     goToNextPage(page: "OcrInfo")
// }

//     @objc
//     func startVerification() {
//       print("startVerification called")
//     }

//     func goToNextPage(page: String) {
//       DispatchQueue.main.async {

//         print("goToNextPage")

//         guard let rootVC = UIApplication.shared.connectedScenes
//             .compactMap({ ($0 as? UIWindowScene)?.windows.first?.rootViewController })
//             .first else {
//             print("Root ViewController bulunamadı.")
//             return
//         }

//         if let navigationController = rootVC as? UINavigationController {
//             let storyboard = UIStoryboard(name:page, bundle: nil)
//             if let ocrVC = storyboard.instantiateViewController(withIdentifier: page) as? EnQualifyViewController {
//                 navigationController.pushViewController(ocrVC, animated: true)
//             } else {
//                 print("OcrController storyboard'da bulunamadı.")
//             }
//         } else {
//             print("Root ViewController bir UINavigationController değil.")
//         }
//       }
//     }

//     func goBackPage(page: String) {

//       DispatchQueue.main.async {

//         guard let rootVC = UIApplication.shared.connectedScenes
//             .compactMap({ ($0 as? UIWindowScene)?.windows.first?.rootViewController })
//             .first else {
//             print("Root ViewController bulunamadı.")
//             return
//         }

//         print("goBackPage")
//         if let navigationController = rootVC as? UINavigationController {
//             for controller in navigationController.viewControllers {
//                 // Hedef storyboard'u kontrol et
//                 if let targetStoryboardName = controller.storyboard?.value(forKey: "name") as? String,
//                 targetStoryboardName == page { // Değiştirilecek storyboard adı
//                     navigationController.popToViewController(controller, animated: true)
//                     return
//                 }
//             }
//             print("Hedef storyboard navigation stack'te bulunamadı.")
//         } else {
//             print("Navigation controller bulunamadı.")
//         }

//       }

//     }
// }

@objc(ModuleIOS)
class ModuleIOS: UIViewController, EnVerifyDelegate {

  var agentRequestType: AgentRequestType = .none
  var isNFCRetry: Bool = false

  static let shared = ModuleIOS()
  private var kycData: [String: Any]?
  
//  ------------------------ CallBacks Start --------------------------------
  func idSelfVerifyReady() {
    print("idSelfVerifyReady")
    EnVerify.idTypeCheckFrontStart()
  }

  func callWait() {
    print("callWait")
  }

  func callStart() {
    print("callStart")
  }

  func idTypeCheck() {
    print("idTypeCheck")
  }

  func idTypeCheckCompleted() {
    EnVerify.idFrontStart()
    print("idTypeCheckCompleted")
  }

  func idFakeCheck() {
    print("idFakeCheck")
  }

  func idFakeCheckCompleted() {
    print("idFakeCheckCompleted")
  }

  func idFront() {
    print("idFront")
  }

  func idFrontCompleted() {
    EnVerify.idBackStart()
    print("idFrontCompleted")
  }

  func idBack() {
    print("idBack")
  }

  func idBackCompleted() {
    print("idBackCompleted")
    EnVerify.idDocStore()
  }

  func idDocCompleted() {
    print("idDocCompleted")
  }

  func nfcVerify() {
    print("nfcVerify")
  }

  func nfcVerifyCompleted() {
    EnVerify.nfcStore()
    print("nfcVerifyCompleted")
  }

  func faceDetect() {
    print("faceDetect")
    EnVerify.eyeCloseIntervalStart()
  }

  func faceDetectCompleted() {
    print("faceDetectCompleted")
  }

  func smileDetect() {
    print("smileDetect")
//    EnVerify.faceCompleteStart()
    EnVerify.faceStore()
  }

  func smileDetectCompleted() {
    print("smileDetectCompleted")
    EnVerify.onConfirmFaceWithOutPop()
    goToNextPage(page: "FaceSuccess")
  }

  func eyeClose() {
    print("eyeClose")
  }

  func eyeCloseDetected() {
    print("eyeCloseDetected")
  }

  func faceUp() {
    print("faceUp")
  }

  func faceUpDetected() {
    print("faceUpDetected")
  }

  func faceLeft() {
    print("faceLeft")
  }

  func faceLeftDetected() {
    print("faceLeftDetected")
  }

  func faceRight() {
    print("faceRight")
  }

  func faceRightDetected() {
    print("faceRightDetected")
  }

  func eyeCloseInterval() {
    print("eyeCloseInterval")
  }

  func eyeCloseIntervalDetected() {
    print("eyeCloseIntervalDetected")
    EnVerify.smileDetectStart()
  }

  func eyeOpenInterval() {
    print("eyeOpenInterval")
  }

  func eyeOpenIntervalDetected() {
    print("eyeOpenIntervalDetected")
  }

  func hangupLocal() {
    print("hangupLocal")
  }

  func hangupRemote() {
    print("hangupRemote")
  }

  func failure() {
    print("failure")
  }

  func tokenError() {
    print("tokenError")
  }

  func noConnectionError() {
    print("noConnectionError")
  }

  func idFakeDetected() {
    print("idFakeDetected")
  }

  func idDocStoreCompleted() {
    EnVerify.onConfirmDocWithoutPop()
    goToNextPage(page: "OcrSuccess")
    print("idDocStoreCompleted")
  }

  func nfcStoreCompleted() {
    EnVerify.onConfirmNFCWithoutPop()
    goToNextPage(page: "NfcSuccess")
    print("nfcStoreCompleted")
  }

  func faceStoreCompleted() {
    print("faceStoreCompleted")
    EnVerify.onConfirmFaceWithOutPop()
    goToNextPage(page: "FaceSuccess")
  }

  func idTypeBackCheck() {
    print("idTypeBackCheck")
  }

  func nfcCompleted() {
    print("nfcCompleted")
  }

  func faceCompleted() {
    print("faceCompleted")
    EnVerify.faceStore()
  }

  func idVerifyExited() {
    print("idVerifyExited")
  }

  func timeoutFailure() {
    print("timeoutFailure")
  }

  func idCheckFailure() {
    print("idCheckFailure")
  }

  func tokenFailure() {
    print("tokenFailure")
  }

  func connectionFailure() {
    print("connectionFailure")
  }

  func nfcFailure() {
    print("agentRequestType \(agentRequestType)")
    goToNextPage(page: "NfcError")
    EnVerify.handleFail()
  }

  func nfcBACDATAFailure() {
    print("nfcBACDATAFailure")
  }

  func faceLivenessCheckFailure() {
    print("faceLivenessCheckFailure")
  }

  func idRetry() {
    print("idRetry")
    EnVerify.idTypeCheckFrontStart()
  }

  func nfcRetry() {
    print("nfcRetry")
    EnVerify.nfcStart()
  }

  func faceRetry() {
    print("faceRetry")
  }

  func hostConnected() {
    goToNextPage(page: "OcrInfo")
    print("hostConnected")
  }

  func resolutionChanged() {
    print("resolutionChanged")
  }

  func callConnectionFailure() {
    print("callConnectionFailure")
  }

  func integrationAddCompleted() {
    print("integrationAddCompleted")
  }

  func integrationAddFailure() {
    print("integrationAddFailure")
  }

  func resultGetCompleted(_ value: EnQualify.EnverifyVerifyCallResult?) {
    print("resultGetCompleted")
  }

  func resultGetFailure() {
    print("resultGetFailure")
  }

  func sessionStartFailure() {
    print("sessionStartFailure")
  }

  func sessionStartCompleted(sessionUid: String) {
    // TODO addint
    print("sessionStartCompleted")
  }

  func getAuthTokenFailure() {
    print("getAuthTokenFailure")
  }

  func getAuthTokenCompleted() {
    print("getAuthTokenCompleted")
  }

  func getSettingsCompleted() {
    print("getSettingsCompleted")
  }

  func getSettingsFailure() {
    print("getSettingsFailure")
  }

  func roomIDSendFailure() {
    print("roomIDSendFailure")
  }

  func roomIDSendCompleted() {
    print("roomIDSendCompleted")
  }

  func idDocStoreFailure() {
    goToNextPage(page: "OcrError")
    print("idDocStoreFailure")
  }

  func addChipStoreFailure() {
    print("addChipStoreFailure")
  }

  func addChipStoreCompleted() {
    print("addChipStoreCompleted")
  }

  func addFaceCompleted() {
    print("addFaceCompleted")
  }

  func addFaceFailure() {
    print("addFaceFailure")
  }

  func forceHangup() {
    print("forceHangup")
  }

  func idTextRecognitionTimeout() {
    goToNextPage(page: "OcrError")
    EnVerify.handleFail()
    print("idTextRecognitionTimeout")
  }

  func callSessionCloseResult(status: EnQualify.EnVerifyCallSessionStatusTypeEnum) {
    print("callSessionCloseResult")
  }

  func dismissBeforeAnswered() {
    print("dismissBeforeAnswered")
  }

  func dismissCallWait() {
    print("dismissCallWait")
  }

  func screenRecorderOnStart() {
    print("screenRecorderOnStart")
  }

  func screenRecorderOnComplete() {
    print("screenRecorderOnComplete")
  }

  func screenRecorderOnError(eventData: NSError?) {
    print("screenRecorderOnError")
  }

  func screenRecorderOnAppend() {
    print("screenRecorderOnAppend")
  }

  func cardFrontDetectStarted() {
    print("cardFrontDetectStarted")
  }

  func cardFrontDetected() {
    print("cardFrontDetected")
  }

  func cardBackDetectStarted() {
    print("cardBackDetectStarted")
  }

  func cardBackDetected() {
    print("cardBackDetected")
  }

  func cardHoloDetectStarted() {
    print("cardHoloDetectStarted")
  }

  func cardHoloDetected() {
    print("cardHoloDetected")
  }

  func videoUploadSuccess() {
    print("videoUploadSuccess")
  }

  func videoUploadFailure() {
    print("videoUploadFailure")
  }

  func maximumCallTimeExpired() {
    print("maximumCallTimeExpired")
  }

  func currentThermalState(state: String) {
    print("currentThermalState")
  }

  func documentSignSuccess() {
    print("documentSignSuccess")
  }

  func documentSingFailure() {
    print("documentSingFailure")
  }

  func appointmentTolerance(time: Int) {
    print("appointmentTolerance")
  }

  func agentMessageRequest(message: String) {
    print("agentMessageRequest")
  }

  func addGenericIdDocCompleted(with data: [String: String]) {
    print("addGenericIdDocCompleted")
  }

  func addGenericIdDocFailure() {
    print("addGenericIdDocFailure")
  }

  func capturePhotoCompleted() {
    print("capturePhotoCompleted")
  }

  func capturePhotoFailure() {
    print("capturePhotoFailure")
  }

  func captureVideoCompleted() {
    print("captureVideoCompleted")
  }

  func captureVideoFailure() {
    print("captureVideoFailure")
  }

  func photoLibraryAuthorization(status: String) {
    print("photoLibraryAuthorization")
  }

  func addGenericPassportCompleted() {
    print("addGenericPassportCompleted")
  }

  func addGenericPassportFailure() {
    print("addGenericPassportFailure")
  }

  // Örnek zorunlu metodlar
  func luminosityAnalyzed(result: String) {
    print("Luminosity analyzed: \(result)")
  }

  func agentRequest(eventData: String) {
    print("Agent request: \(eventData)")
  }

  func idVerifyReady() {
    print("ID Verify Ready")
  }

  // Eksik metodları tamamlayın
  func someMissingMethod() {
    // Gerekli işlemler
  }
  
//  ------------------------ CallBacks End --------------------------------
  
//  ------------------------ Sdk Configurations --------------------------------
  
  
  @objc func viewDidLoadNative(_ kycData: String) {

    if let data = kycData.data(using: .utf8) {
      do {
        // JSON verisini Swift Dictionary'e çevir
        if let json = try JSONSerialization.jsonObject(with: data, options: []) as? [String: Any] {
          //  print("KYC Verisi: \(json)")
          self.kycData = json
        }
      } catch {
        print("JSON Parse Hatası: \(error.localizedDescription)")

      }
    } else {
      // Geçersiz JSON string
      print("Geçersiz JSON string")
    }

    getAppSettings {
      DispatchQueue.main.async {

        print("viewDidLoadNative")

        EnVerify.callType = "NewCustomer"

        if EnVerify.checkPermissions() {

          let referenceUUID = self.kycData?["referenceId"] as? String ?? ""

          print("referenceUUID", referenceUUID)

          if !EnVerify.idvSettings(
            domainName: UserDefaults.standard.string(forKey: "domainName"),
            certificateNames: ["dgfinansman"],
            aiUsername: UserDefaults.standard.string(forKey: "aiUserName"),
            aiPassword: UserDefaults.standard.string(forKey: "aiPassword"),
            signalingServer: UserDefaults.standard.string(forKey: "signalServer"),
            stunServer: UserDefaults.standard.string(forKey: "stunServer"),
            turnServer: UserDefaults.standard.string(forKey: "turnServer"),
            turnUsername: UserDefaults.standard.string(forKey: "turnServerUser"),
            turnPassword: UserDefaults.standard.string(forKey: "turnServerKey"),
            backOfficeBasePath: UserDefaults.standard.string(forKey: "apiServer"),
            userNameForToken: UserDefaults.standard.string(forKey: "apiServerUser"),
            referenceID: referenceUUID
          ) {
            print("Check settings")
            return
          }

          self.setSettings()
          DispatchQueue.main.async {

            print(self)
            guard EnVerify.idVerifyStart(self) else { return }
            //  self._startVerification()
            EnVerify.requestVideoAudioPermissions()
          }
        } else {
          self.presentCameraSettings(vc: self)
        }
      }
    }
  }

  func presentCameraSettings(vc: UIViewController) {
    let alertController = UIAlertController(
      title: "uyarı",
      message:
        "Kamera veya Mikrofon Kapalı \n\n Lütfen Ayarlar Ekranına Girin \n Kamera ve Mikrofonu Açıp, Uygulamayı Tekrar Çalıştırın.",
      preferredStyle: .alert)
    alertController.addAction(
      UIAlertAction(title: "ayarlar", style: .cancel) { _ in
        if let url = URL(string: UIApplication.openSettingsURLString) {
          UIApplication.shared.open(
            url, options: [:],
            completionHandler: { _ in

            })
        }
      })
    vc.present(alertController, animated: true)
  }

  func requestVideoAudioPermissionsResult(_ granted: Bool) {
    if !EnVerify.checkPermissions() {
      DispatchQueue.main.async {
        self.presentCameraSettings(vc: self)
      }
    }
  }

  private func setSettings() {
    guard let path = Bundle.main.path(forResource: "test", ofType: "mov") else { return }
    EnVerify.agentDummyVideoPlayer = AVPlayer(url: URL(fileURLWithPath: path))  // add .mov video player
    EnVerify.agentDummyImage = UIImage(named: "imgLaunch")  // add img player
  }

  private func getAppSettings(completionHandler: @escaping () -> Void) {
    EnVerify.setMSPrivateKey(value: "1234567890123456789012345678901234567890")
    EnVerify.setSSLPinning(required: true)
    EnVerify.setShowLogs(value: true)
    AppSettings().getConfigurations { bool in
      EnVerify.getAuthTokenBeforeSDK(
        UserDefaults.standard.string(forKey: "apiServerUser"),
        UserDefaults.standard.string(forKey: "apiServer") ?? ""
      ) { (_) -> Void in
        completionHandler()
      }
    }
  }
  
  
//  ---------------------- Sdk Configuration End ----------------------
  
//  ---------------------- Sdk & Custom Funcitons ----------------------
    
  
  func startVerification() {
    agentRequestType = .busy
    print("_startVerification")
    DispatchQueue.main.async {
      print("guard")
      guard EnVerify.selfServiceStart(self) else { return }
    }
  }

  func startNfc() {
    if NFCTagReaderSession.readingAvailable {
      let nfcStart = EnVerify.nfcStart()
      print("nfcStart :\(nfcStart)")
      if nfcStart != NFCStartResponseType.success.rawValue {
        print("startNfc error 2")
      }
    } else {
      print("startNfc error 1")
    }
  }

  func ocrRetry() {
    print("ocrRetry")
    EnVerify.onRetryDoc()
  }

  func retryNfc() {
    print("retryNfc")
    EnVerify.onRetryNFC()
  }
  
  func retryFace() {
    print("retryNfc")
    EnVerify.onRetryFace()
  }

  func startFace() {
    print("startFace")
    EnVerify.faceDetectStart()
  }


  func kycError() {
    EnVerify.onHangupCall()
    EnVerify.onExitSelfService()
    goToNextPage(page: "KycError")
  }
  
  func goToNextPage(page: String) {
    DispatchQueue.main.async {

      print("goToNextPage")

      guard
        let rootVC = UIApplication.shared.connectedScenes
          .compactMap({ ($0 as? UIWindowScene)?.windows.first?.rootViewController })
          .first
      else {
        print("Root ViewController bulunamadı.")
        return
      }

      if let navigationController = rootVC as? UINavigationController {
        let storyboard = UIStoryboard(name: page, bundle: nil)
        if let ocrVC = storyboard.instantiateViewController(withIdentifier: page)
          as? EnQualifyViewController
        {
          navigationController.pushViewController(ocrVC, animated: true)
        } else {
          print("OcrController storyboard'da bulunamadı.")
        }
      } else {
        print("Root ViewController bir UINavigationController değil.")
      }
    }
  }

  func goBackPage(page: String) {

    DispatchQueue.main.async {

      guard
        let rootVC = UIApplication.shared.connectedScenes
          .compactMap({ ($0 as? UIWindowScene)?.windows.first?.rootViewController })
          .first
      else {
        print("Root ViewController bulunamadı.")
        return
      }

      print("goBackPage")
      if let navigationController = rootVC as? UINavigationController {
        for controller in navigationController.viewControllers {
          // Hedef storyboard'u kontrol et
          if let targetStoryboardName = controller.storyboard?.value(forKey: "name") as? String,
            targetStoryboardName == page
          {  // Değiştirilecek storyboard adı
            navigationController.popToViewController(controller, animated: true)
            return
          }
        }
        print("Hedef storyboard navigation stack'te bulunamadı.")
      } else {
        print("Navigation controller bulunamadı.")
      }

    }

  }

}
