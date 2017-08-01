import { LinksStorage } from '../LinksStorage';
import { Notification } from '../Notification';

export class LinkException{
    LinkException(error_messages){
        this.error_message = error_messages;
    }
}

export class LinkModel {
    constructor (url, date){
        console.log(url, date);
        this.url = url;
        this.date = date;
    }

    validate_url = () => {
        return [];
    }

    validate_date = () => {
        return [];
    }

    _validate_fields = () => {
        errors = {};

        url_errors = this.validate_url();
        if(url_errors.length > 0){
            errors['url'] = url_errors;
        }

        date_errors = this.validate_date();
        if (date_errors.length > 0){
            errors['date'] = date_errors;
        }

        if (errors.length > 0){
            throw new LinkException(errors);
        }
    }

    _validate = () => {
        this._validate_fields();
    }

    _save = (callback) => {
        link = {
            'url': this.url,
            'date': this.date
        }
       linksStorage = new LinksStorage
       console.log(this.url, this.date);
       linksStorage.addLink(link, callback);
       Notification.notification(
           link.date.getFullYear(),
           link.date.getMonth(),
           link.date.getDate(),
           link.date.getHours(),
           link.date.getMinutes()
       );

    }

    save = (callback) => {
       this._validate();
       this._save(callback);
    }
}
