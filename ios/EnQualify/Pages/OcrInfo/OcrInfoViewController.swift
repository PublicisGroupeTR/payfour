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
  
  @IBAction func ocrStartButton(_ sender: UIButton) {
//      ModuleIOS.shared.startVerification()
    let storyBoard = UIStoryboard(name: KycErrorViewController.identifier, bundle: nil)
    guard let vc = storyBoard.instantiateViewController(withIdentifier: KycErrorViewController.identifier) as? KycErrorViewController else {
      return
    }
    navigationController?.pushViewController(vc, animated: true)
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
