const firebaseApp = require('firebase/app')
const firebaseFirestore = require('firebase/firestore')
const firebaseStorage = require('firebase/storage')
const firebaseAuth = require('firebase/auth')

export class Firebase{

    constructor(){

        this._config = {

            apiKey: "AIzaSyDIJxH-aNGpWrxezjeo10pjVLMs2P4EoL4",
            authDomain: "whatsapp-clone-c6a5e.firebaseapp.com",
            projectId: "whatsapp-clone-c6a5e",
            storageBucket: "whatsapp-clone-c6a5e.appspot.com",
            messagingSenderId: "393079913664",
            appId: "1:393079913664:web:846258fba8966f5782c125",
            measurementId: "G-WHE4EFXDVZ"

        }

        this.initialiazed = false
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

        if(this.initialiazed) return

        this._app = firebaseApp.initializeApp(this._config)
        this._db = firebaseFirestore.getFirestore(this._app)
        this._storage = firebaseStorage.getStorage(this._app)
        

        this.initialiazed = true
    }

    static db(){
        return this._db
    }

    static storage(){
        return this._storage
    }
}