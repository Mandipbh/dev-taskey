import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  Platform,
  ImageBackground,
} from 'react-native';
import React, {useState} from 'react';
import Toast from 'react-native-simple-toast';
import Icon2 from 'react-native-vector-icons/Feather';
import {
  CreateFolderModel,
  CronoCard,
  DatePickerModal,
  Label,
  Title,
} from '../../components';
import {images, scale, theme} from '../../utils';
import {folders, tasksData} from '../../utils/mockData';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import DraggableFlatList from 'react-native-draggable-dynamic-flatlist';
import {useEffect} from 'react';
import ComplateTaskModel from '../../components/appModel/ComplateTaskModel';
import ApiService from '../../utils/ApiService';
import {postAPICall} from '../../utils/AppApi';
import moment from 'moment';
import {useSelector} from 'react-redux';

const HomeScreen = () => {
  const [openFolderModal, setOpenFolderModal] = useState(false);
  const [openIndex, setOpenIndex] = useState(null);
  const [selectedType, setType] = useState(1);
  const [calenderModel, setCalenderModel] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [data, setData] = useState(tasksData);
  const [markedDates, setMarkedDates] = useState(null);
  const [model, setModel] = useState(false);
  const [editFolder, setEditFolder] = useState(null);
  const [loader, setLoader] = useState(false);
  const navigation = useNavigation();

  const [Folder, setFolder] = useState([]);

  const handleProgressClose = () => {
    setModel(false);
  };
  useEffect(() => {
    getAllTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedType, useIsFocused()]);
  const defualtTimes = useSelector(state => state.UserReducer?.defaultTime);
  const getAllTasks = async () => {
    if (selectedType === 1) {
      setLoader(true);
      ApiService.get('folder/CRONO').then(res => {
        setLoader(false);
        if (res.success) {
          let OrderWiseData = [...res.data];
          OrderWiseData?.sort(function (a, b) {
            return a?.order - b?.order;
          });
          setFolder(OrderWiseData);
          ApiService.get('folder/COMPLETED').then(resData => {
            setLoader(false);
            if (resData.success) {
              let folderData = resData.data;
              folderData.map(item => {
                if (
                  selectedType === 1 &&
                  item?.name === 'COMPLETED CRONO TASK'
                ) {
                  setFolder([...OrderWiseData, item]);
                }
              });
            }
          });
        }
      });
    } else if (selectedType === 2) {
      ApiService.get('folder/TIMER').then(res => {
        setLoader(false);
        if (res.success) {
          let OrderWiseData = [...res.data];
          OrderWiseData?.sort(function (a, b) {
            return a?.order - b?.order;
          });
          setFolder(OrderWiseData);
          ApiService.get('folder/COMPLETED').then(resData => {
            setLoader(false);
            if (resData.success) {
              let folderData = resData.data;
              folderData.map(item => {
                if (
                  selectedType === 2 &&
                  item?.name == 'COMPLETED TIMER TASK'
                ) {
                  setFolder([...OrderWiseData, item]);
                }
              });
            }
          });
        }
      });
    } else if (selectedType === 3) {
      ApiService.get('folder/COUNTER').then(res => {
        setLoader(false);
        if (res.success) {
          let OrderWiseData = [...res.data];
          OrderWiseData?.sort(function (a, b) {
            return a?.order - b?.order;
          });
          setFolder(OrderWiseData);
          ApiService.get('folder/COMPLETED').then(resData => {
            setLoader(false);
            if (resData.success) {
              let folderData = resData.data;
              folderData.map(item => {
                if (
                  selectedType === 3 &&
                  item?.name === 'COMPLETED COUNTER TASK'
                ) {
                  setFolder([...OrderWiseData, item]);
                }
              });
            }
          });
        }
      });
    }
  };

  const taskType = [
    {
      id: 1,
      title: 'CRONO TASKS',
      totalTime: '200 min',
      icon: images.crono,
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
  const config = {
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 20,
  };

  const onSwipe = (gestureName, index) => {
    const {SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT} = swipeDirections;
    switch (gestureName) {
      case SWIPE_UP:
        openIndex == index ? setOpenIndex(null) : setOpenIndex(index);
        break;
      case SWIPE_DOWN:
        openIndex == index ? setOpenIndex(null) : setOpenIndex(index);
        break;
      case SWIPE_LEFT:
        break;
      case SWIPE_RIGHT:
        break;
    }
  };

  const updateStatus = (task, status) => {
    let taskId = task?._id;
    const taskStatus = task?.status === 'Paused' ? 'Play' : 'Paused';
    let obj = {};
    if (task?.type === 'COUNTER') {
      if (task.meta !== 'Achievement') {
        obj = {
          id: taskId,
          status: status,
          type: task?.type,
          meta: task.meta,
        };
      } else {
        obj = {
          id: taskId,
          status: status,
          type: task?.type,
          meta: task.meta,
          amount: task?.amount,
        };
      }
    } else {
      if (task.meta === 'Achievement') {
        obj = {
          id: taskId,
          status: taskStatus,
          type: task?.type,
          meta: task.meta,
          amount: task?.amount,
        };
      } else {
        obj = {
          id: taskId,
          status: taskStatus,
          type: task?.type,
          meta: task.meta,
        };
      }
    }

    try {
      postAPICall('taskStartStop', obj).then(res => {
        if (res.success) {
          Toast.show(res.message, Toast.SHORT);
          getAllTasks();
        }
      });
    } catch (error) {
      console.log('error >>> ', error.response);
    }
  };

  const tasksrender = ({item, index, move, moveEnd, isActive}) => {
    return (
      <CronoCard
        item={item}
        index={index}
        move={move}
        moveEnd={moveEnd}
        selectedType={selectedType}
        updateStatus={updateStatus}
      />
    );
  };
  const darkmodeState = useSelector(state => state.UserReducer.isDarkMode);
  const rendertasks = ({item, index, move, moveEnd}) => {
    return (
      <>
        <GestureRecognizer
          style={[
            styles.taskCardContainer,
            {
              backgroundColor: darkmodeState
                ? theme.colors.darkMode
                : theme.colors.white,
            },
          ]}
          onSwipe={(direction, state) => onSwipe(direction, state, index)}
          config={config}>
          <TouchableOpacity onLongPress={move} onPressOut={moveEnd}>
            <View style={[styles.taskCard]} key={index}>
              <View style={styles.taskContainer}>
                <Icon2
                  name="aperture"
                  size={scale(22)}
                  color={theme.colors.primary2}
                />
                <TouchableOpacity
                  style={{width: '60%'}}
                  onPress={() => {
                    if (item?.name === 'GLOBAL TIMER') {
                    } else if (item?.name === 'GLOBAL COUNTER') {
                    } else if (item?.name === 'GLOBAL CRONO') {
                    } else {
                      // navigation.navigate('CreateF', {
                      //   editFolder: {name: item.name, _id: item._id},
                      // });
                    }
                  }}>
                  <Label
                    title={item?.name}
                    style={[
                      styles.headerTitle,
                      {
                        width: '60%',
                        color: darkmodeState
                          ? theme.colors.white
                          : theme.colors.black,
                      },
                    ]}
                  />
                </TouchableOpacity>
                {item?.totalMin !== undefined && (
                  <Label
                    title={`${item?.totalMin?.toFixed(2)} mins`}
                    style={[
                      styles.headerTitle,
                      {
                        color: darkmodeState
                          ? theme.colors.white
                          : theme.colors.black,
                      },
                    ]}
                  />
                )}
                <Label
                  // title={'20%'}
                  style={[
                    styles.headerTitle,
                    {
                      marginVertical: scale(7),
                      color: darkmodeState
                        ? theme.colors.white
                        : theme.colors.black,
                    },
                  ]}
                />
              </View>
              <View style={styles.taskContainer}>
                <Label
                  title={'Status'}
                  style={[
                    styles.headerTitle,
                    {
                      color: darkmodeState
                        ? theme.colors.white
                        : theme.colors.black,
                    },
                  ]}
                />
                <Label
                  title={'Name'}
                  style={[
                    styles.headerTitle,
                    {
                      width: '35%',
                      color: darkmodeState
                        ? theme.colors.white
                        : theme.colors.black,
                    },
                  ]}
                />
                {selectedType !== 1 && (
                  <Icon2
                    name="award"
                    size={scale(22)}
                    style={{marginLeft: scale(-40)}}
                    color={
                      darkmodeState ? theme.colors.white : theme.colors.black
                    }
                  />
                )}
                <Label
                  title={'Path'}
                  style={[
                    styles.headerTitle,
                    {
                      left: scale(10),
                      color: darkmodeState
                        ? theme.colors.white
                        : theme.colors.black,
                    },
                  ]}
                />
                <View style={styles.row}>
                  <Label
                    title={'% '}
                    style={[
                      styles.headerTitle,
                      {
                        color: darkmodeState
                          ? theme.colors.white
                          : theme.colors.black,
                      },
                    ]}
                  />
                  <Icon2
                    name="folder"
                    size={scale(22)}
                    color={
                      darkmodeState ? theme.colors.white : theme.colors.black
                    }
                  />
                </View>
              </View>
              {Folder?.map((taskItem, Tindex) => {
                return taskItem?._id === item?._id &&
                  item?.taskList?.length !== 0 ? (
                  <>
                    {taskItem?.taskList?.length && (
                      <DraggableFlatList
                        data={taskItem?.taskList?.sort(function (a, b) {
                          return a?.order - b?.order;
                        })}
                        renderItem={tasksrender}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={(item, index) => index}
                        scrollPercent={5}
                        onMoveEnd={({data, index}) => {
                          handleTaskOrder(data);
                          const updateData = [...folders];
                          updateData[Tindex].taskList = data;
                        }}
                      />
                    )}
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('AllTask', {
                          taskItem,
                          folderName: item?.folder,
                          selectedType,
                        })
                      }
                      style={styles.seeMore}>
                      {taskItem?.taskList?.length > 3 && (
                        <Label
                          title="See more"
                          style={{
                            color: darkmodeState
                              ? theme.colors.white
                              : theme.colors.black,
                          }}
                        />
                      )}
                    </TouchableOpacity>
                  </>
                ) : null;
              })}
            </View>
          </TouchableOpacity>
        </GestureRecognizer>
      </>
    );
  };

  const handleMoveFolder = data => {
    setFolder(data);
    const updateData = [];
    data.map((item, index) => {
      updateData.push({id: item?._id, order: index});
    });
    const payload = {data: updateData};
    const options = {payloads: payload};
    try {
      ApiService.put('folderorder', options).then(res => {
        if (res.success) {
          Toast.show('Folder order updated', Toast.SHORT);
          console.log('response of ordering >> ', res);
        }
      });
    } catch (error) {
      console.log('error >>> ', error);
    }
  };

  const handleTaskOrder = taskOrder => {
    const updateData = [];
    taskOrder.map((item, index) => {
      updateData.push({id: item?._id, order: index});
    });
    const payload = {data: updateData};
    const options = {payloads: payload};
    try {
      ApiService.put('taskorder', options).then(res => {
        if (res.success) {
          getAllTasks();
          Toast.show('Task order updated', Toast.SHORT);
        }
      });
    } catch (error) {
      console.log('error >>> ', error);
    }
  };

  const handlefilterModel = (StartDate, Enddate) => {
    if (StartDate === undefined && Enddate === undefined) {
      setStartDate(null);
      setEndDate(null);
      getAllTasks();
    } else {
      let endDate = moment(
        moment(Enddate).add(1, 'd').format('YYYY-MM-DD'),
      ).format('YYYY-MM-DD');
      setStartDate(StartDate);
      setEndDate(Enddate);
      setCalenderModel(false);
      const frmData = {
        startDate: StartDate,
        lastDate: endDate,
        type:
          selectedType === 1
            ? 'CRONO'
            : selectedType === 2
            ? 'TIMER'
            : 'COUNTER',
      };
      const taskArr = [];
      const options = {payloads: frmData};
      try {
        ApiService.post('filterFolder', options)
          .then(async res => {
            if (res.success) {
              const data = res?.filteredData;
              await data?.map(item => {
                taskArr.push(item?.folderId);
              });
              console.log('filter arr ', taskArr);
              setFolder(taskArr);
            } else {
              Toast.show(res.message);
            }
          })
          .catch(c => {
            console.log('chatch ?? ', c.response);
          });
      } catch (error) {
        console.log('eror >> ', error.response);
      }
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={images.banner} style={styles.header} />
      <View style={styles.container}>
        <View style={{flexDirection: 'row', height: '7%'}}>
          {taskType?.map((type, index) => {
            return (
              type.id === selectedType && (
                <>
                  <View
                    style={{
                      width: '74%',
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <View
                      style={{
                        width: '10%',
                        marginLeft: '15%',
                      }}>
                      <Icon2
                        name="chevron-left"
                        size={scale(30)}
                        onPress={() => {
                          selectedType > 1
                            ? setType(type.id - 1)
                            : setType(type.id + 2);
                        }}
                        color={theme.colors.white}
                      />
                    </View>

                    <View
                      style={{
                        width: '70%',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'row',
                      }}>
                      <Image
                        source={type.icon}
                        style={{
                          height: type.id === 2 ? scale(28) : scale(35),
                          width: type.id === 2 ? scale(28) : scale(35),
                          resizeMode: 'contain',
                          tintColor: theme.colors.white,
                        }}
                      />
                      <View style={{marginLeft: scale(10)}}>
                        <Label
                          key={index}
                          title={type?.title}
                          style={{color: theme.colors.white, fontWeight: '600'}}
                        />
                        <Label
                          title={`Total ${type?.totalTime}`}
                          style={styles.time}
                        />
                      </View>
                    </View>
                    <View style={{width: '15%'}}>
                      <Icon2
                        name="chevron-right"
                        size={scale(30)}
                        onPress={() => {
                          selectedType <= 2 ? setType(type.id + 1) : setType(1);
                        }}
                        color={theme.colors.white}
                      />
                    </View>
                  </View>
                </>
              )
            );
          })}

          <View style={styles.calendarCon}>
            <TouchableOpacity
              onPress={() => {
                setCalenderModel(true);
                setMarkedDates(null);
              }}>
              <Image
                style={{
                  height: scale(40),
                  width: scale(40),
                  marginRight: scale(5),
                  marginTop: scale(5),
                }}
                source={images.calendar}
              />
            </TouchableOpacity>

            <Label
              title={
                startDate === null
                  ? 'Today'
                  : `${moment(startDate).format('MM-DD')} / ${moment(
                      endDate,
                    ).format('MM-DD')} `
              }
              style={{color: theme.colors.white, fontSize: scale(11)}}
            />
          </View>
        </View>

        <View style={styles.mainCOntainer}>
          <View
            style={{
              height:
                Platform.OS === 'ios'
                  ? theme.SCREENHEIGHT * 0.77
                  : theme.SCREENHEIGHT * 0.83,
            }}>
            {Folder && (
              <DraggableFlatList
                style={{
                  height: theme.SCREENHEIGHT * 0.71,
                }}
                contentContainerStyle={{
                  paddingVertical: scale(10),
                  paddingBottom: theme.SCREENHEIGHT * 0.01,
                  marginTop: scale(10),
                }}
                data={Folder}
                renderItem={rendertasks}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item, index) => index}
                scrollPercent={5}
                onMoveEnd={({data}) => handleMoveFolder(data)}
              />
            )}
          </View>
        </View>
      </View>
      <DatePickerModal
        isVisible={calenderModel}
        close={() => {
          setCalenderModel(false);
          setEndDate(null);
          setStartDate(null);
        }}
        markedDates={markedDates}
        setMarkedDates={setMarkedDates}
        onSavePress={(StartDate, Enddate) => {
          handlefilterModel(StartDate, Enddate);
        }}
      />

      {openFolderModal && (
        <CreateFolderModel
          close={() => setOpenFolderModal(false)}
          editFolder={editFolder}
        />
      )}
      <ComplateTaskModel isVisible={model} close={handleProgressClose} />
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.transparent,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  taskCard: {
    marginVertical: scale(4),
    borderRadius: scale(8),
    paddingBottom: scale(10),
  },
  calendarCon: {
    width: '30%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainCOntainer: {
    paddingHorizontal: scale(13),
  },
  time: {
    fontSize: scale(11),
    alignItems: 'center',
    color: theme.colors.white,
    fontWeight: '600',
  },
  taskCardContainer: {
    backgroundColor: theme.colors.white,
    // padding: scale(5),
    marginVertical: scale(5),
    marginHorizontal: scale(2),
    shadowColor: '#000',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowRadius: scale(3),
    shadowOpacity: 0.2,
    elevation: 2,
    borderRadius: scale(8),
  },
  taskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: scale(0.5),
    borderColor: theme.colors.gray,
    padding: scale(7),
  },
  headerTitle: {
    fontWeight: '600',
    fontSize: scale(10),
  },
  taskRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: scale(0.5),
    borderBottomColor: theme.colors.gray,
    paddingVertical: scale(3),
    paddingHorizontal: scale(5),
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
  taskLabel: {
    width: '40%',
    // alignItems: 'flex-start',
    marginLeft: scale(-12),
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
  legendtabView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: scale(5),
    borderWidth: scale(2),
    marginBottom: scale(2),
    borderTopLeftRadius: scale(10),
    borderTopRightRadius: scale(10),
    height: scale(30),
  },
  title: {
    fontSize: scale(12),
    fontWeight: '600',
  },
  hide: {
    color: theme.colors.gray,
    fontSize: scale(13),
  },
  seeMore: {
    alignItems: 'flex-end',
    paddingHorizontal: scale(10),
    paddingTop: scale(5),
    justifyContent: 'center',
  },
  header: {
    height: scale(200),
    width: '100%',
    resizeMode: 'cover',
    position: 'absolute',
  },
});
