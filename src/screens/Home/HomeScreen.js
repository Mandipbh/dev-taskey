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
import Icon3 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/Entypo';
import {
  CreateFolderModel,
  DatePickerModal,
  Label,
  Title,
} from '../../components';
import {images, scale, theme} from '../../utils';
import {folders, tasksData} from '../../utils/mockData';
import RoundIcon from '../../components/RoundIcon';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment';

const HomeScreen = () => {
  const [folderData, setFolderData] = useState(folders);
  const [selectedFolder, setSelectedFolder] = useState(0);
  const [openFolderModal, setOpenFolderModal] = useState(false);
  const [openIndex, setOpenIndex] = useState(null);
  const navigation = useNavigation();
  const [selectedType, setType] = useState(1);
  const [calenderModel, setCalenderModel] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

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
  const handleData = d => {
    if (d !== null) {
      const sDate = Object.keys(d)[0];
      const eDate = Object.keys(d)[3];
      setStartDate(moment(sDate).format('DD/MM'));
      setEndDate(moment(eDate).format('DD/MM'));
      console.log('starting date >> ', moment(sDate).format('DD/MM'));
      console.log('end date >> ', moment(eDate).format('DD/MM'));
    }
  };
  const rendertasks = ({item, index}) => {
    return (
      <>
        <View
          style={[
            styles.taskCard,
            {borderColor: item.color, borderWidth: scale(1)},
          ]}
          key={index}
          // onPress={() => {
          //   navigation.navigate('TaskDetails', {note: item});
          // }}
        >
          <TouchableOpacity
            onPress={() => setOpenFolderModal(true)}
            style={[styles.taskContainer, {borderColor: item.color}]}>
            <Icon2
              name="aperture"
              size={scale(22)}
              color={theme.colors.primary2}
            />
            <Label
              title={item?.folder}
              style={[styles.headerTitle, {width: '60%'}]}
            />
            <Label title={item?.totalmins} style={[styles.headerTitle]} />
            <Label title={item?.done} style={[styles.headerTitle]} />
          </TouchableOpacity>
          <View style={[styles.taskContainer, {borderColor: item.color}]}>
            <Label title={'Status'} style={[styles.headerTitle]} />
            <Label
              title={'Name'}
              style={[styles.headerTitle, {width: '35%'}]}
            />
            <Label title={'Path'} style={[styles.headerTitle]} />
            <View style={styles.row}>
              <Label title={'% '} style={[styles.headerTitle]} />
              <Icon2 name="folder" size={scale(22)} />
            </View>

            <Icon2 name="award" size={scale(22)} />
          </View>
          {item?.tasks && item?.tasks.length > 3 && openIndex !== index
            ? item?.tasks.slice(0, 3)?.map((titem, tindex) => {
                console.log('length ', item?.tasks.length);
                return (
                  <TouchableOpacity
                    style={[
                      styles.row,
                      {
                        justifyContent: 'space-between',
                        borderColor: item.color,
                        borderBottomWidth: scale(0.7),
                        paddingVertical: scale(3),
                        borderColor:
                          item?.tasks.length == tindex + 1
                            ? theme.colors.transparent
                            : item.color,
                        paddingHorizontal: scale(5),
                      },
                    ]}
                    onPress={() => {
                      // console.log(titem);
                      navigation.navigate('CreateFolder', {
                        editData: titem,
                      });
                    }}>
                    <View style={styles.statusView}>
                      {titem.status ? (
                        <Icon1
                          name="play"
                          size={scale(25)}
                          color={theme.colors.green}
                        />
                      ) : (
                        <Icon2
                          name="pause"
                          size={scale(20)}
                          color={theme.colors.orange}
                          style={{marginLeft: scale(-5)}}
                        />
                      )}
                      {tindex % 2 ? (
                        <Icon1
                          name="social-zerply"
                          size={scale(20)}
                          color={theme.colors.green}
                        />
                      ) : (
                        <Icon3
                          name="clock-time-seven"
                          size={scale(20)}
                          color={theme.colors.lightGreen}
                        />
                      )}
                    </View>

                    <Label
                      title={titem.title}
                      style={{width: '45%', fontSize: scale(12)}}
                    />
                    <View style={styles.staticDetails}>
                      <Label title={titem?.path} />
                      <Label title={`${titem?.percentage} %`} />
                      <Label title={`-`} />
                    </View>
                  </TouchableOpacity>
                );
              })
            : item?.tasks?.map((titem, tindex) => {
                return (
                  <TouchableOpacity
                    style={[
                      styles.row,
                      {
                        justifyContent: 'space-between',
                        borderColor:
                          item?.tasks.length == tindex + 1
                            ? theme.colors.transparent
                            : item.color,
                        borderBottomWidth: scale(0.7),
                        paddingVertical: scale(3),
                        paddingHorizontal: scale(5),
                      },
                    ]}>
                    <View style={styles.statusView}>
                      {titem.status ? (
                        <Icon1
                          name="play"
                          size={scale(25)}
                          color={theme.colors.green}
                        />
                      ) : (
                        <Icon2
                          name="pause"
                          size={scale(20)}
                          color={theme.colors.orange}
                          style={{marginLeft: scale(-5)}}
                        />
                      )}
                      {tindex % 2 ? (
                        <Icon1
                          name="social-zerply"
                          size={scale(20)}
                          color={theme.colors.green}
                        />
                      ) : (
                        <Icon3
                          name="clock-time-seven"
                          size={scale(20)}
                          color={theme.colors.lightGreen}
                        />
                      )}
                    </View>

                    <Label
                      title={titem.title}
                      style={{width: '45%', fontSize: scale(12)}}
                    />
                    <View style={styles.staticDetails}>
                      <Label title={titem?.path} />
                      <Label title={`${titem?.percentage} %`} />
                      <Label title={`-`} />
                    </View>
                  </TouchableOpacity>
                );
              })}
        </View>
        {/* arrow-down-bold */}
        <View style={[styles.move, {borderColor: item.color}]}>
          <Icon3
            name={
              openIndex == index ? 'arrow-up-bold' : 'arrow-up-bold-outline'
            }
            size={scale(20)}
            onPress={() => {
              // alert('up');
              openIndex == index ? setOpenIndex(null) : setOpenIndex(index);
            }}
            color={openIndex == index ? item?.color : theme.colors.black}
          />
          <Icon3
            name={
              item?.tasks.length === 0 || item?.tasks.length === undefined
                ? 'arrow-down-bold-outline'
                : openIndex !== index
                ? 'arrow-down-bold'
                : 'arrow-down-bold-outline'
            }
            size={scale(20)}
            onPress={() => {
              // alert('down');
              setOpenIndex(index);
            }}
            color={openIndex !== index ? item.color : theme.colors.black}
          />
        </View>
      </>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
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

          <View
            style={[
              styles.row,
              // {width: scale(70), justifyContent: 'space-around'},
            ]}>
            <Label
              title={startDate == null ? 'Today  ' : `${startDate}-${endDate} `}
              style={{fontWeight: '600'}}
            />
            <Icon2
              name="calendar"
              size={scale(25)}
              color={theme.colors.primary}
              onPress={() => {
                setCalenderModel(true);
              }}
            />
          </View>
        </View>
        <View style={styles.mainCOntainer}>
          {/* <View>
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
          </View> */}
          <View style={{height: theme.SCREENHEIGHT * 0.8}}>
            {/*   <View style={styles.dataCon}>
              <Label title={'Tasks'} style={styles.subt} />
              <Icon2 name="calendar" size={scale(22)} />
            </View> */}

            <FlatList
              // style={{height: theme.SCREENHEIGHT * 0.67}}
              contentContainerStyle={{
                paddingVertical: scale(10),
                paddingBottom: theme.SCREENHEIGHT * 0.04,
              }}
              data={tasksData}
              renderItem={rendertasks}
              showsVerticalScrollIndicator={false}
            />
            {/* <RoundIcon
              style={styles.roundIcon}
              name={'plus'}
              onPress={() => {
                navigation.navigate('CreateTask');
              }}
            /> */}
          </View>
        </View>
      </View>
      <DatePickerModal
        isVisible={calenderModel}
        close={() => {
          setCalenderModel(false);
        }}
        dateRange={handleData}
      />

      {openFolderModal && (
        <CreateFolderModel close={() => setOpenFolderModal(false)} />
      )}
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
    // padding: scale(8),
    // paddingVertical: scale(13),
    marginVertical: scale(4),
    borderRadius: scale(8),
    paddingBottom: scale(25),
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
    justifyContent: 'space-between',
    marginLeft: -theme.SCREENWIDTH * 0.05,
  },
  selctCon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  taskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: scale(1),
    padding: scale(7),
  },
  headerTitle: {
    fontWeight: '600',
  },
  rowdata: {
    flexDirection: 'row',
  },
  statusView: {
    flexDirection: 'row',
    width: '15%',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  staticDetails: {
    flexDirection: 'row',
    width: '40%',
    justifyContent: 'space-around',
  },
  move: {
    borderWidth: scale(1),
    width: scale(45),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scale(25),
    padding: scale(2),
    backgroundColor: theme.colors.white,
    alignSelf: 'center',
    marginTop: scale(-25),
  },
});
