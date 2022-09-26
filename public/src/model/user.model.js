import { collection } from "firebase/firestore";
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

    addContact(contact){

        const collectionContacts = this.getContactsRef(this.id)
        const newDoc = this.getDocRef(collectionContacts, Buffer.from(contact.email).toString('base64'))

        return this.saveDoc(newDoc, contact.toJSON())
        
    }

    getContacts(){

        return new Promise((resolve, reject)=>{

            const collectionContacts = this.getContactsRef(this.id)

            whatsAppController._firebase.onSnapshot(collectionContacts, docs =>{

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

    setDoc(email, data){
        return whatsAppController._firebase.setDoc(this.findByEmail(email), data)
    }
}