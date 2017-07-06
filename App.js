import React from 'react';
import { StyleSheet, Text, ScrollView, ActivityIndicator } from 'react-native';
import { Link } from './Link';
import { NewLink } from './NewLink';
import { LinksStorage } from './LinksStorage';

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isLoading: true
    }
    this.links = [];
    this.loadLinks();
  }

  loadLinks = () => {
    var linksStorage = new LinksStorage();
    // linksStorage.clearLinks((err, result) => {
    //   console.log(err);
    // });
    linksStorage.getLinks((links) => {
      this.links = links;
      this.setState({
        isLoading: false
      });
    });
  }

  setLoadingState = () => {
    console.log('true');
    this.setState({
      isLoading: true
    });
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
          <NewLink refresh={ this.refresh }></NewLink>
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
