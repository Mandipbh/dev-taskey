import {
  Modal,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import {Calendar} from 'react-native-calendars';

import {scale, theme} from '../../utils';
import {useState} from 'react';
import moment from 'moment';
import Icon from 'react-native-vector-icons/Feather';
import {Label, Title} from '../Label';

const DatePickerModal = props => {
  const {isVisible, close, dateRange, onDayPress, markedDates, onSavePress} =
    props;
  const [myDate, setMyDate] = useState('');

  // function onDayPress({...date}) {
  //   setMyDate(date.dateString);
  // }
  // const [markedDates, setMarkedDates] = useState(null);

  const handleDayPress = async day => {
    await setMarkedDates({
      [day.dateString]: {
        startingDay: true,
        color: theme.colors.primary1,
      },
      [moment(day.dateString).add(1, 'days').format('DD/MM')]: {
        color: theme.colors.primary1,
      },
      [moment(day.dateString).add(2, 'days').format('DD/MM')]: {
        color: theme.colors.primary1,
      },
      [moment(day.dateString).add(3, 'days').format('DD/MM')]: {
        endingDay: true,
        color: theme.colors.primary1,
      },
    });

    // close();
  };
  // useEffect(() => {
  //   dateRange(markedDates);
  // }, [markedDates]);
  return (
    <Modal animationType={'none'} visible={isVisible} onRequestClose={() => {}}>
      <View style={styles.mainView}>
        <Icon name="calendar" size={30} style={styles.cancle} />
        <Title title="Calendar" />
        <Icon onPress={close} name="x" size={30} style={styles.cancle} />
      </View>
      <Calendar
        onDayPress={onDayPress}
        monthFormat={'yyyy MMM'}
        hideDayNames={false}
        markingType={'period'}
        markedDates={markedDates}
        theme={{
          // selectedDayBackgroundColor: '#646464',
          // selectedDayTextColor: 'white',
          // monthTextColor: 'blue',
          // dayTextColor: 'black',
          // textMonthFontSize: 18,
          // textDayHeaderFontSize: 16,
          // arrowColor: '#e6e6e6',
          dotColor: 'black',
        }}
      />
      {/* <Calendar
        style={{marginTop: scale(20)}}
        onDayPress={onDayPress}
        theme={{
          textDayFontWeight: '400',
          arrowColor: theme.colors.primary,
          todayTextColor: theme.colors.primary,
        }}
        markingType={'custom'}
        markedDates={{
          [myDate]: {
            customStyles: {
              container: {
                backgroundColor: theme.colors.primary,
              },
              text: {
                color: 'white',
                fontWeight: 'bold',
              },
            },
          },
        }}
      /> */}

      <TouchableOpacity
        style={{alignItems: 'center', marginTop: scale(30)}}
        onPress={onSavePress}>
        <Text>Save</Text>
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
