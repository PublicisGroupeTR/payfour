@objc(RCTEmitter)
class RCTEmitter: RCTEventEmitter {
    override func supportedEvents() -> [String]! {
        return ["EnQualifyResult"]
    }

    @objc func sendEventToReactNative(name: String, body: [String: Any]) {
        sendEvent(withName: name, body: body)
    }
}
