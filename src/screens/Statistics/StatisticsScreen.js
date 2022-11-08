import {
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {Dropdown} from 'react-native-element-dropdown';
import {useState} from 'react';
import Calendar from 'react-native-calendars/src/calendar';
import {scale, theme} from '../../utils';
import {DatePickerModal} from '../../components';
import {
  statisticdata,
  statisticdataone,
  statisticdatathree,
  statisticdatatwo,
  taskstype,
  colorData,
  colorDataTwo,
} from '../../utils/mockData';
import CustomChart from '../../components/CustomChart';

const StatisticsScreen = () => {
  const data = [
    {id: 1, label: 'Crono'},
    {id: 2, label: 'Timer'},
    {id: 3, label: 'Counter'},
  ];

  const [value, setvalue] = useState(null);
  const [staticData, setStaticData] = useState(statisticdata);
  const [isChecked, setChecked] = useState(false);
  const handlclose = () => {
    setChecked(!isChecked);
  };
  const typeCount = taskstype.map(i => i.data.length * 10);
  const statusCount = taskstype.map(i => i.data.map(i => i.status).length * 10);
  return (
    <SafeAreaView
      style={{
        backgroundColor: theme.colors.white,
        flex: 1,
        paddingHorizontal: scale(13),
      }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: scale(60)}}>
        <Text
          style={{
            fontSize: 23,
            fontWeight: '700',
            color: 'black',
            alignSelf: 'center',
            margin: 5,
          }}>
          Statistics
        </Text>
        <View style={styles.mainView}>
          <View style={styles.calView}>
            <Icon name="calendar-outline" size={35} />
            <Text style={styles.timteText}>Select Time Range</Text>
          </View>
          <View>
            <TouchableOpacity
              onPress={() => setChecked(!isChecked)}
              style={styles.selectTime}>
              <Text style={{textAlign: 'center'}}>Today</Text>
            </TouchableOpacity>
            <DatePickerModal isVisible={isChecked} close={handlclose} />
          </View>
        </View>
        <View style={styles.mainView}>
          <View style={styles.calView}>
            <Icon name="clipboard-sharp" size={35} />
            <Text style={styles.timteText}>Select Time Range</Text>
          </View>
          <View>
            <Dropdown
              placeholder="All"
              style={styles.Dropdown}
              data={data}
              labelField="label"
              valueField="id"
              onChange={item => setvalue(item.value)}
            />
          </View>
        </View>

        <View style={styles.mapView}>
          {statisticdata.map((f, i) => {
            return (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text style={styles.mapText}>{f.label}</Text>
                <Text style={styles.mapText}>{f.value}</Text>
              </View>
            );
          })}
        </View>

        <View style={styles.mapView}>
          {statisticdataone.map((f, i) => {
            return (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text style={styles.mapText}>{f.label}</Text>
                <Text style={styles.mapText}>{f.value}</Text>
              </View>
            );
          })}
        </View>
        <View style={styles.mapView}>
          {statisticdatatwo.map((f, i) => {
            return (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text style={styles.mapText}>{f.label}</Text>
                <Text style={styles.mapText}>{f.value}</Text>
              </View>
            );
          })}
        </View>
        <View style={styles.mapView}>
          {statisticdatathree.map((f, i) => {
            return (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text style={styles.mapText}>{f.label}</Text>
                <Text style={styles.mapText}>{f.value}</Text>
              </View>
            );
          })}
        </View>
        <View style={styles.mapView}>
          {statisticdatathree.map((f, i) => {
            return (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text style={styles.mapText}>{f.label}</Text>
                <Text style={styles.mapText}>{f.value}</Text>
              </View>
            );
          })}
        </View>
        <View style={styles.chartView}>
          <View style={styles.innerView}>
            <CustomChart Yourdata={statusCount} chartData={colorData}  />
          </View>
        </View>
        <View style={styles.chartView}>
          <View style={styles.innerView}>
            <CustomChart Yourdata={statusCount} chartData={colorDataTwo} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default StatisticsScreen;

const styles = StyleSheet.create({
  mainView: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectTime: {
    borderWidth: 1,
    padding: 5,
    width: theme.SCREENWIDTH * 0.45,
  },
  timteText: {
    fontSize: 17,
    width: '70%',
    fontWeight: '700',
    textAlign: 'center',
  },
  calView: {
    flexDirection: 'row',
    alignItems: 'center',
    width: theme.SCREENWIDTH * 0.4,
  },
  Dropdown: {
    paddingHorizontal: 15,
    width: theme.SCREENWIDTH * 0.45,
    backgroundColor: theme.colors.gray1,
    borderWidth: Platform.OS === 'android' ? 0.8 : 0.3,
  },
  mapView: {marginTop: scale(25), borderBottomWidth: 1, paddingBottom: 5},
  mapText: {fontWeight: '600', fontSize: 16},
  chartView: {
    backgroundColor: theme.colors.gray1,
    paddingVertical: scale(20),
    marginVertical: scale(10),
  },
  innerView: {
    marginLeft: -theme.SCREENWIDTH * 0.3,
  },
});
