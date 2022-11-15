import {
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
import {scale, theme} from '../../utils';
import {CheckBox, DatePickerModal, Label, Title} from '../../components';
import {
  statisticdata,
  statisticdataone,
  statisticdatathree,
  statisticdatatwo,
  taskstype,
  statisticdataFour,
  statisticdataFive,
  statisticdataSix,
  statisticdataSeven,
  TypeTask_Distribution,
  AchievementTasksStatus,
  Timefolders,
} from '../../utils/mockData';
import CustomChart from '../../components/CustomChart';
import moment from 'moment';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CommonHeader from '../../components/CommonHeader';

const ChartSection = props => {
  const {title, data} = props;
  return (
    <View style={styles.chartView}>
      <Text style={{fontSize: 20}}>{title}</Text>
      <View style={{flexDirection: 'row', marginTop: scale(10)}}>
        <CustomChart chartData={data} />
        <View style={{justifyContent: 'center'}}>
          {data.map(i => {
            return (
              <>
                <View style={{flexDirection: 'row'}}>
                  <View
                    style={[styles.colorBox, {backgroundColor: i.svg.fill}]}
                  />
                  <Text>{i.type} Tasks</Text>
                </View>
              </>
            );
          })}
        </View>
      </View>
    </View>
  );
};

const StatisticsScreen = () => {
  const data = [
    {id: 1, label: 'Crono'},
    {id: 2, label: 'Timer'},
    {id: 3, label: 'Counter'},
  ];

  const [value, setvalue] = useState(null);
  const [isChecked, setChecked] = useState(false);
  const [checked, setChecke] = useState(true);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handlclose = () => {
    setChecked(!isChecked);
  };
  const typeCount = taskstype.map(i => i.data.length * 10);
  // const statusCount = taskstype.map(i => i.data.map(i => i.status).length * 10);

  const handleData = d => {
    if (d !== null) {
      const sDate = Object.keys(d)[0];
      const eDate = Object.keys(d)[3];
      setStartDate(moment(sDate).format('DD/MM'));
      setEndDate(moment(eDate).format('DD/MM'));
      console.log('starting date >> ', moment(sDate).format('DD/MM'));
      console.log('end date >> ', moment(eDate).format('DD/MM'));
    }
  };

  return (
    <SafeAreaView
      style={{
        backgroundColor: theme.colors.white,
        flex: 1,
      }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: scale(60),
          paddingHorizontal: scale(13),
        }}>
        {/* <Title title="Staticss" style={{alignSelf: 'center'}} /> */}

        <CommonHeader headerTitle="Statistics" IconType={AntDesign} />

        <View style={styles.mainView}>
          <View style={styles.calView}>
            <Icon name="calendar-outline" size={scale(22)} />
            <Label title="Select Time Range" style={styles.label} />
          </View>
          <View>
            <TouchableOpacity
              onPress={() => setChecked(!isChecked)}
              style={styles.selectTime}>
              <Label
                title={
                  startDate == null ? 'Today' : startDate + ' To ' + endDate
                }
                style={{textAlign: 'center'}}
              />
            </TouchableOpacity>
            <DatePickerModal
              isVisible={isChecked}
              close={handlclose}
              dateRange={handleData}
            />
          </View>
        </View>
        <View style={styles.mainView}>
          <View style={styles.calView}>
            <Icon name="clipboard-sharp" size={scale(22)} />
            <Label title="Select Time Range" style={styles.label} />
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
                <View style={styles.row}>
                  {f.CheckBox && (
                    <CheckBox
                      checked={checked}
                      onPress={() => setChecke(!checked)}
                    />
                  )}
                  {f.CheckBox ? (
                    <Text style={styles.mapText}>{`  ${f.label}`}</Text>
                  ) : (
                    <Text style={styles.mapText}>{f.label}</Text>
                  )}
                </View>

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
          {statisticdataFour.map((f, i) => {
            return (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <View>
                  <Text style={styles.mapText}>{f.label}</Text>
                </View>
                {/* <Text style={styles.mapText}>{f.label}</Text> */}
                <Text style={styles.mapText}>{f.value}</Text>
              </View>
            );
          })}
        </View>
        <View style={styles.mapView}>
          {statisticdataFive.map((f, i) => {
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
          {statisticdataSix.map((f, i) => {
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
          {statisticdataSeven.map((f, i) => {
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

        <ChartSection
          title="Type Tasks Distribution"
          data={TypeTask_Distribution}
        />

        <ChartSection
          title="Achievement Tasks Status"
          data={AchievementTasksStatus}
        />

        <View style={{marginTop: scale(15)}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{fontWeight: '600', fontSize: 16}}>Time Folder</Text>
            <TouchableOpacity onPress={() => {}}>
              <Text style={{color: 'red'}}>X Remove folder</Text>
            </TouchableOpacity>
          </View>
          <ChartSection title="Timer folders" data={Timefolders} />
        </View>

        <View style={{marginTop: scale(15)}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{fontWeight: '600', fontSize: 16}}>
              Time Specific Folders
            </Text>
            <TouchableOpacity onPress={() => {}}>
              <Text style={{color: 'red'}}>X Remove folder</Text>
            </TouchableOpacity>
          </View>
          <ChartSection title="Timer folders" data={Timefolders} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default StatisticsScreen;

const styles = StyleSheet.create({
  mainView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: scale(8),
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
  mapView: {
    marginTop: scale(25),
    borderBottomWidth: 0.5,
    paddingBottom: 5,
    borderColor: theme.colors.gray,
  },
  mapText: {fontWeight: '600', fontSize: 16},
  chartView: {
    backgroundColor: theme.colors.gray1,
    padding: scale(15),
    marginVertical: scale(5),
  },
  innerView: {
    marginLeft: -theme.SCREENWIDTH * 0.3,
  },
  label: {
    fontWeight: '600',
    marginLeft: scale(5),
  },
  row: {
    flexDirection: 'row',
  },
  chartTitle: {
    paddingLeft: scale(15),
    paddingBottom: scale(15),
    fontSize: 20,
    fontWeight: '400',
  },
  colorBox: {
    height: 20,
    // borderWidth: 1,
    width: 18,
    margin: 2,
    marginHorizontal: 8,
  },
});
