//import Foundation
//import React
//
//@objc(EventEmitter)
//class EventEmitter: RCTEventEmitter {
//    private static var hasListeners = false
//
//    // Bu method, JavaScript tarafında hangi eventlerin dinlenebileceğini belirtir
//    override func supportedEvents() -> [String]! {
//        return ["EnQualifyResult"]
//    }
//
//    // JavaScript tarafında listener varsa true yaparız
//    override func startObserving() {
//        EventEmitter.hasListeners = true
//    }
//
//    // Listener kaldırıldığında çağrılır
//    override func stopObserving() {
//        EventEmitter.hasListeners = false
//    }
//
//    // Swift'ten event gönderme fonksiyonu
//    @objc func sendEventToReact(_ name: String, body: [String: Any]?) {
//        if EventEmitter.hasListeners {
//            self.sendEvent(withName: name, body: body)
//        }
//    }
//  
//    @objc func triggerEvent() {
//        let eventName = "EnQualifyResult"
//        let payload: [String: Any] = ["key": "value", "message": "Hello from Swift!"]
//
//        self.sendEventToReact(eventName, body: payload)
//    }
//}

@objc(EventEmitter)
class EventEmitter: RCTEventEmitter {
    static var shared: EventEmitter?
    
    override init() {
        super.init()
        EventEmitter.shared = self
    }
    
    override static func requiresMainQueueSetup() -> Bool {
        return true
    }
 
    override func supportedEvents() -> [String]! {
        // React'e gönderilebilecek olayların isimlerini burada tanımlayın
        return ["EnQualifyResult"]
    }
    
    @objc func sendSampleEvent(_ name: String, body: [String: Any]?) {
        // React'e bir olay yollama
        sendEvent(withName: name, body: body)
    }
}
