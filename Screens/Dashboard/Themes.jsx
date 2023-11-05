import {StyleSheet, Text, View, SafeAreaView} from 'react-native';
import React from 'react';
import Navigation from '../Components/Navigation';

const Themes = () => {
  return (
    <SafeAreaView style={styles.wrapper}>
      <Navigation />
    </SafeAreaView>
  );
};

export default Themes;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
  },
});
