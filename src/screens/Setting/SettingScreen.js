import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {scale, theme} from '../../utils';
import CommonHeader from '../../components/CommonHeader';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Label, Title} from '../../components/Label';
import {Dropdown} from 'react-native-element-dropdown';
import Accordian from '../../components/Accordian';
import {RadioButton} from 'react-native-paper';

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
  const {onPress, style, title, iconName, backgroundColor} = props;
  return (
    <TouchableOpacity
      style={[styles.shareBtnContainer, {backgroundColor: backgroundColor}]}
      onPress={onPress}>
      <Text
        style={{fontSize: 18, color: theme.colors.white, fontWeight: '600'}}>
        {title}
      </Text>
      <AntDesign
        name={iconName}
        size={18}
        style={{left: 5}}
        color={theme.colors.white}
      />
    </TouchableOpacity>
  );
}

const SettingScreen = () => {
  const [checked, setChecked] = useState('Today');
  const [value, setvalue] = useState(null);
  return (
    <SafeAreaView style={styles.container}>
      <CommonHeader IconType={AntDesign} />
      <ScrollView
        style={{marginBottom: scale(40)}}
        showsVerticalScrollIndicator={false}>
        <View style={{paddingHorizontal: scale(15), marginTop: scale(10)}}>
          <Title title="General" />
        </View>

        <Dropdown
          placeholder="Time"
          style={styles.Dropdown}
          data={chips}
          labelField="label"
          valueField="id"
          onChange={item => setvalue(item.value1)}
        />

        <Accordian
          title="Default Range of Time"
          leftContent={<AntDesign name="down" />}
          style={{marginTop: scale(15)}}>
          <View style={styles.CheckBoxInventory}>
            <View style={styles.checkboxContainer}>
              <RadioButton.Android
                value="Today"
                status={checked === 'Today' ? 'checked' : 'unchecked'}
                onPress={() => setChecked('Today')}
                color={theme.colors.primary}
              />
              <Text>Today</Text>
            </View>
            <View style={styles.checkboxContainer}>
              <RadioButton.Android
                value="All time"
                status={checked === 'All time' ? 'checked' : 'unchecked'}
                onPress={() => setChecked('All time')}
                color={theme.colors.primary}
              />
              <Text>All time</Text>
            </View>
          </View>
          {console.log('your selected time Range', checked)}
        </Accordian>

        <Accordian title="Social" leftContent={<AntDesign name="down" />}>
          <View style={styles.accordianDetail}>
            <Label title="Referal Code" />
            <Label title="DISTIMETRACKER" />
          </View>
          <View style={styles.accordianDetail}>
            <Label title="Codes Used" />
            <Label title="10" />
          </View>
          <View style={styles.accordianDetail}>
            <Label title="Achieved Discount" />
            <Label title="10 €" />
          </View>
          <View
            style={{
              alignItems: 'center',
              marginTop: scale(10),
            }}>
            <ShareBtn
              onPress={() => {}}
              title="Share"
              iconName="sharealt"
              backgroundColor="#25D366"
            />
          </View>
        </Accordian>

        <Accordian title="Contact" leftContent={<AntDesign name="down" />}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: scale(20),
              marginTop: scale(5),
            }}>
            <ShareBtn
              onPress={() => {}}
              title="Suggestions"
              backgroundColor={theme.colors.primary}
            />
            <ShareBtn
              onPress={() => {}}
              title="Help"
              backgroundColor={theme.colors.primary}
            />
          </View>
        </Accordian>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SettingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  CommonBoxContainer: {
    backgroundColor: theme.colors.gray1,
    paddingVertical: scale(20),
    paddingHorizontal: scale(15),
    borderRadius: 15,
  },
  Dropdown: {
    borderRadius: 15,
    paddingHorizontal: 20,
    paddingVertical: scale(11),
    marginTop: 15,
    marginHorizontal: 15,
    backgroundColor: theme.colors.gray1,
    borderWidth: Platform.OS === 'android' ? 0.8 : 0.3,
    borderColor: theme.colors.gray,
  },
  CheckBoxInventory: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: scale(40),
    paddingVertical: scale(10),
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  accordianDetail: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: scale(10),
    borderBottomWidth: 0.3,
    borderBottomColor: theme.colors.gray,
    padding: 15,
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
