import { whatsAppController } from "../controller/whatsApp.controller.js"

export class Upload{

    static send(file, from){

        return new Promise((resolve, reject)=>{
            
            const path = from + "/" + Date.now() + "_" + file.name
            const ref = whatsAppController._firebase.hdRef(path)
            const uploadTask = whatsAppController._firebase.hdPut(ref, file)
            
            uploadTask.on('state_changed',
            
                e =>{
            
                    console.info('upload', e)
            
                },
                err =>{
                    reject(err)
                },
                ()=>{
                    whatsAppController._firebase.hdDownloadURL(uploadTask.snapshot.ref)
                        .then(url =>{
            
                            resolve(url)
            
                        })
                    })
                    
                    
        })
    }


}