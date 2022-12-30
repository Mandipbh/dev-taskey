import React from 'react';
import {View, StyleSheet} from 'react-native';
import {PieChart} from 'react-native-svg-charts';
import {DonutChart} from 'react-native-circular-chart';

const CustomChart = ({chartData}) => {
  return (
    <View style={styles.container}>
      <PieChart
        innerRadius={'80%'}
        style={{height: 200, borderRadius: 10, width: 200}}
        data={chartData}
        padAngle={0}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
});

export default CustomChart;
