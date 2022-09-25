import { whatsAppController } from "../controller/whatsApp.controller.js";
import { Model } from "./model.model.js";



export class User extends Model{

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