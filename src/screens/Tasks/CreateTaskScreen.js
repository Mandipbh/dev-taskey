import {StyleSheet, View, SafeAreaView, TouchableOpacity} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {moderatedScale, scale, theme} from '../../utils';
import {Label, Title} from '../../components/Label';
import {InputBox} from '../../components';

const CreateTaskScreen = () => {
  const typeData = [
    {
      title: 'Crono',
      icon: 'timer-outline',
      id: 1,
    },
    {
      title: 'Timer',
      icon: 'timer-sand',
      id: 2,
    },
    {
      title: 'Counter',
      icon: 'counter',
      id: 3,
    },
  ];
  const metaData = [
    {
      title: 'Achievement',
      icon: 'certificate',
      id: 1,
    },
    {
      title: 'Registry',
      icon: 'notebook',
      id: 2,
    },
  ];
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Title title="Create Task" />
        <Label
          style={styles.subtitle}
          title="Create a task to control your time investment and registry your achievement "
        />
        <View style={styles.secondCon}>
          <View style={styles.row}>
            <Label title="Set name" style={styles.label} />
            <InputBox placeholder="Task name" style={styles.input} />
          </View>
        </View>
        <View style={styles.secondCon}>
          <View style={styles.row}>
            <Label title="Type" style={styles.label} />
            <View style={[styles.row, {marginLeft: theme.SCREENWIDTH * 0.08}]}>
              {typeData?.map((t, i) => {
                return (
                  <View style={{marginHorizontal: theme.SCREENWIDTH * 0.05}}>
                    <Icon name={t.icon} size={scale(30)} />
                    <View style={styles.row}>
                      <TouchableOpacity style={styles.checkBoxCon}>
                        <View style={styles.check} />
                      </TouchableOpacity>
                      <Label title={t.title} style={styles.checkboxLbl} />
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
            <Label title="Meta" style={styles.label} />
            <View style={[styles.row, {marginLeft: theme.SCREENWIDTH * 0.08}]}>
              {metaData?.map((t, i) => {
                return (
                  <View style={{marginHorizontal: theme.SCREENWIDTH * 0.05}}>
                    <Icon name={t.icon} size={scale(30)} />
                    <View style={styles.row}>
                      <TouchableOpacity style={styles.checkBoxCon}>
                        <View style={styles.check} />
                      </TouchableOpacity>
                      <Label title={t.title} style={styles.checkboxLbl} />
                    </View>
                  </View>
                );
              })}
            </View>
          </View>
          <View style={styles.devider} />
        </View>
        <View style={styles.secondCon}>
          <View style={[styles.row, {justifyContent: 'space-between'}]}>
            <Label title="Icon " style={styles.label} />
            <TouchableOpacity style={styles.iconPic} />
            <Label title="Color" style={styles.label} />
            <TouchableOpacity style={styles.colorPicker} />
          </View>
          <View style={styles.devider} />
        </View>
        <View style={styles.secondCon}>
          <View style={[styles.row, {justifyContent: 'space-between'}]}>
            <Label title="Folder " style={styles.label} />
            <TouchableOpacity style={styles.folder}>
              <Icon name="menu-down" size={scale(25)} />
              <Label title={'Globle list folder'} />
            </TouchableOpacity>
            <Icon
              name="folder-outline"
              size={scale(25)}
              style={{marginLeft: scale(20)}}
            />
            <Label title="New" style={[styles.label]} />
          </View>
          <View style={styles.devider} />
        </View>
        <View style={styles.secondCon}>
          <View style={styles.circule}>
            <Icon name="play" size={scale(40)} color="green" />
          </View>
        </View>
      </View>
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
    fontSize: scale(13.5),
    fontWeight: '600',
    textAlign: 'justify',
  },
  input: {
    width: theme.SCREENWIDTH * 0.7,
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
  },
  colorPicker: {
    width: theme.SCREENWIDTH * 0.2,
    height: scale(22),
    backgroundColor: '#dff8',
    borderWidth: scale(1.5),
    marginRight: scale(30),
  },
  folder: {
    width: theme.SCREENWIDTH * 0.42,
    borderWidth: scale(1),
    height: scale(25),
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginLeft: scale(20),
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
});
