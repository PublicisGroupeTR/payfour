//
//  FaceSuccessViewController.swift
//  Payfour
//
//  Created by Mahmut Bilal Tekiroğlu on 16.01.2025.
//

import UIKit

class FaceSuccessViewController: UIViewController {
  static let identifier = "FaceSuccessViewController"
    override func viewDidLoad() {
        super.viewDidLoad()

        // Do any additional setup after loading the view.
    }
  
  @IBAction func backHome(_ sender: UIButton) {
    ModuleIOS.shared.sdkExit()
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
