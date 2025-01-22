//
//  OcrInfoViewController.swift
//  Payfour
//
//  Created by Mahmut Bilal TEKİROĞLU on 15.01.2025.
//

import UIKit

class OcrInfoViewController: UIViewController {
  static let identifier = "OcrInfoViewController"
    override func viewDidLoad() {
        super.viewDidLoad()

        // Do any additional setup after loading the view.
    }
  
  @IBOutlet weak var ocrStartButton: UIButton!
  
  @IBAction func ocrStartButton(_ sender: UIButton) {
    ocrStartButton.isUserInteractionEnabled = false
    ModuleIOS.shared.startVerification()
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
