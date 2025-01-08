import UIKit

@available(iOS 13.0, *)
class EnQualifyViewController: UIViewController {
  
    override func viewDidLoad() {
        super.viewDidLoad()
    }
  
    @IBOutlet weak var contentView: UIView!

    @IBAction func ocrStartButton(_ sender: UIButton) {
      ModuleIOS.shared.startVerification()
    }
  
  
  @IBAction func nfcStartButton(_ sender: UIButton) {
    ModuleIOS.shared.startNfc()
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

        var targetPage = ""

        switch storyboardName {
        case "OrcSuccesss":
            targetPage = "OcrInfo"
        default:
            targetPage = "OcrInfo"
        }

       ModuleIOS.shared.goBackPage(page : targetPage)
  }
}
