import React, { Component } from 'react';
import {
    AppRegistry,
    Text,
    StyleSheet,
    View,
    Linking
} from 'react-native';
import { LinkModel, LinkException } from '../models/LinkModel';

export class Link extends Component {
    constructor() {
        super();
        this.openUrl = this._openUrl.bind(this);
    }

    _openUrl() {
        Linking.canOpenURL(this.props.url.url).then(supported => {
            if(supported){
                Linking.openURL(this.props.url.url);
            }
        });
    }

    render() {
        console.log(this.props);
        return (
            <View style={ styles.link }>
              <Text style={ styles.text } onPress={ this.openUrl }>{ this.props.url.url }</Text>
              <Text style={ styles.text } onPress={ this.openUrl }>{ this.props.url.date }</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    link: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'baseline',
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
        marginBottom: 10,
        backgroundColor: '#ffffff',
        padding: 4,
        maxHeight: 50,
        shadowColor: '#444444',
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowRadius: 5,
        shadowOpacity:1.0
    },
    text: {
        fontSize: 16
    }
});

