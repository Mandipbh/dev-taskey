import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  ImageBackground,
} from 'react-native';
import React from 'react';
import {Dropdown} from 'react-native-element-dropdown';
import {useState} from 'react';
import {scale, theme} from '../../utils';

import {CheckBox, DatePickerModal, Label} from '../../components';
import {
  statisticdata,
  statisticdataone,
  statisticdataFour,
  statisticdataFive,
  statisticdataSix,
  statisticdataSeven,
  TypeTask_Distribution,
  AchievementTasksStatus,
  TimerSpecificfolders,
} from '../../utils/mockData';
import moment from 'moment';
import images from '../../assets/Images/index';
import ChartSection from '../../components/ChartSection';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {MultiSelect} from 'react-native-element-dropdown';
import {useEffect} from 'react';
import ApiService from '../../utils/ApiService';
import {useSelector} from 'react-redux';

const CustomDetails = props => {
  const {detailsData} = props;
  return (
    <View style={styles.mapView}>
      {detailsData &&
        detailsData.map(item => {
          return (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Label
                style={[
                  styles.mapText,
                  {
                    color: theme.colors.black,
                  },
                ]}
                title={item?.label}
              />
              <Label
                style={[
                  styles.mapText,
                  {
                    color: theme.colors.black,
                  },
                ]}
                title={item?.value}
              />
            </View>
          );
        })}
    </View>
  );
};
const data = [
  {
    id: -1,
    label: 'All',
  },
  {id: 0, label: 'Crono'},
  {id: 1, label: 'Timer'},
  {id: 2, label: 'Counter'},
];

const TimeFolders = [
  {label: 'Golbal Timer Folder', value: '1'},
  {label: 'Sport', value: '2'},
  {label: 'Other folder 1', value: '3'},
  {label: 'Other folder 2', value: '4'},
];

const TimeSpecificFolder = [
  {label: 'Football', value: '1'},
  {label: 'Running', value: '2'},
  {label: 'Task example', value: '3'},
  {label: 'Other', value: '4'},
];

const Task = [
  {id: 1, name: 'Type Task Distribution'},
  {id: 2, name: 'Achievement Tasks Status'},
];

const StatisticsScreen = () => {
  const naviagtion = useNavigation();
  const [value, setvalue] = useState(null);
  const [isChecked, setChecked] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedType, setType] = useState(1);
  const [folderSpecific_checked, setFolderSpecific_checked] = useState([]);
  const [markedDates, setMarkedDates] = useState(null);
  const [statisticData, setstatisticData] = useState(statisticdata);
  const [statisticDataone, setStatisticDataOne] = useState(statisticdataone);
  const isFoucs = useIsFocused();
  const [statisticdataFourData, setstatisticdataFour] =
    useState(statisticdataFour);
  const [statisticDatafive, setStatisticDatafive] = useState(statisticdataFive);
  const darkmodeState = useSelector(state => state.UserReducer.isDarkMode);
  const [statisticdatasix, setstatisticdataSix] = useState(statisticdataSix);
  const [TypeTask_distribution, setTypeTask_Distribution] = useState(
    TypeTask_Distribution,
  );
  const [achievementTasksStatus, setAchievementTasksStatus] = useState(
    AchievementTasksStatus,
  );
  const [statisticdataseven, setstatisticdataSeven] =
    useState(statisticdataSeven);
  useEffect(() => {
    getStatasticData();
  }, [value, startDate]);
  useEffect(() => {
    getStatasticData();
  }, [isFoucs]);

  const getStatasticData = () => {
    let todayDate = moment().format('YYYY/MM/DD');

    var startdate = moment();
    startdate = startdate.subtract(1, 'month');
    startdate = startdate.format('YYYY/MM/DD');
    const payload = {
      startDate: startDate === null ? startdate : startDate,
      lastDate: endDate === null ? todayDate : endDate,
      type: value === null || value === 'All' ? 'All' : value?.toUpperCase(),
    };
    const options = {payloads: payload};
    ApiService.post('statistics', options)
      .then(res => {
        if (res.success) {
          // console.log('statics response >>> ', res);
          let staticdummy = [...statisticData];
          staticdummy[0].value =
            res?.outputData.numberOfTask === undefined
              ? '-'
              : res?.outputData.numberOfTask;
          staticdummy[1].value =
            res?.outputData.totalMin === undefined
              ? '-'
              : res?.outputData.totalMin / 60;
          setstatisticData(staticdummy);
          let staticdummyone = [...statisticDataone];
          staticdummyone[0].value =
            res?.outputData.achievementTasks === undefined
              ? '-'
              : res?.outputData.achievementTasks;
          staticdummyone[1].value =
            res?.outputData.achievementDoneTask === undefined
              ? '-'
              : res?.outputData.achievementDoneTask;
          staticdummyone[2].value =
            res?.outputData.percentageOfSuccess === undefined
              ? '-'
              : res?.outputData.percentageOfSuccess?.toFixed(2) + '%';
          let three = [...statisticdataFourData];

          three[0].value =
            res?.outputData.deletedTasks === undefined
              ? '-'
              : res?.outputData.deletedTasks;
          three[1].value =
            res?.outputData.failedTasks === undefined
              ? '-'
              : res?.outputData.failedTasks;
          three[2].value =
            res?.outputData?.percentageOfFailedTask === undefined
              ? '-'
              : res?.outputData.percentageOfFailedTask?.toFixed(2) === undefined
              ? res?.outputData.percentageOfFailedTask?.toFixed(2)
              : res?.outputData.percentageOfFailedTask?.toFixed(2) + '%';
          setStatisticDataOne(staticdummyone);

          let staticdummytwo = [...statisticDatafive];
          staticdummytwo[0].value =
            res?.outputData.totalCronoTask === undefined
              ? '-'
              : res?.outputData.totalCronoTask;
          staticdummytwo[1].value =
            res?.outputData.percentageOfCronoTask?.toFixed(2) === undefined
              ? '-'
              : res?.outputData.percentageOfCronoTask?.toFixed(2) + '%';
          setStatisticDatafive(staticdummytwo);
          let six = [...statisticdatasix];
          six[0].value =
            res?.outputData.totalTimerTask === undefined
              ? '-'
              : res?.outputData.totalTimerTask;
          six[1].value =
            res?.outputData.percentageOfTimerTask?.toFixed(2) === undefined
              ? '-'
              : res?.outputData.percentageOfTimerTask?.toFixed(2) + '%';
          setstatisticdataSix(six);
          let seven = [...statisticdataseven];
          seven[0].value =
            res?.outputData.totalCounterTask === undefined
              ? '-'
              : res?.outputData.totalCounterTask;
          seven[1].value =
            res?.outputData.percentageOfCounterTask?.toFixed(2) === undefined
              ? '-'
              : res?.outputData.percentageOfCounterTask?.toFixed(2) + '%';
          setstatisticdataSeven(seven);
          let graph = [...TypeTask_distribution];
          graph[0].value =
            res?.outputData.percentageOfCronoTask?.toFixed(2) === undefined
              ? 0
              : res?.outputData.percentageOfCronoTask?.toFixed(2);
          graph[1].value =
            res?.outputData.percentageOfTimerTask?.toFixed(2) === undefined
              ? 0
              : res?.outputData.percentageOfTimerTask?.toFixed(2);
          graph[2].value =
            res?.outputData.percentageOfCounterTask?.toFixed(2) === undefined
              ? 0
              : res?.outputData.percentageOfCounterTask?.toFixed(2);
          setTypeTask_Distribution(graph);
          let graph1 = [...AchievementTasksStatus];
          graph1[0].value =
            res?.outputData.achievementDeletePer?.toFixed(2) === undefined
              ? 0
              : res?.outputData.achievementDeletePer?.toFixed(2);
          graph1[2].value =
            res?.outputData.achievementInProgressPer?.toFixed(2) === undefined
              ? 0
              : res?.outputData.achievementInProgressPer?.toFixed(2);
          graph1[1].value =
            res?.outputData.achievementFailedPer?.toFixed(2) === undefined
              ? 0
              : res?.outputData.achievementFailedPer?.toFixed(2);

          setAchievementTasksStatus(graph1);
        } else {
          console.log('null');
        }
      })
      .catch(err => console.log('Error', err.response));
  };

  const handlclose = () => {
    setChecked(!isChecked);
    setEndDate(null);
    setStartDate(null);
  };

  const handleData = d => {
    if (d !== null) {
      const sDate = Object.keys(d)[0];
      const eDate = Object.keys(d)[3];
      setStartDate(moment(sDate).format('DD/MM'));
      setEndDate(moment(eDate).format('DD/MM'));
    }
  };

  const Main = ({darkmodeState}) => {
    return (
      <>
        <View style={styles.mapView}>
          {statisticData.map((f, i) => {
            return (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
                key={i.toString()}>
                <Text
                  style={[
                    styles.mapText,
                    {
                      color: darkmodeState
                        ? theme.colors.white
                        : theme.colors.black,
                    },
                  ]}>
                  {f.label}
                </Text>
                <Text
                  style={[
                    styles.labeltwo,
                    {
                      color: darkmodeState
                        ? theme.colors.white
                        : theme.colors.black,
                    },
                  ]}>
                  {f.value}
                </Text>
              </View>
            );
          })}
        </View>
        <View style={styles.divider} />
        <View style={styles.mapView}>
          {statisticDataone.map((f, i) => {
            return (
              <View style={styles.checkboxRow}>
                <View style={{flexDirection: 'row'}}>
                  {f.ischecked && (
                    <CheckBox btnstyle={{borderRadius: scale(0)}} />
                  )}
                  <Text
                    style={[
                      styles.mapText,
                      {
                        color: darkmodeState
                          ? theme.colors.white
                          : theme.colors.black,
                      },
                    ]}>
                    {f.label}
                  </Text>
                </View>
                <Text
                  style={[
                    styles.labeltwo,
                    {
                      color: darkmodeState
                        ? theme.colors.white
                        : theme.colors.black,
                    },
                  ]}>
                  {f.value}
                </Text>
              </View>
            );
          })}
        </View>
        <View style={styles.divider} />
        <View style={styles.mapView}>
          {statisticdataFourData.map((f, i) => {
            return (
              <View style={styles.checkboxRow}>
                <View style={{flexDirection: 'row'}}>
                  {f.ischecked && (
                    <CheckBox btnstyle={{borderRadius: scale(0)}} />
                  )}
                  <Text
                    style={[
                      styles.mapText,
                      {
                        color: darkmodeState
                          ? theme.colors.white
                          : theme.colors.black,
                        // marginLeft: f.ischecked ? scale(-40) : 0,
                      },
                    ]}>
                    {f.label}
                  </Text>
                </View>
                <Text
                  style={[
                    styles.labeltwo,
                    {
                      color: darkmodeState
                        ? theme.colors.white
                        : theme.colors.black,
                    },
                  ]}>
                  {f.value}
                </Text>
              </View>
            );
          })}
        </View>

        <View style={styles.divider} />
        <View
          style={{
            flexDirection: 'row',
            marginTop: theme.SCREENHEIGHT * 0.22,
            margin: scale(20),
            alignItems: 'center',
          }}>
          <CheckBox btnstyle={{borderRadius: scale(0)}} />
          <Text
            style={[
              styles.checkText,
              {
                color: darkmodeState ? theme.colors.white : theme.colors.black,
                marginLeft: scale(0),
              },
            ]}>
            Check to count in statistics
          </Text>
        </View>
        <View style={styles.mapView}>
          {statisticDatafive.map((f, i) => {
            return (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text
                  style={[
                    styles.mapText,
                    {
                      color: darkmodeState
                        ? theme.colors.white
                        : theme.colors.black,
                    },
                  ]}>
                  {f.label}
                </Text>
                <Text
                  style={[
                    styles.labeltwo,
                    {
                      color: darkmodeState
                        ? theme.colors.white
                        : theme.colors.black,
                    },
                  ]}>
                  {f.value}
                </Text>
              </View>
            );
          })}
        </View>
        <View style={styles.divider} />

        <View style={styles.mapView}>
          {statisticdatasix.map((f, i) => {
            return (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text
                  style={[
                    styles.mapText,
                    {
                      color: darkmodeState
                        ? theme.colors.white
                        : theme.colors.black,
                    },
                  ]}>
                  {f.label}
                </Text>
                <Text
                  style={[
                    styles.labeltwo,
                    {
                      color: darkmodeState
                        ? theme.colors.white
                        : theme.colors.black,
                    },
                  ]}>
                  {f.value}
                </Text>
              </View>
            );
          })}
        </View>
        <View style={styles.divider} />

        <View style={styles.mapView}>
          {statisticdataseven.map((f, i) => {
            return (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text
                  style={[
                    styles.mapText,
                    {
                      color: darkmodeState
                        ? theme.colors.white
                        : theme.colors.black,
                    },
                  ]}>
                  {f.label}
                </Text>
                <Text
                  style={[
                    styles.labeltwo,
                    {
                      color: darkmodeState
                        ? theme.colors.white
                        : theme.colors.black,
                    },
                  ]}>
                  {f.value}
                </Text>
              </View>
            );
          })}
        </View>
        <View style={styles.divider} />

        <View style={styles.taskCon}>
          {Task.map(item => {
            return (
              item.id === selectedType && (
                <>
                  <View style={{width: '10%'}}>
                    {value !== 'Crono' && (
                      <AntDesign
                        name="left"
                        size={scale(30)}
                        onPress={() => {
                          selectedType > 1
                            ? setType(item.id - 1)
                            : setType(item.id + 1);
                        }}
                        color={
                          darkmodeState
                            ? theme.colors.white
                            : theme.colors.black
                        }
                      />
                    )}
                  </View>
                  <View style={styles.dataCon}>
                    <Label
                      style={{
                        fontSize: scale(17),
                        color: darkmodeState
                          ? theme.colors.white
                          : theme.colors.black,
                      }}
                      title={item.name}
                    />
                    <Label
                      title={'Slide to view'}
                      style={{
                        color: darkmodeState
                          ? theme.colors.white
                          : theme.colors.black,
                      }}
                    />
                  </View>

                  <View style={{width: '10%'}}>
                    {value !== 'Crono' && (
                      <AntDesign
                        name="right"
                        size={scale(30)}
                        onPress={() => {
                          selectedType <= 1 ? setType(item.id + 1) : setType(1);
                        }}
                        color={
                          darkmodeState
                            ? theme.colors.white
                            : theme.colors.black
                        }
                      />
                    )}
                  </View>
                </>
              )
            );
          })}
        </View>

        {selectedType === 1 ? (
          <ChartSection
            style={{marginTop: scale(15)}}
            title="Type Tasks Distribution"
            data={TypeTask_distribution}
          />
        ) : (
          <ChartSection
            title="Achievement Tasks Status"
            data={achievementTasksStatus}
          />
        )}
        {/* <View style={styles.divider} />
        <View style={{marginTop: scale(15)}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Label
              style={{fontWeight: '600', fontSize: 16, fontWeight: '600'}}
              title="Time Folder"></Label>
            <TouchableOpacity onPress={() => {}}>
              <Label style={{color: 'red'}} title="X Remove folder"></Label>
            </TouchableOpacity>
          </View>
          <View
            style={{
              alignItems: 'center',
              marginVertical: scale(10),
              marginTop: scale(20),
            }}>
            <MultiSelect
              placeholder="Add Folder"
              style={styles.Dropdown}
              data={TimeFolders}
              labelField="label"
              valueField="value"
              value={folderselected}
              onChange={item => setFolderSelected(item)}
              renderSelectedItem={(item, unSelect) => (
                <Pressable style={styles.selectedStyle}>
                  <Label
                    style={styles.textSelectedStyle}
                    title={item.label}></Label>
                  <TouchableOpacity onPress={() => unSelect && unSelect(item)}>
                    <AntDesign color="red" name="close" size={20} />
                  </TouchableOpacity>
                </Pressable>
              )}
            />
          </View>
          <ChartSection title="Timer folders" data={Timefolders} />
        </View> */}
      </>
    );
  };

  const TimeSpecific = () => {
    return (
      <>
        <View style={styles.divider} />
        <View style={{marginTop: scale(15)}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Label
              style={{fontWeight: '600', fontSize: 16}}
              title="Time Specific Folders"></Label>
            <TouchableOpacity onPress={() => {}}>
              <Label style={{color: 'red'}} title="X Remove Task"></Label>
            </TouchableOpacity>
          </View>
          <View
            style={{
              alignItems: 'center',
              marginVertical: scale(10),
              marginTop: scale(20),
            }}>
            <MultiSelect
              placeholder="Add Folder"
              style={styles.Dropdown}
              data={TimeSpecificFolder}
              labelField="label"
              valueField="value"
              value={folderSpecific_checked}
              onChange={item => setFolderSpecific_checked(item)}
              renderSelectedItem={(item, unSelect) => (
                <Pressable style={styles.selectedStyle}>
                  <Label
                    style={styles.textSelectedStyle}
                    title={item.label}></Label>
                  <TouchableOpacity onPress={() => unSelect && unSelect(item)}>
                    <AntDesign color="red" name="close" size={20} />
                  </TouchableOpacity>
                </Pressable>
              )}
            />
          </View>
          <ChartSection
            title="Timer Sports Folder"
            data={TimerSpecificfolders}
          />
        </View>
      </>
    );
  };

  return (
    <SafeAreaView
      style={{
        backgroundColor: darkmodeState
          ? theme.colors.black
          : theme.colors.backgroundColor,
        flex: 1,
      }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: scale(60),
        }}>
        <ImageBackground style={styles.header} source={images.banner}>
          <Text style={styles.statistictxt}>Statistics</Text>
          <View style={styles.mainView}>
            <View style={styles.calView}>
              <Label title="Select Time Range" style={styles.label} />
              <TouchableOpacity
                onPress={() => {
                  setChecked(!isChecked);
                  setMarkedDates(null);
                }}
                style={styles.selectTime}>
                <Label
                  title={
                    startDate == null ? 'Today' : startDate + ' / ' + endDate
                  }
                  style={styles.datetimetxt}
                />
              </TouchableOpacity>
              <DatePickerModal
                isVisible={isChecked}
                close={handlclose}
                dateRange={handleData}
                markedDates={markedDates}
                setMarkedDates={setMarkedDates}
                onSavePress={(StartDate, Enddate) => {
                  setStartDate(StartDate);
                  setEndDate(Enddate);
                  setChecked(false);
                }}
              />
            </View>
          </View>
          <View style={styles.mainView}>
            <View style={styles.calView}>
              <Label title="Select Type of Task" style={styles.label} />
              <Dropdown
                placeholder="All"
                style={styles.Dropdown}
                data={data}
                labelField="label"
                valueField="id"
                onChange={item => {
                  setvalue(item.label);
                }}
                itemTextStyle={{color: theme.colors.black}}
                selectedTextStyle={{color: theme.colors.black}}
                placeholderStyle={{color: theme.colors.black}}
              />
            </View>
          </View>
        </ImageBackground>

        {selectedType === 1 ? (
          <>
            <Main darkmodeState={darkmodeState} />
          </>
        ) : selectedType === 2 ? (
          <Main darkmodeState={darkmodeState} />
        ) : (
          <></>
        )}
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
  statistictxt: {
    fontSize: 22,
    color: theme.colors.white,
    fontWeight: '600',
    marginTop: scale(20),
    marginLeft: scale(20),
  },
  header: {
    height: scale(175),
    width: '100%',
    resizeMode: 'cover',
  },

  selectTime: {
    // borderLeftWidth: scale(1),
    padding: scale(4),
    width: theme.SCREENWIDTH * 0.35,
    height: theme.SCREENHEIGHT * 0.05,
    marginLeft: scale(10),
  },
  checkText: {fontSize: 18, marginLeft: scale(15)},
  calView: {
    flexDirection: 'row',
    alignItems: 'center',
    height: theme.SCREENHEIGHT * 0.06,
    width: theme.SCREENWIDTH * 0.85,
    backgroundColor: theme.colors.lightOrange,
    marginHorizontal: scale(25),
    padding: scale(5),
    // borderWidth: scale(0.8),
    borderRadius: scale(10),
  },
  datetimetxt: {
    justifyContent: 'center',
    marginBottom: scale(-5),
    fontSize: scale(12),
  },
  Dropdown: {
    paddingHorizontal: scale(14),
    // marginLeft: scale(6),
    width: theme.SCREENWIDTH * 0.38,
    // borderLeftWidth: Platform.OS === 'android' ? 1 : 0.3,
  },
  mapView: {
    marginTop: scale(20),
    paddingBottom: scale(4),
    borderColor: theme.colors.gray,
    paddingHorizontal: scale(15),
  },
  mapText: {fontWeight: '300', fontSize: 16, color: theme.colors.black},
  label: {
    fontWeight: '500',
    marginLeft: scale(10),
    color: theme.colors.black,
    fontSize: 14,
    borderRightWidth: 2,
    paddingRight: 15,
  },
  labeltwo: {
    fontWeight: '600',
    marginLeft: scale(10),
    color: theme.colors.black,
    fontSize: 16,
    paddingRight: 15,
  },
  row: {
    flexDirection: 'row',
  },
  taskCon: {
    flexDirection: 'row',
    alignSelf: 'center',
    width: '75%',
    marginTop: scale(40),
  },
  divider: {
    borderBottomWidth: scale(0.2),
    height: theme.SCREENHEIGHT * 0.007,
    borderBottomColor: 'gray',
    marginTop: scale(5),
    marginHorizontal: scale(25),
  },
  MultiSelect: {
    height: scale(45),
    backgroundColor: 'transparent',
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
  },
  selectedStyle: {
    borderRadius: 12,
    borderWidth: scale(1),
    marginTop: scale(10),
    flexDirection: 'row',
    paddingVertical: scale(5),
    paddingHorizontal: scale(8),
    alignItems: 'center',
    marginHorizontal: scale(5),
    borderColor: 'gray',
  },
  textSelectedStyle: {
    marginRight: scale(4),
    fontSize: 14,
  },
  checkboxRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // alignItems: 'center',
  },
  dataCon: {
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
