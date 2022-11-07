import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import Icon1 from 'react-native-vector-icons/Foundation';
import Icon2 from 'react-native-vector-icons/Feather';
import {Label, Title} from '../../components';
import {images, scale, theme} from '../../utils';
import {folders, tasksData} from '../../utils/mockData';
import RoundIcon from '../../components/RoundIcon';
import {useNavigation} from '@react-navigation/native';

const HomeScreen = () => {
  const [folderData, setFolderData] = useState(folders);
  const [selectedFolder, setSelectedFolder] = useState(0);
  const navigation = useNavigation();
  const [selectedType, setType] = useState(1);

  const taskType = [
    {
      id: 1,
      title: 'CRONO TASKS',
      totalTime: '200 min',
      icon: images.stopWatch,
    },
    {
      id: 2,
      title: 'TIMER TASKS',
      totalTime: '200 min',
      icon: images.timer,
    },
    {
      id: 3,
      title: 'COUNTER TASKS',
      totalTime: '200 min',
      icon: images.counter,
    },
  ];

  const rendertasks = ({item, index}) => {
    return (
      <TouchableOpacity
        style={[
          styles.taskCard,
          {borderColor: item.color, borderWidth: scale(1)},
        ]}
        key={index}
        onPress={() => {
          navigation.navigate('TaskDetails', {note: item});
        }}>
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
        <View style={styles.headerContainer}>
          {/* <Icon1
            name="clipboard-notes"
            size={scale(27)}
            color={theme.colors.primary}
          /> */}
          {/* <Title title="TASKEY" style={{marginLeft: scale(30)}} /> */}
          <View style={styles.taskContainer}>
            {taskType?.map((type, index) => {
              return (
                type.id === selectedType && (
                  <>
                    <Image
                      source={type.icon}
                      style={{
                        height: scale(25),
                        width: scale(25),
                        resizeMode: 'contain',
                      }}
                    />
                    <View style={styles.taskCon}>
                      <Icon2
                        name="chevron-left"
                        size={scale(30)}
                        onPress={() => {
                          selectedType > 1 ? setType(type.id - 1) : null;
                        }}
                      />
                      <View style={styles.selctCon}>
                        <Label key={index} title={type?.title} />
                        <Label
                          title={`Total = ${type?.totalTime}`}
                          style={styles.time}
                        />
                      </View>
                      <Icon2
                        name="chevron-right"
                        size={scale(30)}
                        onPress={() => {
                          selectedType <= 2 ? setType(type.id + 1) : null;
                        }}
                      />
                    </View>
                  </>
                )
              );
            })}
          </View>

          <View
            style={[
              styles.row,
              // {width: scale(70), justifyContent: 'space-around'},
            ]}>
            <Label title={'Today  '} style={{fontWeight: '600'}} />
            <Icon2
              name="calendar"
              size={scale(25)}
              color={theme.colors.primary}
            />
          </View>
        </View>
        <View style={styles.mainCOntainer}>
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
            <View style={styles.dataCon}>
              <Label title={'Tasks'} style={styles.subt} />
              <Icon2 name="calendar" size={scale(22)} />
            </View>

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
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  headerContainer: {
    height: scale(55),
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: scale(0.2),
    borderColor: theme.colors.gray,
    paddingHorizontal: scale(15),
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
  dataCon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  mainCOntainer: {
    paddingHorizontal: scale(13),
  },
  time: {
    fontSize: scale(11),
    alignItems: 'center',
  },
  taskCon: {
    flexDirection: 'row',
    width: theme.SCREENWIDTH * 0.4,
    marginLeft: theme.SCREENWIDTH * 0.1,
  },
  selctCon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  taskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
