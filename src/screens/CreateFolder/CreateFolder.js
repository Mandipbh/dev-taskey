import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Modal,
  Platform,
  TouchableOpacity,
  Text,
  ImageBackground,
  TextInput,
  Image,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicon from 'react-native-vector-icons/Ionicons';
import LottieView from 'lottie-react-native';
import {scale, theme} from '../../utils';
import InputBox from '../../components/InputBox';
import {Title, Label} from '../../components/Label';
import {typeData, metaData} from '../../utils/mockData';
import ColorPickerModel from '../../components/appModel/ColorPickerModel';
import Toast from 'react-native-simple-toast';
import ApiService from '../../utils/ApiService';
import Loader from '../../components/appModel/Loader';

const CreateFolderModel = props => {
  const {isVisible, close, editFolder} = props;
  const [type, setType] = useState(0);
  const [typetwo, setTypetwo] = useState(0);
  const [colorPicker, setColorPicker] = useState(false);
  const [selColor, setColor] = useState(theme.colors.primary);
  const [folderName, setFolderName] = useState(null);
  const [isLoading, setLoading] = useState(false);

  const handleCloseClolorpicker = c => {
    setColor(c);
    setColorPicker(false);
  };
  const handleSave = () => {
    if (!handleValidation()) {
      close(selColor, folderName);
      // let folderFrm = new FormData();
      // folderFrm.append('name', folderName);
      // folderFrm.append('type', type);
      // folderFrm.append('color', selColor);
      // folderFrm.append('order', 1);
      // folderFrm.append('icon', null);
      let folderFrm = {
        name: folderName,
        type: type === 1 ? 'CRONO' : type === 2 ? 'TIMER' : 'COUNTER',
        color: selColor,
        order: 1,
        // icon: null,
      };
      setLoading(true);
      const options = {payloads: folderFrm};
      ApiService.post('folder', options)
        .then(res => {
          setLoading(false);
          console.log('respoe >>. ', res);
          if (res.code === -1) {
          }
        })
        .catch(error => {
          setLoading(false);
          console.log('error ', error);
        });
      setTimeout(() => {
        onPressBack();
      }, 800);
    }
  };
  var error = false;
  const handleValidation = () => {
    if (folderName === null) {
      Toast.show('please enter folder name', Toast.SHORT);
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

  const onPressBack = () => {
    close();
    setColor(theme.colors.primary);
    setFolderName(null);
    setType(0);
  };

  return (
    <>
      <View style={styles.container}>
        <ImageBackground
          source={require('../../assets/Images/banner.jpg')}
          style={styles.header}>
          <View style={{margin: 20}}>
            <Text
              style={{
                color: theme.colors.white,
                fontSize: 20,
                fontWeight: '800',
              }}>
              Create folder
            </Text>
            <Text
              style={{
                color: theme.colors.white,
                fontSize: 15,
                fontWeight: '500',
              }}>
              Create folders to group all tasks into custom categories.
            </Text>
            <Text
              style={{
                color: theme.colors.white,
                fontSize: 20,
                fontWeight: '800',
                marginTop: scale(20),
              }}>
              Set name
            </Text>
            <TextInput
              placeholder="folder name"
              onChangeText={txt => {
                setFolderName(txt);
              }}
              value={folderName}
              style={{
                backgroundColor: theme.colors.white,
                borderRadius: 20,
                padding: scale(2),
                paddingLeft: scale(15),
                elevation: 5,
                marginTop: scale(10),
                fontSize: scale(12),
                color: theme.colors.black,
                height: scale(40),
              }}
            />
          </View>
        </ImageBackground>

        <View style={styles.secondCon}>
          <View style={styles.row}>
            <Label title="Type" style={styles.label} />
            <View style={styles.row}>
              {typeData?.map((t, i) => {
                return (
                  <View
                    key={i.toString()}
                    style={{
                      marginHorizontal: theme.SCREENWIDTH * 0.02,
                      marginLeft: scale(20),
                    }}>
                    <Image
                      style={{
                        height: scale(30),
                        width: scale(30),
                        marginLeft: scale(20),
                      }}
                      source={t.url}
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
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              margin: scale(10),
            }}>
            <Text style={{color: 'black', fontSize: 18, fontWeight: '700'}}>
              Add icon
            </Text>
            <TouchableOpacity
              style={{
                backgroundColor: theme.colors.orange,
                padding: 5,
                marginLeft: scale(40),
                borderRadius: 20,
                height: scale(40),
                width: scale(120),
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  color: theme.colors.white,
                  fontSize: 18,
                  fontWeight: '500',
                }}>
                Choose
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.devider} />
          <TouchableOpacity
            onPress={handleSave}
            style={{
              flexDirection: 'row',
              backgroundColor: theme.colors.orange,
              width: scale(220),
              height: scale(40),
              alignItems: 'center',
              justifyContent: 'center',
              alignSelf: 'center',
              marginTop: scale(30),
              borderRadius: 30,
            }}>
            <Ionicon name="play" color={theme.colors.white} size={25} />
            <Text style={{color: theme.colors.white, fontSize: 20, padding: 5}}>
              Create task
            </Text>
          </TouchableOpacity>
        </View>
        {/* <View style={styles.secondCon}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
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
          </View>
        </View> */}
      </View>
      <ColorPickerModel
        isVisible={colorPicker}
        close={handleCloseClolorpicker}
      />
      {isLoading && <Loader />}
    </>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  label: {
    textAlign: 'center',
    color: theme.colors.black,
    fontSize: scale(14),
    fontWeight: '600',
  },

  headerView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: scale(50),
    borderBottomWidth: scale(0.2),
    paddingHorizontal: scale(15),
  },
  container: {
    flex: 1,
    width: '100%',
    paddingTop: Platform.OS === 'ios' ? scale(10) : scale(5),
    backgroundColor: theme.colors.main,
    margin: 0,
  },
  subTitleView: {
    paddingVertical: scale(20),
  },
  secondCon: {
    padding: scale(20),
    backgroundColor: theme.colors.lightBlue,
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    width: theme.SCREENWIDTH * 0.74,
    marginLeft: scale(15),
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
  },
  header: {
    height: scale(200),
    width: '100%',
    resizeMode: 'cover',
  },
});

export default CreateFolderModel;
