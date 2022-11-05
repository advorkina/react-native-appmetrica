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
      price: '1000',
      currency: 'RUB',
      orderId: 'someOrderID',
      productId: 'someProductID',
      quantity: 1,
      source: 'AppStore',
    };
    reportPurchase(params, 'API_KEY');
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
});
