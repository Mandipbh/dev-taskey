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
        <View style={{justifyContent: 'center'}}>
          {data.map(i => {
            return (
              <>
                <View
                  style={{
                    backgroundColor: '#a9a9a9',
                    alignItems: 'center',
                    margin: scale(5),
                    borderRadius: 5,
                    padding: scale(2),
                  }}>
                  <Label
                    style={{fontSize: 18, color: '#ffffff', fontWeight: '700'}}
                    title={`${i.value} %`}
                  />
                  <Label
                    style={{fontSize: 14, color: '#ffffff'}}
                    title={`${i.type} Tasks`}
                  />
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
