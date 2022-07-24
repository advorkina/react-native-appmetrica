# @extence/react-native-appmetrica
React Native wrapper around AppMetrica
## Installation

```sh
npm install @extence/react-native-appmetrica
```

## Usage

```js
import {initialize, reportEvent} from '@extence/react-native-appmetrica';

// ...

const config = { // config is not required
  revenueAutoTrackingEnabled: true,
  appVersion: '1.0.0'
};
initialize(SDK_KEY, config);
reportEvent(event, params);

```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
