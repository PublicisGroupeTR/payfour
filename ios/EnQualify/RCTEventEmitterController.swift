import Foundation
import React

@objc(RCTEventEmitterController)
class RCTEventEmitterController: RCTEventEmitter {

    // Singleton Instance
    @objc static let shared = RCTEventEmitterController()

    private override init() {
        super.init()
    }

    override func supportedEvents() -> [String]! {
        return ["EventEnQualify"]
    }

    func sendEventToReactNative(name: String, body: [String: Any]) {
        sendEvent(withName: name, body: body)
    }
}
