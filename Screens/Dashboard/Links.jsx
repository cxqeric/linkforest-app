import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
  Modal,
  TextInput,
} from 'react-native';
import DraggableFlatList, {
  ScaleDecorator,
} from 'react-native-draggable-flatlist';
import {
  GestureHandlerRootView,
  PanGestureHandler,
  State,
} from 'react-native-gesture-handler';
import Navigation from '../Components/Navigation';
import {colors} from '../../utils/colors';
import Icon from 'react-native-vector-icons/Ionicons';
import firestore from '@react-native-firebase/firestore';
import {useSelector} from 'react-redux';

const Links = () => {
  const [loading, setLoading] = useState(false);
  const data = useSelector(state => state.userSlice.data);
  const [websites, setWebsites] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const handleStateChange = event => {
    console.log(event.nativeEvent.state);
    if (event.nativeEvent.state === State.END) {
      if (event.nativeEvent.translationY > 150) {
        setModalVisible(false);
      }
    }
  };

  useEffect(() => {
    getDataHandler();
  }, []);

  const saveChangesHandler = updatedData => {
    setWebsites(updatedData);
    const dataObject = updatedData.reduce((result, item, index) => {
      result[index] = {link: item.link, title: item.title};
      return result;
    }, {});
    setLoading(true);
    firestore()
      .collection('Link Forests')
      .doc(data.uid)
      .set(
        {
          websites: dataObject,
        },
        {merge: true},
      )
      .then(() => {
        setLoading(false);
        ToastAndroid.show('Website Updated', ToastAndroid.BOTTOM);
      });
  };

  const getDataHandler = async () => {
    const user = await firestore()
      .collection('Link Forests')
      .doc(data.uid)
      .get();
    if (user.data().websites) {
      const dataArray = Object.keys(user.data().websites).map(index => ({
        index: parseInt(index),
        link: user.data().websites[index].link,
        title: user.data().websites[index].title,
      }));
      setWebsites(dataArray);
    }
  };

  const renderItem = ({item, drag, isActive}) => {
    return (
      <ScaleDecorator>
        <TouchableOpacity
          style={styles.card}
          onLongPress={drag}
          disabled={isActive}
          activeOpacity={0.8}>
          <Icon
            name="ellipsis-vertical-outline"
            color={colors.gray}
            size={26}
            style={{marginRight: 6}}
          />
          <View style={{flex: 1}}>
            <Text style={styles.title} numberOfLines={1}>
              {item.title}
            </Text>
            <Text style={styles.link} numberOfLines={1}>
              {item.link}
            </Text>
          </View>
        </TouchableOpacity>
      </ScaleDecorator>
    );
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <Navigation title="LINKS" />
      <TouchableOpacity
        style={styles.addBtn}
        onPress={() => setModalVisible(true)}>
        <Text style={styles.addTxt}>Add Link</Text>
      </TouchableOpacity>
      <DraggableFlatList
        data={websites}
        onDragEnd={({data}) => saveChangesHandler(data)}
        keyExtractor={item => item.index.toString()}
        renderItem={renderItem}
        style={{width: '100%'}}
        contentContainerStyle={styles.flatListContainer}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <PanGestureHandler onHandlerStateChange={handleStateChange}>
          <View style={styles.modal}>
            <View style={styles.slideBlock}></View>
            <TouchableOpacity
              style={{position: 'absolute', right: 30, top: 20}}
              activeOpacity={0.8}
              onPress={() => setModalVisible(false)}>
              <Icon name="close" size={30} color={colors.gray} />
            </TouchableOpacity>
            <View style={{marginTop: 15}}>
              <TextInput
                placeholder="Website Title"
                style={styles.inputField}
              />
              <TextInput placeholder="Website Link" style={styles.inputField} />
              <TouchableOpacity
                style={styles.addBtn}
                onPress={() => setModalVisible(true)}>
                <Text style={styles.addTxt}>Add Link</Text>
              </TouchableOpacity>
            </View>
          </View>
        </PanGestureHandler>
      </Modal>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    backgroundColor: colors.light,
    maxWidth: '95%',
    minWidth: '95%',
    alignSelf: 'center',
    borderRadius: 10,
    marginBottom: 14,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 14,
  },
  title: {
    fontFamily: 'Montserrat-SemiBold',
    color: colors.dark,
    fontSize: 16,
    marginBottom: 4,
  },
  link: {
    fontFamily: 'Montserrat-Medium',
    color: colors.dark,
    fontSize: 15,
  },
  flatListContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 14,
  },
  addBtn: {
    backgroundColor: colors.green,
    width: '80%',
    alignSelf: 'center',
    borderRadius: 100,
    padding: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  addTxt: {
    textAlign: 'center',
    fontFamily: 'Montserrat-Bold',
    color: colors.dark,
    fontSize: 18,
  },
  inputField: {
    fontFamily: 'Montserrat-Medium',
    color: colors.dark,
    fontSize: 14,
    borderRadius: 6,
    borderWidth: 1.4,
    borderColor: colors.gray,
    paddingVertical: 8,
    paddingHorizontal: 10,
    width: '90%',
    alignSelf: 'center',
    marginBottom: 14,
  },
  slideBlock: {
    height: 6,
    backgroundColor: colors.gray,
    width: 38,
    alignSelf: 'center',
    borderRadius: 100,
    marginBottom: 20,
    position: 'absolute',
    top: 20,
  },
  modal: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: colors.light,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    elevation: 10,
    width: '100%',
    height: 260,
    paddingTop: 20,
    display: 'flex',
    justifyContent: 'center',
  },
});

export default Links;
