import {
  FlatList,
  Platform,
  Pressable,
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
import {DatePickerModal, Label} from '../../components';
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
// import AntDesign from 'react-native-vector-icons/AntDesign';
import CommonHeader from '../../components/CommonHeader';
import {Checkbox} from 'react-native-paper';
import ChartSection from '../../components/ChartSection';
import {useLayoutEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {MultiSelect} from 'react-native-element-dropdown';

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

const StatisticsScreen = () => {
  const naviagtion = useNavigation();
  const [value, setvalue] = useState(null);
  const [isChecked, setChecked] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [folderchecked, setFolderChecked] = useState(Timefolders);
  const [selectedType, setType] = useState(1);
  const [folderSpecific_checked, setFolderSpecific_checked] = useState([]);
  const [folderselected, setFolderSelected] = useState([]);
  const [markedDates, setMarkedDates] = useState(null);

  useLayoutEffect(() => {
    naviagtion.setOptions({
      headerTitle: null,
      headerRight: () => (
        <>
          <View
            style={{
              flexDirection: 'row',
              width: '75%',
              left: Platform.OS === 'ios' ? '5%' : '15%',
            }}>
            {Type.map((item, index) => {
              return (
                item.id === selectedType && (
                  <>
                    <View style={{width: '10%'}}>
                      <AntDesign
                        name="left"
                        size={scale(20)}
                        onPress={() => {
                          selectedType > 1
                            ? setType(item.id - 1)
                            : setType(item.id + 2);
                        }}
                      />
                    </View>
                    <View
                      style={{
                        width: '80%',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Text style={{fontSize: 18}}>{item.name}</Text>
                    </View>
                    <View style={{width: '10%'}}>
                      <AntDesign
                        name="right"
                        size={scale(20)}
                        onPress={() => {
                          selectedType <= 2 ? setType(item.id + 1) : setType(1);
                        }}
                      />
                    </View>
                  </>
                )
              );
            })}
          </View>
        </>
      ),
    });
  });

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
      console.log('starting date >> ', moment(sDate).format('DD/MM'));
      console.log('end date >> ', moment(eDate).format('DD/MM'));
    }
  };

  const handlefoldercheck = index => {
    let tempArray = [...folderchecked];
    tempArray[index].ischecked = !tempArray[index].ischecked;
    setFolderChecked(tempArray);
  };

  const handlefolderSpecific_check = index => {
    let tempArray = [...folderSpecific_checked];
    tempArray[index].ischecked = !tempArray[index].ischecked;
    setFolderSpecific_checked(tempArray);
  };

  const folderChekbox = ({item, index}) => {
    console.log('selected Item', item.type, item.ischecked);
    return (
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Checkbox.Android
          color={theme.colors.primary}
          status={item.ischecked ? 'checked' : 'unchecked'}
          onPress={() => handlefoldercheck(index)}
        />
        <Text>{item.type}</Text>
      </View>
    );
  };

  const folderSpecific_Chekbox = ({item, index}) => {
    console.log('selected Item', item.type, item.ischecked);
    return (
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Checkbox.Android
          color={theme.colors.primary}
          status={item.ischecked ? 'checked' : 'unchecked'}
          onPress={() => handlefolderSpecific_check(index)}
        />
        <Text>{item.type}</Text>
      </View>
    );
  };

  const Main = () => {
    return (
      <>
        {/* <View style={styles.mapView}>
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
        </View> */}
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
          style={{marginTop: scale(15)}}
          title="Type Tasks Distribution"
          data={TypeTask_Distribution}
        />
        <View style={styles.divider} />
        <ChartSection
          title="Achievement Tasks Status"
          data={AchievementTasksStatus}
        />
        <View style={styles.divider} />
        <View style={{marginTop: scale(15)}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{fontWeight: '600', fontSize: 16, fontWeight: '600'}}>
              Time Folder
            </Text>
            <TouchableOpacity onPress={() => {}}>
              <Text style={{color: 'red'}}>X Remove folder</Text>
            </TouchableOpacity>
          </View>
          {/* <FlatList
            numColumns={2}
            data={Timefolders}
            renderItem={folderChekbox}
            keyExtractor={(item, index) => item.id}
            columnWrapperStyle={styles.columnWrapperStyle}
          /> */}
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
                <Pressable
                  style={styles.selectedStyle}
                  onPress={() => console.log('first')}>
                  <Text style={styles.textSelectedStyle}>{item.label}</Text>
                  <TouchableOpacity onPress={() => unSelect && unSelect(item)}>
                    <AntDesign color="red" name="close" size={20} />
                  </TouchableOpacity>
                </Pressable>
              )}
            />
          </View>
          {/* <View style={{alignItems: 'center', marginVertical: scale(10)}}>
            <Dropdown
              placeholder="Add Folder"
              style={styles.Dropdown}
              data={Folderdata}
              labelField="label"
              valueField="id"
              onChange={item => setfolderValue(item.value)}
            />
          </View> */}
          <ChartSection title="Timer folders" data={Timefolders} />
        </View>
      </>
    );
  };

  const TimeSpecific = () => {
    return (
      <>
        <View style={styles.divider} />

        <View style={{marginTop: scale(15)}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{fontWeight: '600', fontSize: 16}}>
              Time Specific Folders
            </Text>
            <TouchableOpacity onPress={() => {}}>
              <Text style={{color: 'red'}}>X Remove Task</Text>
            </TouchableOpacity>
          </View>
          {/* <FlatList
            numColumns={2}
            data={TimerSpecificfolders}
            renderItem={folderSpecific_Chekbox}
            keyExtractor={(item, index) => item.id}
            columnWrapperStyle={styles.columnWrapperStyle}
          />
          <View style={{alignItems: 'center', marginVertical: scale(10)}}>
            <Dropdown
              placeholder="Add Tasks"
              style={styles.Dropdown}
              data={TaskData}
              labelField="label"
              valueField="id"
              onChange={item => setTaskValue(item.value)}
            />
          </View> */}

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
                <Pressable
                  style={styles.selectedStyle}
                  onPress={() => console.log('first')}>
                  <Text style={styles.textSelectedStyle}>{item.label}</Text>
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
        backgroundColor: theme.colors.white,
        flex: 1,
      }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: scale(60),
          paddingHorizontal: scale(13),
        }}>
        <CommonHeader
          headerTitle={null}
          IconType={AntDesign}
          headerLeft={() => (
            <Text style={{fontSize: scale(18), fontWeight: '500'}}>
              Statistics
            </Text>
          )}
        />

        <View style={styles.mainView}>
          <View style={styles.calView}>
            <Icon name="calendar-outline" size={scale(22)} />
            <Label title="Select Time Range" style={styles.label} />
          </View>
          <View>
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
                style={{textAlign: 'center'}}
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
            <Icon name="clipboard-sharp" size={scale(22)} />
            <Label title="Select Type of Task" style={styles.label} />
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

        {selectedType === 1 ? (
          <>
            <Main />
            <TimeSpecific />
          </>
        ) : selectedType === 2 ? (
          <Main />
        ) : (
          <TimeSpecific />
        )}

        {/* <Main />
        <TimeSpecific /> */}
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
    borderWidth: Platform.OS === 'android' ? 1 : 0.3,
  },
  mapView: {
    marginTop: scale(25),
    borderBottomWidth: 0.5,
    paddingBottom: 5,
    borderColor: theme.colors.gray,
  },
  mapText: {fontWeight: '400', fontSize: 16},
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
    width: 18,
    margin: 2,
    marginHorizontal: 8,
  },
  columnWrapperStyle: {
    justifyContent: 'space-between',
    marginTop: scale(5),
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    marginVertical: scale(10),
  },
  MultiSelect: {
    height: 50,
    backgroundColor: 'transparent',
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 14,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  icon: {
    marginRight: 5,
  },
  selectedStyle: {
    borderRadius: 12,
    borderWidth: 1,
    marginTop: scale(10),
    flexDirection: 'row',
    paddingVertical: scale(5),
    paddingHorizontal: scale(8),
    alignItems: 'center',
    marginHorizontal: scale(5),
    borderColor: 'gray',
  },
  textSelectedStyle: {
    marginRight: 5,
    fontSize: 14,
  },
});
