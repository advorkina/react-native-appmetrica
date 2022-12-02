import { NativeModules, Platform } from 'react-native';

const LINKING_ERROR =
  `The package '@extence/react-native-appmetrica' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo managed workflow\n';

const ReactNativeAppmetrica = NativeModules.ReactNativeAppmetrica
  ? NativeModules.ReactNativeAppmetrica
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

interface Config {
  revenueAutoTrackingEnabled?: boolean;
  appVersion?: string;
}

export interface RevenueParams {
  readonly quantity: number;
  readonly productID: string;
  readonly transactionID: string;
}

export function initialize(key: string, config?: Config) {
  return ReactNativeAppmetrica.setup(key, config);
}

export function reportEvent(
  name: string,
  attributes?: { [id: string]: string | boolean | number | any }
): Promise<boolean> {
  return ReactNativeAppmetrica.reportEvent(name, attributes);
}

export function revenueEvent(params: RevenueParams) {
  ReactNativeAppmetrica.revenueEvent(params);
}
