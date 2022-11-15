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
  const {isVisible, close, dateRange} = props;
  const [myDate, setMyDate] = useState('');
  function onDayPress({...date}) {
    setMyDate(date.dateString);
  }
  const [markedDates, setMarkedDates] = useState(null);

  const handleDayPress = async day => {
    await setMarkedDates({
      [day.dateString]: {
        startingDay: true,
        color: theme.colors.primary1,
      },
      [moment(day.dateString).add(1, 'days').format('YYYY-MM-DD')]: {
        color: theme.colors.primary1,
      },
      [moment(day.dateString).add(2, 'days').format('YYYY-MM-DD')]: {
        color: theme.colors.primary1,
      },
      [moment(day.dateString).add(3, 'days').format('YYYY-MM-DD')]: {
        endingDay: true,
        color: theme.colors.primary1,
      },
    });

    close();
  };
  useEffect(() => {
    dateRange(markedDates);
  }, [markedDates]);
  return (
    <Modal animationType={'none'} visible={isVisible} onRequestClose={() => {}}>
      <View style={styles.mainView}>
        <Icon name="calendar" size={30} style={styles.cancle} />
        <Title title="Calendar" />
        <Icon onPress={close} name="x" size={30} style={styles.cancle} />
      </View>
      <Calendar
        markedDates={markedDates}
        markingType={'period'}
        onDayPress={handleDayPress}
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
