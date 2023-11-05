import {
  StyleSheet,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {colors} from '../utils/colors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import * as Animatable from 'react-native-animatable';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import {WEB_CLIENT_ID} from '../Config';
const Home = ({navigation}) => {
  const lowerCardRef = useRef(null);
  const upperCardRef = useRef(null);

  const onAuthStateChanged = user => {
    navigation.navigate('Dashboard');
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  useEffect(() => {
    if (lowerCardRef.current) {
      lowerCardRef.current.slideInUp(1000);
    }
    if (upperCardRef.current) {
      upperCardRef.current.slideInDown(1000);
    }
  }, []);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: WEB_CLIENT_ID,
    });
  }, []);

  const googleSignInBtnHandler = async () => {
    await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
    const {idToken} = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    return auth().signInWithCredential(googleCredential);
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <Animatable.View
        style={styles.upperCard}
        ref={upperCardRef}
        animation="slideInDown"
        duration={1000}>
        <Image
          source={require('../assets/logo.png')}
          style={{width: 130, height: 130, objectFit: 'contain'}}
        />
        <Text style={styles.title}>
          LINK <Text style={{color: colors.green}}>FOREST</Text>
        </Text>
        <Text style={styles.subtitle}>Unify your online presence</Text>
      </Animatable.View>
      <Animatable.View
        style={styles.lowerCard}
        ref={lowerCardRef}
        animation="slideInUp"
        duration={1000}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.googleBtn}
          onPress={() =>
            googleSignInBtnHandler()
              .then(() => navigation.navigate('Dashboard'))
              .catch(error =>
                ToastAndroid.show(`Error: ${error}`, ToastAndroid.BOTTOM),
              )
          }>
          <Text style={styles.googleTxt}>Continue With Google </Text>
          <FontAwesome
            name="google"
            color={colors.dark}
            size={22}
            style={{marginLeft: 4}}
          />
        </TouchableOpacity>
      </Animatable.View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.light,
  },
  upperCard: {
    height: '80%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.light,
    position: 'relative',
  },
  title: {
    fontFamily: 'Montserrat-Bold',
    color: colors.dark,
    marginTop: 30,
    fontSize: 32,
  },
  subtitle: {
    fontFamily: 'Montserrat-SemiBold',
    color: colors.dark,
    marginTop: 6,
    fontSize: 20,
  },
  lowerCard: {
    borderTopEndRadius: 25,
    borderTopStartRadius: 25,
    height: '20%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.green,
  },
  googleBtn: {
    backgroundColor: colors.light,
    padding: 14,
    width: '85%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 14,
  },
  googleTxt: {
    fontFamily: 'Montserrat-SemiBold',
    color: colors.dark,
    fontSize: 20,
  },
});
