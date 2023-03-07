import React, {useEffect} from 'react';
import {useState} from 'react';
import {
  StyleSheet,
  View,
  Modal,
  Image,
  TouchableOpacity,
  Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {images, scale, theme} from '../../utils';
import {SubscriptionPlan} from '../../utils/mockData';
import {Title, Label} from '../Label';

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
  const [currentDate, setCurrentDate] = useState('');
  const [item, setItem] = useState();
  console.log('Selected Item', item);
  console.log('Today Date >>>', currentDate);

  useEffect(() => {
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    setCurrentDate(date + '/' + month + '/' + year);
  }, []);

  return (
    <Modal animationType={'none'} visible={isVisible}>
      <TouchableOpacity style={styles.logoutView}>
        <Icon
          style={{color: theme.colors.white}}
          name="logout"
          size={scale(24)}
          onPress={close}
        />
      </TouchableOpacity>
      <Image style={styles.taskeyimg} source={images.subscription} />
      <View style={{backgroundColor: theme.colors.backgroundColor, flex: 1}}>
        <View style={{alignItems: 'center', marginVertical: scale(20)}}>
          <Title style={styles.titleTxt} title="Your tril has expired." />
          <Label
            style={styles.subtitleTxt}
            title="Choose your plan now and continue enjoying Taskey"
          />
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
              }}
              style={[
                styles.planContainer,
                {
                  backgroundColor,
                },
              ]}>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <View>
                  <View style={styles.offerTag}>
                    <View
                      style={[styles.offerView, {backgroundColor: offerColor}]}>
                      <Label
                        style={[styles.offerTxt, {txtColor}]}
                        title={item.offerTag}
                      />
                    </View>
                    <View
                      style={[styles.triangle, {borderBottomColor: offerColor}]}
                    />
                  </View>
                </View>
                <View>
                  <Text style={[styles.offerPrice, {color}]}>
                    {item.offerPrice}
                  </Text>
                </View>
              </View>
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
                <Label
                  style={[
                    styles.planText,
                    {
                      color,
                    },
                  ]}
                  title={item.price}
                />
              </View>
            </TouchableOpacity>
          );
        })}
        <ShareBtn
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
    height: theme.SCREENHEIGHT * 0.11,
  },
  planText: {
    color: theme.colors.black,
    fontSize: scale(20),
    fontWeight: '600',
  },
  txtContainer: {
    flexDirection: 'row',
    marginVertical: scale(10),
    justifyContent: 'space-between',
    marginHorizontal: scale(15),
  },
  titleTxt: {
    fontSize: scale(22),
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
  subtitleTxt: {},
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
