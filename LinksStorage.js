import { AsyncStorage } from 'react-native';

var links = [
    'https://google.co.in',
    'https://amazon.in',
    'https://github.com',
    'https://facebook.com',
    'https://reddit.com'
];


export class LinksStorage {
    getLinks = (callback) => {
        AsyncStorage.getItem('links', (err, result) => {
            if (err) {
                console.log('Error');
                return
            }
            if(result !== null){
                var links = JSON.parse(result);
                callback(links);
            } else {
                console.log('Links not stored');
                callback([]);
                // this.setLinks(links, (err, links) => {
                //     if(err){
                //         console.log('error');
                //         return;
                //     }
                //     callback(links);
                // })
            }
        });
    }

    setLinks = (links, callback) => {
        links = JSON.stringify(links);
        AsyncStorage.setItem('links', links, (err, result) => {
            if(err){
                callback(err, null);
                return;
            }
            callback(null, JSON.parse(links));
        });
    }

    clearLinks = (callback) => {
        AsyncStorage.removeItem('links', (err, result) => {
            callback(err, result);
        });
    }

    addLink = (link, callback) => {
        this.getLinks((links) => {
            links.push(link);
            this.setLinks(links, (err, result) => {
                callback(err, result);
            });
        });
    }
}
