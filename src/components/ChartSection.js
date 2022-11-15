import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CustomChart from './CustomChart';
import {scale, theme} from '../utils';

const ChartSection = props => {
  const {title, data, style} = props;
  return (
    <View style={[styles.chartView, style]}>
      <Text style={{fontSize: 20}}>{title}</Text>
      <View style={{flexDirection: 'row', marginTop: scale(10)}}>
        <CustomChart chartData={data} />
        <View style={{justifyContent: 'center'}}>
          {data.map(i => {
            return (
              <>
                <View style={{flexDirection: 'row'}}>
                  <View
                    style={[styles.colorBox, {backgroundColor: i.svg.fill}]}
                  />
                  <Text style={{fontSize: 12}}>{i.type} Tasks</Text>
                </View>
              </>
            );
          })}
        </View>
      </View>
    </View>
  );
};

export default ChartSection;

const styles = StyleSheet.create({
  chartView: {
    backgroundColor: theme.colors.gray1,
    padding: scale(15),
    marginVertical: scale(5),
  },
  colorBox: {
    height: 20,
    width: 18,
    margin: 2,
    marginHorizontal: 8,
  },
});
