//
//  OcrErrorViewController.swift
//  Payfour
//
//  Created by Mahmut Bilal Tekiroğlu on 16.01.2025.
//

import UIKit

class OcrErrorViewController: UIViewController {
  static let identifier = "OcrErrorViewController"
    override func viewDidLoad() {
        super.viewDidLoad()

        // Do any additional setup after loading the view.
    }
    
  @IBOutlet weak var ocrRetryButton: UIButton!
  
  @IBAction func ocrRetryButton(_ sender: UIButton) {
    ocrRetryButton.isUserInteractionEnabled = false
    ModuleIOS.shared.ocrRetry()
  }
  
  @IBAction func backButton(_ sender: UIButton) {
    ModuleIOS.shared.showExitAlert()
  }
 

    /*
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        // Get the new view controller using segue.destination.
        // Pass the selected object to the new view controller.
    }
    */

}
