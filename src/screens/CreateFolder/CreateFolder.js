import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/FontAwesome';
import {scale, theme} from '../../utils';
import CommonHeader from '../../components/CommonHeader';
import {CreateFolderModel, Label} from '../../components';
import {folders} from '../../utils/mockData';

const CreateFolder = () => {
  const [newFolderM, setnewFolderM] = useState(false);
  const [folderData, setFolders] = useState(folders);

  function getRandomColor() {
    var letters = 'BCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * letters.length)];
    }
    return color;
  }
  const renderFolders = ({item, index}) => {
    return (
      <TouchableOpacity
        key={index}
        style={[
          styles.folderContainer,
          {backgroundColor: getRandomColor(0, 4)},
        ]}>
        <Icon name="folder" size={scale(65)} color={item.color} />
        <Label title={item?.name} style={styles.noteTitle} numberOfLines={1} />
        <Label
          title={`${item?.notes ? item?.notes : 0} Notes`}
          style={styles.count}
        />
      </TouchableOpacity>
    );
  };
  const handleSaveFolder = (c, f) => {
    setnewFolderM(false);
    if (f != null && c != null) {
      let obj = {
        id: Math.ceil(Math.random() * 2134345610),
        name: f,
        color: c,
        notes: 5,
      };
      folderData.push(obj);
    }
  };
  return (
    <>
      <CommonHeader
        headerTitle="Folders"
        iconName="pluscircleo"
        IconType={AntDesign}
        onRightIconPress={() => {
          setnewFolderM(true);
        }}
      />
      <View style={styles.container}>
        <View style={[styles.row, {justifyContent: 'space-between'}]}>
          <Label title="Folder list" style={styles.title} />
          <TouchableOpacity style={styles.sortCon}>
            <Label title="New  " style={styles.title1} />
            <Icon name="unsorted" size={scale(20)} />
          </TouchableOpacity>
        </View>

        <FlatList
          style={{marginTop: scale(10)}}
          numColumns={2}
          data={folderData}
          renderItem={renderFolders}
          showsVerticalScrollIndicator={false}
        />
        <CreateFolderModel isVisible={newFolderM} close={handleSaveFolder} />
      </View>
    </>
  );
};

export default CreateFolder;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
    paddingHorizontal: scale(13),
    paddingTop: scale(10),
  },
  title: {
    fontSize: scale(16),
    fontWeight: '600',
  },
  title1: {
    fontSize: scale(13),
    fontWeight: '500',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sortCon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  folderContainer: {
    padding: scale(10),
    height: scale(150),
    marginHorizontal: scale(5),
    width: '47%',
    marginVertical: scale(5),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scale(15),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  noteTitle: {
    fontSize: scale(14),
    fontWeight: '500',
    marginTop: scale(3),
  },
  count: {
    marginTop: scale(5),
  },
});
