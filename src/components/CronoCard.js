import {View, TouchableOpacity, StyleSheet, Alert, Image} from 'react-native';
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
import Toast from 'react-native-simple-toast';
import moment from 'moment';
import {Timer, Countdown} from 'react-native-element-timer';
import {useRef} from 'react';
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
  const timerRef = useRef(null);
  function hhmmss(secs) {
    var minutes = Math.floor(secs / 60);
    secs = secs % 60;
    var hours = Math.floor(minutes / 60);
    minutes = minutes % 60;
    return timeModeState === 1
      ? `${pad(minutes)}:${pad(secs)}`
      : Math.floor(minutes / 60) + ':' + pad(minutes) + ':' + pad(secs);
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
            navigation.navigate('CreateTask', {editData: item});
          }}>
          {item?.status !== 'Done' && item.status !== 'Failed' && (
            <View style={styles.statusView}>
              {selectedType !== 3 ? (
                <>
                  {item.status === 'Paused' ? (
                    <Icon1
                      name="play"
                      size={scale(30)}
                      color={theme.colors.main}
                      onPress={() => {
                        item?.percentageOfTask === 100
                          ? Toast.show(
                              'Time goal is achieved. Please edit task to set more time or to complete it.',
                            )
                          : updateStatus(item, null, index);
                        // timerRef.current.start();
                      }}
                      style={{paddingLeft: scale(8)}}
                    />
                  ) : (
                    <Icon3
                      name="md-pause"
                      size={scale(25)}
                      color={theme.colors.main}
                      // style={{marginLeft: scale(-5)}}
                      onPress={() => {
                        item?.percentageOfTask === 100
                          ? Toast.show(
                              'Time goal is achieved. Please edit task to set more time or to complete it.',
                            )
                          : updateStatus(item, null, index);
                        // timerRef.current.pause();
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
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginLeft: selectedType === 3 ? scale(-5) : scale(-13),
              }}>
              <Image
                source={{uri: item?.icon}}
                style={{
                  tintColor: darkmodeState
                    ? theme.colors.white
                    : theme.colors.black,
                  height: scale(18),
                  width: scale(18),
                  marginLeft:
                    item?.status === 'Done' ||
                    item.status === 'Failed' ||
                    selectedType == 3
                      ? selectedType == 3
                        ? 5
                        : scale(20)
                      : scale(0),
                  padding: scale(2),
                  marginHorizontal: selectedType == 3 ? 2 : 0,
                }}
              />
              <Label
                numberOfLines={2}
                title={item?.name}
                style={{
                  fontSize: scale(11),
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
                  width: '75%',
                  marginLeft:
                    item?.status === 'Done' || item.status === 'Failed'
                      ? 5
                      : scale(3),
                  left:
                    selectedType === 3 ||
                    item?.status === 'Done' ||
                    item.status === 'Failed'
                      ? 0
                      : scale(selectedType == 2 ? -1 : -8),
                }}
              />
              {(selectedType !== 1 && item?.status === 'Done') ||
                (item.status === 'Failed'
                  ? null
                  : item?.percentageOfTask?.toFixed(2) && (
                      <Label
                        title={
                          item?.meta === 'Registry'
                            ? ''
                            : item?.percentageOfTask?.toFixed(2) + ' %'
                        }
                        style={{
                          fontSize: scale(10),
                          color: darkmodeState
                            ? theme.colors.white
                            : theme.colors.black,
                          left: scale(2),
                        }}
                      />
                    ))}
            </View>
            {item?.meta === 'Achievement' &&
              (item?.status !== 'Done' || item.status === 'Failed') && (
                <ProgressBar
                  progress={
                    selectedType === 3
                      ? item?.percentageOfTask == undefined
                        ? 0
                        : item?.percentageOfTask / 100
                      : item?.percentageOfTask == undefined
                      ? 0
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
                    width: '85%',
                    marginLeft: selectedType === 2 ? scale(-13) : 0,
                  }}
                />
              )}
          </View>
          <View style={styles.staticDetails}>
            {selectedType === 3 && (
              <Label
                title={
                  item?.meta === 'Achievement'
                    ? `${
                        item?.counterIncrementDecrement !== undefined
                          ? item?.counterIncrementDecrement
                          : 0
                      }\n${item?.amount}`
                    : item?.counterIncrementDecrement
                }
                style={{
                  fontSize: scale(10),
                  marginLeft: scale(22),
                  color: darkmodeState
                    ? theme.colors.white
                    : theme.colors.black,
                }}
              />
            )}
            {selectedType !== 3 && (
              // <View>
              //   <Timer
              //     ref={timerRef}
              //     style={styles.timer}
              //     textStyle={{
              //       fontSize: scale(11),
              //       marginLeft: scale(18),
              //       color: darkmodeState
              //         ? theme.colors.white
              //         : theme.colors.black,
              //     }}
              //     onTimes={e => {}}
              //     onPause={e => {}}
              //     onEnd={e => {}}
              //     formatTime="hh:mm:ss"
              //     initialSeconds={
              //       item?.meta === 'Registry'
              //         ? item?.cronoCompletedTime
              //           ? item?.cronoCompletedTime // (item?.cronoCompletedTime / 60)?.toFixed(2)
              //           : 0
              //         : `${
              //             item?.timerCompletedTime
              //               ? item?.timerCompletedTime //  (item?.timerCompletedTime / 60).toFixed(2)
              //               : 0
              //           }`
              //     }
              //   />
              //   <Label
              //     style={{
              //       fontSize: scale(11),
              //       marginLeft: scale(18),
              //       color: darkmodeState
              //         ? theme.colors.white
              //         : theme.colors.black,
              //     }}
              //     title={item?.amount === null ? 0 : item?.amount}
              //   />
              // </View>
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
                  fontSize: scale(10),
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
                  ? item?.percentageFolderWise?.toFixed(2)
                  : item?.percentageFolderWise?.toFixed(2)
              }
              style={{
                fontSize: scale(10),
                color: darkmodeState ? theme.colors.white : theme.colors.black,
                textAlign: 'center',
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
    width: '13%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  staticDetails: {
    flexDirection: 'row',
    width: '30%',
    marginHorizontal: scale(8),
    justifyContent: 'space-between',
    // alignItems: 'center',
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
  timerText: {},
});
