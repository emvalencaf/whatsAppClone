import { whatsAppController } from "../controller/whatsApp.controller.js";
import { Model } from "./model.model.js";



export class UserModel extends Model{

    constructor(id){
        super()

        if(id) {
            this.id = id
            this.getById(id)
        }
    }

    getById(id){

        return new Promise((resolve, reject) => {

            this.getDocRealTime(id, doc =>{

                this.fromJSON(doc.data())
                resolve(doc)
            })
/*
            this.getDoc(id)
                .then(doc =>{

                    this.fromJSON(doc.data())
                    
                    resolve(doc)

                })
                .catch(err =>{

                    reject(err)

                })*/
        })
    }

    get name(){
        return this._data.name
    }

    set name(value){
        this._data.name = value
    }

    get email(){
        return this._data.email
    }

    set email(value){
        this._data.email = value
    }

    get photo(){
        return this._data.photo
    }

    set photo(value){
        this._data.photo = value
    }

    get chatId(){
        return this._data.chatId
    }

    set chatId(value){
        return this._data.chatId = value
    }

    get lastMessageTime(){
        return this._data.lastMessageTime
    }

    set lastMessageTime(value){
        return this._data.lastMessageTime = value
    }

    get lastMessage(){
        return this._data.lastMessage
    }

    set lastMessage(value){
        return this._data.lastMessage = value
    }

    addContact(contact){

        const collectionContacts = this.getContactsRef(this.id)
        const newDoc = this.getDocRef(collectionContacts, btoa(contact.email))

        return this.saveDoc(newDoc, contact.toJSON())
        
    }

    getContacts(filter = ''){

        return new Promise((resolve, reject)=>{

            const collectionContacts = this.getContactsRef(this.id)
            const where = this.where('name','>=', filter)
            const query = this.query(collectionContacts, where)

            whatsAppController._firebase.onSnapshot(query, docs =>{

                const contacts = []

                docs.forEach(doc =>{

                    let data = doc.data()

                    data.id = doc.id

                    contacts.push(data)

                })

                this.trigger('contactschange', docs)

                resolve(contacts)

            })

        })
    }

    query(...arg){
        return whatsAppController._firebase.query(...arg)
    }

    where(fieldPath, opStr, value){
        return whatsAppController._firebase.where(fieldPath, opStr, value)
    }

    getContactsRef(id){

        return this.getCollectionRef(this.findByEmail(id), "contacts")

    }

    getCollectionRef(docRef, path){
        return whatsAppController._firebase.getCollection(docRef, path)
    }

    getDocRef(collectionRef, doc){
        return whatsAppController._firebase.doc(collectionRef, doc)
    }

    saveDoc(docRef, data){
        return whatsAppController._firebase.setDoc(docRef, data)
    }

    getRefDB(){
        return whatsAppController._firebase.db('users')
    }

    findByEmail(email){
        return whatsAppController._firebase.doc(this.getRefDB(), email)
    }

    getDoc(email){
        return whatsAppController._firebase.getDoc(this.findByEmail(email))
    }

    getDocRealTime(email, fn = ()=>{}){
        return whatsAppController._firebase.onSnapshot(this.findByEmail(email), fn)
    }

    setDoc(email, data, setOption){
        return whatsAppController._firebase.setDoc(this.findByEmail(email), data, setOption)
    }
}