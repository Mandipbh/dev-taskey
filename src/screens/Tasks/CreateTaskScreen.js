import {
  StyleSheet,
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Image,
  ImageBackground,
  Text,
  Alert,
  Platform,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import images from '../../assets/Images';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Toast from 'react-native-simple-toast';
import Feather from 'react-native-vector-icons/Feather';
import LottieView from 'lottie-react-native';
import {scale, theme} from '../../utils';
import {Label, Title} from '../../components/Label';
import {CreateFolderModel, InputBox, Loader} from '../../components';
import CommonHeader from '../../components/CommonHeader';
import ColorPickerModel from '../../components/appModel/ColorPickerModel';
import {metaData, typeData} from '../../utils/mockData';
import Ionicon from 'react-native-vector-icons/Ionicons';
import {useIsFocused, useNavigation, useRoute} from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import Foundation from 'react-native-vector-icons/Foundation';
import ApiService from '../../utils/ApiService';
import {create} from 'react-test-renderer';
import {useSelector} from 'react-redux';
import IconPicker from '../../components/appModel/IconPicker';

const CreateTaskScreen = props => {
  const isFocused = useIsFocused();
  const [type, setType] = useState(0);
  const [selMeta, setMeta] = useState(0);
  const [colorPicker, setColorPicker] = useState(false);
  const [selColor, setColor] = useState(theme.colors.primary);
  const [selIcon, setIcon] = useState(null);
  const [open, setOpen] = useState(false);
  const [newFolderM, setnewFolderM] = useState(false);
  const [selectedFolder, setSelFolder] = useState(null);
  const [defaultFolder, setDefaultFolder] = useState(null);
  const [folders, setFolders] = useState([]);
  const [amount, setAmount] = useState(null);
  const [title, setTitle] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [isBtn, setBtn] = useState(false);
  const [isFBtn, setFBtn] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const navigation = useNavigation();
  const darkmodeState = useSelector(state => state.UserReducer.isDarkMode);
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
      const img = {
        iconUrl: editData?.icon,
      };
      setIcon(img);
      console.log('editData?.icon ?? ', img);
      const metad = editData.meta;
      setAmount(JSON.stringify(editData?.amount));
      setSelFolder(null);
      setMeta(metad === 'Registry' ? 2 : 1);
      setTitle(editData?.name);
      if (editData.type === 'CRONO') {
        // console.log(
        //   'editData?.cronoCompletedTime ?? ',
        //   editData?.cronoCompletedTime,
        // );
        setBtn(editData?.cronoCompletedTime !== undefined ? true : false);
        // setFBtn(editData?.status !== 'Failed' ? true : false);
        // setBtn(editData?.status !== 'Done' ? true : false);
        setType(1);
      } else if (editData.type === 'TIMER') {
        setBtn(editData?.timerCompletedTime ? true : false);
        // setFBtn(editData?.status !== 'Failed' ? true : false);
        // setBtn(editData?.status !== 'Done' ? true : false);
        setType(1);
        setType(2);
      } else if (editData?.type === 'COUNTER') {
        setBtn(editData?.counterIncrementDecrement ? true : false);
        // setFBtn(editData?.status !== 'Failed' ? true : false);
        // setBtn(editData?.status !== 'Done' ? true : false);
        setType(1);
        setType(3);
      }
    } else {
      clearData();
    }
  }, []);
  useEffect(() => {
    if (!props?.route?.params?.editData) {
      clearData();
    }
  }, [isFocused]);
  console.log('selIcon ??? ', selIcon);
  useEffect(() => {
    getAllFolders();
  }, [isFocused, type]);

  const getAllFolders = async () => {
    if (type != 0) {
      try {
        const taskType =
          type === 1 ? 'CRONO' : type === 2 ? 'TIMER' : 'COUNTER';
        ApiService.get('getfolder/' + taskType).then(res => {
          if (res.success) {
            setFolders(res.data);
            res.data.map(i => {
              if (i.isDefault) {
                props?.route?.params?.editData ? null : setSelFolder(i);
              }
            });
          }
        });
      } catch (error) {
        console.log('error >', error);
      }
    }
  };

  const handleMeta = id => {
    if (type === 1) {
      if (id === 2) {
        setMeta(2);
      } else {
        Toast.show('Chrono in just registry');
      }
    }
    if (type === 2) {
      if (id === 1) {
        setMeta(1);
      } else {
        Toast.show('Timer in just Achievement');
      }
    }
    if (type === 3) {
      setMeta(id);
    }
  };

  const clearData = () => {
    setType(0);
    setMeta(0);
    setColorPicker(false);
    setColor(theme.colors.primary);
    setSelFolder('');
    setAmount(null);
    setTitle(null);
    setIcon(null);
  };

  var error = false;
  const handleValidation = () => {
    if (title?.trim() === null || title?.trim() === undefined) {
      Toast.show('Please enter name', Toast.SHORT);
      return true;
    } else if (type === 0) {
      Toast.show('Please select type', Toast.SHORT);
      error = true;
    } else if (selMeta === 0) {
      Toast.show('Please select meta', Toast.SHORT);
      error = true;
    } else if (selMeta === 1 && !amount) {
      Toast.show('Please add amount ', Toast.SHORT);
      error = true;
    } else if (selectedFolder === null) {
      Toast.show('Please select folder', Toast.SHORT);
      error = true;
    } else {
      error = false;
    }
    return error;
  };

  //save task
  const handleSave = () => {
    if (!handleValidation()) {
      let folderFrm = new FormData();
      folderFrm.append('name', title);
      folderFrm.append(
        'type',
        type === 1 ? 'CRONO' : type === 2 ? 'TIMER' : 'COUNTER',
      );

      let frmData = {
        name: title,
        type: type === 1 ? 'CRONO' : type === 2 ? 'TIMER' : 'COUNTER',
        color: selColor,
        order: 0,
        meta: selMeta == 1 ? 'Achievement' : 'Registry',
        amount: amount,
        status: 'Paused',
        folderId: selectedFolder?._id,
        icon:
          selIcon?.iconUrl === undefined
            ? 'http://35.158.183.225:4000/001-drums.png'
            : selIcon?.iconUrl,
        // folderFrm.append('icon', null);
      };
      console.log('frmData >> ', frmData);
      setLoading(true);
      let options = {payloads: frmData};
      ApiService.post('task', options)
        .then(res => {
          setLoading(false);
          setIcon(null);
          // navigation.goBack();
          if (res.success) {
            setLoading(false);
            clearData();
            navigation.goBack();
          } else {
          }
        })
        .catch(error => {
          setLoading(false);
          // Toast.show(error.response.data.message, Toast.SHORT);
          console.log('error ', error.response.data.message?.message);
        });
    }
  };

  //edit task
  const handleEditTask = () => {
    let frmData = {
      name: title,
      amount: amount,
      folderId:
        selectedFolder?._id === undefined
          ? props?.route?.params?.editData?.folderId
          : selectedFolder?._id,
      taskId: props?.route?.params?.editData?._id,
      type: props?.route?.params?.editData?.type,
      icon: selIcon?.iconUrl,
    };
    setLoading(true);
    let options = {payloads: frmData};
    console.log('frmData >> ', frmData);
    console.log('props >> .', props?.route?.params?.editData?.folderId);
    ApiService.put(`updateTask`, options)
      .then(res => {
        setLoading(false);
        setIcon(null);
        // navigation.goBack();
        console.log('response << >>> ', res);
        if (res.code === -1) {
        } else {
          setLoading(false);
          clearData();
          navigation.goBack();
        }
      })
      .catch(error => {
        setLoading(false);
        clearData();
        navigation.goBack();
        // Toast.show(error.response.data.message, Toast.SHORT);
        console.log('error ', error.response.data.message?.message);
      });
  };

  //delete task
  const deleteTask = () => {
    console.log('removeTask', props?.route?.params?.editData?._id);
    ApiService.delete(`removeTask/${props?.route?.params?.editData?._id}`)
      .then(res => {
        Toast.show('Task delete', Toast.SHORT);
        console.log('remove task <>> ', res.data);
        navigation.goBack();
      })
      .catch(e => {
        navigation.goBack();
      });
  };

  //complate task
  const complateTask = () => {
    const taskDetails = props?.route?.params?.editData;
    const taskMeta = props?.route?.params?.editData?.meta;
    if (taskMeta === 'Registry') {
      const payload = {
        id: props?.route?.params?.editData?._id,
        status: taskDetails?.status,
        type: taskDetails?.type,
      };
      const options = {payloads: payload};
      ApiService.post('completeRegistryTask', options).then(res => {
        console.log('response >> ', res);
        navigation.goBack();
        Toast.show('Task complate success');
      });
      console.log('pay load >> ', payload);
    } else if (taskMeta === 'Achievement') {
      const payload1 = {
        id: props?.route?.params?.editData?._id,
        status: taskDetails?.status,
        type: taskDetails?.type,
      };
      const options = {payloads: payload1};
      ApiService.post('completeAchievementTask', options).then(res => {
        navigation.goBack();
        console.log('response >> ', res);
        Toast.show('Task complate success');
      });
      console.log('pay load >> ', payload1);
    } else {
    }
  };

  // faild task
  const handleFaildTask = () => {
    const taskDetails = props?.route?.params?.editData;
    const payload = {
      id: props?.route?.params?.editData?._id,
      status: taskDetails?.status,
      type: taskDetails?.type,
    };
    const options = {payloads: payload};
    ApiService.post('failedTask', options).then(res => {
      navigation.goBack();
      Toast.show('Failed task success');
    });
  };

  const IconClosePicker = data => {
    setModalVisible(false);
    if (data) {
      setIcon(data);
    }
  };

  useEffect(() => {
    if (type === 1) {
      setMeta(2);
    } else if (type === 2) {
      setMeta(1);
    }
  }, [type]);
  return (
    <>
      <View
        style={[
          styles.container,
          {
            backgroundColor: darkmodeState
              ? theme.colors.darkMode
              : theme.colors.backgroundColor,
          },
        ]}>
        {Platform.OS === 'ios' && (
          <View
            style={{
              height: scale(40),
              backgroundColor: darkmodeState
                ? theme.colors.darkMode
                : theme.colors.white,
            }}
          />
        )}
        <View>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{height: theme.SCREENHEIGHT * 0.9}}
            contentContainerStyle={{
              paddingBottom: scale(35),
            }}>
            <ImageBackground source={images.banner} style={styles.header}>
              <View style={styles.secondCon}>
                <Title
                  title={
                    props?.route?.params?.editData ? 'Edit task' : 'Create task'
                  }
                  style={{color: theme.colors.white}}
                />
                <Label
                  title="Create a task to control your time investment
                      and registry your achievements."
                  style={{color: theme.colors.white}}
                />
                <Label
                  title="Set name "
                  style={[
                    styles.label,
                    {
                      color: theme.colors.white,
                      marginTop: scale(15),
                    },
                  ]}
                />
                <InputBox
                  placeholder="Task name"
                  value={title}
                  style={styles.input}
                  onChangeText={txt => {
                    setTitle(txt);
                  }}
                />
              </View>
            </ImageBackground>
            <View style={styles.secondCon}>
              <View style={styles.row}>
                <Label
                  title="Type "
                  style={[
                    styles.label,
                    {
                      color: darkmodeState
                        ? theme.colors.white
                        : theme.colors.black,
                    },
                  ]}
                />
                <View style={styles.row}>
                  {typeData?.map((t, i) => {
                    return (
                      <View
                        key={i.toString()}
                        style={{
                          marginLeft: scale(20),
                        }}>
                        <Image
                          source={t.url}
                          style={{
                            height: scale(40),
                            width: scale(30),
                            marginLeft: scale(20),
                            margin: scale(5),
                          }}
                        />
                        <View style={[styles.row, {alignItems: 'center'}]}>
                          <TouchableOpacity
                            style={styles.checkBoxCon}
                            onPress={() => {
                              props?.route?.params?.editData
                                ? null
                                : setType(t.id);
                              setMeta(0);
                            }}>
                            <View
                              style={[
                                styles.check,
                                {
                                  backgroundColor:
                                    type === t.id
                                      ? theme.colors.orange
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
                                color: darkmodeState
                                  ? theme.colors.white
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
                <Label
                  title="Meta "
                  style={[
                    styles.label,
                    {
                      color: darkmodeState
                        ? theme.colors.white
                        : theme.colors.black,
                    },
                  ]}
                />
                <View style={styles.row}>
                  {metaData?.map((t, i) => {
                    return (
                      <View
                        style={{
                          paddingHorizontal: scale(20),
                        }}
                        key={i.toString()}>
                        <Image
                          source={t.url}
                          style={{
                            tintColor:
                              selMeta === t.id || selMeta === null
                                ? theme.colors.orange
                                : theme.colors.orange1,
                            height: scale(40),
                            width: scale(30),
                            marginLeft: scale(20),
                            margin: scale(5),
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
                                      ? theme.colors.orange
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
                                fontWeight: selMeta === t.id ? '700' : '700',
                                color: darkmodeState
                                  ? theme.colors.white
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
                  <Label
                    title="Amount "
                    style={{
                      color: darkmodeState
                        ? theme.colors.white
                        : theme.colors.black,
                    }}
                  />
                  <InputBox
                    style={{width: theme.SCREENWIDTH * 0.2, height: scale(35)}}
                    placeholder={type === 3 ? '' : '1 min'}
                    inputStyle={{fontSize: 14}}
                    value={amount}
                    keyboardType="numeric"
                    onChangeText={txt => {
                      setAmount(txt);
                    }}
                  />
                  {type !== 1 && <Label title="mins" />}
                </View>
              )}
              {/* <View style={styles.devider} /> */}
            </View>
            <View style={styles.secondCon}>
              <View style={styles.devider} />
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  margin: scale(10),
                }}>
                <Text
                  style={{
                    color: darkmodeState
                      ? theme.colors.white
                      : theme.colors.black,
                    fontSize: 18,
                    fontWeight: '700',
                  }}>
                  Add icon
                </Text>
                <TouchableOpacity
                  onPress={() => setModalVisible(true)}
                  style={styles.choosebtn}>
                  <Text
                    style={{
                      color: theme.colors.white,
                      fontSize: 18,
                      fontWeight: '800',
                    }}>
                    Choose
                  </Text>
                </TouchableOpacity>
                {selIcon && (
                  <Image
                    resizeMode="contain"
                    style={{
                      height: theme.SCREENHEIGHT * 0.035,
                      width: theme.SCREENWIDTH * 0.07,
                      marginLeft: scale(30),
                      tintColor: darkmodeState
                        ? theme.colors.white
                        : theme.colors.black,
                    }}
                    source={{uri: selIcon.iconUrl}}
                  />
                )}
                <IconPicker isVisible={modalVisible} close={IconClosePicker} />
              </View>

              <View style={styles.devider} />
            </View>
            <View style={styles.secondCon}>
              <View style={[styles.row, {justifyContent: 'space-between'}]}>
                <View style={styles.row}>
                  <Label
                    title="Folder "
                    style={[
                      styles.label,
                      {
                        color: darkmodeState
                          ? theme.colors.white
                          : theme.colors.black,
                      },
                    ]}
                  />
                  <TouchableOpacity
                    style={styles.folder}
                    onPress={() => {
                      type === 0 ? Toast.show('Select type.') : setOpen(!open);
                    }}>
                    <Label
                      title={
                        selectedFolder === ''
                          ? 'Globle list folder'
                          : selectedFolder?.name
                      }
                      style={styles.selFolderTxt}
                    />
                    <Icon
                      name={open ? 'menu-up' : 'menu-down'}
                      size={scale(25)}
                    />
                  </TouchableOpacity>
                </View>

                <TouchableOpacity
                  style={styles.row}
                  onPress={() => {
                    getAllFolders();
                    // setnewFolderM(true);
                    navigation.navigate('CreateF');
                  }}>
                  <Image
                    style={{
                      height: scale(30),
                      width: scale(30),
                      marginRight: scale(20),
                    }}
                    source={images.folder}
                  />
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
                          handleOptions(f);
                        }}>
                        <Label
                          title={f.name}
                          style={{
                            fontSize: scale(12),
                            color: darkmodeState
                              ? theme.colors.white
                              : theme.colors.black,
                          }}
                        />
                      </TouchableOpacity>
                    );
                  })}
                </ScrollView>
              )}
              <View style={styles.devider} />
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: props?.route?.params?.editData
                    ? 'space-between'
                    : 'center',
                }}>
                <TouchableOpacity
                  onPress={() =>
                    props?.route?.params?.editData
                      ? handleEditTask()
                      : handleSave()
                  }
                  style={styles.createTaskbtn}>
                  <Ionicon name="play" color={theme.colors.white} size={25} />
                  <Text style={styles.createtxt}>
                    {props?.route?.params?.editData
                      ? 'Edit task'
                      : 'Create task'}
                  </Text>
                </TouchableOpacity>
                {props?.route?.params?.editData && (
                  <>
                    <TouchableOpacity
                      onPress={() => {
                        deleteTask();
                      }}
                      style={styles.deletebtn}>
                      <Icon
                        name="delete"
                        color={theme.colors.white}
                        size={25}
                      />
                      <Text
                        style={{
                          color: theme.colors.white,
                          fontSize: 20,
                          padding: 5,
                        }}>
                        Delete
                      </Text>
                    </TouchableOpacity>
                  </>
                )}
              </View>
              {props?.route?.params?.editData && (
                <View style={styles.btnsCon}>
                  {isBtn && (
                    <TouchableOpacity
                      onPress={() => {
                        complateTask();
                      }}
                      style={[
                        styles.createTaskbtn,
                        {backgroundColor: theme.colors.green},
                      ]}>
                      <Text style={styles.createtxt}>{'Closed task'}</Text>
                    </TouchableOpacity>
                  )}

                  <TouchableOpacity
                    onPress={() => {
                      handleFaildTask();
                    }}
                    style={[
                      styles.createTaskbtn,
                      {backgroundColor: theme.colors.red},
                    ]}>
                    <Text style={styles.createtxt}>{'Failed task'}</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </ScrollView>
        </View>
      </View>
      {console.log(
        'props?.route?.params?.editData >> ',
        props?.route?.params?.editData?.status,
      )}
      {isLoading && <Loader />}
    </>
  );
};

export default CreateTaskScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.backgroundColor,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  secondCon: {
    marginTop: scale(10),
    marginHorizontal: scale(20),
  },
  label: {
    fontSize: scale(16),
    fontWeight: '800',
    color: theme.colors.black,
  },
  input: {
    width: '100%',
    paddingLeft: scale(5),
    marginTop: scale(5),
    borderRadius: 30,
    alignSelf: 'center',
  },
  createTaskbtn: {
    flexDirection: 'row',
    backgroundColor: theme.colors.orange,
    width: scale(150),
    height: scale(35),
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: scale(10),
    borderRadius: 30,
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  checkBoxCon: {
    height: scale(18),
    width: scale(18),
    borderColor: theme.colors.gray,
    borderWidth: scale(1.5),
    borderRadius: scale(9),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: scale(3),
  },
  createtxt: {
    color: theme.colors.white,
    fontSize: 20,
    padding: 5,
    fontWeight: '800',
  },
  deletebtn: {
    flexDirection: 'row',
    backgroundColor: theme.colors.gray,
    width: scale(150),
    height: scale(35),
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: scale(10),
    borderRadius: 30,
  },
  check: {
    height: scale(12),
    width: scale(12),
    borderRadius: scale(5),
    backgroundColor: theme.colors.gray,
  },
  checkboxLbl: {
    marginLeft: scale(3),
  },
  choosebtn: {
    backgroundColor: theme.colors.orange,
    padding: 5,
    marginLeft: scale(40),
    borderRadius: 20,
    height: scale(35),
    width: scale(120),
    alignItems: 'center',
    justifyContent: 'center',
  },
  devider: {
    height: scale(0.5),
    backgroundColor: theme.colors.gray,
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
    width: theme.SCREENWIDTH * 0.52,
    height: scale(30),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: scale(10),
    borderRadius: scale(11),
    backgroundColor: theme.colors.white,
  },
  selFolderTxt: {
    fontSize: scale(12),
    width: '70%',
    marginLeft: scale(10),
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
    borderBottomColor: theme.colors.gray,
    borderBottomWidth: scale(0.6),
    width: '50%',
  },
  amount: {
    marginTop: scale(15),
    marginLeft: theme.SCREENWIDTH * 0.15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  btn: {
    alignSelf: 'center',
    // borderWidth: 2,
    padding: 10,
    width: scale(57),
    alignItems: 'center',
    borderRadius: 35,
    marginTop: scale(45),
    // borderColor: theme.colors.orange,
  },
  header: {
    height: scale(200),
    width: '100%',
    resizeMode: 'cover',
  },
  btnsCon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
