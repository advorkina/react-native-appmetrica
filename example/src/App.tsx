import * as React from 'react';

import { StyleSheet, View, Button } from 'react-native';
import { reportEvent, initialize } from '@extence/react-native-appmetrica';

export default function App() {
  initialize('API_KEY');

  const onPress = () => {
    reportEvent('event');
  };

  return (
    <View style={styles.container}>
      <Button title={'Report Event'} onPress={onPress} />
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
