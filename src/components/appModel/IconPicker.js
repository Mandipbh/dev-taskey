import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import {scale, theme} from '../../utils';
import Modal from 'react-native-modal';
import {Icon_Data} from '../../utils/mockData';
import {useNavigation} from '@react-navigation/native';

const IconPicker = props => {
  const {isVisible, close} = props;
  const [selected, setSelected] = useState(null);

  const renderItem = ({item}) => {
    const backgroundColor = selected === item ? theme.colors.main : null;
    return (
      <TouchableOpacity
        onPress={() => setSelected(item)}
        style={{width: '20%'}}>
        <Image
          resizeMode="contain"
          style={{height: scale(60), margin: 1, backgroundColor}}
          source={{uri: item.Image}}
        />
      </TouchableOpacity>
    );
  };

  return (
    <Modal isVisible={isVisible} style={{marginTop: scale(405), margin: 0}}>
      <View style={styles.container}>
        <Text style={styles.titleText}>Choose Icon</Text>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{width: '100%'}}>
          <FlatList
            numColumns={5}
            data={Icon_Data}
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
    color: theme.colors.black,
  },
});
