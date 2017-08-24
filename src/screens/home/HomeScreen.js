import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';

import { LoadingScreen } from '../../commons';
import { MyMeetupsList } from './components';

import { fetchMyMeetups } from './actions';
import Colors from '../../../constants/Colors';
import styles from './styles/HomeScreen';

class HomeScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerStyle: { backgroundColor: Colors.redColor },
    headerRight: <TouchableOpacity style={styles.addIcon} onPress={() => navigation.navigate('CreateMeetup')}>
      <MaterialIcons name='add-circle' size={30} color={Colors.whiteColor} />
    </TouchableOpacity>,
    tabBarIcon: ({ tintColor }) => <FontAwesome name="home" size={25} color={tintColor} />,
    tabBarSize: 25,
  })

  async componentDidMount() {
    this.props.fetchMyMeetups();
  }

  render() {
    const { isFetched, data, error } = this.props.myMeetups;
    if (!isFetched) {
      return (
        <LoadingScreen />
      );
    } else if (error.on) {
      return (
        <View>
          <Text>{error.message}</Text>
        </View>  
      );
    }
    return (
      <View style={styles.root}>
        <View style={styles.topContainer}>
          <Text>Home Screen</Text>
        </View>
        <View style={styles.bottomContainer}>
          <MyMeetupsList meetups={data} />
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({ myMeetups: state.home.myMeetups });

export default connect(mapStateToProps, { fetchMyMeetups })(HomeScreen);
