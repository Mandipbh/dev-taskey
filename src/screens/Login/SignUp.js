import {
  StyleSheet,
  View,
  SafeAreaView,
  TouchableOpacity,
  Text,
} from 'react-native';
import React from 'react';
import {Button, Label, TextInput, Title} from '../../components';
import {CommonStyles} from './CommonStyles';
import {CommonActions, useNavigation} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Toast from 'react-native-simple-toast';
import PhoneInput from 'react-native-phone-input';
import {scale, theme} from '../../utils';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useState} from 'react';
import ApiService from '../../utils/ApiService';
import {useDispatch} from 'react-redux';
import {isLogin, loginAction} from '../../redux/Actions/UserActions';
import axios from 'axios';
import {useEffect} from 'react';

const SignUp = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [btnValidation, setBtnValidation] = useState(true);
  // const
  const [sentOtp, setSendOtp] = useState(false);
  const dispatch = useDispatch();

  let error = false;
  const validationReg = () => {
    if (name.trim() === '') {
      Toast.show('Please enter name', Toast.SHORT);
      error = true;
    }
    // else if (!/^\d{10}$/.test(mobile)) {
    //   Toast.show('Please enter proper number.', Toast.SHORT);
    //   error = true;
    // }
    else {
      error = false;
    }
    return error;
  };
  const handleSignup = async () => {
    if (validationReg()) {
      Toast.show('Not allow blank.', Toast.SHORT);
    } else {
      try {
        const mobileFrm = {
          phonenumber: mobile,
          code: otp,
        };
        const options = {payloads: mobileFrm};
        const response = await ApiService.post('verifyOTP', options);
        if (response.success) {
          Toast.show('Signup successfully.');
          dispatch(isLogin(true));
          navigation.dispatch(
            CommonActions.reset({
              index: 1,
              routes: [{name: 'Tabs'}],
            }),
          );
          // navigation.navigate('Tabs');
        } else {
          // setSendOtp(true);
        }
      } catch (error) {
        Toast.show('something went wrong', Toast.SHORT);
      }
    }
  };

  const handleotpSend = async () => {
    if (!validationReg()) {
      try {
        const registerFrm = {
          name: name,
          phonenumber: mobile,
        };
        const options = {payloads: registerFrm};
        const response = await ApiService.post('register', options);
        console.log('respose .>> ', response);
        if (response.success) {
          axios.defaults.headers.common.Authorization = `Bearer ${response.token}`;
          Toast.show('OTP is sent to your mobile number');
          dispatch(loginAction(response));
          setSendOtp(true);
        } else {
          Toast.show('Phone number exist');
          setSendOtp(false);
        }
      } catch (error) {
        Toast.show('something want wrong', Toast.SHORT);
      }
    } else {
    }
  };
  useEffect(() => {
    if (sentOtp) {
      setBtnValidation(otp.length === 6 ? false : true);
    } else {
      setBtnValidation(true);
    }
  }, [sentOtp, otp]);
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
          color={theme.colors.orange}
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
            textStyle={{height: scale(30)}}
            value={mobile}
            onChangePhoneNumber={txt => {
              setMobile(txt);
            }}
          />
          {/* <TextInput
            LabelIcon="mobile1"
            Labeltitle="Your Phone Number"
            placeholder="Enter Phone Number"
            value={mobile}
            onChangeText={txt => {
              setMobile(txt);
            }}
            keyboardType="numeric"
            maxLength={10}
          /> */}
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
            maxLength={6}
            onChangeText={txt => {
              setOtp(txt);
            }}
            keyboardType="numeric"
          />
          <Button
            disabled={btnValidation}
            style={[
              CommonStyles.btn,
              {
                backgroundColor: btnValidation
                  ? theme.colors.orange1
                  : theme.colors.orange,
              },
            ]}
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
    color: theme.colors.orange,
    borderBottomWidth: 1,
    borderColor: theme.colors.orange,
    marginBottom: scale(-15),
    // padding: 5,
  },
  sendOtpBtn: {
    alignSelf: 'flex-end',
    padding: scale(4),
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
