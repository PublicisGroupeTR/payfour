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
  
  @IBOutlet weak var retryFaceButton: UIButton!
  
  @IBAction func retryFaceButton(_ sender: UIButton) {
      retryFaceButton.isUserInteractionEnabled = false
      ModuleIOS.shared.retryFace()
    }
  
    @IBAction func cancelButton(_ sender: UIButton) {
      ModuleIOS.shared.sdkCancel()
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
