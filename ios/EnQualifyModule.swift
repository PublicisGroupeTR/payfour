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
class ModuleIOS: BaseViewController, EnVerifyDelegate {

  var agentRequestType: AgentRequestType = .none
  var isSelfServiceStart: Bool = false

  static let shared = ModuleIOS()
  var kycData: [String: Any]?

//  ------------------------ CallBacks Start --------------------------------
  func idSelfVerifyReady() {
    print("idSelfVerifyReady")
    isSelfServiceStart = true
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
    
  }

  func smileDetectCompleted() {
    // TODO
    // EnVerify.faceCompleteStart()
    EnVerify.faceStore()
    print("smileDetectCompleted")
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
    kycError()
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
    addIntegration();
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
    kycError()
  }

  func idCheckFailure() {
    print("idCheckFailure")
    kycError()
  }

  func tokenFailure() {
    print("tokenFailure")
    kycError()
  }

  func connectionFailure() {
    print("connectionFailure")
    kycError()
  }

  func nfcFailure() {
    print("agentRequestType \(agentRequestType)")
    goToNextPage(page: "NfcError")
    EnVerify.handleFail()
  }

  func nfcBACDATAFailure() {
    print("nfcBACDATAFailure")
    kycError()
  }

  func faceLivenessCheckFailure() {
    print("faceLivenessCheckFailure")
    EnVerify.handleFail()
    goToNextPage(page: "FaceError")
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
    EnVerify.faceDetectStart()
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
    kycError()
  }
  
  // TODO

  func integrationAddCompleted() {
    print("integrationAddCompleted")
    EnVerify.onConfirmFaceWithOutPop()
    goToNextPage(page: "FaceSuccess")
    EnVerify.callSessionClose(finished: true)
  }

  func integrationAddFailure() {
    print("integrationAddFailure")
    kycError() 
    // EnVerify.idTypeCheckFrontStart()
  }

  func resultGetCompleted(_ value: EnQualify.EnverifyVerifyCallResult?) {
    print("resultGetCompleted")
  }

  func resultGetFailure() {
    print("resultGetFailure")
    kycError()
  }

  func sessionStartFailure() {
    print("sessionStartFailure")
    kycError()
  }

  func sessionStartCompleted(sessionUid: String) {
    // TODO addint
    print("sessionStartCompleted")
//    self.addIntegration()
  }

  func getAuthTokenFailure() {
    print("getAuthTokenFailure")
    kycError()
  }

  func getAuthTokenCompleted() {
    print("getAuthTokenCompleted")
  }

  func getSettingsCompleted() {
    print("getSettingsCompleted")
  }

  func getSettingsFailure() {
    print("getSettingsFailure")
    kycError()
  }

  func roomIDSendFailure() {
    print("roomIDSendFailure")
    kycError()
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
    goToNextPage(page: "NfcError")
    EnVerify.handleFail()
  }

  func addChipStoreCompleted() {
    print("addChipStoreCompleted")
  }

  func addFaceCompleted() {
    print("addFaceCompleted")
  }

  func addFaceFailure() {
    print("addFaceFailure")
    kycError()
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
    kycError()
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
    kycError()
  }

  func maximumCallTimeExpired() {
    print("maximumCallTimeExpired")
    kycError()
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
//            print("KYC Verisi: \(json)")
          ModuleIOS.shared.kycData = json
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

          let referenceUUID = ModuleIOS.shared.kycData?["referenceId"] as? String ?? ""

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

  func startFace() {
    print("startFace")
    EnVerify.faceDetectStart()
//    EnVerify.faceUpStart()
  }
  
  func retryFace() {
    print("retryFace")
    EnVerify.onRetryFace()
  }

  func kycError() {
    exitSdk()
    goToNextPage(page: "KycError")
  }
  
  func sdkRetry() {
    exitSdk()
    returnToReactNative()
  }
  
  func exitSdk (){
    if isSelfServiceStart == true {
      EnVerify.onExitSelfServiceWithoutPop()
    }
  }
  
  func goToNextPage(page: String) {
    DispatchQueue.main.async {

      print("goToNextPage : ", page)

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
        if let vc = storyboard.instantiateViewController(withIdentifier: page)
          as? EnQualifyViewController
        {
          navigationController.pushViewController(vc, animated: true)
        } else {
          print("OcrController storyboard'da bulunamadı.")
        }
      } else {
        print("Root ViewController bir UINavigationController değil.")
      }
    }
  }

  func goBackPage(page: String) {
    
    print("goBackPage : " , page)

    DispatchQueue.main.async {
      guard
        let rootVC = UIApplication.shared.connectedScenes
          .compactMap({ ($0 as? UIWindowScene)?.windows.first?.rootViewController })
          .first
      else {
        print("Root ViewController bulunamadı.")
        return
      }

      if let navigationController = rootVC as? UINavigationController {
        for controller in navigationController.viewControllers {
          // Hedef storyboard'u kontrol et
          if let targetStoryboardName = controller.storyboard?.value(forKey: "name") as? String,
            targetStoryboardName == page
          {  // Değiştirilecek storyboard adı
            navigationController.popToViewController(controller, animated: true)
          }
        }
       
        print("Hedef storyboard navigation stack'te bulunamadı.")
      } else {
        print("Navigation controller bulunamadı.")
      }

    }

  }

  func returnToReactNative() {
        DispatchQueue.main.async {
            guard
                let rootVC = UIApplication.shared.connectedScenes
                    .compactMap({ ($0 as? UIWindowScene)?.windows.first?.rootViewController })
                    .first
            else {
                print("Root ViewController bulunamadı.")
                return
            }

            if let navigationController = rootVC as? UINavigationController {
                navigationController.popToRootViewController(animated: true)
            } else {
                print("Root ViewController bir UINavigationController değil.")
            }
        }
    }
  
  func closePage() {
  
    print("closePage")
      DispatchQueue.main.async {
        
          guard
            let rootVC = UIApplication.shared.connectedScenes
              .compactMap({ ($0 as? UIWindowScene)?.windows.first?.rootViewController })
              .first
          else {
            print("Root ViewController bulunamadı.")
            return
          }
        
          guard let navigationController = rootVC as? UINavigationController else {
              print("NavigationController bulunamadı.")
              return
          }
          navigationController.popViewController(animated: true)
      }
  }

  func addIntegration() {

    guard let kycData = ModuleIOS.shared.kycData else {
        print("kycData boş veya nil")
        return
    }
    // Prepare JSON Data
    var jsonData: [String: Any] = [:]

    // Occupations
    if let occupation = kycData["occupation"] as? String,
       let occupationRole = kycData["occupationrole"] as? String,
       let educationLevel = kycData["educationlevel"] as? String {

        let occupations = [
            ["occupationTypeId": "5d1816d2-70c7-d5f2-e053-e7b3f2e53410",
             "occupationTypeFieldId": occupation],
            ["occupationTypeId": "5d1aa7d4-46a6-f804-395e-2575c967ca97",
             "occupationTypeFieldId": occupationRole],
            ["occupationTypeId": "5d17c8ce-efc2-4cd2-55f4-c6998700dcfa",
             "occupationTypeFieldId": educationLevel]
        ]

        jsonData["occupations"] = occupations
    }

    // Incomes
    if let incometypesSelected = kycData["incometypesSelected"] as? [String],
       let transactionVolume = kycData["transactionVolume"] as? String,
       let monthlyAverage = kycData["monthlyAverage"] as? String,
       let transactionsNumbers = kycData["transactionsNumbers"] as? String {

        let incomeData: [String: Any] = [
            "currencyNumber": "949",
            "sourceOfIncome": incometypesSelected.compactMap { Int($0) },
            "EstimatedTransactionVolume": Int(transactionVolume) ?? 0,
            "monthlyAmount": Int(monthlyAverage) ?? 0,
            "TransactionCount": Int(transactionsNumbers) ?? 0
        ]

        jsonData["incomes"] = [incomeData]
    }

    // Consents
    if let selectedAgreements = kycData["selectedaAreements"] as? [String] {
        jsonData["consents"] = selectedAgreements
    }

    // Partner Code
    jsonData["PartnerCode"] = "csa"

    // Serialize JSON
    guard let serializedData = try? JSONSerialization.data(withJSONObject: jsonData, options: .prettyPrinted),
          let jsonString = String(data: serializedData, encoding: .utf8) else {
        print("Failed to serialize JSON")
        return
    }

//    print("Serialized JSON: \(jsonString)")

    // API Request
    let referenceId = kycData["referenceId"] as? String ?? ""

    EnVerify.integrationAdd(type: "Session", 
                            callType: referenceId,
                            phone: nil,
                            email: nil, 
                            data: jsonString, 
                            addressRegistration: nil,
                            iDRegistration: nil)
}


}
