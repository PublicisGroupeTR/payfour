import UIKit

class PageController: UIViewController {
  
  public func goToOrcInfo() {
    let storyBoard = UIStoryboard(name: OcrInfoViewController.identifier, bundle: nil)
    guard
      let vc = storyBoard.instantiateViewController(
        withIdentifier: OcrInfoViewController.identifier) as? OcrInfoViewController
    else {
      return
    }
    guard
      let navigationController = self.navigationController ?? UIApplication.shared.windows.first?
        .rootViewController as? UINavigationController
    else {
      print("Navigation Controller bulunamadı.")
      return
    }
    DispatchQueue.main.async {
      navigationController.pushViewController(vc, animated: true)
    }
  }

}
