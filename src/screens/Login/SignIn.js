import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import Toast from 'react-native-simple-toast';

import React from 'react';
import {Button, Label, TextInput, Title} from '../../components';
import {CommonStyles} from './CommonStyles';
import {useNavigation} from '@react-navigation/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {scale, theme} from '../../utils';
import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import ApiService from '../../utils/ApiService';
import {isLogin, loginAction} from '../../redux/Actions/UserActions';
import axios from 'axios';

const SignIn = () => {
  const navigation = useNavigation();
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSend, setSendOtp] = useState(false);
  const userDetails = useSelector(state => state.UserReducer.userDetails);
  const dispatch = useDispatch();
  const validation = () => {
    let error = false;
    if (mobile.trim() === '' && otp.trim() === '') {
      Toast.show('Please enter mobile number and otp', Toast.SHORT);
      error = true;
    } else {
      if (mobile.trim() === '') {
        Toast.show('Mobile Number is not allow blank', Toast.SHORT);
        error = true;
      } else {
        error = false;
      }
      if (otp.trim() === '') {
        Toast.show('Otp is not allow blank', Toast.SHORT);
        error = true;
      } else {
        error = false;
      }
    }

    return error;
  };

  const handleLogin = async () => {
    if (validation()) {
    } else {
      try {
        const mobileFrm = {
          phonenumber: mobile,
          code: otp,
        };
        const options = {payloads: mobileFrm};
        const response = await ApiService.post('verifyOTP', options);
        console.log('resposemn >> ', response);
        if (response) {
          Toast.show('Login successfully');
          dispatch(isLogin(true));
          navigation.navigate('Tabs');
        } else {
          // setSendOtp(true);
        }
      } catch (error) {
        Toast.show('error', Toast.SHORT);
      }
    }
  };

  const handleotpSend = async () => {
    if (mobile.trim() === '') {
      Toast.show('Mobile Number is not allow blank', Toast.SHORT);
    } else {
      try {
        const mobileFrm1 = {
          phonenumber: mobile,
        };
        const options = {payloads: mobileFrm1};
        const response = await ApiService.post('login', options);
        console.log('response << > ', response?.token);
        if (response.success) {
          axios.defaults.headers.common.Authorization = `Bearer ${response.token}`;
          Toast.show('OTP is sent to your mobile number');
          setSendOtp(true);
          dispatch(loginAction(response));
        } else {
          setSendOtp(true);
        }
      } catch (error) {
        Toast.show('error', Toast.SHORT);
      }
    }
  };

  return (
    <KeyboardAwareScrollView
      style={CommonStyles.container}
      showsVerticalScrollIndicator={false}>
      <SafeAreaView style={CommonStyles.container}>
        <View style={CommonStyles.TitleStyle}>
          <Title title="Welcome Back" style={CommonStyles.TitleTextStyle} />
        </View>
        <View style={CommonStyles.secondContainer}>
          <Title style={CommonStyles.secondTitle} title="Login" />
          <TextInput
            LabelIcon="mobile1"
            Labeltitle="Phone Number"
            placeholder="Enter Phone Number"
            value={mobile}
            onChangeText={txt => {
              setMobile(txt);
            }}
            keyboardType="numeric"
            maxLength={10}
          />
          <TouchableOpacity
            style={styles.sendBtn}
            onPress={() => {
              handleotpSend();
            }}>
            <Text style={styles.Sendcode}>
              {otpSend ? 'Re-Send' : 'Send Code'}
            </Text>
          </TouchableOpacity>
          <TextInput
            LabelIcon="message1"
            Labeltitle="OTP"
            placeholder="Enter OTP"
            value={otp}
            onChangeText={txt => {
              setOtp(txt);
            }}
            keyboardType="numeric"
            maxLength={6}
          />
          <Button
            style={CommonStyles.btn}
            title="Login"
            onPress={() => {
              handleLogin();
            }}
          />
          <View style={CommonStyles.navTxtContainer}>
            <Label title="Are you a new User ?" />
            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
              <Label style={CommonStyles.navTxt} title="Sign Up" />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
};

export default SignIn;
const styles = StyleSheet.create({
  navTxt: {
    textAlign: 'center',
    fontSize: scale(14),
  },
  forgetPass: {
    marginTop: scale(8),
  },
  sendBtn: {
    alignSelf: 'flex-end',
    padding: scale(4),
  },
  Sendcode: {
    color: theme.colors.primary,
    borderBottomWidth: 1,
    borderColor: theme.colors.primary,
  },
});
