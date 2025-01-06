#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(ModuleIOS, NSObject)
  // RCT_EXTERN_METHOD(startNFCService)
  RCT_EXTERN_METHOD(viewDidLoadNative: (NSString *)kycData)
  RCT_EXTERN_METHOD(startVerification)
  // RCT_EXTERN_METHOD(OCRCompleteNative)
  // RCT_EXTERN_METHOD(NFCStartNative)
  // RCT_EXTERN_METHOD(onRetryDocNative)
  // RCT_EXTERN_METHOD(NFCRetryNative)
  // RCT_EXTERN_METHOD(faceStartNative)
  // RCT_EXTERN_METHOD(faceRetryNative)
  // RCT_EXTERN_METHOD(goToRoutingAgent)
  // RCT_EXTERN_METHOD(failOCRDismissButtonInCall)
  // RCT_EXTERN_METHOD(failNFCDismissButtonInCall)
  // RCT_EXTERN_METHOD(failFaceDismissButtonInCall)
@end
