import { whatsAppController } from "../controller/whatsApp.controller.js";
import { Model } from "./model.model.js";

export class MessageModel extends Model{

    constructor(){

        super()
        
    }

    get content(){
        return this._data.content
    }

    set content(value){
        return this._data.content = value
    }

    
    get type(){
        return this._data.type
    }

    set type(value){
        return this._data.type = value
    }

    
    get timestamp(){
        return this._data.timestamp
    }

    set timestamp(value){
        return this._data.timestamp = value
    }

        
    get status(){
        return this._data.status
    }

    set status(value){
        return this._data.status = value
    }

    static getRef(chatId){

        const dbCollection = whatsAppController._firebase.db('chats')

        const doc = whatsAppController._firebase.doc(dbCollection, chatId)

        return whatsAppController._firebase.getCollection(doc, 'messages')

    }

    static addDoc(collectionRef, data){

        return whatsAppController._firebase.addDoc(collectionRef, data)

    }

}