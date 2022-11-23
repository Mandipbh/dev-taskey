import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');

const theme = {
  fonts: {
  },
  colors: {
    primary: '#3396FF',
    primary1: '#00D8FF',
    primary2: '#016BFD',
    transparent: 'transparent',
    white: '#FFFFFF',
    black: '#000000',
    gray: '#9E9E9E',
    gray1: '#f5f6f6',
    purpal: '#002a4c',
    lightpurpal: '#F4FAFF',
    red: '#FF0000',
    lightBlue: '#DCEDFB',
    green: '#47d649',
    primary: '#01398d',
    primary1: '#00d8ff',
    primary2: '#016bfd',
    orange: '#f9894a',
    lightGreen: '#37cac8',
  },
  SCREENWIDTH: width,
  SCREENHEIGHT: height,
};

export default theme;
