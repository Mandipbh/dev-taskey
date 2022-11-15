import React from 'react';
import {View, StyleSheet} from 'react-native';
import {PieChart} from 'react-native-svg-charts';
import {scale} from '../utils';

const CustomChart = ({chartData}) => {
  // const data = Yourdata;

  // const randomColor = () =>
  //   ('#' + ((Math.random() * 0xffffff) << 0).toString(16) + '000000').slice(
  //     0,
  //     7,
  //   );

  // const pieData = data
  //   .filter(value => value > 0)
  //   .map((value, index) => ({
  //     value,
  //     svg: {
  //       fill: randomColor(),
  //       onPress: () => console.log('press', index),
  //     },
  //     key: `pie-${index}`,
  //   }));

  return (
    <View style={styles.container}>
      <PieChart
        innerRadius={'3%'}
        style={{height: 200, borderRadius: 10, width: 200}}
        data={chartData}
      />
      {/* <View style={styles.labelContainer}>{console.log(randomColor())}</View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  label: {
    position: 'absolute',
    fontWeight: '900',
    fontSize: 22,
  },
  labelContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  currency: {
    fontSize: 13,
    fontWeight: '900',
    color: '#9299BE',
  },
  subLabel: {
    color: '#9299BE',
    fontSize: 14,
    fontWeight: '500',
    marginTop: 50,
  },
});

export default CustomChart;
