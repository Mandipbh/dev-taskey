import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon1 from 'react-native-vector-icons/Foundation';
import Icon2 from 'react-native-vector-icons/Feather';
import {Label, Title} from '../../components';
import {moderatedScale, scale, theme} from '../../utils';
import {folders, tasksData} from '../../utils/mockData';
import RoundIcon from '../../components/RoundIcon';
import {useNavigation} from '@react-navigation/native';

const HomeScreen = () => {
  const [folderData, setFolderData] = useState(folders);
  const [selectedFolder, setSelectedFolder] = useState(0);
  const navigation = useNavigation();
  const rendertasks = ({item, index}) => {
    return (
      <TouchableOpacity
        style={[
          styles.taskCard,
          {borderColor: item.color, borderWidth: scale(1)},
        ]}>
        <Title title={item.title} />
        <Label title={item.desc} />
        <View style={styles.cardBottom}>
          <View style={styles.folderView}>
            <Icon2
              name="folder"
              size={scale(16)}
              color={theme.colors.primary}
            />
            <Label title={` ${item.folder}`} style={{fontWeight: '600'}} />
          </View>
          <Label title={'02-11-2022'} />
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <View style={[styles.headerContainer, styles.shadow]}>
          <Icon1
            name="clipboard-notes"
            size={scale(27)}
            color={theme.colors.primary}
          />
          <Title title="TASKEY" style={{marginLeft: scale(30)}} />
          <View
            style={[
              styles.row,
              {width: scale(70), justifyContent: 'space-around'},
            ]}>
            <Icon2
              name="search"
              size={scale(25)}
              color={theme.colors.primary}
            />
            <Icon2 name="bell" size={scale(25)} color={theme.colors.primary} />
          </View>
        </View>
        <View>
          <ScrollView
            horizontal
            style={styles.tabViewCon}
            showsHorizontalScrollIndicator={false}>
            {folderData.map((f, i) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    setSelectedFolder(f.id);
                  }}
                  style={[
                    styles.tabView,
                    {
                      backgroundColor:
                        f.id === selectedFolder
                          ? theme.colors.black
                          : theme.colors.white,
                    },
                  ]}>
                  <Label
                    title={f.name}
                    style={{
                      color:
                        f.id === selectedFolder
                          ? theme.colors.white
                          : theme.colors.black,
                    }}
                  />
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
        <View>
          <Label title={'Tasks'} style={styles.subt} />
          <FlatList
            style={{height: theme.SCREENHEIGHT * 0.67}}
            contentContainerStyle={{
              paddingVertical: scale(10),
              paddingBottom: theme.SCREENHEIGHT * 0.03,
            }}
            data={tasksData}
            renderItem={rendertasks}
            showsVerticalScrollIndicator={false}
          />
          <RoundIcon
            style={styles.roundIcon}
            name={'plus'}
            onPress={() => {
              navigation.navigate('CreateTask');
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
    paddingHorizontal: moderatedScale(15),
  },
  headerContainer: {
    height: scale(55),
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: scale(0.2),
    borderColor: theme.colors.gray,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  tabView: {
    backgroundColor: theme.colors.black,
    padding: scale(10),
    marginHorizontal: scale(5),
    borderRadius: scale(10),
  },

  tabViewCon: {
    backgroundColor: theme.colors.gray1,
    paddingVertical: scale(8),
    paddingHorizontal: scale(5),
    borderRadius: scale(8),
    marginVertical: scale(10),
  },
  taskCard: {
    padding: scale(8),
    paddingVertical: scale(13),
    marginVertical: scale(4),
    borderRadius: scale(8),
  },
  cardBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: scale(10),
  },
  roundIcon: {
    bottom: 20,
    right: 25,
    position: 'absolute',
  },
  folderView: {flexDirection: 'row', alignItems: 'center'},
  subt: {
    marginLeft: scale(3),
    fontWeight: '600',
    fontSize: scale(14),
    marginBottom: scale(5),
  },
});
