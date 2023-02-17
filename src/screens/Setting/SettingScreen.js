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
  Linking,
  Share,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {scale, theme} from '../../utils';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Label, Title} from '../../components/Label';
import {Dropdown} from 'react-native-element-dropdown';
import Accordian from '../../components/Accordian';
import {RadioButton} from 'react-native-paper';
import {CheckBox} from '../../components';
import {useDispatch, useSelector} from 'react-redux';
import {
  isDarkMode,
  setAdministration,
  setDefaultTime,
  setDefTaskTime,
} from '../../redux/Actions/UserActions';

const chips = [
  {
    label: 'Scalable',
    id: 0,
  },
  {
    label: 'Only minutes',
    id: 1,
  },
  {
    label: 'One hours',
    id: 2,
  },
  // {
  //   label: 'Only months',
  //   id: 3,
  // },
];

const TimeRange = [
  {
    label: 'Today',
    id: 1,
  },
  {
    label: 'All time',
    id: 2,
  },
];

const AdministrationData = [
  {
    label: 'Edit folder task: click in specific row',
    id: 0,
  },
  {
    label: 'Drag task or folder: hold specific row',
    id: 1,
  },
];

const socialData = [
  {
    label: 'Referal Code',
    value: 'DISTIMETRACKER',
    id: 0,
  },
  {
    label: 'Codes Used',
    value: 10,
    id: 1,
  },
  {
    label: 'Achieved Discount',
    value: '10%',
    id: 2,
  },
];
const onShare = async () => {
  try {
    const result = await Share.share({
      title: 'Taskey',
      message: 'Task mangement app',
      url: 'https://mylead.net/',
    });
    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        // shared with activity type of result.activityType
      } else {
        // shared
      }
    } else if (result.action === Share.dismissedAction) {
      // dismissed
    }
  } catch (error) {
    alert(error.message);
  }
};
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
  const [time, setTime] = useState(null);
  const [defaultTime, setDefTime] = useState(null);
  const [check, setCheck] = useState(null);
  const [isEnabled, setIsEnabled] = useState(false);
  const dispatch = useDispatch();
  const darkmodeState = useSelector(state => state.UserReducer.isDarkMode);
  const defualtTimes = useSelector(state => state.UserReducer?.defaultTime);
  const taskTimes = useSelector(state => state.UserReducer?.time);
  // const Administration = useSelector(state => state.UserReducer?.admin);
  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState);
    dispatch(isDarkMode(!isEnabled));
  };

  useEffect(() => {
    console.log('data > ', defualtTimes);
    setIsEnabled(darkmodeState);
    setTime(taskTimes);
    setDefTime(defualtTimes);
    // setCheck(Administration);
  }, []);

  return (
    <>
      {Platform.OS === 'ios' && (
        <View
          style={{
            height: scale(40),
            backgroundColor: darkmodeState
              ? theme.colors.darkMode
              : theme.colors.backgroundColor,
          }}
        />
      )}

      <SafeAreaView
        style={[
          styles.container,
          {
            backgroundColor: darkmodeState
              ? theme.colors.darkMode
              : theme.colors.backgroundColor,
          },
        ]}>
        <ScrollView
          style={{
            marginBottom: theme.SCREENHEIGHT * 0.1,
          }}
          showsVerticalScrollIndicator={false}>
          <Label
            style={[
              styles.titletxt,
              {color: darkmodeState ? theme.colors.white : theme.colors.black},
            ]}
            title="Time"
          />
          <View
            style={[
              styles.divider,
              {
                borderColor: darkmodeState
                  ? theme.colors.white
                  : theme.colors.black,
              },
            ]}
          />

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
                  <CheckBox
                    btnstyle={{
                      borderColor: darkmodeState
                        ? theme.colors.white
                        : theme.colors.orange,
                    }}
                    checked={time === i?.id}
                    onPress={() => {
                      dispatch(setDefTaskTime(i.id));
                      setTime(i.id);
                    }}
                  />
                  <Label
                    style={{
                      fontSize: 18,
                      fontWeight: '400',
                      color: darkmodeState
                        ? theme.colors.white
                        : theme.colors.black,
                    }}
                    title={i.label}
                  />
                </View>
              </>
            );
          })}

          <Label
            style={[
              styles.titletxt,
              {color: darkmodeState ? theme.colors.white : theme.colors.black},
            ]}
            title="Default Range of Time"
          />
          <View
            style={[
              styles.divider,
              {
                borderColor: darkmodeState
                  ? theme.colors.white
                  : theme.colors.black,
              },
            ]}
          />

          <View style={styles.CheckBoxInventory}>
            {TimeRange.map((i, index) => {
              return (
                <>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginLeft: scale(20),
                      marginTop: scale(5),
                    }}>
                    <CheckBox
                      btnstyle={{
                        borderColor: darkmodeState
                          ? theme.colors.white
                          : theme.colors.orange,
                      }}
                      checked={defaultTime === i?.id}
                      onPress={() => {
                        dispatch(setDefaultTime(i.id));
                        setDefTime(i.id);
                      }}
                    />

                    <Label
                      style={{
                        fontSize: 18,
                        fontWeight: '400',
                        color: darkmodeState
                          ? theme.colors.white
                          : theme.colors.black,
                      }}
                      title={i.label}
                    />
                  </View>
                </>
              );
            })}
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
                color: isEnabled ? theme.colors.white : theme.colors.gray,
              }}
              title="Dark Mode"
            />
            <Switch
              trackColor={{
                false: theme.colors.gray3,
                true: theme.colors.orange,
              }}
              thumbColor={isEnabled ? theme.colors.white : theme.colors.white}
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          </View>
          <View
            style={[
              styles.divider,
              {
                borderColor: darkmodeState
                  ? theme.colors.white
                  : theme.colors.black,
              },
            ]}
          />

          <Label
            style={[
              styles.titletxt,
              {color: darkmodeState ? theme.colors.white : theme.colors.black},
            ]}
            title="Administration"
          />
          <View
            style={[
              styles.divider,
              {
                borderColor: darkmodeState
                  ? theme.colors.white
                  : theme.colors.black,
              },
            ]}></View>

          <View style={[styles.CheckBoxInventory, {flexDirection: 'column'}]}>
            {AdministrationData.map((i, index) => {
              return (
                <>
                  <View
                    key={index}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginLeft: scale(20),
                      marginTop: scale(5),
                    }}>
                    <CheckBox
                      btnstyle={{
                        borderColor: darkmodeState
                          ? theme.colors.white
                          : theme.colors.orange,
                      }}
                      checked={check === i?.id}
                      onPress={() => {
                        // setCheck(i.id);
                        // dispatch(setAdministration(i.id));
                      }}
                    />

                    <Label
                      style={{
                        fontSize: 18,
                        fontWeight: '400',
                        color: darkmodeState
                          ? theme.colors.white
                          : theme.colors.black,
                      }}
                      title={i.label}
                    />
                  </View>
                </>
              );
            })}
          </View>

          <Label
            style={[
              styles.titletxt,
              {
                // marginTop: scale(140),
                color: darkmodeState ? theme.colors.white : theme.colors.black,
              },
            ]}
            title="Social"
          />
          <View
            style={[
              styles.divider,
              {
                borderColor: darkmodeState
                  ? theme.colors.white
                  : theme.colors.black,
              },
            ]}
          />

          {socialData.map((item, index) => {
            return (
              <>
                <View
                  key={index}
                  style={[styles.accordianDetail, {marginTop: scale(20)}]}>
                  <Label
                    title={item.label}
                    style={{
                      color: darkmodeState
                        ? theme.colors.white
                        : theme.colors.black,
                    }}
                  />
                  <Label
                    style={{
                      fontWeight: '600',
                      color: darkmodeState
                        ? theme.colors.white
                        : theme.colors.black,
                    }}
                    title={item.value}
                  />
                </View>
              </>
            );
          })}

          <View
            style={{
              alignItems: 'center',
              marginTop: scale(20),
            }}>
            <ShareBtn
              style={styles.sharebtn}
              iconName="sharealt"
              title="Share"
              onPress={onShare}
            />
          </View>

          <Label
            style={[
              styles.titletxt,
              {color: darkmodeState ? theme.colors.white : theme.colors.black},
            ]}
            title="Contact"
          />
          <View
            style={[
              styles.divider,
              {
                borderColor: darkmodeState
                  ? theme.colors.white
                  : theme.colors.black,
              },
            ]}></View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: scale(20),
              marginTop: scale(20),
            }}>
            <ShareBtn
              style={[styles.sharebtn, {backgroundColor: theme.colors.gray}]}
              onPress={() => {
                Linking.openURL('https://www.mylead.net/contacto');
              }}
              title="Suggestions"
              backgroundColor={theme.colors.gray}
            />
            <ShareBtn
              style={[styles.sharebtn, {backgroundColor: theme.colors.gray}]}
              onPress={() => {
                Linking.openURL('https://www.mylead.net/contacto');
              }}
              title="Help"
              backgroundColor={theme.colors.gray}
            />
          </View>

          <View style={{alignItems: 'center', marginTop: scale(25)}}>
            {/* <ShareBtn
              style={[styles.sharebtn, {backgroundColor: theme.colors.green}]}
              title="Value this app :)"
              backgroundColor={theme.colors.green}
            /> */}
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
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
    marginTop: scale(5),
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
    borderBottomColor: theme.colors.gray, //
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
