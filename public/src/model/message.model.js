import { whatsAppController } from "../controller/whatsApp.controller.js";
import { Model } from "./model.model.js";

export class MessageModel extends Model{

    constructor(){

        super()
        
    }

    get id(){
        return this._data.id
    }

    set id(value){
        return this._data.id = value
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

    get preview(){
        return this._data.preview
    }

    set preview(value){
        return this._data.preview = value
    }

    get info(){
        return this._data.info
    }

    set info(value){
        return this._data.info = value
    }

    get fileType(){
        return this._data.fileType
    }

    set fileType(value){
        return this._data.fileType = value
    }

    get filename(){
        return this._data.filename
    }

    set filename(value){
        return this._data.filename = value
    }

    get size(){
        return this._data.size
    }

    set size(value){
        return this._data.size = value
    }

    get from(){
        return this._data.from
    }

    set from(value){
        return this._data.from = value
    }

    static hdRef(path){
        return whatsAppController._firebase.hdRef(path)
    }
    
    static hdDownloadURL(ref){
        return whatsAppController._firebase.hdDownloadURL(ref)
    }

    static hdPut(ref, data, metadata){
        return whatsAppController._firebase.hdPut(ref, data, metadata)
    }

    static getRef(chatId){

        const dbCollection = whatsAppController._firebase.db('chats')

        const doc = whatsAppController._firebase.doc(dbCollection, chatId)

        return whatsAppController._firebase.getCollection(doc, 'messages')

    }
    static doc(collection, doc){
        return whatsAppController._firebase.doc(collection, doc)
    }
    static setDoc(ref, data, setoptions){
        return whatsAppController._firebase.setDoc(ref, data, setoptions)
    }

    static addDoc(collectionRef, data){

        return whatsAppController._firebase.addDoc(collectionRef, data)

    }

    static getQueryMsgs(chatId, order){

        const ref = MessageModel.getRef(chatId)
        const orderConstrain = whatsAppController._firebase.orderBy(order)
        const query = whatsAppController._firebase.query(ref, orderConstrain)

        return query
    }

    static onSnapshot(ref, fn = () => {}){
        return whatsAppController._firebase.onSnapshot(ref, fn)
    }
}