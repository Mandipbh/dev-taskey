import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import DraggableFlatList from 'react-native-draggable-dynamic-flatlist';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Label, Title} from '../../components';
import {moderatedScale, scale, theme} from '../../utils';

class HomeScreen extends Component {
  state = {
    data: [...Array(20)].map((d, index) => ({
      key: `item-${index}`,
      label: index,
      backgroundColor: `rgb(${Math.floor(Math.random() * 255)}, ${
        index * 5
      }, ${132})`,
    })),
  };

  renderItem = ({item, index, move, moveEnd, isActive}) => {
    return (
      <TouchableOpacity
        style={{
          height: 100,
          borderColor: isActive ? 'blue' : item.backgroundColor,
          // alignItems: 'center',
          justifyContent: 'center',
          borderWidth: scale(2),
          marginVertical: scale(2),
          borderRadius: scale(8),
        }}
        onLongPress={move}
        onPressOut={moveEnd}>
        <Text
          style={{
            fontWeight: 'bold',
            color: theme.colors.black,
            fontSize: scale(16),
            textAlign: 'center',
            marginTop: scale(5),
          }}>
          {`DEVELOPMENT FOLDER ->  ${item.label}`}
        </Text>
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <Icon name="timer-outline" size={scale(25)} />
            <View style={styles.row}>
              <Icon name="chevron-left" size={scale(35)} />
              <View>
                <Title title="CRONO TASKS" />
                <Label title="total = 200 min" />
              </View>

              <Icon name="chevron-right" size={scale(35)} />
            </View>
            <View style={[styles.row, {justifyContent: 'space-between'}]}>
              <Label title="Today " />
              <Icon name="calendar" size={scale(25)} />
            </View>
          </View>
          <DraggableFlatList
            data={this.state.data}
            renderItem={this.renderItem}
            keyExtractor={(item, index) => `draggable-item-${item.key}`}
            scrollPercent={5}
            onMoveEnd={({data}) => this.setState({data})}
          />
        </View>
      </SafeAreaView>
    );
  }
}

export default HomeScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
    paddingHorizontal: moderatedScale(15),
  },
  headerContainer: {
    height: scale(55),
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
