import UIKit

@available(iOS 13.0, *)
class OcrInfoController: UIViewController {
  
    override func viewDidLoad() {
        super.viewDidLoad()
    }
  
    @IBAction func ocrStartButton(_ sender: UIButton) {
      ModuleIOS.shared.startVerification()
    }

    @IBAction func backButtonTapped(_ sender: UIButton) {
      guard let storyboardName = self.storyboard?.value(forKey: "name") as? String else {
          print("Storyboard adı alınamadı.")
          self.navigationController?.popViewController(animated: true)
          return
      }

      print("Bu view controller \(storyboardName) adlı storyboarddan geliyor.")

      if storyboardName == "OcrInfo" {
          self.navigationController?.popViewController(animated: true)
          return
      }

      if storyboardName == "KycError"  {
        ModuleIOS.shared.sdkRetry()
      }
    
    
      var targetPage = "OcrInfo"

      switch storyboardName {
      case "OrcSuccesss":
        targetPage = "OcrInfo"
      case "OcrError":
        targetPage = "OcrInfo"
      case "NfcSuccess":
        targetPage = "OcrSuccess"
      case "NfcError":
        targetPage = "OcrSuccess"
      case "FaceError":
        targetPage = "NfcSuccess"
      case "FaceSuccess":
        targetPage = "NfcSuccess"
      default:
        targetPage = "OcrInfo"
      }
    ModuleIOS.shared.goBackPage(page : targetPage)
}
}
