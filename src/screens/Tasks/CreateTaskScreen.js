import {
  StyleSheet,
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Toast from 'react-native-simple-toast';
import Feather from 'react-native-vector-icons/Feather';
import LottieView from 'lottie-react-native';
import {scale, theme} from '../../utils';
import {Label} from '../../components/Label';
import {CreateFolderModel, InputBox} from '../../components';
import CommonHeader from '../../components/CommonHeader';
import ColorPickerModel from '../../components/appModel/ColorPickerModel';
import {metaData, typeData} from '../../utils/mockData';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';

import ApiService from '../../utils/ApiService';

const CreateTaskScreen = props => {
  const isFocused = useIsFocused();
  const [type, setType] = useState(0);
  const [selMeta, setMeta] = useState(0);
  const [colorPicker, setColorPicker] = useState(false);
  const [selColor, setColor] = useState(null);
  const [open, setOpen] = useState(false);
  const [newFolderM, setnewFolderM] = useState(false);
  const [selectedFolder, setSelFolder] = useState(null);
  const [folders, setFolders] = useState([]);
  const [amount, setAmount] = useState(null);
  const [title, setTitle] = useState(null);
  const navigation = useNavigation();
  const handleCloseClolorpicker = c => {
    setColor(c);
    setColorPicker(false);
  };
  const handleOptions = folderName => {
    setSelFolder(folderName);
    setTimeout(() => {
      setOpen(false);
    }, 350);
  };
  useEffect(() => {
    if (props?.route?.params?.editData) {
      const {editData} = props?.route?.params;
      setTitle(editData?.title);
      setColor(editData.color);
    }
  }, []);

  // useEffect(() => {
  //   getAllFolders();
  // }, [isFocused]);

  const getAllFolders = async () => {
    ApiService.get('folder').then(res => {
      if (res.code === 0) {
        setFolders(res.data);
      }
    });
  };
  const handleMeta = id => {
    if (type === 1) {
      setMeta(2);
    } else {
      Toast.show('Chrono in just registry');
    }
    if (type === 2) {
      setMeta(1);
    } else {
      Toast.show('Timer in just Achievement');
    }
    if (type === 3) {
      setMeta(id);
    }
  };

  const handleSave = () => {
    if (!handleValidation()) {
      // let folderFrm = new FormData();
      // folderFrm.append('name', title);
      // folderFrm.append('type', type);
      // folderFrm.append('color', selColor);
      // folderFrm.append('order', 1);
      // folderFrm.append('meta', meta);
      // folderFrm.append('amount', amount);
      // folderFrm.append('status', 'play');
      // folderFrm.append('icon', selColor);

      // ApiService.post('folder')
      //   .then(res => {
      //     if (res.code === -1) {
      //     }
      //   })
      //   .catch(error => {
      //     console.log('error ', error);
      //   });
    }
  };
  var error = false;
  const handleValidation = () => {
    if (title === null) {
      Toast.show('please enter title', Toast.SHORT);
    } else if (selectedFolder === null) {
      Toast.show('please select folder', Toast.SHORT);
      error = true;
    } else if (type === 0) {
      Toast.show('please select type', Toast.SHORT);
      error = true;
    } else if (selColor === null) {
      Toast.show('please select color', Toast.SHORT);
      error = true;
    } else {
      error = false;
    }
    return error;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <CommonHeader
          headerTitle={
            props?.route?.params?.editData ? 'Edit task' : 'Create new task'
          }
          iconName="save"
          IconType={Feather}
          IconColor={theme.colors.primary2}
          onRightIconPress={() => {
            handleSave();
            // navigation.navigate('Home');
          }}
          headerLeft={
            props?.route?.params?.editData
              ? () => (
                  <TouchableOpacity
                    onPress={() => {
                      navigation.replace('Tabs');
                    }}>
                    <AntDesign name="left" size={25} />
                  </TouchableOpacity>
                )
              : null
          }
        />
        <ScrollView showsVerticalScrollIndicator={false} style={{flex: 1}}>
          <View style={styles.secondCon}>
            <Label title="Title :" style={styles.label} />
            <InputBox
              placeholder="Task name"
              value={title}
              style={styles.input}
              onChangeText={txt => {
                setTitle(txt);
              }}
            />
          </View>
          <View style={styles.secondCon}>
            <View style={styles.row}>
              <Label title="Type :" style={styles.label} />
              <View style={styles.row}>
                {typeData?.map((t, i) => {
                  return (
                    <View
                      key={i.toString()}
                      style={{
                        marginLeft: scale(20),
                      }}>
                      <LottieView
                        source={{
                          uri: t.url,
                        }}
                        autoPlay
                        loop={type === t.id ? true : false}
                        style={{
                          height: scale(40),
                        }}
                      />
                      <View style={[styles.row, {alignItems: 'center'}]}>
                        <TouchableOpacity
                          style={styles.checkBoxCon}
                          onPress={() => {
                            setType(t.id);
                            setMeta(null);
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
              <Label title="Meta :" style={styles.label} />
              <View style={styles.row}>
                {metaData?.map((t, i) => {
                  return (
                    <View
                      style={{
                        paddingHorizontal: scale(20),
                      }}
                      key={i.toString()}>
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
                            handleMeta(t.id);
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
              <></>
            </View>
            {selMeta === 1 && (
              <View style={styles.amount}>
                <Label title="Amount :" />
                <InputBox
                  style={{width: theme.SCREENWIDTH * 0.2, height: scale(35)}}
                  placeholder="1 min"
                  inputStyle={{fontSize: 14}}
                  value={amount}
                  onChangeText={txt => {
                    setAmount(txt);
                  }}
                />
              </View>
            )}
            <View style={styles.devider} />
          </View>
          <View style={styles.secondCon}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View style={styles.row}>
                <Label title="Icon :" style={styles.label} />

                <TouchableOpacity style={[styles.iconPic]} />
              </View>
              <View style={[styles.row, {marginTop: scale(7)}]}>
                <Label title="Color :" style={styles.label} />

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
                    setOpen(!open);
                  }}>
                  <Icon
                    name={open ? 'menu-up' : 'menu-down'}
                    size={scale(25)}
                  />
                  <Label
                    title={
                      selectedFolder === null
                        ? 'Globle list folder'
                        : selectedFolder
                    }
                    style={styles.selFolderTxt}
                  />
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                style={styles.row}
                onPress={() => {
                  getAllFolders();
                  setnewFolderM(true);
                }}>
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
          </View>
        </ScrollView>
      </View>
      <ColorPickerModel
        isVisible={colorPicker}
        close={handleCloseClolorpicker}
      />
      <CreateFolderModel
        isVisible={newFolderM}
        close={() => {
          setnewFolderM(false);
        }}
      />
    </SafeAreaView>
  );
};

export default CreateTaskScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
    paddingHorizontal: scale(13),
  },
  row: {
    flexDirection: 'row',
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
    width: '100%',
    marginLeft: scale(0),
    marginTop: scale(5),
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
    marginLeft: scale(23),
  },
  colorPicker: {
    width: theme.SCREENWIDTH * 0.2,
    height: scale(22),
    backgroundColor: '#dff8',
    borderWidth: scale(1),
    borderRadius: scale(5),
    marginLeft: scale(10),
  },
  folder: {
    width: theme.SCREENWIDTH * 0.42,
    borderWidth: scale(1),
    height: scale(30),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: scale(10),
    borderRadius: scale(5),
  },
  selFolderTxt: {
    marginRight: scale(10),
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
  amount: {
    marginTop: scale(15),
    marginLeft: theme.SCREENWIDTH * 0.15,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
