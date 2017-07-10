import React from 'react';
import { StyleSheet, Text, ScrollView, ActivityIndicator, Linking } from 'react-native';
import { Link } from './Link';
import { NewLink } from './NewLink';
import { LinksStorage } from './LinksStorage';

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = this.getComponentState();
    this.links = [];
    this.loadLinks();
  }

  getComponentState = (state) => {
      if(!this.state){
          oldState = {
              isLoading: false,
              url: null
          };
      } else {
          oldState = this.state;
      }
      state = state || {};
      newState = {
        isLoading: state.isLoading !== undefined? state.isLoading : oldState.isLoading,
          url: state.url !== undefined? state.url : oldState.url
      }
      return newState;
  }

  componentDidMount = () => {
      Linking.getInitialURL().then((url) => {
          if(url){
              this.setState(this.getComponentState({
                  url: url
              }));
          }
      }).catch(err => console.log('error'));
  }

  loadLinks = () => {
    var linksStorage = new LinksStorage();
    // linksStorage.clearLinks((err, result) => {
    //   console.log(err);
    // });
    linksStorage.getLinks((links) => {
      this.links = links;
      this.setState(this.getComponentState({
        isLoading: false
      }));
    });
  }

  setLoadingState = () => {
    this.setState(this.getComponentState({
      isLoading: true
    }));
  }

  refresh = () => {
    this.setLoadingState();
    this.loadLinks();
  }

  render() {
    if(this.state.isLoading) {
      return (
        <ScrollView style={styles.container}>
          <ActivityIndicator />
        </ScrollView>
      )
    }

    else {
      return (
        <ScrollView style={styles.container}>
          {
            this.links.map(function(link, i){
              return <Link url={ link } key={ i }></Link>
            })
          }
          <NewLink refresh={ this.refresh } text={ this.state.url }></NewLink>
        </ScrollView>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#f4f4f4',
  },
});
