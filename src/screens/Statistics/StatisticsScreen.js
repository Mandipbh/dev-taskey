import {
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Alert,
  ImageBackground,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {Dropdown} from 'react-native-element-dropdown';
import {useState} from 'react';
import {scale, theme} from '../../utils';
import {CheckBox, DatePickerModal, Label} from '../../components';
import {
  statisticdata,
  statisticdataone,
  statisticdatathree,
  statisticdatatwo,
  statisticdataFour,
  statisticdataFive,
  statisticdataSix,
  statisticdataSeven,
  TypeTask_Distribution,
  AchievementTasksStatus,
  Timefolders,
  TimerSpecificfolders,
} from '../../utils/mockData';
import moment from 'moment';
import CommonHeader from '../../components/CommonHeader';
import images from '../../assets/Images/index';
import ChartSection from '../../components/ChartSection';
import {useLayoutEffect} from 'react';
import {
  useFocusEffect,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {MultiSelect} from 'react-native-element-dropdown';
import {useEffect} from 'react';
import {useCallback} from 'react';
import axios from 'axios';
import ApiService from '../../utils/ApiService';
import {DonutChart} from 'react-native-circular-chart';

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
              <Label style={styles.mapText} title={item?.label} />
              <Label style={styles.mapText} title={item?.value} />
            </View>
          );
        })}
    </View>
  );
};
const data = [
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

const Type = [
  {id: 1, name: 'All Data'},
  {id: 2, name: 'Only generals'},
  {id: 3, name: 'Only Specific folders'},
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
  const [folderselected, setFolderSelected] = useState([]);
  const [markedDates, setMarkedDates] = useState(null);

  useFocusEffect(() => {
    getStatasticData();
  }, []);

  const getStatasticData = () => {
    const payload = {
      startDate: '2022/12/01',
      lastDate: '2022/12/30',
      type: 'All',
    };
    const options = {payloads: payload};
    ApiService.post('statistics', options)
      .then(res => console.log('statics data >> ', res))
      .catch(err => console.log('Error', err));
  };
  // useLayoutEffect(() => {
  //   naviagtion.setOptions({
  //     headerTitle: null,
  //     headerRight: () => (
  //       <>
  //         <View
  //           style={{
  //             flexDirection: 'row',
  //             width: '75%',
  //             left: Platform.OS === 'ios' ? '5%' : '15%',
  //           }}>
  //           {Type.map(item => {
  //             return (
  //               item.id === selectedType && (
  //                 <>
  //                   <View style={{width: '10%'}}>
  //                     <AntDesign
  //                       name="left"
  //                       size={scale(20)}
  //                       onPress={() => {
  //                         selectedType > 1
  //                           ? setType(item.id - 1)
  //                           : setType(item.id + 2);
  //                       }}
  //                     />
  //                   </View>
  //                   <View
  //                     style={{
  //                       width: '80%',
  //                       alignItems: 'center',
  //                       justifyContent: 'center',
  //                     }}>
  //                     <Label style={{fontSize: 18}} title={item.name}></Label>
  //                   </View>
  //                   <View style={{width: '10%'}}>
  //                     <AntDesign
  //                       name="right"
  //                       size={scale(20)}
  //                       onPress={() => {
  //                         selectedType <= 2 ? setType(item.id + 1) : setType(1);
  //                       }}
  //                     />
  //                   </View>
  //                 </>
  //               )
  //             );
  //           })}
  //         </View>
  //       </>
  //     ),
  //   });
  // });
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

  const Main = () => {
    return (
      <>
        <View style={styles.mapView}>
          {statisticdata.map((f, i) => {
            return (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
                key={i.toString()}>
                <Text style={styles.mapText}>{f.label}</Text>
                <Text style={styles.labeltwo}>{f.value}</Text>
              </View>
            );
          })}
        </View>
        <View style={styles.divider}></View>
        <View style={styles.mapView}>
          {statisticdataone.map((f, i) => {
            return (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text style={styles.mapText}>{f.label}</Text>
                <Text style={styles.labeltwo}>{f.value}</Text>
              </View>
            );
          })}
        </View>
        <View style={styles.divider}></View>
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
                <Text style={styles.labeltwo}>{f.value}</Text>
              </View>
            );
          })}
        </View>

        <View style={styles.divider}></View>
        <View
          style={{
            flexDirection: 'row',
            marginTop: theme.SCREENHEIGHT * 0.22,
            margin: scale(20),
          }}>
          <CheckBox />
          <Text style={styles.checkText}>Check to count in statistics</Text>
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
                <Text style={styles.labeltwo}>{f.value}</Text>
              </View>
            );
          })}
        </View>
        <View style={styles.divider}></View>

        <View style={styles.mapView}>
          {statisticdataSix.map((f, i) => {
            return (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text style={styles.mapText}>{f.label}</Text>
                <Text style={styles.labeltwo}>{f.value}</Text>
              </View>
            );
          })}
        </View>
        <View style={styles.divider}></View>

        <View style={styles.mapView}>
          {statisticdataSeven.map((f, i) => {
            return (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text style={styles.mapText}>{f.label}</Text>
                <Text style={styles.labeltwo}>{f.value}</Text>
              </View>
            );
          })}
        </View>
        <View style={styles.divider}></View>

        <View
          style={{
            flexDirection: 'row',
            alignSelf: 'center',
            width: '75%',
            marginTop: scale(40),
          }}>
          {Task.map(item => {
            return (
              item.id === selectedType && (
                <>
                  <View style={{width: '10%'}}>
                    <AntDesign
                      name="left"
                      size={scale(30)}
                      onPress={() => {
                        selectedType > 1
                          ? setType(item.id - 1)
                          : setType(item.id + 1);
                      }}
                    />
                  </View>
                  <View
                    style={{
                      width: '80%',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Label style={{fontSize: 18}} title={item.name}></Label>
                    <Text>Slide to view</Text>
                  </View>

                  <View style={{width: '10%'}}>
                    <AntDesign
                      name="right"
                      size={scale(30)}
                      onPress={() => {
                        selectedType <= 1 ? setType(item.id + 1) : setType(1);
                      }}
                    />
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
            data={TypeTask_Distribution}
          />
        ) : (
          <ChartSection
            title="Achievement Tasks Status"
            data={AchievementTasksStatus}
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
        backgroundColor: theme.colors.backgroundColor,
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
                  style={{justifyContent: 'center', marginBottom: scale(-5)}}
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
                onChange={item => setvalue(item.value)}
                itemTextStyle={{color: theme.colors.black}}
                selectedTextStyle={{color: theme.colors.black}}
                placeholderStyle={{color: theme.colors.black}}
              />
            </View>
          </View>
        </ImageBackground>

        {selectedType === 1 ? (
          <>
            <Main />
          </>
        ) : selectedType === 2 ? (
          <Main />
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
    paddingHorizontal: scale(30),
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
});
