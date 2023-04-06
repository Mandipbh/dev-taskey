import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Toast from 'react-native-simple-toast';

import React from 'react';
import {Button, Label, TextInput, Title} from '../../components';
import {CommonStyles} from './CommonStyles';
import {CommonActions, useNavigation} from '@react-navigation/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import PhoneInput from 'react-native-phone-input';
import {scale, theme} from '../../utils';
import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ApiService from '../../utils/ApiService';
import {isLogin, loginAction} from '../../redux/Actions/UserActions';
import axios from 'axios';
import {useEffect} from 'react';

const SignIn = () => {
  const navigation = useNavigation();
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSend, setSendOtp] = useState(false);
  const [varified, setVarified] = useState(false);
  const [btnValidation, setBtnValidation] = useState(true);
  const [loginLoad, setLoad] = useState(false);
  const darkmodeState = useSelector(state => state.UserReducer.isDarkMode);

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
      if (otpSend) {
        setLoad(true);
        try {
          const mobileFrm = {
            phonenumber: mobile,
            code: otp,
          };
          const options = {payloads: mobileFrm};
          const response = await ApiService.post('verifyOTP', options);
          if (response) {
            setLoad(false);

            Toast.show('Login successfully');

            dispatch(isLogin(true));
            navigation.dispatch(
              CommonActions.reset({
                index: 1,
                routes: [{name: 'Tabs'}],
              }),
            );
          } else {
            setLoad(false);
            // setSendOtp(true);
          }
        } catch (error) {
          setLoad(false);
          Toast.show(error?.response?.data?.message, Toast.SHORT);
        }
      } else {
        setLoad(false);
        Toast.show('First press send code', Toast.SHORT);
      }
    }
  };

  const handleotpSend = async () => {
    console.log('number <>> ', mobile);
    // if (!/^\d{10}$/.test(mobile)) {
    // Toast.show('Please enter valid number', Toast.SHORT);
    // } else {
    try {
      const mobileFrm1 = {
        phonenumber: mobile,
      };
      const options = {payloads: mobileFrm1};
      const response = await ApiService.post('login', options);
      if (response.success) {
        axios.defaults.headers.common.Authorization = `Bearer ${response?.accessToken}`;
        setVarified(true);
        Toast.show('OTP is sent to your mobile number');
        setSendOtp(true);
        dispatch(loginAction(response));
      } else {
        setVarified(false);
        setSendOtp(true);
      }
    } catch (error) {
      console.log('errror >>> ', error);
      Toast.show(error?.response?.data?.message, Toast.SHORT);
    }
    // }
  };
  useEffect(() => {
    if (varified) {
      setBtnValidation(otp.length === 6 ? false : true);
    } else {
      setBtnValidation(true);
    }
  }, [varified, otp]);
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
          <View style={{flexDirection: 'row', marginTop: scale(15)}}>
            <AntDesign
              name={'mobile1'}
              size={scale(16)}
              color={theme.colors.gray}
            />
            <Label title="Phone Number" style={styles.labelText} />
          </View>

          <PhoneInput
            initialCountry={'es'}
            textProps={{
              placeholder: 'Enter a phone number',
            }}
            style={styles.numbrtpicker}
            textStyle={{
              height: scale(30),
              color: darkmodeState ? theme.colors.white : theme.colors.black,
            }}
            value={mobile}
            onChangePhoneNumber={txt => {
              setMobile(txt);
            }}
          />
          {/* <TextInput
            LabelIcon="mobile1"
            Labeltitle="Phone Number"
            placeholder="Enter Phone Number"
            value={mobile}
            onChangeText={txt => {
              setMobile(txt);
            }}
            keyboardType="numeric"
            maxLength={10}
          /> */}
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
          {loginLoad ? (
            <ActivityIndicator
              color={theme.colors.progressBar}
              size="large"
              style={{marginTop: scale(5)}}
            />
          ) : (
            <Button
              style={[
                CommonStyles.btn,
                {
                  backgroundColor: btnValidation
                    ? theme.colors.orange1
                    : theme.colors.orange,
                },
              ]}
              title="Login"
              disabled={btnValidation}
              onPress={() => {
                handleLogin();
              }}
            />
          )}
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
    color: theme.colors.orange,
    borderBottomWidth: 1,
    borderColor: theme.colors.orange,
  },
  numbrtpicker: {
    borderWidth: 1,
    paddingHorizontal: scale(15),
    marginTop: scale(10),
    borderColor: theme.colors.gray,
    borderRadius: scale(10),
    fontSize: 18,
    paddingVertical: scale(8),
    color: theme.colors.black,
    width: '100%',
  },
  labelText: {
    color: theme.colors.gray,
    fontSize: 16,
    left: scale(5),
  },
});
