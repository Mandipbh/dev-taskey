import {StyleSheet, View, SafeAreaView, TouchableOpacity} from 'react-native';
import React from 'react';
import {Button, Label, TextInput, Title} from '../../components';
import {CommonStyles} from './CommonStyles';
import {useNavigation} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {scale, theme} from '../../utils';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const SignUp = () => {
  const navigation = useNavigation();
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
          />
          <TextInput
            LabelIcon="mobile1"
            Labeltitle="Your Phone Number"
            placeholder="Enter Phone Number"
          />
          <TouchableOpacity style={{alignSelf: 'flex-end'}}>
            <Label style={styles.Sendcode} title="Send Code"></Label>
          </TouchableOpacity>
          <TextInput
            LabelIcon="message1"
            Labeltitle="OTP"
            placeholder="Enter OTP"
          />
          <Button
            style={CommonStyles.btn}
            title="SignUp"
            onPress={() => {
              navigation.navigate('Tabs');
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
    paddingTop: 5,
  },
});
