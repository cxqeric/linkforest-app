import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
  Modal,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import DraggableFlatList, {
  ScaleDecorator,
} from 'react-native-draggable-flatlist';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Navigation from '../Components/Navigation';
import {colors} from '../../utils/colors';
import Icon from 'react-native-vector-icons/Ionicons';
import firestore from '@react-native-firebase/firestore';
import {useDispatch, useSelector} from 'react-redux';
import {setData} from '../../Redux Toolkit/user';

const Links = () => {
  const [loading, setLoading] = useState(false);
  const data = useSelector(state => state.userSlice.data);
  const uid = useSelector(state => state.userSlice.uid);
  const [websites, setWebsites] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newLink, setNewLink] = useState({title: '', link: ''});
  const [editIndex, setEditIndex] = useState(-1);
  const dispatch = useDispatch();
  const saveChangesHandler = updatedData => {
    setWebsites(updatedData);
    const dataObject = updatedData.reduce((result, item, index) => {
      result[index] = {link: item.link, title: item.title};
      return result;
    }, {});
    dispatch(setData({websites: dataObject}));
    firestore()
      .collection('Link Forests')
      .doc(uid)
      .update({
        websites: dataObject,
      })
      .then(() => {});
  };

  useEffect(() => {
    if (data.websites) {
      const dataArray = Object.keys(data.websites).map(index => ({
        index: parseInt(index),
        link: data.websites[index].link,
        title: data.websites[index].title,
      }));
      setWebsites(dataArray);
    }
  }, [data]);

  const addNewLinkHandler = () => {
    if (newLink.title && newLink.link) {
      const updatedWebsites = [...websites];
      if (editIndex !== -1) {
        updatedWebsites[editIndex] = {...newLink, index: editIndex};
        setEditIndex(-1);
      } else {
        updatedWebsites.push({...newLink, index: websites.length});
      }
      saveChangesHandler(updatedWebsites);
      setNewLink({title: '', link: ''});
      setModalVisible(false);
    }
  };

  const editLinkHandler = index => {
    setEditIndex(index);
    let correctIndex = 0;
    Object.keys(websites).map(item => {
      if (websites[item].index === index) {
        correctIndex = item;
      }
    });
    setNewLink({
      title: websites[correctIndex].title,
      link: websites[correctIndex].link,
    });
    setModalVisible(true);
  };

  const deleteLinkHandler = () => {
    if (editIndex !== -1) {
      const updatedWebsites = websites.filter((_, i) => i !== editIndex);

      const newWebsites = updatedWebsites.map((item, index) => ({
        index,
        link: item.link,
        title: item.title,
      }));
      saveChangesHandler(newWebsites);
      setModalVisible(false);
      setEditIndex(-1);
      setNewLink({link: '', title: ''});
    }
  };

  const renderItem = ({item, drag, isActive}) => {
    return (
      <ScaleDecorator>
        <TouchableOpacity
          style={styles.card}
          onLongPress={drag}
          disabled={isActive}
          activeOpacity={0.8}
          onPress={() => editLinkHandler(item.index)}>
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
          {editIndex === item.index && (
            <TouchableOpacity
              onPress={() => setEditIndex(-1)}
              style={{padding: 10}}>
              <Icon name="checkmark" size={24} color={colors.green} />
            </TouchableOpacity>
          )}
        </TouchableOpacity>
      </ScaleDecorator>
    );
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <Navigation title="LINKS" />
      {!loading && (
        <>
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
            style={{width: '100%', height: '100%'}}
            contentContainerStyle={styles.flatListContainer}
          />
        </>
      )}
      {loading && (
        <View style={{flex: 1, justifyContent: 'center'}}>
          <ActivityIndicator color={colors.dark} size={'large'} />
        </View>
      )}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
          setEditIndex(-1);
          setNewLink({link: '', title: ''});
        }}>
        <View style={styles.modal}>
          <View style={styles.slideBlock}></View>
          <TouchableOpacity
            style={{position: 'absolute', right: 30, top: 20}}
            activeOpacity={0.8}
            onPress={() => {
              setModalVisible(false);
              setEditIndex(-1);
              setNewLink({link: '', title: ''});
            }}>
            <Icon name="close" size={30} color={colors.gray} />
          </TouchableOpacity>
          {editIndex !== -1 && (
            <TouchableOpacity
              style={{position: 'absolute', left: 30, top: 20}}
              activeOpacity={0.8}
              onPress={deleteLinkHandler}>
              <Icon name="trash-outline" size={24} color={'#ef4444'} />
            </TouchableOpacity>
          )}
          <View style={{marginTop: 15}}>
            <TextInput
              placeholder="Website Title"
              style={styles.inputField}
              placeholderTextColor={colors.gray}
              value={newLink.title}
              onChangeText={text => setNewLink({...newLink, title: text})}
            />
            <TextInput
              placeholder="Website Link"
              style={styles.inputField}
              placeholderTextColor={colors.gray}
              value={newLink.link}
              onChangeText={text => setNewLink({...newLink, link: text})}
            />
            <TouchableOpacity
              style={styles.addBtn}
              onPress={addNewLinkHandler}
              activeOpacity={0.8}>
              <Text style={styles.addTxt}>
                {editIndex === -1 ? 'Add Link' : 'Save Link'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
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
    fontSize: 14,
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
