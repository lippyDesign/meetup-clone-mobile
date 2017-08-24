import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { FormLabel, FormInput, Button } from 'react-native-elements';
import { reduxForm, Field } from 'redux-form';
import { MaterialIcons } from '@expo/vector-icons';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';

import { MeetupApi } from '../../../constants/api';
import Colors from '../../../constants/Colors';
import styles from './styles/CreateMeetupScreen';

const meetupApi = new MeetupApi();

class CreateMeetupScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerStyle: { backgroundColor: Colors.redColor },
    headerTitleStyle: { color: Colors.whiteColor },
    title: 'Create Meetup',
    headerLeft: <TouchableOpacity style={styles.iconClose} onPress={() => navigation.goBack()}>
      <MaterialIcons name='close' size={30} color={Colors.whiteColor} />
    </TouchableOpacity>,
  })

  state = { isDateTimePickerVisible: false, date: moment(), title: '', description: '' }

  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true })

  _handleDatePicked = date => {
    this.setState({ date });
    this._handleDateTimePicker();
  }

  _handleDateTimePicker = () => this.setState({ isDateTimePickerVisible: false })

  _checkTitle() {
    const { date } = this.state;
    if (date > moment()) {
      return moment(date).format('MMMM Do YYYY, h:mm:ss a');
    }
    return 'Pick a meetup date';
  }

  _changeTitle = title => this.setState({ title })

  _changeDescription = description => this.setState({ description })

  _checkIfButtonSubmitDisabled() {
    const { title, description, date } = this.state;
    // if title, description and date pass validation return false, meaning not disabled
    if (title.length >= 5 && description.length >= 10 && date > moment()) return false;
    // else return true, meaning button is disabled
    return true;
  }

  _createMeetup = async () => {
    const { title, description, date } = this.state;
    const res = await meetupApi.createGroupMeetup({ title, description, date });
    console.log(res);
  }

  render() {
    return (
      <View style={styles.root}>
        <View style={styles.container}>
          <View style={styles.item}>
            <FormLabel fontFamily="montserrat">Title</FormLabel>
            <FormInput
              value={this.state.title}
              onChangeText={this._changeTitle}
              selectionColor={Colors.redColor}
            />
          </View>
          <View style={styles.item}>
            <FormLabel fontFamily="montserrat">Description</FormLabel>
            <FormInput
              value={this.state.description}
              onChangeText={this._changeDescription}
              selectionColor={Colors.redColor}
              multiline
            />
          </View>
          <View style={styles.item}>
            <Button
              onPress={this._showDateTimePicker}
              title={this._checkTitle()}
              raised
              fontFamily="montserrat"
            />
          </View>
          <View style={styles.buttonCreate}>
            <Button
              backgroundColor={Colors.blackBlueColor}
              title='Create meetup'
              raised
              fontFamily="montserrat"
              disabled={this._checkIfButtonSubmitDisabled()}
              onPress={this._createMeetup}
            />
          </View>
        </View>
        <DateTimePicker
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={this._handleDatePicked}
          onCancel={this._handleDateTimePicker}
          mode='datetime'
        />
      </View>
    );
  }
}

export default reduxForm({ form: 'createMeetup' })(CreateMeetupScreen);
