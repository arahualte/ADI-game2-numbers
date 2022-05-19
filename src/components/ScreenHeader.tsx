import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors} from '../constants/gameConstants';

const ScreenHeader = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crazy Numbers</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: colors.lightgrey,
    fontSize: 32,
    fontWeight: 'bold',
    letterSpacing: 5,
  },
});

export default ScreenHeader;
