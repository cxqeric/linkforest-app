import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import DraggableFlatList, {
  ScaleDecorator,
} from 'react-native-draggable-flatlist';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Navigation from '../Components/Navigation';
import {colors} from '../../utils/colors';
import Icon from 'react-native-vector-icons/Ionicons';
import firestore from '@react-native-firebase/firestore';
import {useSelector} from 'react-redux';

const Links = () => {
  const [loading, setLoading] = useState(false);
  const data = useSelector(state => state.dataSlice.userData);
  const [websites, setWebsites] = useState([]);

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
      <DraggableFlatList
        data={websites}
        onDragEnd={({data}) => saveChangesHandler(data)}
        keyExtractor={item => item.index.toString()}
        renderItem={renderItem}
        style={{width: '100%'}}
        contentContainerStyle={styles.flatListContainer}
      />
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
  },
});

export default Links;
