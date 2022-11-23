import {Platform, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {scale, theme} from '../utils';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Label} from './Label';

const Accordian = props => {
  const {title, children, leftContent, style} = props;
  const [showContent, setShowContent] = useState(false);

  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity onPress={() => setShowContent(!showContent)}>
        <View style={styles.titleContainer}>
          <View style={styles.AccordianContainer}>
            <Label style={styles.title} title={title}></Label>
            <View style={styles.row}>
              <Label style={styles.title} title={leftContent}></Label>
              {showContent ? (
                <AntDesign name="up" />
              ) : (
                <AntDesign name="down" />
              )}
            </View>
          </View>
        </View>
      </TouchableOpacity>
      {showContent && <View style={styles.body}>{children}</View>}
    </View>
  );
};
export default Accordian;
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    marginBottom: '2%',
    overflow: 'hidden',
    marginHorizontal: scale(15),
    marginTop: scale(10),
  },
  title: {
    fontSize: 15,
  },
  body: {
    paddingHorizontal: scale(20),
    paddingVertical: scale(10),
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scale(20),
    paddingVertical: scale(20),
    backgroundColor: theme.colors.gray1,
    borderColor: theme.colors.gray,
    borderRadius: 12,
    borderWidth: Platform.OS === 'android' ? 1 : 0.3,
  },
  AccordianContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    width: theme.SCREENWIDTH * 0.15,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
