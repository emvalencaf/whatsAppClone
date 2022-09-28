import { ChatModel } from "../model/chat.model.js"
import { UserModel } from "../model/user.model.js"
import { cameraService } from "../service/camera.service.js"
import { documentPreviewService } from "../service/documentPreview.service.js"
import { MessageService } from "../service/message.service.js"
import { microphoneService } from "../service/microphone.service.js"
import { ElementPrototype } from "../utils/elementPrototype.utils.js"
import { Firebase } from "../utils/firebase.utils.js"
import { CameraView } from "../view/camera.view.js"
import { DocumentPreviewView } from "../view/documentPreview.view.js"
import { MicrophoneView } from "../view/microphone.view.js"
import { whatsAppView } from "../view/whatsapp.view.js"
import { CameraController } from "./camera.controller.js"
import { DocumentPreviewController } from "./documentPreview.controller.js"
import { MicrophoneController } from "./microphone.controller.js"

class WhatsAppController{

    constructor(view){

        console.log('WhatsAppController Ok')
        ElementPrototype.elementsProtoType()
        this.view = view

        const cameraView = new CameraView(
            this.view.el.videoCamera,
            this.view.el.pictureCamera,
            this.view.el.btnReshootPanelCamera,
            this.view.el.containerTakePicture,
            this.view.el.containerSendPicture
        )

        const documentPreviewView = new DocumentPreviewView(
            this.view.el.imagePanelDocumentPreview,
            this.view.el.imgPanelDocumentPreview,
            this.view.el.filePanelDocumentPreview,
            this.view.el.infoPanelDocumentPreview,
            this.view.el.iconPanelDocumentPreview,
            this.view.el.filenamePanelDocumentPreview,
            this.view.el.panelDocumentPreview
        )
        
        const microphoneView = new MicrophoneView(
            this.view.el.recordMicrophoneTimer,
            this.view.el.recordMicrophone,
            this.view.el.btnSendMicrophone
        )
                
        this.controller = {
            _camera: new CameraController(cameraView, cameraService),
            _documentPreview: new DocumentPreviewController(documentPreviewView, documentPreviewService),
            _microphone: new MicrophoneController(microphoneView, microphoneService)
        }

        this.view.el.appContent.hide()
        this._firebase = new Firebase()
        this._firebase.init()
        this.initEvents()
        this.initAuth()
    }

    initAuth(){

        this._firebase.initAuth()
            .then(response => {

                this._user = new UserModel(response.user.email)

                this._user.on('datachange', data =>{

                    document.querySelector('title').innerHTML = data.name + " - WhatsApp Clone"

                    this.view.el.inputNamePanelEditProfile.innerHTML = data.name

                    if(data.photo){

                        const photo = this.view.el.imgPanelEditProfile

                        photo.src = data.photo
                        photo.show()

                        this.view.el.imgDefaultPanelEditProfile.hide()

                        const photo2 = this.view.el.myPhoto.querySelector('img')

                        photo2.src = data.photo
                        photo2.show()

                    }

                    this.initContacts()
                })

                this._user.name = response.user.displayName
                this._user.email = response.user.email
                this._user.photo = response.user.photoURL

                this._user.setDoc(response.user.email, {
                    name: this._user.name,
                    email: this._user.email,
                    photo: this._user.photo
                })
                    .then(()=>{

                        this.view.el.appContent.css({
                            display:'flex'
                        })

                    })
                    .catch(err => {

                        console.error(err)

                    })


            })
            .catch(err => {
                console.error(err)
            })
    }

    initContacts(){
        
        this._user.on('contactschange', docs => {

            this.view.el.contactsMessagesList.innerHTML = ''

            docs.forEach(doc =>{

                const contact = doc.data()

                this.view.renderContactList(contact, this.setActiveContact.bind(this))

            })

        })

        this._user.getContacts()
    }

    sendMsg(msg){

        MessageService.send(
            this._contactActive.chatId,
            this._user.email,
            'text',
            msg)

    }

    setActiveContact(contact){

        if(this._contactActive) MessageService.readMsg(this._contactActive.chatId, () =>{})

        this._contactActive = contact

        this.view.el.activeName.innerHTML = contact.name
        this.view.el.activeStatus.innerHTML = contact.status
        this.view.checkPhoto(contact.photo, this.view.el.activePhoto)

        this.view.el.home.hide()
        this.view.el.main.css({
            display:"flex"
        })

        this.view.el.panelMessagesContainer.innerHTML = ''

        MessageService.readMsg(this._contactActive.chatId, docs =>{ 

            let scrollTop = this.view.el.panelMessagesContainer.scrollTop
            let scrollTopMax = this.view.el.panelMessagesContainer.scrollHeight - this.view.el.panelMessagesContainer.offsetHeight

            let autoScroll = scrollTop >= scrollTopMax

            docs.forEach(doc => {

                let data = doc.data()
                data.id = doc.id
                
                if(!this.view.el.panelMessagesContainer.querySelector('#_' + data.id)){


                    let message = new MessageService()
                    
                    message.fromJSON(data)
                    
                    let me = (data.from === this._user.email)
                    
                    const view = message.getViewElement(me)
                
                    this.view.el.panelMessagesContainer.appendChild(view)

                    
                }
                
                
            })

            if(autoScroll){
                this.view.el.panelMessagesContainer.scrollTop = (this.view.el.panelMessagesContainer.scrollHeight - this.view.el.panelMessagesContainer.offsetHeight)
            }else{
                this.view.el.panelMessagesContainer.scrollTop = scrollTop
            } 

        })

    }

    addContact(dataForm){

        const contact = new UserModel(dataForm.get('email'))

        console.log(contact)

        contact.on('datachange', data => {

            if(!data.name) return console.error('Usuário não foi encontrado')

            ChatModel.createIfNotExists(this._user.email, contact.email)
                .then(chat => {

                    contact.chatId = chat.id
                    
                    this._user.chatId = chat.id

                    contact.addContact(this._user)

                    this._user.addContact(contact)
                        .then(() => {
        
                            console.info('contato foi adicionado!')
                            this.view.el.btnClosePanelAddContact.click()
                        })
                        .catch(err => {

                            console.error(err)

                        })
                    

                })
                .catch(err => {
                    console.error(err)
                })

        })
    }

    changeUserName(el){

        el.disabled = true

        this._user.name = el.innerHTML
        
        this._user.setDoc(this._user.id, {
            name: this._user.name,
            email: this._user.email,
            photo: this._user.photo
        })
            .then(()=>{

                el.disabled = false

            })
            .catch(err =>{
                console.error(err)
            })


    }

    initEvents(){
        console.log(this.view.el.inputSearchContacts)
        this.view.initEvents(this)

        this.view.el.inputSearchContacts.on('keyup', e => {
            
            this.view.el.inputSearchContacts.value.length > 0? this.view.el.inputSearchContactsPlaceholder.hide(): this.view.el.inputSearchContactsPlaceholder.show()

            this._user.getContacts(this.view.el.inputSearchContacts.value)
        })
    
    }

    startCamera(){
        this.controller._camera.startCamera()
    }

    stopCamera(){
        this.controller._camera.stopCamera()
    }

    takePicture(mimeType = 'image/png'){
        this.controller._camera.takePicture(mimeType)
    }

    reshootPicture(){
        this.controller._camera.reshootPicture()
    }

    getPreviewData(file){

        this.controller._documentPreview.getPreviewData(file)
    }

    startMicrophone(){

        this.controller._microphone.startMicrophone()
    }

    stopMicrophone(){

        this.controller._microphone.stopMicrophone()
    }
}

export const whatsAppController = new WhatsAppController(whatsAppView)