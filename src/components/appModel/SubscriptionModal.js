import React, {useEffect} from 'react';
import {useState} from 'react';
import {
  StyleSheet,
  View,
  Modal,
  Image,
  TouchableOpacity,
  Text,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {images, scale, theme} from '../../utils';
import {SubscriptionPlan} from '../../utils/mockData';
import {Title, Label} from '../Label';
import moment from 'moment';
import {useSelector} from 'react-redux';
import {useStripe} from '@stripe/stripe-react-native';
import ApiService from '../../utils/ApiService';

function ShareBtn(props) {
  const {title, onPress, iconName, style} = props;

  return (
    <TouchableOpacity style={style} onPress={onPress}>
      <AntDesign name={iconName} size={20} color={theme.colors.white} />
      <Title
        title={title}
        style={{
          marginLeft: scale(5),
          fontSize: 20,
          color: theme.colors.white,
          fontWeight: '600',
        }}></Title>
    </TouchableOpacity>
  );
}

const SubscriptionModal = props => {
  const {isVisible, close} = props;

  const [selectedId, setSelectedId] = useState();
  const [changeColor, setchangeColor] = useState(false);
  const [monthPlan, setMonthPlan] = useState();
  const [yearPlan, setYearPlan] = useState();
  const [lifetimePlan, setLifetimePlan] = useState(false);
  const [item, setItem] = useState();
  const userDetails = useSelector(state => state.UserReducer.userDetails);

  const OneMonthPlan = () => {
    var TodayDate = moment().format('DD-MM-YYYY');
    var OneMonthDate = moment().add(1, 'M').format('DD-MM-YYYY');
    setMonthPlan(`${TodayDate}  ${OneMonthDate}`);
    setLifetimePlan(false);
    console.log('Month Plan >>', monthPlan);
  };

  const OneYearPlan = () => {
    var TodayDate = moment().format('DD-MM-YYYY');
    var OneMonthDate = moment().add(1, 'y').format('DD-MM-YYYY');
    setYearPlan(`${TodayDate}  ${OneMonthDate}`);
    setLifetimePlan(false);
    console.log('Year Plan >>', yearPlan);
  };

  const LifeTimePlan = () => {
    setLifetimePlan(true);
    console.log('LifeTime Plan >>', lifetimePlan);
  };

  // Stripe
  const {initPaymentSheet, presentPaymentSheet} = useStripe();
  const [clientSecret, setClientSecret] = useState();

  useEffect(() => {
    initializaPayment();
  }, []);

  const string = `${item?.price}`;
  const result = string.substring(4);
  console.log('Hello world', result);
  console.log('Selected Item', item);
  console.log(item?.price);

  const initializaPayment = async () => {
    const payload = {
      name: userDetails?.data?.name,
      amount: result,
    };
    const options = {payloads: payload};
    const response = await ApiService.post('makePayment', options);
    setClientSecret(response?.data);
    const {error} = await initPaymentSheet({
      merchantDisplayName: 'Taskey',
      paymentIntentClientSecret: response?.data,
    });
    console.log('response >>> ', response);
  };

  const openPaymentSheet = async () => {
    try {
      const {error} = await presentPaymentSheet({
        clientSecret: clientSecret,
      }).then(response => {
        console.log('response data >>> ', response);
      });
      if (error) {
        Alert.alert('PAYMENT FAILED', error.message);
      } else {
        Alert.alert('SUCCESS', 'PAYMENT DONE SUCCESSFULLY...');
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const StripeItem = {
    userName: userDetails?.data?.name,
    userId: userDetails?.data?._id,
    amount: item?.price,
    date: monthPlan,
  };

  // console.log('Selected Item', item);
  // console.log('User Name >> ', userDetails?.data?.name);
  // console.log('User Id >> ', userDetails?.data?._id);
  console.log('Login Info', userDetails?.data?.trialEndDate);

  const TodayDate = moment();
  const ExpireDate = moment(userDetails?.data?.trialEndDate);
  const Remaining_Days = ExpireDate.diff(TodayDate, 'days');

  console.log('Remaining Days', Remaining_Days);

  const handleLogout = () => {
    const rf_token = {
      refreshToken: refresh_Token,
    };
    const options = {payloads: rf_token};
    ApiService.post('logout', options).then(res => {
      console.log('User Successfullly Logout :', res);
    });
  };

  useEffect(() => {
    try {
      ApiService.get('validatePlanDetails').then(res => {
        console.log('Api call Successfullly :', res);
      });
    } catch (error) {
      console.log('catch error in plandetails', error);
    }
  }, []);

  return (
    <Modal animationType={'none'} visible={isVisible}>
      <TouchableOpacity style={styles.logoutView}>
        <Icon
          style={{color: theme.colors.white}}
          name={Remaining_Days < 0 ? 'logout' : 'close'}
          size={scale(24)}
          onPress={close}
        />
      </TouchableOpacity>
      <Image style={styles.taskeyimg} source={images.subscription} />
      <View style={{backgroundColor: theme.colors.backgroundColor, flex: 1}}>
        <View
          style={{
            alignItems: 'center',
            marginVertical: scale(20),
          }}>
          {Remaining_Days < 0 ? (
            <>
              <Title style={styles.titleTxt} title="Your trial has expired." />
              <Label
                style={styles.subtitleTxt}
                title="Choose your plan now and continue enjoying Taskey"
              />
            </>
          ) : (
            <>
              <Title
                style={styles.titleTxt}
                title={`You have  ${Remaining_Days} days letf of free trial`}
              />
              <Label
                style={styles.subtitleTxt}
                title="Choose your plan now and get a discount!"
              />
            </>
          )}
        </View>
        {SubscriptionPlan.map((item, key) => {
          const backgroundColor =
            item.id === selectedId ? theme.colors.orange : theme.colors.white;
          const offerColor =
            item.id === selectedId ? theme.colors.white : theme.colors.orange;
          const color =
            item.id === selectedId ? theme.colors.white : theme.colors.black;
          const txtColor =
            item.id === selectedId ? theme.colors.black : theme.colors.white;

          return (
            <TouchableOpacity
              onPress={() => {
                setSelectedId(item.id);
                setItem(item);
                setchangeColor(true);
                {
                  item.id === 1 ? OneMonthPlan() : null;
                  item.id === 2 ? OneYearPlan() : null;
                  item.id === 3 ? LifeTimePlan() : null;
                }
              }}
              style={[
                styles.planContainer,
                {
                  backgroundColor,
                },
              ]}>
              {Remaining_Days > 0 ? null : (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginBottom: scale(-15),
                  }}>
                  <View>
                    <View style={styles.offerTag}>
                      <View
                        style={[
                          styles.offerView,
                          {backgroundColor: offerColor},
                        ]}>
                        <Label
                          style={[styles.offerTxt, {color: txtColor}]}
                          title={item.offerTag}
                        />
                      </View>
                      <View
                        style={[
                          styles.triangle,
                          {borderBottomColor: offerColor},
                        ]}
                      />
                    </View>
                  </View>
                  <View>
                    {Remaining_Days < 0 ? (
                      <Label
                        title={item.offerPrice}
                        style={[
                          styles.offerPrice,
                          {color, textDecorationLine: 'line-through'},
                        ]}
                      />
                    ) : (
                      <Label
                        title={item.price}
                        style={[styles.offerPrice, {color}]}
                      />
                    )}
                  </View>
                </View>
              )}

              <View style={styles.txtContainer}>
                <Label
                  style={[
                    styles.planText,
                    {
                      color,
                    },
                  ]}
                  title={item.title}
                />
                {Remaining_Days < 0 ? (
                  <Label
                    style={[
                      styles.planText,
                      {
                        color,
                      },
                    ]}
                    title={item.price}
                  />
                ) : (
                  <Label
                    style={[
                      styles.planText,
                      {
                        color,
                      },
                    ]}
                    title={item.offerPrice}
                  />
                )}
              </View>
            </TouchableOpacity>
          );
        })}
        <ShareBtn
          onPress={openPaymentSheet}
          style={[
            styles.sharebtn,
            {
              backgroundColor:
                changeColor === true
                  ? theme.colors.orange
                  : theme.colors.lightOrange,
            },
          ]}
          title="Buy now"
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    paddingVertical: scale(20),
    backgroundColor: '#00000020',
    zIndex: 111,
  },
  activityIndicatorWrapper: {
    backgroundColor: theme.colors.white,
    width: theme.SCREENWIDTH * 0.85,
    borderRadius: scale(10),
    padding: scale(15),
    zIndex: 111,
  },
  planContainer: {
    marginVertical: scale(10),
    borderRadius: scale(5),
    marginHorizontal: scale(20),
    elevation: scale(3),
    paddingVertical: scale(5),
  },
  planText: {
    color: theme.colors.black,
    fontSize: scale(20),
    fontWeight: '600',
    paddingVertical: scale(10),
  },
  txtContainer: {
    flexDirection: 'row',
    marginVertical: scale(10),
    justifyContent: 'space-between',
    marginHorizontal: scale(15),
  },
  titleTxt: {
    fontSize: scale(20),
  },
  sharebtn: {
    width: theme.SCREENWIDTH * 0.5,
    borderRadius: scale(20),
    flexDirection: 'row',
    height: theme.SCREENHEIGHT * 0.06,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginVertical: scale(15),
    backgroundColor: 'red',
  },
  subtitleTxt: {
    fontSize: scale(13),
  },
  triangle: {
    width: 0,
    height: 0,
    borderRightWidth: scale(9),
    borderBottomWidth: scale(17.5),
    borderLeftWidth: scale(9),
    borderTopColor: 'transparent',
    borderRightColor: 'transparent',
    borderLeftColor: 'transparent',
    transform: [{rotate: '90deg'}],
    left: -4,
  },
  offerView: {
    height: theme.SCREENHEIGHT * 0.025,
    width: theme.SCREENWIDTH * 0.2,
    backgroundColor: theme.colors.orange,
    borderRadius: scale(5),
  },
  offerTxt: {
    fontWeight: '700',
    alignSelf: 'center',
  },
  offerTag: {
    flexDirection: 'row',
    position: 'absolute',
    left: scale(-9),
  },
  offerPrice: {
    fontSize: scale(17),
    fontWeight: '700',
    marginRight: scale(15),
  },
  logoutView: {
    position: 'absolute',
    zIndex: 111,
    right: 10,
    margin: scale(5),
  },
  taskeyimg: {height: theme.SCREENHEIGHT * 0.3, width: '100%'},
});

export default SubscriptionModal;
