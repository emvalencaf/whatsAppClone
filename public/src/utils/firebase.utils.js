import { config } from '../config.js'

const firebaseApp = require('firebase/app')
const firebaseFirestore = require('firebase/firestore')
const firebaseStorage = require('firebase/storage')
const firebaseAuth = require('firebase/auth')

export class Firebase{

    constructor(){

        this._config = config

        this.init()
    }

    initAuth(){

        return new Promise((resolve, reject) => {

            this._auth = firebaseAuth.getAuth()

            const provider = new firebaseAuth.GoogleAuthProvider()

            firebaseAuth.signInWithPopup(this._auth, provider)
            .then( result => {
                
                const credential = firebaseAuth.GoogleAuthProvider.credentialFromResult(result)
                const token = credential.accessToken
                const user = result.user
                
                resolve({
                    user,
                    token
                })
                
            })
            .catch( err => {
                
                console.error(err)
                
            })
        })
    }
    
    
    init(){
        
        if(window._initialiazedFirebase) return
        
        this._app = firebaseApp.initializeApp(this._config)
        this._db = firebaseFirestore.getFirestore()
        firebaseFirestore.serverTimestamp()
        this._storage = firebaseStorage.getStorage(this._app)
        
        window._initialiazedFirebase = true
    }
    
    addDoc(collectionRef, data){

        return firebaseFirestore.addDoc(collectionRef, data)
    }

    hdRef(path){
        return firebaseStorage.ref(this._storage, path)
    }

    hdDownloadURL(ref){
        return firebaseStorage.getDownloadURL(ref)
    }

    hdPut(ref, data, metadata){
        return firebaseStorage.uploadBytesResumable(ref, data, metadata)
    }

    db(collection){
        return firebaseFirestore.collection(this._db, collection)
    }

    where(fieldPath, opStr, value){
        return firebaseFirestore.where(fieldPath, opStr, value)
    }

    orderBy(str){
        return firebaseFirestore.orderBy(str)
    }

    query(...arg){

        return firebaseFirestore.query(...arg)
    }

    getCollection(docRef, path){
        return firebaseFirestore.collection(docRef, path)
    }

    doc(collectionRef, document){
        return firebaseFirestore.doc(collectionRef, document)
    }
    
    getDoc(docRef){
        return firebaseFirestore.getDoc(docRef)
    }

    getDocs(query){
        return firebaseFirestore.getDocs(query)
    }


    setDoc(documentRef, data, setoptions){
        return firebaseFirestore.setDoc(documentRef, data, setoptions)
    }

    onSnapshot(docRef, fn = ()=>{}){
        return firebaseFirestore.onSnapshot(docRef, fn)
    }

    storage(){
        return this._storage
    }

}