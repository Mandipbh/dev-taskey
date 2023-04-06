import {SafeAreaView, StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useState} from 'react';
import {AllTaskCard, CronoCard, Label, Title} from '../../components';
import {scale, theme} from '../../utils';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import CommonHeader from '../../components/CommonHeader';
import {useNavigation} from '@react-navigation/native';
import DraggableFlatList from 'react-native-draggable-dynamic-flatlist';
import {getAPICall, postAPICall} from '../../utils/AppApi';
import SimpleToast from 'react-native-simple-toast';
import {useEffect} from 'react';
import {useSelector} from 'react-redux';
import ApiService from '../../utils/ApiService';

function HeaderTitle(dark) {
  return (
    <View style={styles.statusContainer}>
      <Label
        title="Status"
        style={[
          styles.statustxt,
          {color: dark ? theme.colors.white : theme.colors.black},
        ]}
      />
      <Label
        title="Name"
        style={[
          styles.name,
          {color: dark ? theme.colors.white : theme.colors.black},
        ]}
      />
      <Feather
        name="award"
        size={20}
        style={{marginLeft: scale(80)}}
        color={dark ? theme.colors.white : theme.colors.black}
      />
      <Label
        title="Path"
        style={[
          styles.path,
          {color: dark ? theme.colors.white : theme.colors.black},
        ]}
      />
      <View style={styles.folder}>
        <Title
          title={'% '}
          style={{
            fontSize: 11,
            color: dark ? theme.colors.white : theme.colors.black,
          }}
        />
        <AntDesign
          name="folder1"
          size={20}
          color={dark ? theme.colors.white : theme.colors.black}
        />
      </View>
    </View>
  );
}

const AllTasks = ({route}) => {
  const {taskItem, folderName, selectedType} = route.params;
  const [task, setTask] = useState(taskItem);
  const [taskType, setTaskTask] = useState();
  useEffect(() => {
    setTaskTask(
      selectedType === 1 ? 'CRONO' : selectedType === 2 ? 'TIMER' : 'COUNTER',
    );
  }, []);
  const navigation = useNavigation();
  const tasksrender = ({item, index, move, moveEnd, isActive}) => {
    return (
      <AllTaskCard
        item={item}
        index={index}
        // move={move}
        // moveEnd={moveEnd}
        selectedType={selectedType}
        updateStatus={updateStatus}
      />
    );
  };

  const updateStatus = (selTask, status, index) => {
    let taskId = selTask?._id;
    const taskStatus = selTask?.status === 'Paused' ? 'Play' : 'Paused';
    let obj = {};
    if (selTask?.type === 'COUNTER') {
      if (selTask.meta !== 'Achievement') {
        obj = {
          id: taskId,
          status: status,
          type: selTask?.type,
          meta: selTask.meta,
        };
      } else {
        obj = {
          id: taskId,
          status: status,
          type: selTask?.type,
          meta: selTask.meta,
          amount: selTask?.amount,
        };
      }
    } else {
      if (selTask.meta === 'Achievement') {
        obj = {
          id: taskId,
          status: taskStatus,
          type: selTask?.type,
          meta: selTask.meta,
          amount: selTask?.amount,
        };
      } else {
        obj = {
          id: taskId,
          status: taskStatus,
          type: selTask?.type,
          meta: selTask.meta,
        };
      }
    }
    try {
      postAPICall('taskStartStop', obj).then(res => {
        if (res.success) {
          SimpleToast.show(res.message, SimpleToast.SHORT);
          const tmpArr = [...task?.taskList];
          tmpArr[index].status =
            selTask?.status === 'Paused' ? 'Play' : 'Paused';
          tmpArr.taskList = tmpArr;
          getAPICall(`getByFolder/${selTask?.folderId}`).then(responseData => {
            setTask(responseData.data[0]);
          });
        }
      });
    } catch (error) {
      SimpleToast.show(error.response, SimpleToast.SHORT);
      console.log('error >>> ', error.response);
    }
  };
  const darkmodeState = useSelector(state => state.UserReducer.isDarkMode);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: darkmodeState
          ? theme.colors.black
          : theme.colors.white,
      }}>
      <CommonHeader
        IconType={AntDesign}
        headerTitle={`${taskItem?.name}`}
        headerLeft={() => (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <AntDesign
              name="left"
              size={scale(20)}
              color={darkmodeState ? theme.colors.white : theme.colors.darkMode}
            />
          </TouchableOpacity>
        )}
      />
      <View
        style={[
          styles.container,
          {
            backgroundColor: darkmodeState
              ? theme.colors.darkMode
              : theme.colors.white,
          },
        ]}>
        <Title
          title={task?.name}
          style={{
            marginLeft: scale(5),
            color: darkmodeState ? theme.colors.white : theme.colors.black,
          }}
        />
        <View style={styles.divider} />

        <View style={styles.statusContainer}>
          <Label
            title="Status"
            style={[
              styles.statustxt,
              {color: darkmodeState ? theme.colors.white : theme.colors.black},
            ]}
          />
          <Label
            title="Name"
            style={[
              styles.name,
              {color: darkmodeState ? theme.colors.white : theme.colors.black},
            ]}
          />
          <Feather
            name="award"
            size={20}
            style={{marginLeft: scale(80)}}
            color={darkmodeState ? theme.colors.white : theme.colors.black}
          />
          <Label
            title="Path"
            style={[
              styles.path,
              {color: darkmodeState ? theme.colors.white : theme.colors.black},
            ]}
          />
          <View style={styles.folder}>
            <Title
              title={'% '}
              style={{
                fontSize: 11,
                color: darkmodeState ? theme.colors.white : theme.colors.black,
              }}
            />
            <AntDesign
              name="folder1"
              size={20}
              color={darkmodeState ? theme.colors.white : theme.colors.black}
            />
          </View>
        </View>
        {/* <HeaderTitle darkmodeState={darkmodeState ? 2 : 1} /> */}
        <View style={styles.divider} />
        <View style={{height: '80%'}}>
          <DraggableFlatList
            data={task?.taskList}
            renderItem={tasksrender}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => index}
            scrollPercent={5}
            // onMoveEnd={({data, index}) => {
            //   handleTaskOrder(data);
            //   const updateData = [...folders];
            //   updateData[Tindex].taskList = data;
            // }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AllTasks;

const styles = StyleSheet.create({
  divider: {
    borderWidth: 0.5,
    borderColor: theme.colors.gray,
    marginVertical: scale(5),
  },
  container: {
    margin: scale(10),
    paddingHorizontal: scale(5),
    paddingVertical: scale(10),
    borderRadius: scale(12),
    backgroundColor: theme.colors.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  staticDetails: {
    flexDirection: 'row',
    width: '40%',
    justifyContent: 'space-around',
  },
  statusContainer: {flexDirection: 'row', alignItems: 'center'},
  statustxt: {
    marginLeft: scale(8),
    fontSize: 12,
    fontWeight: '600',
  },
  name: {marginLeft: scale(20), fontSize: 12, fontWeight: '600'},
  path: {marginLeft: scale(40), fontSize: 12, fontWeight: '600'},
  folder: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: scale(20),
  },
});
