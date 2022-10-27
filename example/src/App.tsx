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
    const params = {
      price: '100',
      currency: 'BYN',
      orderId: 'someOrderID',
      productId: 'someProductID',
      quantity: 2,
      source: 'AppStore',
    };
    reportPurchase(params);
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
