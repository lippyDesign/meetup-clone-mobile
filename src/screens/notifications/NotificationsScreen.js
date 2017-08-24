import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Colors from '../../../constants/Colors';

class NotificationsScreen extends Component {
  static navigationOptions = {
    headerStyle: { backgroundColor: Colors.redColor },
    tabBarIcon: ({ tintColor }) => <MaterialIcons name="notifications" size={25} color={tintColor} />,
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Text>Notifications</Text>
      </View>
    );
  }
}

export default NotificationsScreen;
