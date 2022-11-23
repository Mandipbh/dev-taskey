import {StyleSheet, View, SafeAreaView, TouchableOpacity} from 'react-native';
import React from 'react';
import {Button, Label, TextInput, Title} from '../../components';
import {CommonStyles} from './CommonStyles';
import {useNavigation} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Toast from 'react-native-simple-toast';
import {scale, theme} from '../../utils';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useState} from 'react';
import {API, postAPICall} from '../../utils/AppApi';
import ApiService from '../../utils/ApiService';
import {useDispatch} from 'react-redux';
import {isLogin, loginAction} from '../../redux/Actions/UserActions';

const SignUp = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [sentOtp, setSendOtp] = useState(false);
  const dispatch = useDispatch();

  const handleSignup = async () => {
    try {
      const mobileFrm = {
        phonenumber: mobile,
        code: otp,
      };
      const options = {payloads: mobileFrm};
      const response = await ApiService.post('verifyOTP', options);
      console.log('resposemn >> ', response);
      if (response.data.valid) {
        Toast.show('Signup successfully');
        dispatch(loginAction(response));
        dispatch(isLogin(true));
        navigation.navigate('Tabs');
      } else {
        // setSendOtp(true);
      }
    } catch (error) {
      Toast.show('error', Toast.SHORT);
    }
  };
  const handleotpSend = async () => {
    if (mobile.trim() === '') {
      Toast.show('Mobile Number is not allow blank', Toast.SHORT);
    } else {
      try {
        const registerFrm = {
          name: name,
          phonenumber: mobile,
        };
        const options = {payloads: registerFrm};
        const response = await ApiService.post('register', options);
        console.log('Register frm >> ', response);
        if (response.code === 0) {
          Toast.show('OTP is sent to your mobile number');
          setSendOtp(true);
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
        <AntDesign
          name="left"
          size={25}
          style={styles.backIcon}
          onPress={() => navigation.goBack()}
          color={theme.colors.primary}
        />
        <View style={CommonStyles.TitleStyle}>
          <Title title="Create Account" style={CommonStyles.TitleTextStyle} />
        </View>
        <View style={CommonStyles.secondContainer}>
          <Title style={CommonStyles.secondTitle} title="Sign Up" />
          <TextInput
            LabelIcon="user"
            Labeltitle="Your user Name"
            placeholder="Enter your username"
            value={name}
            onChangeText={txt => {
              setName(txt);
            }}
          />
          <TextInput
            LabelIcon="mobile1"
            Labeltitle="Your Phone Number"
            placeholder="Enter Phone Number"
            value={mobile}
            onChangeText={txt => {
              setMobile(txt);
            }}
            keyboardType="numeric"
          />
          <TouchableOpacity style={styles.sendOtpBtn} onPress={handleotpSend}>
            <Text style={styles.Sendcode}>
              {sentOtp ? 'Re-Send' : 'Send Code'}
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
          />
          <Button
            style={CommonStyles.btn}
            title="SignUp"
            onPress={() => {
              handleSignup();
            }}
          />
          <View style={CommonStyles.navTxtContainer}>
            <Label title="Already a user?" />
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Label style={CommonStyles.navTxt} title="Login" />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  backIcon: {
    marginLeft: scale(10),
    marginTop: scale(15),
  },
  Sendcode: {
    color: theme.colors.primary,
    borderBottomWidth: 1,
    borderColor: theme.colors.primary,
    marginBottom: scale(-15),
    // padding: 5,
  },
  sendOtpBtn: {
    alignSelf: 'flex-end',
    padding: scale(4),
  },
});
