import React from 'react';
import {View, StyleSheet} from 'react-native';
import {PieChart} from 'react-native-svg-charts';

const CustomChart = ({chartData}) => {
  return (
    <View style={styles.container}>
      <PieChart
        innerRadius={'3%'}
        style={{height: 200, borderRadius: 10, width: 200}}
        data={chartData}
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
