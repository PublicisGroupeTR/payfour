import UIKit

class OcrInfo: UIViewController {
  
    @IBOutlet weak var contentView: UIView!

    @IBAction func buttonTapped(_ sender: UIButton) {
          print("Butona tıklandı!")
    }

    @IBAction func backButtonTapped(_ sender: UIButton) {
        print("Back button tapped!")
        self.dismiss(animated: true, completion: nil)
    }

    override func viewDidLoad() {
        super.viewDidLoad()
      
//        contentView.layer.cornerRadius = 16
//        contentView.layer.masksToBounds = true
    }
}
