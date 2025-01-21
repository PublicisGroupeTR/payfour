#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>

@interface RCT_EXTERN_MODULE(ModuleIOS, NSObject)
  RCT_EXTERN_METHOD(viewDidLoadNative: (NSString *)kycData)
@end

@interface RCT_EXTERN_MODULE(EventEmitter, RCTEventEmitter)
@end
