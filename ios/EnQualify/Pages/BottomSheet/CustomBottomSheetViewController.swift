import UIKit

class CustomBottomSheetViewController: UIViewController {

    // MARK: - Outlets
    @IBOutlet weak var bottomSheetView: UIView!
    @IBOutlet weak var titleLabel: UILabel!
    @IBOutlet weak var cancelButton: UIButton!
    @IBOutlet weak var exitButton: UIButton!

    // MARK: - Lifecycle
    override func viewDidLoad() {
        super.viewDidLoad()

        // Köşeleri yuvarlama
        bottomSheetView.layer.cornerRadius = 16
        bottomSheetView.clipsToBounds = true

        // Şeffaf arka plan
        self.view.backgroundColor = UIColor.black.withAlphaComponent(0.2)
    }

    // MARK: - Actions
    @IBAction func didTapCancel(_ sender: UIButton) {
        self.dismiss(animated: true, completion: nil)
    }

    @IBAction func didTapExit(_ sender: UIButton) {
        self.dismiss(animated: true) {
            print("Çıkış Yap butonuna tıklandı.")
        }
    }
}
