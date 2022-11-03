import {Platform, ScrollView, StyleSheet, View} from 'react-native';
import React from 'react';
import CommonHeader from '../../components/CommonHeader';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {scale, theme} from '../../utils';
import Accordian from '../../components/Accordian';
import {Label} from '../../components';

const TaskDiscription = () => {
  return (
    <>
      <CommonHeader IconType={AntDesign} />

      <ScrollView
        style={{
          flex: 1,
          backgroundColor: theme.colors.white,
          marginBottom: Platform.OS === 'android' ? scale(40) : scale(70),
        }}
        showsVerticalScrollIndicator={false}>
        <Accordian title="Number of Tasks" leftContent="10000">
          <View style={styles.accordianDetail}>
            <Label title="total Time" />
            <Label title="10.000 min" />
          </View>
          <View style={styles.accordianDetail}>
            <Label title="Total Count" />
            <Label title="9999" />
          </View>
        </Accordian>

        <Accordian title="Achievement Tasks" leftContent="10000">
          <View style={styles.accordianDetail}>
            <Label title="Completed Tasks" />
            <Label title="2000" />
          </View>
          <View style={styles.accordianDetail}>
            <Label title="Percentage or Success" />
            <Label title="50%" />
          </View>
          <View style={styles.accordianDetail}>
            <Label title="Achievement Tasks In progress" />
            <Label title="1500" />
          </View>
          <View style={styles.accordianDetail}>
            <Label title="Percentage of progress" />
            <Label title="50%" />
          </View>
          <View style={styles.accordianDetail}>
            <Label title="Achievement Task time" />
            <Label title="4.000 min" />
          </View>
          <View style={styles.accordianDetail}>
            <Label title="Achievement Tasks Counter" />
            <Label title="1000" />
          </View>
        </Accordian>

        <Accordian title="Registry Tasks" leftContent="600">
          <View style={styles.accordianDetail}>
            <Label title="Registry Tasks Time" />
            <Label title="2.000 min" />
          </View>
          <View style={styles.accordianDetail}>
            <Label title="Registry Tasks Counter" />
            <Label title="500" />
          </View>
        </Accordian>

        <Accordian title="Deleted Tasks" leftContent="200" />

        <Accordian title="Failed Tasks" leftContent="500">
          <View style={styles.accordianDetail}>
            <Label title="Percentage of failed Tasks" />
            <Label title="0.5%" />
          </View>
        </Accordian>

        <Accordian title="Total Crono Tasks" leftContent="2000">
          <View style={styles.accordianDetail}>
            <Label title="Percentage of Crono Tasks" />
            <Label title="20%" />
          </View>
        </Accordian>

        <Accordian title="Total Timer Tasks" leftContent="3000">
          <View style={styles.accordianDetail}>
            <Label title="Percentage of Timer Tasks" />
            <Label title="30%" />
          </View>
        </Accordian>

        <Accordian title="Total Counter Tasks" leftContent="5000">
          <View style={styles.accordianDetail}>
            <Label title="Percentage of Counter Tasks" />
            <Label title="50%" />
          </View>
        </Accordian>
      </ScrollView>
    </>
  );
};

export default TaskDiscription;

const styles = StyleSheet.create({
  accordianDetail: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: scale(10),
    borderBottomWidth: 0.3,
    borderBottomColor: theme.colors.gray,
    padding: 15,
  },
});
