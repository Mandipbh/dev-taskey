import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Calendar from 'react-native-calendars/src/calendar';
import {scale, theme} from '../../utils';
import {useState} from 'react';
import Icon from 'react-native-vector-icons/Feather';
import {Label} from '../Label';

const DatePickerModal = props => {
  const {isVisible, close, title, subTitle} = props;
  const [myDate, setMyDate] = useState('');
  function onDayPress({...date}) {
    setMyDate(date.dateString);
  }
  return (
    <Modal animationType={'none'} visible={isVisible} onRequestClose={() => {}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: scale(10),
          alignItems: 'center',
        }}>
        <Icon name="calendar" size={30} style={styles.cancle} />
        <Text style={{fontSize: 20, fontWeight: '700', color: 'black'}}>
          Calendar
        </Text>
        <Icon onPress={close} name="x" size={30} style={styles.cancle} />
      </View>
      <Calendar
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
      />
    </Modal>
  );
};

export default DatePickerModal;

const styles = StyleSheet.create({});
