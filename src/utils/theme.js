import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');

const theme = {
  fonts: {},
  colors: {
    transparent: 'transparent',
    white: '#FFFFFF',
    white1: '#eff2f5',
    black: '#000000',
    gray: '#9E9E9E',
    gray1: '#f5f6f6',
    gray2: '#666',
    purpal: '#002a4c',
    lightpurpal: '#F4FAFF',
    red: '#FF0000',
    lightBlue: '#DCEDFB',
    green: '#47d649',
    primary: '#01398d',
    primary1: '#00d8ff',
    primary2: '#016bfd',
    orange: '#f9894a',
    orange2: '#fa9d02',
    orange3: '#f98805',
    lightGreen: '#37cac8',
    main: '#ea8915',
    backgroundColor: '#e4f5ff',
    orange1: '#ffdab9',
  },
  SCREENWIDTH: width,
  SCREENHEIGHT: height,
};

export default theme;
