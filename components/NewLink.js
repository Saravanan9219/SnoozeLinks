import React, { Component } from 'react';
import { TextInput, Text, TouchableOpacity, View, StyleSheet, Button } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import { LinksStorage } from '../LinksStorage';
import { LinkModel } from '../models/LinkModel';
import { Notification } from '../Notification';


export class NewLink extends Component {
  constructor(props){
    super(props);
    this.state = this.getComponentState({
        newlink: props.text
    });
  }

  getComponentState = (state) => {
      if(!this.state){
          oldState = {
              newlink: '',
              date: null,
              isDateTimePickerVisible: false
          };
      } else {
          oldState = this.state;
      }
      state = state || {};
      newState = {
        newlink: state.newlink !== undefined? state.newlink : oldState.newlink,
        date: state.date !== undefined? state.date : oldState.date,
        isDateTimePickerVisible: state.isDateTimePickerVisible !== undefined? state.isDateTimePickerVisible: oldState.isDateTimePickerVisible
      }
      return newState;
  }
  _showDateTimePicker = () => {
      this.setState(this.getComponentState({ isDateTimePickerVisible: true }));
      console.log(JSON.stringify(this.state));
  }

  _hideDateTimePicker = () => this.setState(this.getComponentState({ isDateTimePickerVisible: false }));

  _handleDatePicked = (date) => {
    this.setState(this.getComponentState({ date: date}));
    this._hideDateTimePicker();
  };


  componentWillReceiveProps = (nextProps) => {
      if(this.state.newlink !== nextProps.text){
          this.setState(this.getComponentState({
              'newlink': nextProps.text,
          }));
      }
  }

  onChangeText = (text) => {
    this.setState(this.getComponentState({
      'newlink': text,
    }));
    console.log(this.state.newlink);
  }

  onSubmit = () => {
    // linksStorage = new LinksStorage();
    // linksStorage.addLink(this.state.newlink, (err, result) => {
    //     this.props.refresh();
    // });
    console.log(JSON.stringify(this.state));
    link = new LinkModel(this.state.newlink, this.state.date);
    link.save((err, result) => {
        console.log("ddadd");
        this.props.refresh();
    });
  }

  notify = () => {
      Notification.notification();
  }

  render() {
    return (
      <View>
          <View style={ styles.container }>
            <TextInput onChangeText={ this.onChangeText } value={ this.state.newlink } style={ styles.inputText }/>
            <TouchableOpacity onPress={ this._showDateTimePicker }>
                <Icon name="calendar"  size={ 20 }/>
            </TouchableOpacity>
            <DateTimePicker
                mode="datetime"
                isVisible={ this.state.isDateTimePickerVisible }
                onConfirm={ this._handleDatePicked }
                onCancel={ this._hideDateTimePicker }>
            </DateTimePicker>
          </View>
          <Button title="Submit" color="#841584" onPress={ this.onSubmit }/>
          <Button title="Notify" color="#783433" onPress={ this.notify }/>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    flex: 1,
    flexDirection: "row",
    alignItems: "center"
  },
  inputText: {
    flexGrow: 3
  }
});
