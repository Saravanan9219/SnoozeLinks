import React, { Component } from 'react';
import { TextInput, Text, View, StyleSheet, Button } from 'react-native';
import { LinksStorage } from './LinksStorage';


export class NewLink extends Component {
  constructor(props){
    super(props);
    this.state = {
      'newlink': ''
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

  render() {
    return (
      <View style={ styles.container }>
        <TextInput onChangeText={ this.onChangeText } />
        <Button title="Submit" color="#841584" onPress={ this.onSubmit }/>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    marginTop: 10
  },
});
