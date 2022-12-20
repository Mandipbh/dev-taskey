import {
  StyleSheet,
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Platform,
  FlatList,
  Switch,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import {scale, theme} from '../../utils';
import CommonHeader from '../../components/CommonHeader';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Label, Title} from '../../components/Label';
import {Dropdown} from 'react-native-element-dropdown';
import Accordian from '../../components/Accordian';
import {RadioButton} from 'react-native-paper';
import {CheckBox} from '../../components';

const chips = [
  {
    label: 'scalable',
    id: '0',
  },
  {
    label: 'Timer Task',
    id: '1',
  },
  {
    label: 'One minutes',
    id: '2',
  },
  {
    label: 'Only months',
    id: '3',
  },
];

function ShareBtn(props) {
  const {title, onPress, iconName, style} = props;
  return (
    <TouchableOpacity style={style} onPress={onPress}>
      <AntDesign name={iconName} size={20} color={theme.colors.white} />
      <Title
        title={title}
        style={{
          marginLeft: scale(5),
          fontSize: 18,
          color: theme.colors.white,
          fontWeight: '600',
        }}></Title>
    </TouchableOpacity>
  );
}

const SettingScreen = () => {
  const [checked, setChecked] = useState('Today');
  const [time, setTime] = useState(chips);
  const [check, setCheck] = useState('Edit folder task');
  const [value, setvalue] = useState(null);
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={{
          marginBottom: theme.SCREENHEIGHT * 0.1,
        }}
        showsVerticalScrollIndicator={false}>
        <Label style={styles.titletxt} title="Time" />
        <View style={styles.divider}></View>
        <FlatList data={chips} />
        {chips.map(i => {
          return (
            <>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginLeft: scale(20),
                  marginTop: scale(5),
                }}>
                <RadioButton.Android
                  value={chips}
                  status={time === {chips} ? 'checked' : 'unchecked'}
                  onPress={() => setTime(chips)}
                  color={theme.colors.orange}
                />
                <Label
                  style={{fontSize: 18, fontWeight: '400'}}
                  title={i.label}
                />
              </View>
            </>
          );
        })}

        <Label style={styles.titletxt} title="Default Range of Time" />
        <View style={styles.divider}></View>

        <View style={styles.CheckBoxInventory}>
          <View style={styles.checkboxContainer}>
            <RadioButton.Android
              value="Today"
              status={checked === 'Today' ? 'checked' : 'unchecked'}
              onPress={() => setChecked('Today')}
              color={theme.colors.orange}
            />
            <Label title="Today"></Label>
          </View>
          <View style={styles.checkboxContainer}>
            <RadioButton.Android
              value="All time"
              status={checked === 'All time' ? 'checked' : 'unchecked'}
              onPress={() => setChecked('All time')}
              color={theme.colors.orange}
            />
            <Label title="All time"></Label>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: scale(30),
            marginVertical: scale(10),
          }}>
          <Label
            style={{
              fontSize: 20,
              fontWeight: '500',
              color: isEnabled.true ? theme.colors.gray : theme.colors.gray,
            }}
            title="Dark Mode"
          />
          <Switch
            trackColor={{false: '#767577', true: theme.colors.orange}}
            thumbColor={isEnabled ? theme.colors.white : theme.colors.white}
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>
        <View style={styles.divider}></View>

        <Label style={styles.titletxt} title="Administration" />
        <View style={styles.divider}></View>

        <View style={[styles.CheckBoxInventory, {flexDirection: 'column'}]}>
          <View style={styles.checkboxContainer}>
            <RadioButton.Android
              value="Edit folder task"
              status={check === 'Edit folder task' ? 'checked' : 'unchecked'}
              onPress={() => setCheck('Edit folder task')}
              color={theme.colors.orange}
            />
            <Label
              style={{fontSize: 20, fontWeight: '400'}}
              title="Edit folder task: click in specific row"></Label>
          </View>
          <View style={styles.checkboxContainer}>
            <RadioButton.Android
              value="Drag task"
              status={check === 'Drag task' ? 'checked' : 'unchecked'}
              onPress={() => setCheck('Drag task')}
              color={theme.colors.orange}
            />
            <Label
              style={{fontSize: 20, fontWeight: '400'}}
              title="Drag task or folder: hold specific row"></Label>
          </View>
        </View>

        <Label
          style={[
            styles.titletxt,
            {
              marginTop: scale(140),
            },
          ]}
          title="Social"
        />
        <View style={styles.divider}></View>

        <View style={[styles.accordianDetail, {marginTop: scale(20)}]}>
          <Label title="Referal Code" />
          <Label style={{fontWeight: '600'}} title="DISTIMETRACKER" />
        </View>
        <View style={styles.accordianDetail}>
          <Label title="Codes Used" />
          <Label style={{fontWeight: '600'}} title="10" />
        </View>
        <View style={styles.accordianDetail}>
          <Label title="Achieved Discount" />
          <Label style={{fontWeight: '600'}} title="10 %" />
        </View>
        <View
          style={{
            alignItems: 'center',
            marginTop: scale(20),
          }}>
          <ShareBtn style={styles.sharebtn} iconName="sharealt" title="Share" />
        </View>

        <Label style={styles.titletxt} title="Contact" />
        <View style={styles.divider}></View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: scale(20),
            marginTop: scale(20),
          }}>
          <ShareBtn
            style={[styles.sharebtn, {backgroundColor: theme.colors.gray}]}
            onPress={() => {}}
            title="Suggestions"
            backgroundColor={theme.colors.gray}
          />
          <ShareBtn
            style={[styles.sharebtn, {backgroundColor: theme.colors.gray}]}
            onPress={() => {}}
            title="Help"
            backgroundColor={theme.colors.gray}
          />
        </View>

        <View style={{alignItems: 'center', marginTop: scale(25)}}>
          <ShareBtn
            style={[styles.sharebtn, {backgroundColor: theme.colors.green}]}
            title="Value this app :)"
            backgroundColor={theme.colors.green}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SettingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.backgroundColor,
  },
  sharebtn: {
    width: theme.SCREENWIDTH * 0.4,
    borderRadius: scale(20),
    flexDirection: 'row',
    height: theme.SCREENHEIGHT * 0.05,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.orange,
  },
  titletxt: {
    marginTop: scale(25),
    marginLeft: scale(25),
    fontSize: 20,
    fontWeight: '500',
  },
  CheckBoxInventory: {
    flexDirection: 'row',
    paddingVertical: scale(10),
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: scale(25),
  },
  accordianDetail: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: scale(25),
  },
  divider: {
    borderBottomWidth: scale(0.2),
    height: theme.SCREENHEIGHT * 0.007,
    borderBottomColor: 'gray',
    marginTop: scale(5),
    marginHorizontal: scale(25),
  },
  shareBtnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scale(20),
    justifyContent: 'center',
    paddingVertical: scale(7),
    borderRadius: 10,
  },
});
