#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(ModuleIOS, NSObject)
  RCT_EXTERN_METHOD(viewDidLoadNative: (NSString *)kycData)
@end
