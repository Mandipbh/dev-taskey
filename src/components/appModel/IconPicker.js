import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {scale, theme} from '../../utils';
import Modal from 'react-native-modal';
import {Icon_Data} from '../../utils/mockData';
import {useNavigation} from '@react-navigation/native';
import ApiService from '../../utils/ApiService';
import FastImage from 'react-native-fast-image';

const IconPicker = props => {
  const {isVisible, close} = props;
  const [selected, setSelected] = useState(null);
  const [iconList, setIconList] = useState([]);
  useEffect(() => {
    try {
      ApiService.get('icons').then(res => {
        setIconList(res.data?.reverse());
      });
    } catch (error) {
      console.log('error ', error);
    }
  }, []);
  const renderItem = ({item}) => {
    const backgroundColor = selected === item ? theme.colors.orange : null;

    return (
      <TouchableOpacity
        onPress={() => setSelected(item)}
        style={{
          // width: '33%',
          // padding: scale(3),
          backgroundColor: backgroundColor,
          margin: scale(5),
          paddingVertical: scale(15),
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <FastImage
          resizeMode={FastImage.resizeMode.contain}
          style={{
            height: scale(60),
            width: theme.SCREENWIDTH * 0.3,
            margin: 1,
          }}
          source={{uri: item?.iconUrl}}
        />
      </TouchableOpacity>
    );
  };

  return (
    <Modal
      isVisible={isVisible}
      style={{marginTop: theme.SCREENHEIGHT * 0.25, margin: 0}}>
      <View style={styles.container}>
        <Text style={styles.titleText}>Choose Icon</Text>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{width: '100%'}}>
          <FlatList
            numColumns={3}
            data={iconList}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          />
        </ScrollView>
        <View style={styles.btnContainer}>
          <TouchableOpacity onPress={() => close()} style={styles.saveBtn}>
            <Text style={styles.btnText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => close(selected)}
            style={[styles.saveBtn, {backgroundColor: theme.colors.orange}]}>
            <Text style={[styles.btnText, {color: theme.colors.white}]}>
              Apply
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default IconPicker;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
    borderRadius: 20,
    padding: scale(5),
  },
  titleText: {
    fontSize: 20,
    fontWeight: '500',
    color: theme.colors.black,
    alignSelf: 'center',
    marginVertical: scale(15),
  },
  saveBtn: {
    padding: 10,
    width: '45%',
    alignItems: 'center',
    borderRadius: 25,
  },
  btnContainer: {
    marginVertical: 15,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  btnText: {
    fontSize: 16,
    fontWeight: '500',
    color: theme.colors.red,
  },
});
