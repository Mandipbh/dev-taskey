import {View, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {ProgressBar} from 'react-native-paper';
import Icon1 from 'react-native-vector-icons/Foundation';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import Icon3 from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {scale, theme} from '../utils';
import {Label} from './Label';

const CronoCard = ({
  item,
  index,
  move,
  moveEnd,
  selectedType,
  updateStatus,
}) => {
  const navigation = useNavigation();

  return (
    <>
      {index < 4 && (
        <TouchableOpacity
          onLongPress={move}
          onPressOut={moveEnd}
          key={index}
          style={[
            styles.taskRow,
            {
              backgroundColor:
                index % 2 !== 0 ? theme.colors.white : theme.colors.white1,
            },
          ]}
          onPress={() => navigation.navigate('CreateTask', {editData: item})}>
          <View style={styles.statusView}>
            {selectedType !== 3 ? (
              <>
                {item.status === 'Paused' ? (
                  <Icon1
                    name="play"
                    size={scale(25)}
                    color={theme.colors.main}
                    onPress={() => {
                      updateStatus(item);
                    }}
                  />
                ) : (
                  <Icon3
                    name="md-pause"
                    size={scale(20)}
                    color={theme.colors.main}
                    style={{marginLeft: scale(-5)}}
                    onPress={() => {
                      updateStatus(item);
                    }}
                  />
                )}
              </>
            ) : (
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity
                  style={styles.add}
                  onPress={() => {
                    updateStatus(item, 'Plus');
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
                        ? updateStatus(item, 'Minus')
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
          <View style={styles.taskLabel}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Label title={item?.name} style={{fontSize: scale(12)}} />
              {selectedType !== 1 && (
                <Label
                  title={
                    item?.meta === 'Registry'
                      ? '-'
                      : item?.percentageOfTask?.toFixed(2)
                  }
                  style={{fontSize: scale(11)}}
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
                }}
              />
            )}
            {selectedType !== 3 && (
              <Label
                title={
                  item?.meta === 'Registry'
                    ? item?.cronoCompletedTime
                      ? (item?.cronoCompletedTime / 60)?.toFixed(2)
                      : 0
                    : `${
                        item?.timerCompletedTime
                          ? (item?.timerCompletedTime / 60).toFixed(2)
                          : 0
                      }\n${item?.amount?.toFixed(2)}`
                }
                style={{
                  fontSize: scale(11),
                  marginLeft: item?.meta === 'Registry' ? scale(18) : scale(-5),
                }}
              />
            )}
            <Label
              title={
                item?.meta === 'Registry'
                  ? 0
                  : item?.percentageFolderWise?.toFixed(2)
              }
              style={{fontSize: scale(11)}}
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
