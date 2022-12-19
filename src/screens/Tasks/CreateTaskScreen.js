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
import {useIsFocused, useNavigation} from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import Foundation from 'react-native-vector-icons/Foundation';
import ApiService from '../../utils/ApiService';
import {create} from 'react-test-renderer';

const CreateTaskScreen = props => {
  const isFocused = useIsFocused();
  const [type, setType] = useState(0);
  const [selMeta, setMeta] = useState(0);
  const [colorPicker, setColorPicker] = useState(false);
  const [selColor, setColor] = useState(theme.colors.primary);
  const [selIcon, setIcon] = useState(false);
  const [open, setOpen] = useState(false);
  const [newFolderM, setnewFolderM] = useState(false);
  const [selectedFolder, setSelFolder] = useState('');
  const [defaultFolder, setDefaultFolder] = useState(null);
  const [folders, setFolders] = useState([]);
  const [amount, setAmount] = useState(null);
  const [title, setTitle] = useState(null);
  const [isLoading, setLoading] = useState(false);
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
      console.log('edit task ', editData);
      setTitle(editData?.name);
    }
  }, []);

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
                setSelFolder(i);
                console.log('folder is deufalt ', i);
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
  const clearData = () => {
    setType(0);
    setMeta(0);
    setColorPicker(false);
    setColor(theme.colors.primary);
    setSelFolder('');
    setAmount(null);
    setTitle(null);
  };
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
        // folderFrm.append('icon', null);
      };
      setLoading(true);
      let options = {payloads: frmData};
      ApiService.post('task', options)
        .then(res => {
          setLoading(false);
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
          // Toast.show(error.response.data.message, Toast.SHORT);
          console.log('error ', error.response.data.message?.message);
        });
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
    <>
      <View style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{flex: 1}}
          contentContainerStyle={{
            paddingTop: Platform.OS === 'ios' ? scale(30) : 0,
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
                      and registry yout achievements."
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
                placeholder="task name"
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
              <Label title="Type " style={styles.label} />
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
                            setMeta(null);
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
                              color:
                                type === t.id
                                  ? theme.colors.black
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
              <Label title="Meta " style={styles.label} />
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
                              color:
                                selMeta === t.id || selMeta === null
                                  ? theme.colors.black
                                  : theme.colors.gray,
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
                <Label title="Amount " />
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
              <Text style={{color: 'black', fontSize: 18, fontWeight: '700'}}>
                Add icon
              </Text>
              <TouchableOpacity style={styles.choosebtn}>
                <Text
                  style={{
                    color: theme.colors.white,
                    fontSize: 18,
                    fontWeight: '800',
                  }}>
                  Choose
                </Text>
              </TouchableOpacity>
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
                      <Label title={f.name} style={{fontSize: scale(12)}} />
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            )}
            <View style={styles.devider} />

            <TouchableOpacity onPress={handleSave} style={styles.createTaskbtn}>
              <Ionicon name="play" color={theme.colors.white} size={25} />
              <Text style={styles.createtxt}>
                {props?.route?.params?.editData ? 'Edit task' : 'Create task'}
              </Text>
            </TouchableOpacity>
            {props?.route?.params?.editData && (
              <>
                <TouchableOpacity
                  onPress={() => Alert.alert('Delete')}
                  style={styles.deletebtn}>
                  <Icon name="delete" color={theme.colors.white} size={25} />
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
        </ScrollView>
      </View>
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
    marginLeft: scale(10),
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
});
