import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  FlatList,
} from 'react-native';
import React, {useState} from 'react';
import {scale, theme} from '../../utils';
import CommonHeader from '../../components/CommonHeader';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {chartConfigs, tabs, tasksData, taskstype} from '../../utils/mockData';
import {PieChart} from 'react-native-chart-kit';
import CustomChart from '../../components/CustomChart';
import {Dropdown} from 'react-native-element-dropdown';

export const chips = [
  {
    label: 'Crono Task',
    tintColor: '#00A3DB',
    id: '1',
  },
  {
    label: 'Timer Task',
    tintColor: '#834895',
    id: '2',
  },
  {
    label: 'Counter Task',
    tintColor: '#F0672C',
    id: '3',
  },
];

const StatisticsScreen = () => {
  const [value, setvalue] = useState(null);
  const [selectedTab, setSelectedTab] = useState('Type');
  const [selectedChip, setSelectedChip] = useState('1');
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

  return (
    <SafeAreaView style={styles.container}>
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
  },
  Dropdown: {
    // borderWidth: 0.5,
    borderRadius: 5,
    // borderColor: 'gray',
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginTop: 15,
    marginHorizontal: 20,
    backgroundColor: theme.colors.gray1,
  },
});
