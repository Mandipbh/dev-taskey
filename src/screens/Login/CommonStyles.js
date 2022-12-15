import {StyleSheet} from 'react-native';
import {scale, theme} from '../../utils';

export const CommonStyles = StyleSheet.create({
  TitleStyle: {
    height: scale(150),
    justifyContent: 'center',
    alignItems: 'center',
  },
  TitleTextStyle: {
    fontSize: 28,
    fontWeight: '600',
    color: theme.colors.orange,
  },
  container: {
    backgroundColor: theme.colors.white,
  },
  secondContainer: {
    paddingVertical: scale(10),
    paddingHorizontal: scale(20),
  },
  secondTitle: {
    color: theme.colors.orange,
    fontSize: 20,
  },
  btn: {
    backgroundColor: theme.colors.orange,
    marginTop: scale(30),
  },
  navTxtContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: scale(30),
  },
  navTxt: {
    color: theme.colors.orange,
    left: 5,
    fontWeight: '600',
  },
});
