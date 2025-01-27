import UIKit

class CustomBottomSheetViewController: UIViewController {

    static let identifier = "CustomBottomSheetViewController"

    @IBOutlet weak var bottomSheetView: UIView!

    // MARK: - Lifecycle
    override func viewDidLoad() {
        super.viewDidLoad()

        // Arka planı şeffaf yap
        self.view.backgroundColor = UIColor.clear
    }

    override func viewDidLayoutSubviews() {
        super.viewDidLayoutSubviews()

        // Köşe yuvarlama ayarları
        bottomSheetView.clipsToBounds = true
        let path = UIBezierPath(
            roundedRect: bottomSheetView.bounds,
            byRoundingCorners: [.topLeft, .topRight], // Sadece üst köşeler
            cornerRadii: CGSize(width: 24, height: 24) // Radius değeri
        )
        let mask = CAShapeLayer()
        mask.path = path.cgPath
        bottomSheetView.layer.mask = mask
    }

    // MARK: - Actions
    @IBAction func cancelButton(_ sender: UIButton) {
        self.dismiss(animated: true, completion: nil)
    }

    @IBAction func exitButton(_ sender: UIButton) {
        ModuleIOS.shared.sdkCancel()
        self.dismiss(animated: true, completion: nil)
    }
}
