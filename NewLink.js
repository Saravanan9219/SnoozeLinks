import React, { Component } from 'react';
import { TextInput, Text, View, StyleSheet, Button } from 'react-native';
import { LinksStorage } from './LinksStorage';
import { Notification } from './Notification';


export class NewLink extends Component {
  constructor(props){
    super(props);
    this.state = {
      'newlink': props.text || ''
    }
  }

  componentWillReceiveProps = (nextProps) => {
      if(this.state.newlink !== nextProps.text){
          this.setState({
              'newlink': nextProps.text
          });
      }
  }

  onChangeText = (text) => {
    this.setState({
      'newlink': text
    });
  }

  onSubmit = () => {
    linksStorage = new LinksStorage();
    linksStorage.addLink(this.state.newlink, (err, result) => {
        this.props.refresh();
    });
  }

  notify = () => {
      Notification.notification();
  }

  render() {
    return (
      <View style={ styles.container }>
        <TextInput onChangeText={ this.onChangeText } value={ this.state.newlink }/>
        <Button title="Submit" color="#841584" onPress={ this.onSubmit }/>
        <Button title="Notify" color="#783433" onPress={ this.notify }/>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    marginTop: 10
  },
});
