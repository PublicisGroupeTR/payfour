//
//  KycErrorViewController.swift
//  Payfour
//
//  Created by Mahmut Bilal TEKİROĞLU on 15.01.2025.
//

import UIKit

class KycErrorViewController: UIViewController {
static let identifier = "KycErrorViewController"
  
    override func viewDidLoad() {
        super.viewDidLoad()

        // Do any additional setup after loading the view.
    }
    

  
  
  @IBAction func sessionCloseButton(_ sender: UIButton) {
    ModuleIOS.shared.sessionClose()
  }
  
  func back() {
    navigationController?.popViewController(animated: true)
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
