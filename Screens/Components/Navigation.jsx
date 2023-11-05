import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {colors} from '../../utils/colors';

const Navigation = () => {
  return (
    <View style={styles.navWrapper}>
      <Text style={styles.navTxt}>LINK FOREST</Text>
    </View>
  );
};

export default Navigation;

const styles = StyleSheet.create({
  navWrapper: {
    width: '90%',
    marginVertical: 20,
    backgroundColor: colors.green,
    elevation: 20,
    paddingVertical: 18,
    borderRadius: 12,
    shadowColor: colors.green,
    shadowOffset: {
      height: 4,
      width: 4,
    },
  },
  navTxt: {
    fontFamily: 'Montserrat-Bold',
    color: colors.dark,
    textAlign: 'center',
    fontSize: 20,
    letterSpacing: 2,
  },
});
