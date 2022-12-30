import {View, TouchableOpacity, StyleSheet, Alert} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {ProgressBar} from 'react-native-paper';
import Icon1 from 'react-native-vector-icons/Foundation';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import Icon3 from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {scale, theme} from '../utils';
import {Label} from './Label';
import {useSelector} from 'react-redux';

function pad(num) {
  return ('0' + num).slice(-2);
}

const CronoCard = ({
  item,
  index,
  move,
  moveEnd,
  selectedType,
  updateStatus,
}) => {
  const navigation = useNavigation();
  const darkmodeState = useSelector(state => state.UserReducer.isDarkMode);
  const timeModeState = useSelector(state => state.UserReducer.time);
  function hhmmss(secs) {
    var minutes = Math.floor(secs / 60);
    secs = secs % 60;
    var hours = Math.floor(minutes / 60);
    minutes = minutes % 60;
    return `${pad(minutes)}:${pad(secs)}`;
    // return pad(hours)+":"+pad(minutes)+":"+pad(secs); for old browsers
  }
  return (
    <>
      {index < 4 && item?.status !== 'Delete' && (
        <TouchableOpacity
          onLongPress={move}
          onPressOut={moveEnd}
          key={index}
          style={[
            styles.taskRow,
            {
              backgroundColor: darkmodeState
                ? theme.colors.darkMode
                : index % 2 !== 0
                ? theme.colors.white
                : theme.colors.white1,
            },
          ]}
          onPress={() => {
            item?.status === 'Done' || item.status === 'Failed'
              ? null
              : navigation.navigate('CreateTask', {editData: item});
          }}>
          {item?.status !== 'Done' && item.status !== 'Failed' && (
            <View style={styles.statusView}>
              {selectedType !== 3 ? (
                <>
                  {item.status === 'Paused' ? (
                    <Icon1
                      name="play"
                      size={scale(25)}
                      color={theme.colors.main}
                      onPress={() => {
                        updateStatus(item, null, index);
                      }}
                    />
                  ) : (
                    <Icon3
                      name="md-pause"
                      size={scale(20)}
                      color={theme.colors.main}
                      style={{marginLeft: scale(-5)}}
                      onPress={() => {
                        updateStatus(item, null, index);
                      }}
                    />
                  )}
                </>
              ) : (
                <View style={{flexDirection: 'row'}}>
                  <TouchableOpacity
                    style={styles.add}
                    onPress={() => {
                      updateStatus(item, 'Plus', index);
                    }}>
                    <FontAwesome5
                      name="plus"
                      size={scale(16)}
                      color={theme.colors.white}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.min}>
                    <Icon2
                      onPress={() => {
                        item?.counterIncrementDecrement > 1
                          ? updateStatus(item, 'Minus', index)
                          : null;
                      }}
                      name="minus"
                      size={scale(16)}
                      color={theme.colors.white}
                    />
                  </TouchableOpacity>
                </View>
              )}
            </View>
          )}
          <View style={styles.taskLabel}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Label
                title={item?.name}
                style={{
                  fontSize: scale(12),
                  color: darkmodeState
                    ? theme.colors.white
                    : theme.colors.black,
                  textDecorationLine:
                    item?.status === 'Done' || item.status === 'Failed'
                      ? 'line-through'
                      : 'none',
                  color:
                    item?.status === 'Done'
                      ? theme.colors.green
                      : item.status === 'Failed'
                      ? theme.colors.red
                      : darkmodeState
                      ? theme.colors.white
                      : theme.colors.black,
                }}
              />
              {selectedType !== 1 && (
                <Label
                  title={
                    item?.meta === 'Registry'
                      ? '-'
                      : item?.percentageOfTask?.toFixed(2)
                  }
                  style={{
                    fontSize: scale(11),
                    color: darkmodeState
                      ? theme.colors.white
                      : theme.colors.black,
                  }}
                />
              )}
            </View>
            {item?.meta === 'Achievement' && item?.percentageOfTask && (
              <ProgressBar
                progress={
                  selectedType === 3
                    ? item?.percentageOfTask / 100
                    : item?.percentageOfTask / 100
                }
                color={
                  item?.status !== 'Play'
                    ? theme.colors.gray2
                    : theme.colors.green
                }
                style={{
                  backgroundColor: theme.colors.backgroundColor,
                  height: scale(4),
                  marginTop: scale(5),
                }}
              />
            )}
          </View>
          <View style={styles.staticDetails}>
            {selectedType === 3 && (
              <Label
                title={item?.counterIncrementDecrement}
                style={{
                  fontSize: scale(11),
                  marginLeft: scale(20),
                  color: darkmodeState
                    ? theme.colors.white
                    : theme.colors.black,
                }}
              />
            )}
            {selectedType !== 3 && (
              <Label
                title={
                  item?.meta === 'Registry'
                    ? item?.cronoCompletedTime
                      ? hhmmss(item?.cronoCompletedTime) // (item?.cronoCompletedTime / 60)?.toFixed(2)
                      : 0
                    : `${
                        item?.timerCompletedTime
                          ? hhmmss(item?.timerCompletedTime) //  (item?.timerCompletedTime / 60).toFixed(2)
                          : 0
                      }\n${item?.amount === null ? 0 : item?.amount}`
                }
                style={{
                  fontSize: scale(11),
                  marginLeft: scale(18),
                  color: darkmodeState
                    ? theme.colors.white
                    : theme.colors.black,
                }}
              />
            )}
            <Label
              title={
                item?.meta === 'Registry'
                  ? 0
                  : item?.percentageFolderWise?.toFixed(2)
              }
              style={{
                fontSize: scale(11),
                color: darkmodeState ? theme.colors.white : theme.colors.black,
              }}
            />
          </View>
        </TouchableOpacity>
      )}
    </>
  );
};

export default CronoCard;

const styles = StyleSheet.create({
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
    width: '45%',
    // alignItems: 'flex-start',
    marginLeft: scale(5),
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
  add: {
    backgroundColor: theme.colors.orange3,
    padding: scale(4),
    borderRadius: scale(3),
  },
  min: {
    backgroundColor: theme.colors.orange2,
    padding: scale(4),
    borderRadius: scale(3),
    marginHorizontal: scale(3),
  },
});
