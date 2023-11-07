import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {colors} from '../utils/colors';
import firestore, {Filter} from '@react-native-firebase/firestore';
import {useDispatch, useSelector} from 'react-redux';
import {setData} from '../Redux Toolkit/user';
const Username = ({route, navigation}) => {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const dispatch = useDispatch();
  const data = useSelector(state => state.userSlice.data);
  console.log(data);
  const setUsernameHandler = async () => {
    if (username.length > 5) {
      ToastAndroid.show('Checking Username', ToastAndroid.BOTTOM);
      const usernameQuery = await firestore()
        .collection('Link Forests')
        .where('username', '==', username)
        .get();

      if (!usernameQuery.empty) {
        ToastAndroid.show('Username Already Exists!', ToastAndroid.BOTTOM);
      } else {
        setLoading(true);
        firestore()
          .collection('Link Forests')
          .doc(route.params.data.uid)
          .set({
            themeType: 'default',
            username: username.replaceAll(' ', '').toLowerCase(),
          })
          .then(() => {
            dispatch(
              setData({username: username.replaceAll(' ', '').toLowerCase()}),
            );
            navigation.navigate('Dashboard');
          });
      }
    }
  };
  return (
    <SafeAreaView style={styles.wrapper}>
      {loading ? (
        <View
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <ActivityIndicator color={colors.light} size={'large'} />
        </View>
      ) : (
        <View style={styles.content}>
          <Text style={styles.inputTxt}>Enter Username</Text>
          <TextInput
            style={styles.inputField}
            value={username}
            onChangeText={text => setUsername(text)}
          />
          <TouchableOpacity
            activeOpacity={0.8}
            style={{
              backgroundColor: colors.green,
              paddingHorizontal: 18,
              paddingVertical: 10,
              borderRadius: 4,
              marginTop: 16,
            }}
            onPress={setUsernameHandler}>
            <Text
              style={{
                fontFamily: 'Montserrat-SemiBold',
                color: colors.dark,
                fontSize: 16,
              }}>
              Set Username
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Username;

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.green,
    flex: 1,
  },
  content: {
    backgroundColor: colors.light,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    paddingHorizontal: 20,
    marginBottom: 18,
    width: '90%',
  },
  inputField: {
    fontFamily: 'Montserrat-Medium',
    color: colors.dark,
    fontSize: 14,
    borderRadius: 6,
    borderWidth: 1.4,
    width: '100%',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderColor: colors.gray,
  },
  inputTxt: {
    fontFamily: 'Montserrat-Bold',
    color: colors.dark,
    fontSize: 20,
    marginBottom: 14,
    textAlign: 'left',
    width: '100%',
  },
});
