import {StyleSheet, View} from 'react-native';
import React from 'react';
import CustomChart from './CustomChart';
import {scale, theme} from '../utils';
import {Label, Title} from './Label';

const ChartSection = props => {
  const {title, data, style} = props;
  return (
    <View style={[styles.chartView, style]}>
      <View style={{flexDirection: 'row', marginTop: scale(10)}}>
        <CustomChart chartData={data} />
        {/* <View style={{justifyContent: 'center'}}>
          {data.map(i => {
            return (
              <>
                <View style={{flexDirection: 'row'}}>
                  <View
                    style={[styles.colorBox, {backgroundColor: i.svg.fill}]}
                  />
                  <Label
                    style={{fontSize: 12}}
                    title={`${i.type} Tasks`}></Label>
                </View>
              </>
            );
          })}
        </View> */}
      </View>
    </View>
  );
};

export default ChartSection;

const styles = StyleSheet.create({
  chartView: {
    padding: scale(15),
    marginVertical: scale(5),
    alignSelf: 'center',
  },
  colorBox: {
    height: scale(20),
    width: scale(18),
    margin: scale(2),
    marginHorizontal: scale(8),
  },
});
