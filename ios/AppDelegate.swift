import UIKit
import Firebase
import EnQualify

@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate {
    var window: UIWindow?
    var bridge: RCTBridge!
    var jsCodeLocation: URL!
    var navigationController: UINavigationController?
    
    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
        
        FirebaseApp.configure()
        
        #if DEBUG
        if let debugURL = RCTBundleURLProvider.sharedSettings().jsBundleURL(forBundleRoot: "index") {
            jsCodeLocation = debugURL
        } else {
            fatalError("Failed to locate JavaScript bundle in DEBUG mode.")
        }
        #else
        if let releaseURL = Bundle.main.url(forResource: "main", withExtension: "jsbundle") {
            jsCodeLocation = releaseURL
        } else {
            fatalError("Failed to locate JavaScript bundle in RELEASE mode.")
        }
        #endif
        
        let rootViewController = getVCFromModuleName("Payfour", nil, launchOptions)
        self.window = UIWindow(frame: UIScreen.main.bounds)
        self.window?.rootViewController = rootViewController
        navigationController = UINavigationController(rootViewController: rootViewController)
        navigationController?.setNavigationBarHidden(true, animated: true)
        
        EnVerify.setNavigationController(navigator: navigationController!)
        window?.rootViewController = navigationController
        self.window?.makeKeyAndVisible()
        return true
    }
    
    func getVCFromModuleName(_ moduleName: String,_ initialProperties: NSDictionary?, _ launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> UIViewController {
        var props: [NSObject : AnyObject]? = nil
        if (initialProperties != nil) {
            props = initialProperties! as [NSObject : AnyObject]
        }
        let rootView = RCTRootView(bundleURL: jsCodeLocation, moduleName: moduleName, initialProperties:props , launchOptions: launchOptions)
        let rootViewController = UIViewController()
        rootViewController.view = rootView
        return rootViewController
    }
    
    func navigateToSelectedView(_ moduleName: String,_ initialProperties: NSDictionary?, _ launchOptions: [UIApplication.LaunchOptionsKey: Any]?) {
        let vc = getVCFromModuleName(moduleName, initialProperties, launchOptions)
        DispatchQueue.main.async { [self] in
            navigationController?.pushViewController(vc, animated: false)
        }
    }
    
    func popLastViewController() {
        DispatchQueue.main.async { [self] in
            navigationController?.popViewController(animated: false)
        }
    }
}

extension UIApplication {
    
    class func topMostViewController(controller: UIViewController? = UIApplication.shared.keyWindow?.rootViewController) -> UIViewController? {
        
        if let navigationController = controller as? UINavigationController {
            return topMostViewController(controller: navigationController.visibleViewController)
        }
        
        if let tabController = controller as? UITabBarController {
            if let selected = tabController.selectedViewController {
                return topMostViewController(controller: selected)
            }
        }
        
        if let presented = controller?.presentedViewController {
            return topMostViewController(controller: presented)
        }
        
        return controller
    }
}
