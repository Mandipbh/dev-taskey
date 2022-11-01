import {StyleSheet} from 'react-native';
import {scale, theme} from '../../utils';

export const CommonStyles = StyleSheet.create({
  TitleStyle: {
    height: scale(150),
    justifyContent: 'center',
    alignItems: 'center',
  },
  TitleTextStyle: {fontSize: 28, fontWeight: '400'},
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  secondContainer: {
    paddingVertical: scale(10),
    paddingHorizontal: scale(20),
  },
  secondTitle: {
    color: theme.colors.primary,
    fontSize: 20,
  },
  btn: {
    backgroundColor: theme.colors.primary,
    marginTop: scale(30),
  },
  navTxtContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 30,
  },
  navTxt: {
    color: theme.colors.primary,
    left: 5,
    fontWeight: '600',
  },
});
