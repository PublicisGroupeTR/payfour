//
//  OcrSuccessViewController.swift
//  Payfour
//
//  Created by Mahmut Bilal TEKİROĞLU on 15.01.2025.
//

import UIKit

class OcrSuccessViewController: UIViewController {
  static let identifier = "OcrSuccessViewController"
  
  @IBOutlet weak var nfcStarButton: UIButton!
  
    override func viewDidLoad() {
        super.viewDidLoad()

        // Do any additional setup after loading the view.
    }
    
  
  @IBAction func nfcStartButton(_ sender: UIButton) {
    ModuleIOS.shared.startNfc()
    nfcStarButton.isUserInteractionEnabled = false
  }
  
  @IBAction func backButton(_ sender: UIButton) {
    ModuleIOS.shared.sdkCancel()
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
