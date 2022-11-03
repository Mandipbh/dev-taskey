import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Platform,
} from 'react-native';
import React, {useState} from 'react';
import {scale, theme} from '../../utils';
import CommonHeader from '../../components/CommonHeader';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {chips, tabs, taskstype} from '../../utils/mockData';
import CustomChart from '../../components/CustomChart';
import {Dropdown} from 'react-native-element-dropdown';
import {Label} from '../../components';
import Calendar from 'react-native-calendars/src/calendar';
import {useNavigation} from '@react-navigation/native';

const StatisticsScreen = () => {
  const [value, setvalue] = useState(null);
  const [selectedTab, setSelectedTab] = useState('Type');
  const [selectedChip, setSelectedChip] = useState('1');
  const [isChecked, setChecked] = useState(false);
  const [myDate, setMyDate] = useState('');
  const navigation = useNavigation();

  const typeCount = taskstype.map(i => i.data.length * 10);
  const statusCount = taskstype.map(i => i.data.map(i => i.status).length * 10);

  const renderChips = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setSelectedChip(item.id);
        }}
        style={[
          styles.chip,
          {
            backgroundColor: selectedChip === item.id ? '#4E539E' : '#F1F4FF',
          },
        ]}>
        <View
          style={{
            width: 8,
            height: 8,
            backgroundColor: selectedChip === item.id ? '#fff' : item.tintColor,
            borderRadius: 4,
          }}
        />
        <Text
          style={{
            marginLeft: 5,
            color: selectedChip === item.id ? '#fff' : '#131635',
          }}>
          {item.label}
        </Text>
      </TouchableOpacity>
    );
  };

  function onDayPress({...date}) {
    setMyDate(date.dateString);
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{marginBottom: scale(45), backgroundColor: theme.colors.white}}>
        <CommonHeader IconType={AntDesign} />

        <View style={styles.tabView}>
          {tabs.map((item, index) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  setSelectedTab(item.title);
                  console.log(item.title);
                }}
                key={item.id}
                style={[
                  styles.tabStyle,
                  {
                    backgroundColor:
                      selectedTab === item.title
                        ? theme.colors.black
                        : theme.colors.gray1,
                  },
                ]}>
                <Text
                  style={[
                    styles.tabTxt,
                    [
                      {
                        color:
                          selectedTab === item.title
                            ? theme.colors.white
                            : theme.colors.black,
                      },
                    ],
                  ]}>
                  {item.title}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={styles.chartview}>
          <CustomChart Yourdata={statusCount} />
        </View>

        <View style={styles.chipsView}>
          <FlatList
            data={chips}
            renderItem={renderChips}
            keyExtractor={item => item.id}
            horizontal
          />
        </View>

        <Dropdown
          placeholder="Select Type of Task"
          style={styles.Dropdown}
          data={chips}
          labelField="label"
          valueField="id"
          onChange={item => setvalue(item.value1)}
        />

        <TouchableOpacity
          style={[
            styles.Dropdown,
            {
              paddingVertical: scale(16),
              paddingHorizontal: scale(15),
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            },
          ]}
          onPress={() => setChecked(!isChecked)}>
          <Label title="Select Time Range" style={{fontSize: 16}} />
          <AntDesign name="down" />
        </TouchableOpacity>
        {isChecked ? (
          <Calendar
            style={{marginTop: scale(20), marginHorizontal: scale(30)}}
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
        ) : null}
        {console.log(myDate)}

        <TouchableOpacity
          style={[
            styles.Dropdown,
            {
              paddingVertical: scale(16),
              paddingHorizontal: scale(15),
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            },
          ]}
          onPress={() => navigation.navigate('TaskDiscription')}>
          <Label title="Task Details" style={{fontSize: 16}} />
          <AntDesign name="right" />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default StatisticsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  tabView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: scale(10),
  },
  tabStyle: {
    paddingVertical: scale(8),
    paddingHorizontal: scale(30),
    borderRadius: 8,
    margin: 2,
  },
  tabTxt: {
    fontSize: 15,
    fontWeight: '600',
  },
  chartview: {
    marginTop: scale(20),
  },
  chipsView: {
    marginVertical: 10,
    height: 40,
  },
  chip: {
    borderRadius: 16,
    paddingVertical: 4,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    width: 120,
    height: 34,
    marginHorizontal: 5,
    marginTop: 5,
  },
  Dropdown: {
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginTop: 15,
    marginHorizontal: 15,
    backgroundColor: theme.colors.gray1,
    borderWidth: Platform.OS === 'android' ? 0.8 : 0.3,
    borderColor: theme.colors.gray,
  },
  detailSection: {
    backgroundColor: theme.colors.gray1,
    marginTop: scale(10),
    marginHorizontal: scale(15),
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    padding: scale(20),
  },
  detailTitle: {
    backgroundColor: theme.colors.white,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  accordianDetail: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: scale(10),
  },
});
