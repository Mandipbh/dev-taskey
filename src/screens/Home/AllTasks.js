import {SafeAreaView, StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useState} from 'react';
import {Label, Title} from '../../components';
import {scale, theme} from '../../utils';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import Foundation from 'react-native-vector-icons/Foundation';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CommonHeader from '../../components/CommonHeader';
import {useNavigation} from '@react-navigation/native';

function HeaderTitle() {
  return (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <Label title="Status" style={{marginLeft: scale(8)}} />
      <Label title="Name" style={{marginLeft: scale(20)}} />
      <Label title="Path" style={{marginLeft: scale(70)}} />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginLeft: scale(20),
        }}>
        <Title title={'% '} />
        <AntDesign name="folder1" size={20} />
      </View>
      <Feather name="award" size={20} style={{marginLeft: scale(20)}} />
    </View>
  );
}

const AllTasks = ({route}) => {
  const {taskItem, folderName} = route.params;
  const [task, setTask] = useState(taskItem);
  console.log('All tasks', JSON.stringify(task, null, 2));
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: theme.colors.white}}>
      <CommonHeader
        IconType={AntDesign}
        headerTitle="All Tasks"
        headerLeft={() => (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <AntDesign name="left" size={scale(20)} />
          </TouchableOpacity>
        )}
      />
      <View style={styles.container}>
        <Title title={task?.name} style={{marginLeft: scale(5)}} />
        <View style={styles.divider} />

        <HeaderTitle />
        <View style={styles.divider} />

        {task &&
          task?.taskList.map((item, index) => {
            const lastItem = index === task.length - 1;

            return (
              <View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <View style={{marginLeft: scale(5)}}>
                    {item.status === 'play' ? (
                      <Feather
                        name="play"
                        size={scale(25)}
                        color={theme.colors.green}
                      />
                    ) : (
                      <Feather
                        name="pause"
                        size={scale(25)}
                        color={theme.colors.orange}
                      />
                    )}
                  </View>
                  <View style={{marginLeft: scale(5)}}>
                    {item % 2 ? (
                      <Foundation
                        name="social-zerply"
                        size={scale(20)}
                        color={theme.colors.green}
                      />
                    ) : (
                      <MaterialCommunityIcons
                        name="clock-time-seven"
                        size={scale(20)}
                        color={theme.colors.lightGreen}
                      />
                    )}
                  </View>

                  <Label
                    style={{
                      marginLeft: scale(2),
                      fontSize: 14,
                      width: scale(130),
                    }}
                    title={item?.name}
                  />
                  <View style={styles.staticDetails}>
                    <Label title={item?.path} />
                    <Label
                      title={`${item?.percentage ? item?.percentage : 0} %`}
                    />
                    <Label title="-" />
                  </View>
                </View>

                {!lastItem && (
                  <View
                    style={[styles.divider, {borderColor: theme.colors.black}]}
                  />
                )}
              </View>
            );
          })}
      </View>
    </SafeAreaView>
  );
};

export default AllTasks;

const styles = StyleSheet.create({
  divider: {
    borderWidth: 0.5,
    borderColor: theme.colors.primary1,
    marginVertical: scale(5),
  },
  container: {
    borderWidth: 1,
    borderColor: theme.colors.primary1,
    margin: scale(10),
    paddingHorizontal: scale(5),
    paddingVertical: scale(10),
    borderRadius: scale(12),
  },
  staticDetails: {
    flexDirection: 'row',
    width: '40%',
    justifyContent: 'space-around',
  },
});
