import React, { Component } from 'react';
import {
    AppRegistry,
    Text,
    StyleSheet,
    View,
    Linking
} from 'react-native';

export class Link extends Component {
    constructor() {
        super();
        this.openUrl = this._openUrl.bind(this);
    }

    _openUrl() {
        Linking.canOpenURL(this.props.url).then(supported => {
            if(supported){
                Linking.openURL(this.props.url);
            }
        });
    }

    render() {
        return (
            <View style={ styles.link }>
              <Text style={ styles.text } onPress={ this.openUrl }>{ this.props.url }</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    link: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'baseline',
        marginTop: 10,
        marginBottom: 10,
        backgroundColor: '#d3d3d3',
        padding: 4,
        maxHeight: 50
    },
    text: {
        fontSize: 16
    }
});

