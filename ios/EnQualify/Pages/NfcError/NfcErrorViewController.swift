//
//  NfcErrorViewController.swift
//  Payfour
//
//  Created by Mahmut Bilal Tekiroğlu on 16.01.2025.
//

import UIKit

class NfcErrorViewController: UIViewController {
  static let identifier = "NfcErrorViewController"
    override func viewDidLoad() {
        super.viewDidLoad()

        // Do any additional setup after loading the view.
    }
    
    @IBAction func nfcRetryButton(_ sender: UIButton) {
      ModuleIOS.shared.nfcRetry()
    }
  
    @IBAction func callCenterButton(_ sender: UIButton) {
      
      let phoneNumber = "4441000"

      if let phoneURL = URL(string: "tel:\(phoneNumber)") {
          if UIApplication.shared.canOpenURL(phoneURL) {
              UIApplication.shared.open(phoneURL, options: [:], completionHandler: nil)
          } else {
              print("call center error: Cannot open phone URL.")
          }
      } else {
          print("call center error: Invalid phone number format.")
      }

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
