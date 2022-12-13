import {
  StyleSheet,
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Platform,
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
  const {onPress, title, iconName, backgroundColor} = props;
  return (
    <TouchableOpacity
      style={[styles.shareBtnContainer, {backgroundColor: backgroundColor}]}
      onPress={onPress}>
      <Title
        title={title}
        style={{
          fontSize: 18,
          color: theme.colors.white,
          fontWeight: '600',
        }}></Title>
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
        style={{
          marginBottom: theme.SCREENHEIGHT * 0.1,
        }}
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
          iconColor={theme.colors.black}
          itemTextStyle={{color: theme.colors.black}}
          selectedTextStyle={{color: theme.colors.black}}
          placeholderStyle={{color: theme.colors.black}}
        />

        <Accordian title="Default Range of Time" style={{marginTop: scale(15)}}>
          <View style={styles.CheckBoxInventory}>
            <View style={styles.checkboxContainer}>
              <RadioButton.Android
                value="Today"
                status={checked === 'Today' ? 'checked' : 'unchecked'}
                onPress={() => setChecked('Today')}
                color={theme.colors.primary}
              />
              <Label title="Today"></Label>
            </View>
            <View style={styles.checkboxContainer}>
              <RadioButton.Android
                value="All time"
                status={checked === 'All time' ? 'checked' : 'unchecked'}
                onPress={() => setChecked('All time')}
                color={theme.colors.primary}
              />
              <Label title="All time"></Label>
            </View>
          </View>
        </Accordian>

        <Accordian title="Social">
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

        <Accordian title="Contact">
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
  Dropdown: {
    borderRadius: scale(15),
    paddingHorizontal: scale(20),
    paddingVertical: scale(11),
    marginTop: scale(15),
    marginHorizontal: 15,
    backgroundColor: theme.colors.gray1,
    borderWidth: Platform.OS === 'android' ? 0.8 : 0.3,
    borderColor: theme.colors.gray,
    color: theme.colors.black,
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
