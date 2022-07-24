#import "ReactNativeAppmetrica.h"

#ifdef RCT_NEW_ARCH_ENABLED
#import "RNReactNativeAppmetricaSpec.h"
#endif

@implementation ReactNativeAppmetrica
RCT_EXPORT_MODULE()

RCT_REMAP_METHOD(setup,
                 setupWithAppMetricaKey:(NSString *)appMetricaKey withConfig:(NSDictionary *)config)
{
    YMMYandexMetricaConfiguration *configuration = [[YMMYandexMetricaConfiguration alloc] initWithApiKey:appMetricaKey];

    if (config[@"appVersion"] != nil) {
        configuration.appVersion = config[@"appVersion"];
    }

    if (config[@"revenueAutoTrackingEnabled"] != nil) {
        configuration.appVersion = config[@"revenueAutoTrackingEnabled"];
    }

    [YMMYandexMetrica activateWithConfiguration:configuration];
}

RCT_REMAP_METHOD(reportEvent,
                 reportEventWithEventName: (NSString *)eventName withAttributes:(NSDictionary *)attributes
                 withResolver:(RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTPromiseRejectBlock)reject)
{
    if (attributes == nil) {
        [YMMYandexMetrica reportEvent:eventName onFailure:^(NSError *error) {
            NSString *msg = [error localizedDescription];
            reject(@"reportEvent", msg, error);
        }];
    } else {
        [YMMYandexMetrica reportEvent:eventName parameters:attributes onFailure:^(NSError *error) {
            NSString *msg = [error localizedDescription];
            reject(@"reportEvent", msg, error);
        }];
    }
    resolve(@"");
}

// Don't compile this code when we build for the old architecture.
#ifdef RCT_NEW_ARCH_ENABLED
- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
    (const facebook::react::ObjCTurboModule::InitParams &)params
{
    return std::make_shared<facebook::react::NativeReactNativeAppmetricaSpecJSI>(params);
}
#endif

@end
