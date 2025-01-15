import UIKit

@available(iOS 13.0, *)
class EnQualifyViewController: UIViewController {
  
    override func viewDidLoad() {
        super.viewDidLoad()
    }
  
    @IBOutlet weak var contentView: UIView!
  
    @IBAction func sessionCloseButton(_ sender: UIButton) {
      ModuleIOS.shared.sessionClose()
    }

    @IBAction func ocrStartButton(_ sender: UIButton) {
      
//      ModuleIOS.shared.startVerification()
      let storyBoard = UIStoryboard(name: KycErrorViewController.identifier, bundle: nil)
      guard let vc = storyBoard.instantiateViewController(withIdentifier: KycErrorViewController.identifier) as? KycErrorViewController else {
        return
      }
      navigationController?.pushViewController(vc, animated: true)
    }

    @IBAction func ocrRetryButton(_ sender: UIButton) {
      ModuleIOS.shared.ocrRetry()
    }

    @IBAction func nfcStartButton(_ sender: UIButton) {
      ModuleIOS.shared.startNfc()
    }

    @IBAction func nfcRetryButton(_ sender: UIButton) {
      ModuleIOS.shared.retryNfc()
    }

    @IBAction func faceStartButton(_ sender: UIButton) {
      ModuleIOS.shared.startFace()
    }
    
    @IBAction func faceRetryButton(_ sender: UIButton) {
      ModuleIOS.shared.retryFace()
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
          ModuleIOS.shared.sessionClose()
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
