import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import Navigation from '../Components/Navigation';
import {colors} from '../../utils/colors';

const Themes = () => {
  const defaultThemeSelectHandler = type => {
    let update = {};
    if (type === 'default') {
      contextData.setData({
        ...contextData.data,
        themeType: 'default',
        theme: 'Default',
        customTheme: {
          background: '#ffffff',
          textColor: '#000',
          linkBackground: '#e2e8f0',
          linkColor: '#000',
        },
      });
      update = {
        themeType: 'default',
        theme: 'Default',
        customTheme: {
          background: '#ffffff',
          textColor: '#000',
          linkBackground: '#e2e8f0',
          linkColor: '#000',
        },
      };
    } else if (type === 'dark') {
      contextData.setData({
        ...contextData.data,
        themeType: 'default',
        theme: 'Dark',
        customTheme: {
          background: '#181818',
          textColor: '#ffffff',
          linkBackground: '#e7e7e7',
          linkColor: '#181818',
        },
      });
      update = {
        themeType: 'default',
        theme: 'Dark',
        customTheme: {
          background: '#181818',
          textColor: '#ffffff',
          linkBackground: '#e7e7e7',
          linkColor: '#181818',
        },
      };
    } else if (type === 'minimal') {
      contextData.setData({
        ...contextData.data,
        themeType: 'default',
        theme: 'Minimal',
        customTheme: {
          background: '#fff',
          textColor: '#000',
          linkBackground: '#fff',
          linkColor: '#000',
          stroke: '#000',
        },
      });
      update = {
        themeType: 'default',
        theme: 'Minimal',
        customTheme: {
          background: '#fff',
          textColor: '#000',
          linkBackground: '#fff',
          linkColor: '#000',
          stroke: '#000',
        },
      };
    } else if (type === 'linkforest') {
      contextData.setData({
        ...contextData.data,
        themeType: 'default',
        theme: 'Link Forest',
        customTheme: {
          background: '#d1fae5',
          textColor: '#000',
          linkBackground: '#34d399',
          linkColor: '#000',
        },
      });
      update = {
        themeType: 'default',
        theme: 'Link Forest',
        customTheme: {
          background: '#d1fae5',
          textColor: '#000',
          linkBackground: '#34d399',
          linkColor: '#000',
        },
      };
    } else if (type === 'sky blue') {
      contextData.setData({
        ...contextData.data,
        themeType: 'default',
        theme: 'Sky Blue',
        customTheme: {
          background: '#fff',
          textColor: '#000',
          linkBackground: '#38bdf8',
          linkColor: '#000',
        },
      });
      update = {
        themeType: 'default',
        theme: 'Sky Blue',
        customTheme: {
          background: '#fff',
          textColor: '#000',
          linkBackground: '#38bdf8',
          linkColor: '#000',
        },
      };
    } else if (type === 'shades of sky') {
      contextData.setData({
        ...contextData.data,
        themeType: 'default',
        theme: 'Shades Of Sky',
        customTheme: {
          background: '#fff',
          textColor: '#000',
          linkBackground: '#bae6fd',
          linkColor: '#0c4a6e',
          stroke: '#0c4a6e',
        },
      });
      update = {
        themeType: 'default',
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
    updateValueHandler(update);
  };
  return (
    <SafeAreaView style={styles.wrapper}>
      <Navigation title={'THEMES'} />
      <ScrollView style={{width: '90%'}}>
        <View style={styles.content}>
          <Text
            style={{
              fontFamily: 'Montserrat-SemiBold',
              fontSize: 18,
              color: colors.dark,
              marginTop: 16,
              marginBottom: 14,
            }}>
            Predefined Themes
          </Text>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'space-evenly',
            }}>
            <TouchableOpacity style={styles.imageContainer}>
              <Image
                source={require('../../assets/themes/Default.png')}
                style={styles.imageStyle}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.imageContainer}>
              <Image
                source={require('../../assets/themes/LinkForest.png')}
                style={styles.imageStyle}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.imageContainer}>
              <Image
                source={require('../../assets/themes/Dark.png')}
                style={styles.imageStyle}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.imageContainer}>
              <Image
                source={require('../../assets/themes/Minimal.png')}
                style={styles.imageStyle}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.imageContainer}>
              <Image
                source={require('../../assets/themes/ShadesOfSky.png')}
                style={styles.imageStyle}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.imageContainer}>
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
  },
  imageContainer: {
    width: '25%',
    margin: 10,
  },
  imageStyle: {
    width: '100%',
    objectFit: 'contain',
    height: 100,
    aspectRatio: 1,
  },
});
