import {
  StyleSheet,
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/Feather';
import LottieView from 'lottie-react-native';
import {moderatedScale, scale, theme} from '../../utils';
import {Label, Title} from '../../components/Label';
import {InputBox} from '../../components';
import CommonHeader from '../../components/CommonHeader';
import ColorPickerModel from '../../components/appModel/ColorPickerModel';
import {folders} from '../../utils/mockData';

const CreateTaskScreen = () => {
  const [type, setType] = useState(1);
  const [selMeta, setMeta] = useState(1);
  const [colorPicker, setColorPicker] = useState(false);
  const [selColor, setColor] = useState(null);
  const [open, setOpen] = useState(false);
  const [selectedFolder, setSelFolder] = useState(null);
  const typeData = [
    {
      title: 'Crono',
      icon: 'timer-outline',
      id: 1,
      url: 'https://assets10.lottiefiles.com/packages/lf20_ag0f5tt4.json',
    },
    {
      title: 'Timer',
      icon: 'timer-sand',
      id: 2,
      url: 'https://assets3.lottiefiles.com/packages/lf20_4yofoa5q.json',
    },
    {
      title: 'Counter',
      icon: 'counter',
      id: 3,
      url: 'https://assets4.lottiefiles.com/packages/lf20_8sjqrjby.json',
    },
  ];
  const metaData = [
    {
      title: 'Achievement',
      icon: 'certificate',
      id: 1,
      url: 'https://assets8.lottiefiles.com/packages/lf20_xeUyRVC1G3.json',
    },
    {
      title: 'Registry',
      icon: 'notebook',
      id: 2,
      url: 'https://assets9.lottiefiles.com/packages/lf20_ikyhq0rk.json',
    },
  ];
  const handleCloseClolorpicker = c => {
    console.log('color ', c);
    setColor(c);
    setColorPicker(false);
  };
  const handleOptions = folderName => {
    setSelFolder(folderName);
    setTimeout(() => {
      setOpen(false);
    }, 350);
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <CommonHeader
          headerTitle="Create new task"
          iconName="save"
          IconType={AntDesign}
          IconColor={theme.colors.primary2}
        />

        <View style={styles.secondCon}>
          <View style={styles.row}>
            <Label title="Title" style={styles.label} />
            <InputBox placeholder="Task name" style={styles.input} />
          </View>
        </View>

        <View style={styles.secondCon}>
          <View style={styles.row}>
            <Label title="Type" style={styles.label} />
            <View style={styles.row}>
              {typeData?.map((t, i) => {
                return (
                  <View
                    key={i.toString()}
                    style={{
                      marginHorizontal: theme.SCREENWIDTH * 0.06,
                    }}>
                    <LottieView
                      source={{
                        uri: t.url,
                      }}
                      autoPlay
                      loop={type === t.id ? true : false}
                      style={{
                        height: scale(40),
                        // marginLeft: scale(-6),
                      }}
                    />
                    <View style={[styles.row, {alignItems: 'center'}]}>
                      <TouchableOpacity
                        style={styles.checkBoxCon}
                        onPress={() => {
                          setType(t.id);
                        }}>
                        <View
                          style={[
                            styles.check,
                            {
                              backgroundColor:
                                type === t.id
                                  ? theme.colors.primary
                                  : theme.colors.white,
                            },
                          ]}
                        />
                      </TouchableOpacity>
                      <Label
                        title={t.title}
                        style={[
                          styles.checkboxLbl,
                          {
                            fontWeight: type === t.id ? '700' : '300',
                            color:
                              type === t.id
                                ? theme.colors.primary
                                : theme.colors.black,
                          },
                        ]}
                      />
                    </View>
                  </View>
                );
              })}
            </View>
          </View>
          <View style={styles.devider} />
        </View>
        <View style={styles.secondCon}>
          <View style={[styles.row]}>
            <Label title="Meta" style={styles.label} />
            <View style={styles.row}>
              {metaData?.map((t, i) => {
                return (
                  <View
                    style={{
                      // marginHorizontal: theme.SCREENWIDTH * 0.1,
                      // width: theme.SCREENWIDTH * 0.2,
                      paddingHorizontal: scale(20),
                    }}>
                    <LottieView
                      source={{
                        uri: t.url,
                      }}
                      autoPlay
                      loop={selMeta === t.id ? true : false}
                      style={{
                        height: scale(35),
                        marginLeft: scale(-6),
                      }}
                    />
                    <View style={styles.row}>
                      <TouchableOpacity
                        style={styles.checkBoxCon}
                        onPress={() => {
                          setMeta(t.id);
                        }}>
                        <View
                          style={[
                            styles.check,
                            {
                              backgroundColor:
                                selMeta === t.id
                                  ? theme.colors.primary
                                  : theme.colors.white,
                            },
                          ]}
                        />
                      </TouchableOpacity>
                      <Label
                        title={t.title}
                        style={[
                          styles.checkboxLbl,
                          {
                            fontWeight: selMeta === t.id ? '700' : '300',
                            color:
                              selMeta === t.id
                                ? theme.colors.primary
                                : theme.colors.black,
                          },
                        ]}
                      />
                    </View>
                  </View>
                );
              })}
            </View>
          </View>
          <View style={styles.devider} />
        </View>
        <View style={styles.secondCon}>
          <View style={styles.row}>
            <Label title="Icon " style={styles.label} />

            <TouchableOpacity style={[styles.iconPic]} />
          </View>
          <View style={[styles.row, {marginTop: scale(7)}]}>
            <Label title="Color   " style={styles.label} />

            <TouchableOpacity
              style={[
                styles.colorPicker,
                {
                  backgroundColor:
                    selColor !== null ? selColor : theme.colors.primary1,
                },
              ]}
              onPress={() => {
                setColorPicker(true);
              }}
            />
          </View>
          <View style={styles.devider} />
        </View>
        <View style={styles.secondCon}>
          <View style={[styles.row, {justifyContent: 'space-between'}]}>
            <View style={styles.row}>
              <Label title="Folder " style={styles.label} />
              <TouchableOpacity
                style={styles.folder}
                onPress={() => {
                  setOpen(true);
                }}>
                <Icon name={open ? 'menu-up' : 'menu-down'} size={scale(25)} />
                <Label
                  title={
                    selectedFolder === null
                      ? 'Globle list folder'
                      : selectedFolder
                  }
                />
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.row}>
              <Icon
                name="folder-outline"
                size={scale(25)}
                style={{marginLeft: scale(20)}}
              />
              <Label title="New" style={[styles.label]} />
            </TouchableOpacity>
          </View>
          {open && (
            <ScrollView style={styles.optionsContainer}>
              {folders.map((f, i) => {
                return (
                  <TouchableOpacity
                    key={i.toString()}
                    style={styles.optionView}
                    onPress={() => {
                      handleOptions(f.name);
                    }}>
                    <Label title={f.name} />
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          )}

          {/* <View style={styles.devider} /> */}
        </View>
        {/* <View style={styles.secondCon}>
          <View style={styles.circule}>
            <Icon name="play" size={scale(40)} color="green" />
          </View>
        </View> */}
      </View>
      <ColorPickerModel
        isVisible={colorPicker}
        close={handleCloseClolorpicker}
      />
    </SafeAreaView>
  );
};

export default CreateTaskScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
    paddingHorizontal: moderatedScale(15),
  },
  subtitle: {
    marginTop: scale(5),
  },
  row: {
    flexDirection: 'row',
    // justifyContent: 'center',
    alignItems: 'center',
  },
  secondCon: {
    marginTop: scale(20),
  },
  label: {
    fontSize: scale(14),
    fontWeight: '600',
  },
  input: {
    width: theme.SCREENWIDTH * 0.76,
    marginLeft: scale(25),
  },
  checkBoxCon: {
    height: scale(18),
    width: scale(18),
    borderColor: theme.colors.black,
    borderWidth: scale(1.5),
    borderRadius: scale(9),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: scale(3),
  },
  check: {
    height: scale(11),
    width: scale(11),
    borderRadius: scale(5),
    backgroundColor: theme.colors.black,
  },
  checkboxLbl: {
    marginLeft: scale(3),
  },
  devider: {
    height: scale(0.5),
    backgroundColor: theme.colors.black,
    width: '100%',
    alignSelf: 'center',
    marginVertical: scale(10),
  },
  iconPic: {
    height: scale(30),
    width: scale(30),
    borderRadius: scale(15),
    borderColor: theme.colors.black,
    borderWidth: scale(1),
    marginLeft: scale(20),
  },
  colorPicker: {
    width: theme.SCREENWIDTH * 0.2,
    height: scale(22),
    backgroundColor: '#dff8',
    borderWidth: scale(1),
    borderRadius: scale(5),
    marginLeft: scale(10),
    // marginRight: scale(30),
  },
  folder: {
    width: theme.SCREENWIDTH * 0.42,
    borderWidth: scale(1),
    height: scale(30),
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginLeft: scale(10),
    borderRadius: scale(5),
  },
  circule: {
    borderWidth: scale(2),
    justifyContent: 'center',
    alignItems: 'center',
    width: scale(50),
    height: scale(50),
    borderRadius: scale(40),
    alignSelf: 'center',
  },
  optionsContainer: {
    marginLeft: theme.SCREENWIDTH * 0.22,
    marginVertical: scale(5),
    height: theme.SCREENHEIGHT * 0.2,
  },
  optionView: {
    height: scale(20),
  },
});
