import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');

const theme = {
  fonts: {
    // PoppinsBold: 'Poppins-Bold',
    // PoppinsLight: 'Poppins-Light',
    // PoppinsMedium: 'Poppins-Medium',
    // PoppinsSemiBold: 'Poppins-SemiBold',
    // GrandHotel: 'GrandHotel-Regular',
    // Robato: 'Roboto-Black',
    // RobatoBlod: 'Roboto-Bold',
    // RobatoMedium: 'Roboto-Medium',
  },
  colors: {
    primary: '#3396FF',
    primary1: '#00D8FF',
    primary2: '#016BFD',
    white: '#FFFFFF',
    black: '#000000',
    gray: '#9E9E9E',
    gray1: '#f5f6f6',
    purpal: '#002a4c',
    lightpurpal: '#F4FAFF',
    red: '#FF0000',
    lightBlue: '#DCEDFB',
    green: '#00ff00 ',
    primary: '#01398d',
    primary1: '#00d8ff',
    primary2: '#016bfd',
  },
  SCREENWIDTH: width,
  SCREENHEIGHT: height,
};

export default theme;
