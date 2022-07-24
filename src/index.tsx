import { NativeModules, Platform } from 'react-native';

const LINKING_ERROR =
  `The package '@extence/react-native-appmetrica' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo managed workflow\n';

const ReactNativeAppmetrica = NativeModules.ReactNativeAppmetrica  ? NativeModules.ReactNativeAppmetrica  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

export function multiply(a: number, b: number): Promise<number> {
  return ReactNativeAppmetrica.multiply(a, b);
}
