import {
  Modal,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {Calendar} from 'react-native-calendars';
import {scale, theme} from '../../utils';
import {useState} from 'react';
import moment from 'moment';
import Icon from 'react-native-vector-icons/Feather';
import {Title} from '../Label';
import Feather from 'react-native-vector-icons/Feather';

const DatePickerModal = props => {
  const {
    isVisible,
    close,
    onSavePress,
    markedDates,
    setMarkedDates,
  } = props;

  const [startDay, setStartDay] = useState(null);
  const [endDay, setEndDay] = useState(null);

  var StartDate = startDay;
  StartDate =
    StartDate === null
      ? null
      : StartDate.split('-').reverse().join('-').slice(0, 4);

  var Enddate = endDay;
  Enddate =
    Enddate === null
      ? null
      : Enddate.split('-').reverse().join('-').slice(0, 4);

  return (
    <Modal animationType={'none'} visible={isVisible} onRequestClose={() => {}}>
      <View style={styles.mainView}>
        <Icon name="calendar" size={30} style={styles.cancle} />
        <Title title="Calendar" />
        <Icon onPress={close} name="x" size={30} style={styles.cancle} />
      </View>
      <Calendar
        onDayPress={day => {
          if (startDay && !endDay) {
            const date = {};
            for (
              const d = moment(startDay);
              d.isSameOrBefore(day.dateString);
              d.add(1, 'days')
            ) {
              date[d.format('YYYY-MM-DD')] = {
                marked: true,
                color: 'black',
                textColor: 'white',
              };

              if (d.format('YYYY-MM-DD') === startDay)
                date[d.format('YYYY-MM-DD')].startingDay = true;
              if (d.format('YYYY-MM-DD') === day.dateString)
                date[d.format('YYYY-MM-DD')].endingDay = true;
            }

            setMarkedDates(date);
            setEndDay(day.dateString);
          } else {
            setStartDay(day.dateString);
            setEndDay(null);
            setMarkedDates({
              [day.dateString]: {
                marked: true,
                color: 'black',
                textColor: 'white',
                startingDay: true,
                endingDay: true,
              },
            });
          }
        }}
        monthFormat={'yyyy MMM'}
        hideDayNames={false}
        markingType={'period'}
        markedDates={markedDates}
        theme={{
          dotColor: 'black',
        }}
      />

      <TouchableOpacity
        style={{alignItems: 'center', marginTop: scale(30)}}
        onPress={() => onSavePress(StartDate, Enddate)}>
        <Feather name="filter" size={scale(30)} />
      </TouchableOpacity>
    </Modal>
  );
};

export default DatePickerModal;

const styles = StyleSheet.create({
  mainView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: scale(10),
    alignItems: 'center',
    marginTop: Platform.OS === 'ios' ? scale(25) : 0,
    borderBottomWidth: scale(0.5),
    borderColor: theme.colors.gray,
  },
});
