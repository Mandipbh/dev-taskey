import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/Feather';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon1 from 'react-native-vector-icons/Foundation';
import {moderatedScale, scale, theme} from '../../utils';
import CommonHeader from '../../components/CommonHeader';
import {Label, Title} from '../../components';
import {useNavigation} from '@react-navigation/native';
const TaskDetailsScreen = props => {
  const navigation = useNavigation();
  const {note} = props?.route?.params;
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <CommonHeader
          headerTitle="Task details"
          iconName="edit"
          IconType={AntDesign}
          onRightIconPress={() => {
            navigation.replace('CreateTask', {editData: note});
          }}
        />
        <View style={styles.secondContainer}>
          <View style={{flexDirection: 'row'}}>
            <Label title="Title : " style={styles.Subtitle} />
            <Title title={note.title} />
          </View>

          <View style={styles.typeCon}>
            <Label title="Type :" style={styles.Subtitle} />
            <Label title="Timer " style={styles.type} />
            <Icon name="timer-sand" size={scale(18)} />
          </View>
          <View style={styles.typeCon}>
            <Label title="Meta :" style={styles.Subtitle} />
            <Label title="Registry " style={styles.type} />
            <Icon1 name="clipboard-notes" size={scale(18)} />
          </View>
          <View style={{marginTop: scale(20)}}>
            <Label title="Task descrptions :" style={styles.Subtitle} />
            <Label title={note.desc} style={styles.desc} />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default TaskDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
    paddingHorizontal: scale(15),
  },
  headerContainer: {
    height: scale(55),
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: scale(0.2),
    borderColor: theme.colors.gray,
  },
  secondContainer: {
    marginTop: scale(10),
  },
  Subtitle: {
    fontSize: scale(14),
    fontWeight: '600',
  },
  desc: {
    marginTop: scale(5),
  },
  typeCon: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: scale(10),
  },
  type: {
    marginLeft: scale(10),
  },
});
