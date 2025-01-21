import AVFoundation
import CoreNFC
import EnQualify
import Foundation
import React
import UIKit

@objc(ModuleIOS)
class ModuleIOS: BaseViewController, EnVerifyDelegate {

  var agentRequestType: AgentRequestType = .none
  var isSelfServiceStart: Bool = false
  let mainSSView: String = "MainSSView"

  static let shared = ModuleIOS()
  var kycData: [String: Any]?
  
  func idSelfVerifyReady() {
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
  }

  func faceDetectCompleted() {
    print("faceDetectCompleted")
    EnVerify.faceStore()
    EnVerify.eyeCloseIntervalStart()
  }

  func smileDetect() {
    print("smileDetect")

  }

  func smileDetectCompleted() {
    // TODO
    EnVerify.faceCompleteStart()
    //    EnVerify.faceStore()
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
    goToOcrSuccess()
    print("idDocStoreCompleted")
  }

  func nfcStoreCompleted() {
    EnVerify.onConfirmNFCWithoutPop()
    print("nfcStoreCompleted")
  }

  func faceStoreCompleted() {
    print("faceStoreCompleted")
    EnVerify.onConfirmFaceWithOutPop()
  }

  func idTypeBackCheck() {
    print("idTypeBackCheck")
  }

  func nfcCompleted() {
    goToNfcSuccess()
    print("nfcCompleted")
  }

  func faceCompleted() {
    print("faceCompleted")
    addIntegration()
  }

  func idVerifyExited() {
    returnToReactNative()
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
    goToNfcError()
    EnVerify.handleFail()
  }

  func nfcBACDATAFailure() {
    print("nfcBACDATAFailure")
    kycError()
  }

  func faceLivenessCheckFailure() {
    print("faceLivenessCheckFailure")
    EnVerify.handleFail()
    goToFaceError()
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
    goToOrcInfo()
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
    EnVerify.callSessionClose(finished: true)
  }

  func integrationAddFailure() {
    print("integrationAddFailure")
    kycError()

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
    print("idDocStoreFailure")
    goToOcrError()
  }

  func addChipStoreFailure() {
    print("addChipStoreFailure")
    goToNfcError()
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
    EnVerify.handleFail()
    print("idTextRecognitionTimeout")
    goToOcrError()
  }

  func callSessionCloseResult(status: EnQualify.EnVerifyCallSessionStatusTypeEnum) {

    print("callSessionCloseResult", status)

    switch status {
    case ._none:
      print("_none")
      sdkExit()
    case .closed:
      print("closed")
      completeLoanApplication()
    case .cancelled:
      print("cancelled")
      sdkExit()
    case .failure:
      print("failure")
      sdkExit()
    case .finished:
      print("finished")
    default: ()
    }

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

    initSdk()
  }

  func initSdk() {
    getAppSettings {
      DispatchQueue.main.async {

        print("viewDidLoadNative")

        EnVerify.callType = "NewCustomer"

        if EnVerify.checkPermissions() {

          let referenceUUID = ModuleIOS.shared.kycData?["referenceId"] as? String ?? ""

          print("referenceUUID", referenceUUID)

          EnVerify.setFaceOverlayAngleCount(count: 3)
          EnVerify.canAutoClose = true

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
          self.goToOrcClosed()
        }
      }
    }
  }

  func requestVideoAudioPermissionsResult(_ granted: Bool) {
    print("requestVideoAudioPermissionsResult", granted)
    if !EnVerify.checkPermissions() {
      goToOrcClosed()
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

  func ocrRetry() {
    print("ocrRetry")
    EnVerify.onRetryDoc()
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

  func retryNfc() {
    print("retryNfc")
    EnVerify.onRetryNFC()
  }

  func startFace() {
    print("startFace")
    self.popFrontViewController("MainSSView") {
      EnVerify.faceDetectStart()
    }
  }

  func retryFace() {
    print("retryFace")
    EnVerify.onRetryFace()
  }

  func kycError() {
    print("kycError")
    gotoKycError()
  }

  func sdkCancel() {
    print("sdkCancel")
    if isSelfServiceStart == true {
      EnVerify.callSessionClose(finished: true)
    } else {
      returnToReactNative()
    }
  }

  func sdkExit() {
    EnVerify.onExitSelfServiceWithoutPop()
  }

  func completeLoanApplication() {

    print("completeLoanApplication")

    guard let token = ModuleIOS.shared.kycData?["token"] as? String,
      let referenceId = ModuleIOS.shared.kycData?["referenceId"] as? String
    else {
      print("TEST-KYC Token or Reference ID not found")
      kycError()
      return
    }

    let urlString =
      "https://payfourapp.test.kodegon.com/api/loans/completeloanapplication/\(referenceId)"
    guard let url = URL(string: urlString) else {
      print("TEST-KYC Invalid URL")
      kycError()
      return
    }

    var request = URLRequest(url: url)
    request.httpMethod = "POST"
    request.addValue("Bearer \(token)", forHTTPHeaderField: "Authorization")
    request.addValue("application/json; charset=utf-8", forHTTPHeaderField: "Content-Type")
    request.httpBody = Data()  // Boş bir body gönderiyoruz

    let task = URLSession.shared.dataTask(with: request) { data, response, error in
      if let error = error {
        print("TEST-KYC Request failed with error: \(error.localizedDescription)")
        DispatchQueue.main.async {
          self.kycError()
        }
        return
      }

      guard let httpResponse = response as? HTTPURLResponse else {
        print("TEST-KYC Invalid response")
        DispatchQueue.main.async {
          self.kycError()
        }
        return
      }

      if httpResponse.statusCode == 200, let data = data {
        do {
          if let jsonResponse = try JSONSerialization.jsonObject(with: data, options: [])
            as? [String: Any],
            let success = jsonResponse["success"] as? Bool
          {

            DispatchQueue.main.async {
              if success {
                print("TEST-KYC completeloanapplication Success: true")
                self.goToFaceSuccess()
              } else {
                print("TEST-KYC completeloanapplication Success: false")
                self.kycError()
              }
            }

          } else {
            print("TEST-KYC Invalid JSON structure")
            DispatchQueue.main.async {
              self.kycError()
            }
          }

        } catch {
          print("TEST-KYC JSON parse error: \(error.localizedDescription)")
          DispatchQueue.main.async {
            self.kycError()
          }
        }
      } else {
        print("TEST-KYC Request failed with code: \(httpResponse.statusCode)")
        DispatchQueue.main.async {
          self.kycError()
        }
      }
    }

    task.resume()
  }
  
  func eventSdkSucess() {
    let data: [String: Any] = [
        "status": "succeeded",
    ]
     EventEmitter.shared?.sendSampleEvent("EnQualifyResult", body: data)
  }
  
  func eventSdkCancel() {
    let data: [String: Any] = [
        "status": "canceled",
    ]
     EventEmitter.shared?.sendSampleEvent("EnQualifyResult", body: data)
  }
  
  
//  PAGES NAVIGATION

  func goToOrcInfo() {
    
    // DispatchQueue.main.async {
    //       guard
    //           let rootVC = UIApplication.shared.connectedScenes
    //               .compactMap({ ($0 as? UIWindowScene)?.windows.first?.rootViewController })
    //               .first
    //       else {
    //           print("Root ViewController bulunamadı.")
    //           return
    //       }

    //       if let navigationController = rootVC as? UINavigationController {
    //           let storyboard = UIStoryboard(name:  OcrInfoViewController.identifier, bundle: nil)
    //           if let vc = storyboard.instantiateViewController(withIdentifier:  OcrInfoViewController.identifier) as? OcrInfoViewController {
    //               navigationController.pushViewController(vc, animated: true)
    //           } else {
    //               print("NfcSuccessViewController storyboard'da bulunamadı.")
    //           }
    //       } else {
    //           print("Root ViewController bir UINavigationController değil.")
    //       }
    //     }
    
         // React Native'e bir event gönder
          
    
    let storyBoard = UIStoryboard(name: OcrInfoViewController.identifier, bundle: nil)
    guard
      let vc = storyBoard.instantiateViewController(
        withIdentifier: OcrInfoViewController.identifier) as? OcrInfoViewController
    else {
      return
    }
    guard
      let navigationController = self.navigationController ?? UIApplication.shared.windows.first?
        .rootViewController as? UINavigationController
    else {
      print("Navigation Controller bulunamadı.")
      return
    }
    DispatchQueue.main.async {
      navigationController.pushViewController(vc, animated: true)
    }
  }

  func goToOrcClosed() {

      // DispatchQueue.main.async {
      //     guard
      //         let rootVC = UIApplication.shared.connectedScenes
      //             .compactMap({ ($0 as? UIWindowScene)?.windows.first?.rootViewController })
      //             .first
      //     else {
      //         print("Root ViewController bulunamadı.")
      //         return
      //     }

      //     if let navigationController = rootVC as? UINavigationController {
      //         let storyboard = UIStoryboard(name:  OcrClosedViewController.identifier, bundle: nil)
      //         if let vc = storyboard.instantiateViewController(withIdentifier:  OcrClosedViewController.identifier) as? OcrClosedViewController {
      //             navigationController.pushViewController(vc, animated: true)
      //         } else {
      //             print("NfcSuccessViewController storyboard'da bulunamadı.")
      //         }
      //     } else {
      //         print("Root ViewController bir UINavigationController değil.")
      //     }
      //   }

    let storyBoard = UIStoryboard(name: OcrClosedViewController.identifier, bundle: nil)
    guard
      let vc = storyBoard.instantiateViewController(
        withIdentifier: OcrClosedViewController.identifier) as? OcrClosedViewController
    else {
      print("OcrClosedViewController yüklenemedi.")
      return
    }

    guard
      let navigationController = self.navigationController ?? UIApplication.shared.windows.first?
        .rootViewController as? UINavigationController
    else {
      print("Navigation Controller bulunamadı.")
      return
    }

    if navigationController.viewControllers.contains(where: { $0 is OcrClosedViewController }) {
      print("OcrClosedViewController zaten navigation yığınında.")
      return
    }

    DispatchQueue.main.async {
      navigationController.pushViewController(vc, animated: true)
    }
  }

  func goToOcrError() {

    // DispatchQueue.main.async {
    //       guard
    //           let rootVC = UIApplication.shared.connectedScenes
    //               .compactMap({ ($0 as? UIWindowScene)?.windows.first?.rootViewController })
    //               .first
    //       else {
    //           print("Root ViewController bulunamadı.")
    //           return
    //       }

    //       if let navigationController = rootVC as? UINavigationController {
    //           let storyboard = UIStoryboard(name:  OcrErrorViewController.identifier, bundle: nil)
    //           if let vc = storyboard.instantiateViewController(withIdentifier:  OcrErrorViewController.identifier) as? OcrErrorViewController {
    //               navigationController.pushViewController(vc, animated: true)
    //           } else {
    //               print("NfcSuccessViewController storyboard'da bulunamadı.")
    //           }
    //       } else {
    //           print("Root ViewController bir UINavigationController değil.")
    //       }
    //     }

    let storyBoard = UIStoryboard(name: OcrErrorViewController.identifier, bundle: nil)
    guard
      let vc = storyBoard.instantiateViewController(
        withIdentifier: OcrErrorViewController.identifier) as? OcrErrorViewController
    else {
      return
    }
    guard
      let navigationController = self.navigationController ?? UIApplication.shared.windows.first?
        .rootViewController as? UINavigationController
    else {
      print("Navigation Controller bulunamadı.")
      return
    }
    DispatchQueue.main.async {
      navigationController.pushViewController(vc, animated: true)
    }
  }

  func goToOcrSuccess() {

    // DispatchQueue.main.async {
    //       guard
    //           let rootVC = UIApplication.shared.connectedScenes
    //               .compactMap({ ($0 as? UIWindowScene)?.windows.first?.rootViewController })
    //               .first
    //       else {
    //           print("Root ViewController bulunamadı.")
    //           return
    //       }

    //       if let navigationController = rootVC as? UINavigationController {
    //           let storyboard = UIStoryboard(name:  OcrSuccessViewController.identifier, bundle: nil)
    //           if let vc = storyboard.instantiateViewController(withIdentifier:  OcrSuccessViewController.identifier) as? OcrSuccessViewController {
    //               navigationController.pushViewController(vc, animated: true)
    //           } else {
    //               print("NfcSuccessViewController storyboard'da bulunamadı.")
    //           }
    //       } else {
    //           print("Root ViewController bir UINavigationController değil.")
    //       }
    //     }

    let storyBoard = UIStoryboard(name: OcrSuccessViewController.identifier, bundle: nil)
    guard
      let vc = storyBoard.instantiateViewController(
        withIdentifier: OcrSuccessViewController.identifier) as? OcrSuccessViewController
    else {
      return
    }
    guard
      let navigationController = self.navigationController ?? UIApplication.shared.windows.first?
        .rootViewController as? UINavigationController
    else {
      print("Navigation Controller bulunamadı.")
      return
    }
    DispatchQueue.main.async {
      navigationController.pushViewController(vc, animated: true)
    }
  }

  func goToNfcError() {

    let storyBoard = UIStoryboard(name: NfcErrorViewController.identifier, bundle: nil)
    guard
      let vc = storyBoard.instantiateViewController(
        withIdentifier: NfcErrorViewController.identifier) as? NfcErrorViewController
    else {
      return
    }
    guard
      let navigationController = self.navigationController ?? UIApplication.shared.windows.first?
        .rootViewController as? UINavigationController
    else {
      print("Navigation Controller bulunamadı.")
      return
    }
    DispatchQueue.main.async {
      navigationController.pushViewController(vc, animated: true)
    }
  }

  func goToNfcSuccess() {
    
    let storyBoard = UIStoryboard(name: NfcSuccessViewController.identifier, bundle: nil)
    guard
      let vc = storyBoard.instantiateViewController(
        withIdentifier: NfcSuccessViewController.identifier) as? NfcSuccessViewController
    else {
      return
    }
    guard
      let navigationController = self.navigationController ?? UIApplication.shared.windows.first?
        .rootViewController as? UINavigationController
    else {
      print("Navigation Controller bulunamadı.")
      return
    }
    DispatchQueue.main.async {
      navigationController.pushViewController(vc, animated: true)
    }
  }

  func goToFaceSuccess() {

    let storyBoard = UIStoryboard(name: FaceSuccessViewController.identifier, bundle: nil)
    guard
      let vc = storyBoard.instantiateViewController(
        withIdentifier: FaceSuccessViewController.identifier) as? FaceSuccessViewController
    else {
      return
    }
    guard
      let navigationController = self.navigationController ?? UIApplication.shared.windows.first?
        .rootViewController as? UINavigationController
    else {
      print("Navigation Controller bulunamadı.")
      return
    }
    DispatchQueue.main.async {
      navigationController.pushViewController(vc, animated: true)
    }
  }

  func goToFaceError() {

    let storyBoard = UIStoryboard(name: FaceErrorViewController.identifier, bundle: nil)
    guard
      let vc = storyBoard.instantiateViewController(
        withIdentifier: FaceErrorViewController.identifier) as? FaceErrorViewController
    else {
      return
    }
    guard
      let navigationController = self.navigationController ?? UIApplication.shared.windows.first?
        .rootViewController as? UINavigationController
    else {
      print("Navigation Controller bulunamadı.")
      return
    }
    DispatchQueue.main.async {
      navigationController.pushViewController(vc, animated: true)
    }
  }

  func gotoKycError() {
    
    let storyBoard = UIStoryboard(name: KycErrorViewController.identifier, bundle: nil)
    guard
      let vc = storyBoard.instantiateViewController(
        withIdentifier: KycErrorViewController.identifier) as? KycErrorViewController
    else {
      return
    }
    guard
      let navigationController = self.navigationController ?? UIApplication.shared.windows.first?
        .rootViewController as? UINavigationController
    else {
      print("Navigation Controller bulunamadı.")
      return
    }
    DispatchQueue.main.async {
      navigationController.pushViewController(vc, animated: true)
    }
  }

  func goToNextPage(page: String) {
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
          let storyboard = UIStoryboard(name:  OcrInfoViewController.identifier, bundle: nil)
          if let vc = storyboard.instantiateViewController(withIdentifier:  OcrInfoViewController.identifier) as? OcrInfoViewController {
              navigationController.pushViewController(vc, animated: true)
          } else {
              print("NfcSuccessViewController storyboard'da bulunamadı.")
          }
      } else {
          print("Root ViewController bir UINavigationController değil.")
      }
    }
  }

  func goBackPage(page: String) {



  }

  func returnToReactNative() {
    
    print("returnToReactNative")
    
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
      let educationLevel = kycData["educationlevel"] as? String
    {

      let occupations = [
        [
          "occupationTypeId": "5d1816d2-70c7-d5f2-e053-e7b3f2e53410",
          "occupationTypeFieldId": occupation,
        ],
        [
          "occupationTypeId": "5d1aa7d4-46a6-f804-395e-2575c967ca97",
          "occupationTypeFieldId": occupationRole,
        ],
        [
          "occupationTypeId": "5d17c8ce-efc2-4cd2-55f4-c6998700dcfa",
          "occupationTypeFieldId": educationLevel,
        ],
      ]

      jsonData["occupations"] = occupations
    }

    // Incomes
    if let incometypesSelected = kycData["incometypesSelected"] as? [String],
      let transactionVolume = kycData["transactionVolume"] as? String,
      let monthlyAverage = kycData["monthlyAverage"] as? String,
      let transactionsNumbers = kycData["transactionsNumbers"] as? String
    {

      let incomeData: [String: Any] = [
        "currencyNumber": "949",
        "sourceOfIncome": incometypesSelected.compactMap { Int($0) },
        "EstimatedTransactionVolume": Int(transactionVolume) ?? 0,
        "monthlyAmount": Int(monthlyAverage) ?? 0,
        "TransactionCount": Int(transactionsNumbers) ?? 0,
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
    guard
      let serializedData = try? JSONSerialization.data(
        withJSONObject: jsonData, options: .prettyPrinted),
      let jsonString = String(data: serializedData, encoding: .utf8)
    else {
      print("Failed to serialize JSON")
      return
    }

    //    print("Serialized JSON: \(jsonString)")

    // API Request
    let referenceId = kycData["referenceId"] as? String ?? ""

    EnVerify.integrationAdd(
      type: "Session",
      callType: "NewCustomer",
      phone: nil,
      email: nil,
      data: jsonString,
      addressRegistration: nil,
      iDRegistration: nil)
  }

}
