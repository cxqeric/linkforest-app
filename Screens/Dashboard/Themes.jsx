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
import {BannerAd, BannerAdSize, TestIds} from 'react-native-google-mobile-ads';
import {THEMES_BANNER} from '../../AdsData';

const adUnitId = __DEV__ ? TestIds.BANNER : THEMES_BANNER;

const Themes = () => {
  const data = useSelector(state => state.userSlice.data);
  const uid = useSelector(state => state.userSlice.uid);
  const dispatch = useDispatch();

  const saveChangesHandler = async theme => {
    try {
      await firestore()
        .collection('Link Forests')
        .doc(uid)
        .update({
          ...theme,
        });
      ToastAndroid.show('Theme Updated', ToastAndroid.BOTTOM);
    } catch (error) {
      console.log(error);
      ToastAndroid.show('Error updating Theme', ToastAndroid.SHORT);
    }
  };

  const themeChangeHandler = type => {
    if (type === 'Default') {
      dispatch(
        setData({
          theme: 'Default',
          customTheme: {
            background: '#ffffff',
            textColor: '#000',
            linkBackground: '#e2e8f0',
            linkColor: '#000',
          },
        }),
      );
      update = {
        theme: 'Default',
        customTheme: {
          background: '#ffffff',
          textColor: '#000',
          linkBackground: '#e2e8f0',
          linkColor: '#000',
        },
      };
    } else if (type === 'Dark') {
      dispatch(
        setData({
          theme: 'Dark',
          customTheme: {
            background: '#181818',
            textColor: '#ffffff',
            linkBackground: '#e7e7e7',
            linkColor: '#181818',
          },
        }),
      );
      update = {
        theme: 'Dark',
        customTheme: {
          background: '#181818',
          textColor: '#ffffff',
          linkBackground: '#e7e7e7',
          linkColor: '#181818',
        },
      };
    } else if (type === 'Minimal') {
      dispatch(
        setData({
          theme: 'Minimal',
          customTheme: {
            background: '#fff',
            textColor: '#000',
            linkBackground: '#fff',
            linkColor: '#000',
            stroke: '#000',
          },
        }),
      );
      update = {
        theme: 'Minimal',
        customTheme: {
          background: '#fff',
          textColor: '#000',
          linkBackground: '#fff',
          linkColor: '#000',
          stroke: '#000',
        },
      };
    } else if (type === 'Link Forest') {
      dispatch(
        setData({
          theme: 'Link Forest',
          customTheme: {
            background: '#d1fae5',
            textColor: '#000',
            linkBackground: '#34d399',
            linkColor: '#000',
          },
        }),
      );
      update = {
        theme: 'Link Forest',
        customTheme: {
          background: '#d1fae5',
          textColor: '#000',
          linkBackground: '#34d399',
          linkColor: '#000',
        },
      };
    } else if (type === 'Sky Blue') {
      dispatch(
        setData({
          theme: 'Sky Blue',
          customTheme: {
            background: '#fff',
            textColor: '#000',
            linkBackground: '#38bdf8',
            linkColor: '#000',
          },
        }),
      );
      update = {
        theme: 'Sky Blue',
        customTheme: {
          background: '#fff',
          textColor: '#000',
          linkBackground: '#38bdf8',
          linkColor: '#000',
        },
      };
    } else if (type === 'Shades Of Sky') {
      dispatch(
        setData({
          theme: 'Shades Of Sky',
          customTheme: {
            background: '#fff',
            textColor: '#000',
            linkBackground: '#bae6fd',
            linkColor: '#0c4a6e',
            stroke: '#0c4a6e',
          },
        }),
      );
      update = {
        theme: 'Shades Of Sky',
        customTheme: {
          background: '#fff',
          textColor: '#000',
          linkBackground: '#bae6fd',
          linkColor: '#0c4a6e',
          stroke: '#0c4a6e',
        },
      };
    }
    saveChangesHandler(update);
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
              onPress={() => themeChangeHandler('Default')}
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
              onPress={() => themeChangeHandler('Link Forest')}
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
              onPress={() => themeChangeHandler('Dark')}
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
              onPress={() => themeChangeHandler('Minimal')}
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
              onPress={() => themeChangeHandler('Shades Of Sky')}
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
              onPress={() => themeChangeHandler('Sky Blue')}
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
        {/* <Text
          style={{
            color: colors.dark,
            fontFamily: 'Montserrat-Medium',
            textAlign: 'center',
            lineHeight: 22,
          }}>
          Themes are specially designed for the Links, So Add Links To See The
          Difference!
        </Text> */}
      </ScrollView>
      <BannerAd
        unitId={adUnitId}
        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
        }}
      />
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
