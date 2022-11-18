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
  const {isVisible, close, dateRange, onDayPress, markedDates} = props;
  const [startDate, setStartDate] = useState('');
  const [endDate, setendDate] = useState('');

  const onSavePress = async day => {
    console.log('start data >> ', startDate);
    console.log('start data >> ', endDate);
  };

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
        markedDates={setendDate}
        theme={{
          dotColor: 'black',
        }}
      />

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
