import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import React from 'react';
import Navigation from '../Components/Navigation';
import {colors} from '../../utils/colors';
import {useDispatch, useSelector} from 'react-redux';
import {setData} from '../../Redux Toolkit/user';
import firestore from '@react-native-firebase/firestore';

const Themes = () => {
  const data = useSelector(state => state.userSlice.data);
  const uid = useSelector(state => state.userSlice.uid);
  const dispatch = useDispatch();

  const saveChangesHandler = async theme => {
    // setLoading(true);
    try {
      await firestore()
        .collection('Link Forests')
        .doc(uid)
        .update({
          ...theme,
        });
      // setLoading(false);
      ToastAndroid.show('Theme Updated', ToastAndroid.BOTTOM);
    } catch (error) {
      // setLoading(false);
      console.log(error);
      ToastAndroid.show('Error updating Theme', ToastAndroid.SHORT);
    }
  };
  const themeChangeHandler = theme => {
    saveChangesHandler(theme);
    dispatch(setData({...theme}));
  };
  return (
    <SafeAreaView style={styles.wrapper}>
      <Navigation title={'THEMES'} />
      <ScrollView style={{width: '90%'}}>
        <View style={styles.content}>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'space-evenly',
            }}>
            <TouchableOpacity
              onPress={() => themeChangeHandler({theme: 'Default'})}
              style={[
                styles.imageContainer,
                data?.theme === 'Default' && {
                  borderWidth: 2,
                  borderColor: colors.dark,
                },
              ]}
              activeOpacity={0.8}>
              <Image
                source={require('../../assets/themes/Default.png')}
                style={styles.imageStyle}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => themeChangeHandler({theme: 'Link Forest'})}
              style={[
                styles.imageContainer,
                data?.theme === 'Link Forest' && {
                  borderWidth: 2,
                  borderColor: colors.dark,
                },
              ]}
              activeOpacity={0.8}>
              <Image
                source={require('../../assets/themes/LinkForest.png')}
                style={styles.imageStyle}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => themeChangeHandler({theme: 'Dark'})}
              style={[
                styles.imageContainer,
                data?.theme === 'Dark' && {
                  borderWidth: 2,
                  borderColor: colors.dark,
                },
              ]}
              activeOpacity={0.8}>
              <Image
                source={require('../../assets/themes/Dark.png')}
                style={styles.imageStyle}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => themeChangeHandler({theme: 'Minimal'})}
              style={[
                styles.imageContainer,
                data?.theme === 'Minimal' && {
                  borderWidth: 2,
                  borderColor: colors.dark,
                },
              ]}
              activeOpacity={0.8}>
              <Image
                source={require('../../assets/themes/Minimal.png')}
                style={styles.imageStyle}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => themeChangeHandler({theme: 'Shades Of Sky'})}
              style={[
                styles.imageContainer,
                data?.theme === 'Shades Of Sky' && {
                  borderWidth: 2,
                  borderColor: colors.dark,
                },
              ]}
              activeOpacity={0.8}>
              <Image
                source={require('../../assets/themes/ShadesOfSky.png')}
                style={styles.imageStyle}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => themeChangeHandler({theme: 'Sky Blue'})}
              style={[
                styles.imageContainer,
                data?.theme === 'Sky Blue' && {
                  borderWidth: 2,
                  borderColor: colors.dark,
                },
              ]}
              activeOpacity={0.8}>
              <Image
                source={require('../../assets/themes/SkyBlue.png')}
                style={styles.imageStyle}
              />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Themes;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
  },
  content: {
    backgroundColor: colors.light,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
    width: '100%',
    paddingVertical: 20,
  },
  imageContainer: {
    width: '40%',
    marginVertical: 10,
    backgroundColor: colors.light,
    borderRadius: 10,
    display: 'flex',
    justifyContent: 'center',
    paddingVertical: 14,
    alignItems: 'center',
  },
  imageStyle: {
    width: '100%',
    objectFit: 'cover',
    height: 100,
    aspectRatio: 1,
  },
});
