import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
// import {useThemeAwareObject} from '../theme';
import {PieChart} from 'react-native-svg-charts';

const CustomChart = ({Yourdata}) => {
  const data = Yourdata;
  //   const styles = useThemeAwareObject(makeStyles);

  const randomColor = () =>
    ('#' + ((Math.random() * 0xffffff) << 0).toString(16) + '000000').slice(
      0,
      7,
    );

  const color = ['#4287f5', '#73a5f5', '#c0d7fa'];

  const pieData = data
    .filter(value => value > 0)
    .map((value, index) => ({
      value,
      svg: {
        fill: randomColor(),
        onPress: () => console.log('press', index),
      },
      key: `pie-${index}`,
    }));

  return (
    <View style={styles.container}>
      <PieChart
        innerRadius={'40%'}
        // labelRadius={100}
        style={{height: 200, borderRadius: 10}}
        data={pieData}
        // fillColor={'purple'}
      />
      <View style={styles.labelContainer}>
        {/* <Text style={styles.label}>
          500.32<Text style={styles.currency}>EGP</Text>
        </Text>
        <Text style={styles.subLabel}>Spending</Text> */}
        {console.log(randomColor())}
      </View>
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
