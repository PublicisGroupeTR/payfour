import Foundation

class AppSettings {
  
  
  
  func getConfigurations(completionHandler: @escaping (Bool) -> ()) {
    print("getConfigurations")
    
        self.setUserfaults(
          key: "devtest",
          title: "Enqura",
          apiServerUser: "mobile",
          domainName: "enverifyai.dgfinansman.com",
          certificateName: "dgfinansman",
          aiUserName: "demo",
          aiPassword: "idverify",
          signalServer: "enverifyai.dgfinansman:1794",
          stunServer: "stun:enverifyai.dgfinansman:3478",
          turnServer: "turn:enverifyai.dgfinansman:3478",
          turnServerUser: "smartuser",
          turnServerKey: "Sv2017_1697turn",
          apiServer: "https://enverifymapip.dgfinansman.com",
          enableMediaServer: false
        )
      completionHandler(true)
          
  }
  
  
  func setUserfaults(key:String,
                         title:String,
                         apiServerUser:String,
                         domainName:String,
                         certificateName:String,
                         aiUserName:String,
                         aiPassword:String,
                         signalServer:String,
                         stunServer:String,
                         turnServer:String,
                         turnServerUser:String,
                         turnServerKey:String,
                         apiServer:String,
                         enableMediaServer:Bool) {
          UserDefaults.standard.set(key, forKey: "configurationKey")
          UserDefaults.standard.set(title, forKey: "title")
          UserDefaults.standard.set(apiServerUser, forKey: "apiServerUser")
          UserDefaults.standard.set(domainName, forKey: "domainName")
          UserDefaults.standard.set(certificateName, forKey: "certificateName")
          UserDefaults.standard.set(aiUserName, forKey: "aiUserName")
          UserDefaults.standard.set(aiPassword, forKey: "aiPassword")
          UserDefaults.standard.set(signalServer, forKey: "signalServer")
          UserDefaults.standard.set(stunServer, forKey: "stunServer")
          UserDefaults.standard.set(turnServer, forKey: "turnServer")
          UserDefaults.standard.set(turnServerUser, forKey: "turnServerUser")
          UserDefaults.standard.set(turnServerKey, forKey: "turnServerKey")
          UserDefaults.standard.set(apiServer, forKey: "apiServer")
          UserDefaults.standard.set(enableMediaServer, forKey: "enableMediaServer")
    UserDefaults.standard.synchronize()
      }
}
