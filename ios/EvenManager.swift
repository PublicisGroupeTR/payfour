import Foundation
import React

@objc(MyEventEmitter)
class MyEventEmitter: RCTEventEmitter {
    
  static var shared: MyEventEmitter?
  
    override init() {
         super.init()
         MyEventEmitter.shared = self
     }
 
    override func supportedEvents() -> [String] {
        return ["onCustomEvent"]
    }
 
    @objc func sendCustomEvent(_ data: [String: Any]) {
        if let appDelegate = UIApplication.shared.delegate as? AppDelegate {
          guard let bridge = appDelegate.bridge else {
              print("Bridge is not initialized. Event will not be sent.")
              return
          }
          sendEvent(withName: "onCustomEvent", body: data)
        print("Bridge is initialized: \(String(describing: appDelegate.bridge))")
      }
      
    }
 
    override static func requiresMainQueueSetup() -> Bool {
        return true
    }
}
