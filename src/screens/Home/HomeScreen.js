import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  Platform,
} from 'react-native';
import React, {useState} from 'react';
import Icon1 from 'react-native-vector-icons/Foundation';
import Icon2 from 'react-native-vector-icons/Feather';
import Icon3 from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  CreateFolderModel,
  DatePickerModal,
  Label,
  Title,
} from '../../components';
import {images, scale, theme} from '../../utils';
import {tasksData} from '../../utils/mockData';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import DraggableFlatList from 'react-native-draggable-dynamic-flatlist';
import {useEffect} from 'react';
import {getTask} from '../../redux/Actions/Action';
import {useDispatch, useSelector} from 'react-redux';

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

  const [editFolder, setEditFolder] = useState(null);

  const dispatch = useDispatch();
  const taskData = useSelector(state => state.task);
  // console.log('taskData', JSON.stringify(taskData, null, 2));

  const getTaskList = () => {
    dispatch(getTask());
  };

  useEffect(() => {
    getTaskList();
  }, []);

  const [taskDumyData, setTaskDummy] = useState([
    {
      fid: 0,
      taskslist: [
        {
          id: 0,
          title: 'Task name eyamole',
          color: '#ffddff',
          folder: 'global',
          status: 1,
          path: 10,
          percentage: 10,
        },
        {
          id: 1,
          title: 'Task• example 2',
          color: '#ffddff',
          folder: 'global',
          status: 0,
          path: 20,
          percentage: 20,
        },
        {
          id: 2,
          title: 'Task examole',
          color: '#ffddff',
          folder: 'global',
          status: 1,
          path: 20,
          percentage: 20,
        },
      ],
    },
    {
      fid: 1,
      taskslist: [
        {
          id: 3,
          title: 'Task examole 2',
          color: '#ffddff',
          folder: 'global',
          status: 1,
          path: 20,
          percentage: 20,
        },
        {
          id: 1,
          title: 'Task• example 2',
          color: '#ffddff',
          folder: 'global',
          status: 0,
          path: 20,
          percentage: 20,
        },
        {
          id: 2,
          title: 'Task examole',
          color: '#ffddff',
          folder: 'global',
          status: 1,
          path: 20,
          percentage: 20,
        },
        {
          id: 3,
          title: 'Task examole 2',
          color: '#ffddff',
          folder: 'global',
          status: 1,
          path: 20,
          percentage: 20,
        },
      ],
    },
  ]);

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

  const tasksrender = ({item, index, move, moveEnd}) => {
    return (
      <>
        <TouchableOpacity
          onLongPress={move}
          onPressOut={moveEnd}
          key={index}
          style={[
            styles.row,
            {
              justifyContent: 'space-between',
              borderBottomWidth: scale(0.7),
              paddingVertical: scale(3),
              paddingHorizontal: scale(5),
            },
          ]}>
          <View style={styles.statusView}>
            {item.status ? (
              <Icon1 name="play" size={scale(25)} color={theme.colors.green} />
            ) : (
              <Icon2
                name="pause"
                size={scale(20)}
                color={theme.colors.orange}
                style={{marginLeft: scale(-5)}}
              />
            )}
            {item % 2 ? (
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
            title={item.title}
            style={{width: '45%', fontSize: scale(12)}}
          />
          <View style={styles.staticDetails}>
            <Label title={item?.path} />
            <Label title={`${item?.percentage} %`} />
            <Label title="-" />
          </View>
        </TouchableOpacity>
      </>
    );
  };

  const rendertasks = ({item, index, move, moveEnd}) => {
    return (
      <>
        <GestureRecognizer
          onSwipe={(direction, state) => onSwipe(direction, state, index)}
          config={config}>
          <TouchableOpacity
            onLongPress={move}
            onPressOut={moveEnd}
            onPress={() => {
              setEditFolder(item);
              setOpenFolderModal(true);
            }}>
            <View
              style={[
                styles.taskCard,
                {borderColor: item.color, borderWidth: scale(1)},
              ]}
              key={index}>
              <View style={[styles.taskContainer, {borderColor: item.color}]}>
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
              </View>
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
              {taskDumyData.map((taskItem, Tindex) => {
                return (
                  taskItem.fid === item.id && (
                    <DraggableFlatList
                      data={taskItem.taskslist}
                      renderItem={tasksrender}
                      showsVerticalScrollIndicator={false}
                      keyExtractor={(item, index) =>
                        `draggable-item-${item.key}`
                      }
                      scrollPercent={5}
                      onMoveEnd={({data}) => {
                        const updateData = [...taskDumyData];
                        updateData[Tindex].taskslist = data;
                        setTaskDummy(updateData);
                      }}
                    />
                  )
                );
              })}
            </View>
          </TouchableOpacity>
        </GestureRecognizer>
      </>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <View style={{flexDirection: 'row', height: '7%'}}>
          {taskType?.map((type, index) => {
            return (
              type.id === selectedType && (
                <>
                  <View
                    style={{
                      width: '20%',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Image
                      source={type.icon}
                      style={{
                        height: type.id === 2 ? scale(28) : scale(35),
                        width: type.id === 2 ? scale(28) : scale(35),
                        resizeMode: 'contain',
                      }}
                    />
                  </View>
                  <View
                    style={{
                      width: '50%',
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <View
                      style={{
                        width: '15%',
                      }}>
                      <Icon2
                        name="chevron-left"
                        size={scale(30)}
                        onPress={() => {
                          selectedType > 1
                            ? setType(type.id - 1)
                            : setType(type.id + 2);
                        }}
                      />
                    </View>
                    <View
                      style={{
                        width: '70%',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Label key={index} title={type?.title} />
                      <Label
                        title={`Total = ${type?.totalTime}`}
                        style={styles.time}
                      />
                    </View>
                    <View style={{width: '15%'}}>
                      <Icon2
                        name="chevron-right"
                        size={scale(30)}
                        onPress={() => {
                          selectedType <= 2 ? setType(type.id + 1) : setType(1);
                        }}
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
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                width: '70%',
                alignItems: 'flex-end',
              }}>
              <Label>
                {startDate === null ? 'Today  ' : `${startDate} / ${endDate} `}
              </Label>
            </View>
            <View
              style={{
                width: '30%',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Icon2
                name="calendar"
                size={scale(25)}
                color={theme.colors.primary}
                onPress={() => {
                  setCalenderModel(true);
                  setMarkedDates(null);
                }}
              />
            </View>
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
            <DraggableFlatList
              style={{height: theme.SCREENHEIGHT * 0.67}}
              contentContainerStyle={{
                paddingVertical: scale(10),
                paddingBottom: theme.SCREENHEIGHT * 0.04,
              }}
              data={data}
              renderItem={rendertasks}
              showsVerticalScrollIndicator={false}
              keyExtractor={item => `draggable-item-${item.key}`}
              scrollPercent={5}
              onMoveEnd={({data}) => setData(data)}
            />
          </View>
          <View>
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
          setStartDate(StartDate);
          setEndDate(Enddate);
          setCalenderModel(false);
        }}
      />
{/* 
      {console.log(
        `start date >>>>>>> - ${startDate} and end date is - ${endDate}`,
      )} */}

      {openFolderModal && (
        <CreateFolderModel
          close={() => setOpenFolderModal(false)}
          editFolder={editFolder}
        />
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
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  taskCard: {
    marginVertical: scale(4),
    borderRadius: scale(8),
    paddingBottom: scale(25),
  },
  mainCOntainer: {
    paddingHorizontal: scale(13),
  },
  time: {
    fontSize: scale(11),
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
});
