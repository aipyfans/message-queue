import uuid from 'uuid/v4';

/**
 * Message
 */
export default class Message {

    constructor(text){
        this.msg = text;
    }

    id = uuid();

    msg = undefined;

}