import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {Button, Label, TextInput, Title} from '../../components';
import {CommonStyles} from './CommonStyles';
import {useNavigation} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {theme} from '../../utils';

const SignUp = () => {
  const navigation = useNavigation();
  return (
    <>
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
          <Text style={CommonStyles.secondTitle}>Sign Up</Text>
          <TextInput
            LabelIcon="user"
            Labeltitle="Your user Name"
            placeholder="Enter your username"
          />
          <TextInput
            LabelIcon="mail"
            Labeltitle="Your email"
            placeholder="Enter your email"
          />
          <TextInput
            LabelIcon="lock"
            Labeltitle="password"
            placeholder="Enter your password"
          />
          <Button style={CommonStyles.btn} title="SignUp" />
          <View style={CommonStyles.navTxtContainer}>
            <Label title="Already a user?" />
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={CommonStyles.navTxt}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  backIcon: {
    left: 10,
    top: 15,
  },
});
