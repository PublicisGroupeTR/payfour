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
//    ModuleIOS.shared.sessionClose()
    
    let storyBoard = UIStoryboard(name: OcrSuccessViewController.identifier, bundle: nil)
    guard let vc = storyBoard.instantiateViewController(withIdentifier: OcrSuccessViewController.identifier) as? OcrSuccessViewController else {
      return
    }
    navigationController?.pushViewController(vc, animated: true)
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
