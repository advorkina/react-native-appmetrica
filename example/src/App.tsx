import * as React from 'react';

import { StyleSheet, View, Button } from 'react-native';
import {
  reportEvent,
  initialize,
  reportPurchase,
} from '@extence/react-native-appmetrica';

export default function App() {
  initialize('API_KEY');

  const onReportEventPress = () => {
    reportEvent('event');
  };

  const onReportPurchasePress = () => {
    reportPurchase('100', 'BYN', 'someID', 2, 'someOrderID', 'AppStore');
  };

  return (
    <View style={styles.container}>
      <Button title={'Report Event'} onPress={onReportEventPress} />
      <Button title={'Report Purchase'} onPress={onReportPurchasePress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
