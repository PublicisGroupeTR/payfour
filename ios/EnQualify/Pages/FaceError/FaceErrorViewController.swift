//
//  FaceErrorViewController.swift
//  Payfour
//
//  Created by Mahmut Bilal Tekiroğlu on 16.01.2025.
//

import UIKit

class FaceErrorViewController: UIViewController {
  static let identifier = "FaceErrorViewController"
    override func viewDidLoad() {
        super.viewDidLoad()

        // Do any additional setup after loading the view.
    }
  
    @IBAction func retryFaceButton(_ sender: UIButton) {
      ModuleIOS.shared.retryFace()
    }
  
    @IBAction func cancelButton(_ sender: UIButton) {
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
