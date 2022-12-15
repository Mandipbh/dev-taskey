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
import Icon1 from 'react-native-vector-icons/Foundation';
import Icon2 from 'react-native-vector-icons/Feather';
import Icon3 from 'react-native-vector-icons/Ionicons';
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
import {ProgressBar} from 'react-native-paper';
import ApiService from '../../utils/ApiService';
import axios from 'axios';
import {appAPI, postAPICall} from '../../utils/AppApi';

const HomeScreen = () => {
  const [openFolderModal, setOpenFolderModal] = useState(false);
  const [openIndex, setOpenIndex] = useState(null);
  const [selectedType, setType] = useState(1);
  const [calenderModel, setCalenderModel] = useState(false);
  const [legendView, setlegendView] = useState(false);
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
        }
      });
    } else if (selectedType === 2) {
      ApiService.get('folder/TIMER').then(res => {
        setLoader(false);
        if (res.success) {
          setFolder(res.data);
        }
      });
    } else if (selectedType === 3) {
      ApiService.get('folder/COUNTER').then(res => {
        setLoader(false);
        if (res.success) {
          setFolder(res.data);
        }
      });
    }
  };

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
    console.log('task ??/ ', task);
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

    const options = {payloads: obj};
    try {
      postAPICall('taskStartStop', obj).then(res => {
        if (res.success) {
          Toast.show(res.message, Toast.SHORT);
          getAllTasks();
        }
      });
    } catch (error) {
      console.log('error >>> ', error.response.data);
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
      // <>
      //   {index < 4 && (
      //     <TouchableOpacity
      //       onLongPress={move}
      //       onPressOut={moveEnd}
      //       key={index}
      //       style={[
      //         styles.taskRow,
      //         {
      //           backgroundColor:
      //             index / 2 ? theme.colors.white : theme.colors.white1,
      //         },
      //       ]}
      //       onPress={() => navigation.navigate('CreateTask', {editData: item})}>
      //       <View style={styles.statusView}>
      //         {selectedType !== 3 ? (
      //           <>
      //             {item.status === 'Paused' ? (
      //               <Icon1
      //                 name="play"
      //                 size={scale(25)}
      //                 color={theme.colors.main}
      //                 onPress={() => {
      //                   updateStatus(item);
      //                   // setModel(!model);
      //                 }}
      //               />
      //             ) : (
      //               <Icon3
      //                 name="md-pause"
      //                 size={scale(20)}
      //                 color={theme.colors.main}
      //                 style={{marginLeft: scale(-5)}}
      //                 onPress={() => {
      //                   updateStatus(item);
      //                 }}
      //               />
      //             )}

      //             {/* {item?.status !== 'play' ? (
      //               <Icon1
      //                 name="social-zerply"
      //                 size={scale(20)}
      //                 color={theme.colors.green}
      //               />
      //             ) : (
      //               <Icon3
      //                 name="clock-time-seven"
      //                 size={scale(20)}
      //                 color={theme.colors.lightGreen}
      //               />
      //             )} */}
      //           </>
      //         ) : (
      //           <View style={{marginLeft: scale(-20)}}>
      //             <TouchableOpacity
      //               style={{borderColor: theme.colors.green, borderWidth: 1}}
      //               onPress={() => {
      //                 updateStatus(item, 'Plus');
      //               }}>
      //               <Icon2
      //                 name="plus"
      //                 size={scale(20)}
      //                 color={theme.colors.green}
      //               />
      //             </TouchableOpacity>
      //             <TouchableOpacity
      //               style={{borderColor: theme.colors.red, borderWidth: 1}}>
      //               <Icon2
      //                 onPress={() => {
      //                   updateStatus(item, 'Minus');
      //                 }}
      //                 name="minus"
      //                 size={scale(20)}
      //                 color={theme.colors.red}
      //               />
      //             </TouchableOpacity>
      //           </View>
      //         )}
      //       </View>
      //       <View style={styles.taskLabel}>
      //         <Label title={item?.name} style={{fontSize: scale(12)}} />
      //         {item?.meta === 'Achievement' && item?.percentageOfTask && (
      //           <ProgressBar
      //             progress={item?.percentageOfTask / 10}
      //             color={
      //               item?.status !== 'Play'
      //                 ? theme.colors.gray
      //                 : theme.colors.green
      //             }
      //           />
      //         )}
      //       </View>
      //       <View style={styles.staticDetails}>
      //         <Label
      //           title={
      //             item?.meta === 'Registry'
      //               ? item?.cronoCompletedTime
      //                 ? (item?.cronoCompletedTime / 60)?.toFixed(2)
      //                 : 0
      //               : `${
      //                   item?.timerCompletedTime
      //                     ? (item?.timerCompletedTime / 60).toFixed(2)
      //                     : 0
      //                 }\n${item?.amount?.toFixed(2)}`
      //           }
      //           style={{fontSize: scale(11), marginLeft: scale(-5)}}
      //         />
      //         <Label
      //           title={
      //             item?.meta === 'Registry'
      //               ? 0
      //               : item?.percentageFolderWise?.toFixed(2)
      //           }
      //           style={{fontSize: scale(11)}}
      //         />
      //         <Label
      //           title={
      //             item?.meta === 'Registry'
      //               ? '-'
      //               : item?.percentageOfTask?.toFixed(2)
      //           }
      //           style={{fontSize: scale(11)}}
      //         />
      //       </View>
      //     </TouchableOpacity>
      //   )}
      // </>
    );
  };

  const rendertasks = ({item, index, move, moveEnd}) => {
    console.log('11111>> ', Number(item?.totalMin)?.toFixed(2));
    return (
      <>
        <GestureRecognizer
          style={styles.taskCardContainer}
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
                    setEditFolder(item);
                    setOpenFolderModal(true);
                  }}>
                  <Label
                    title={item?.name}
                    style={[styles.headerTitle, {width: '60%'}]}
                  />
                </TouchableOpacity>
                {item?.totalMin !== undefined && (
                  <Label
                    title={`${item?.totalMin?.toFixed(2)} mins`}
                    style={[styles.headerTitle]}
                  />
                )}
                <Label
                  title={'20%'}
                  style={[styles.headerTitle, {marginVertical: scale(7)}]}
                />
              </View>
              <View style={styles.taskContainer}>
                <Label title={'Status'} style={[styles.headerTitle]} />
                <Label
                  title={'Name'}
                  style={[styles.headerTitle, {width: '35%'}]}
                />
                {selectedType !== 1 && (
                  <Icon2
                    name="award"
                    size={scale(22)}
                    style={{marginLeft: scale(-40)}}
                  />
                )}
                <Label
                  title={'Path'}
                  style={[styles.headerTitle, {left: scale(10)}]}
                />
                <View style={styles.row}>
                  <Label title={'% '} style={[styles.headerTitle]} />
                  <Icon2 name="folder" size={scale(22)} />
                </View>
              </View>
              {Folder?.map((taskItem, Tindex) => {
                return taskItem?._id === item?._id &&
                  item?.taskList?.length !== 0 ? (
                  <>
                    {
                      <DraggableFlatList
                        data={taskItem?.taskList.sort(function (a, b) {
                          return a?.order - b?.order;
                        })}
                        renderItem={tasksrender}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={(item, index) =>
                          `draggable-item-${item.key}`
                        }
                        scrollPercent={5}
                        onMoveEnd={({data, index}) => {
                          handleTaskOrder(data);
                          const updateData = [...folders];
                          updateData[Tindex].taskList = data;
                        }}
                      />
                    }
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('AllTask', {
                          taskItem,
                          folderName: item?.folder,
                        })
                      }
                      style={styles.seeMore}>
                      {taskItem?.taskList?.length > 3 && (
                        <Label title="See more" />
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
          Toast.show('folder order updated', Toast.SHORT);
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
          Toast.show('task order updated', Toast.SHORT);
          console.log('response of ordering >> ', res);
        }
      });
    } catch (error) {
      console.log('error >>> ', error);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={{
          uri: 'https://img.freepik.com/free-photo/yellow-watercolor-paper_95678-446.jpg?w=1380&t=st=1670925892~exp=1670926492~hmac=869733d2bfe3e8827416bb5cf16106d1a3dcea002568cca2e956077d4b40d86a',
        }}
        style={styles.header}
      />
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

          <View
            style={{
              width: '30%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Icon2
              name="calendar"
              size={scale(25)}
              color={theme.colors.white}
              onPress={() => {
                setCalenderModel(true);
                setMarkedDates(null);
              }}
            />
            <Label
              title={
                startDate === null ? 'Today  ' : `${startDate} / ${endDate} `
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
                  ? theme.SCREENHEIGHT * 0.71
                  : theme.SCREENHEIGHT * 0.765,
            }}>
            {Folder && (
              <DraggableFlatList
                style={{height: theme.SCREENHEIGHT * 0.67}}
                contentContainerStyle={{
                  paddingVertical: scale(10),
                  paddingBottom: theme.SCREENHEIGHT * 0.04,
                }}
                data={Folder}
                renderItem={rendertasks}
                showsVerticalScrollIndicator={false}
                keyExtractor={item => `draggable-item-${item.key}`}
                scrollPercent={5}
                onMoveEnd={({data}) => handleMoveFolder(data)}
              />
            )}
          </View>
          {/* <View>
            <TouchableOpacity
              onPress={() => {
                setlegendView(!legendView);
              }}
              style={[
                styles.row,
                {
                  alignSelf: 'center',
                  bottom: legendView ? scale(-20) : 0,
                },
              ]}>
              <>
                <Title title="Folder Legend" />
                <Label
                  title={legendView ? '(click to show)' : '(click to hide)'}
                  style={styles.hide}
                />
              </>
            </TouchableOpacity>
            {!legendView && (
              <View style={styles.legendtabView}>
                <Label title="Icon" style={styles.title} />
                <Label title="Name" style={styles.title} />
                <Label title="mn aske" style={styles.title} />
                <Label title="⅒ of tota" style={styles.title} />
              </View>
            )}
          </View> */}
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
          setStartDate(StartDate);
          setEndDate(Enddate);
          setCalenderModel(false);
        }}
      />

      {openFolderModal && (
        <CreateFolderModel
          close={() => setOpenFolderModal(false)}
          editFolder={editFolder}
        />
      )}
      <ComplateTaskModel isVisible={model} close={handleProgressClose} />
      {/* {!loader && <Loader />} */}
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
