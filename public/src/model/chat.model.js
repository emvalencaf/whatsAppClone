import { Model } from "./model.model.js";
import { whatsAppController } from "../controller/whatsApp.controller.js";

export class ChatModel extends Model{

    constructor(){
        super()
    }

    get users(){
        return this._data.users
    }

    set users(value){
        this._data.users = value
    }

    get timestamp(){
        return this._data.timestamp
    }

    set timestamp(value){
        return this._data.timestamp = value
    }

    static getRef(){
        return whatsAppController._firebase.db('/chats')
    }

    static find(meEmail, contactEmail){

        const query = whatsAppController._firebase.query(
            ChatModel.getRef(),
            whatsAppController._firebase.where(btoa(meEmail), "==", true),
            whatsAppController._firebase.where(btoa(contactEmail), "==", true)
            )
        
        console.log(query)

        return whatsAppController._firebase.getDocs(query)
    }

    static create(meEmail, contactEmail){

        console.log('no create')
        return new Promise((resolve, reject) => {

            let users = {}

            users[btoa(meEmail)] = true
            users[btoa(contactEmail)] = true

            console.log(users)

            whatsAppController._firebase.addDoc(ChatModel.getRef(),{
                users,
                timestamp: new Date()
            })
                .then(doc => {

                    const collectionRef = ChatModel.getRef()
                    const docRef = whatsAppController._firebase.doc(collectionRef, doc.id)

                    whatsAppController._firebase.getDoc(docRef)

                        .then(chat =>{

                            resolve(chat)

                        })

                        .catch(err =>{

                            reject(err)

                        })

                })
                .catch(err => {

                    reject(err)
                    
                })

        })

    }

    static createIfNotExists(meEmail, contactEmail){

        return new Promise((resolve, reject) => {

            console.log('antes do find')

            ChatModel.find(meEmail, contactEmail)
                .then(chats => {
                    
                    console.log(chats)

                    if(!chats.empety) chats.forEach(chat => {

                        resolve(chat)

                    })
                    
                    console.log('chats estão vázias')

                    ChatModel.create(meEmail, contactEmail)
                        .then(chat => {

                            console.log(chat)

                            resolve(chat)

                        })
                        .catch(err =>{

                            console.error(err)

                            reject(err)

                        })


                })

                .catch(err => {

                    console.error(err)

                    reject(err)

                })
        })

    }

}