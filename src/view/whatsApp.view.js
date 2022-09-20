import { Format } from "../utils/format.utils.js"

class WhatsAppView{


    el = {}
    
    constructor(){
        
        this.loadElements()
        
    }
    
    loadElements(){
        

        document.querySelectorAll('[id]').forEach(element => {

            this.el[Format.getCamelCase(element.id)] = element


        })


    }

    
    initEvents(){

        this.el.myPhoto.on('click', (e) =>{

            this.closeAllLeftPanel()
            this.el.panelEditProfile.show()

            setTimeout(()=>{

                this.el.panelEditProfile.addClass('open')

            }, 300)

        })

        this.el.btnClosePanelEditProfile.on('click', e => {

            this.el.panelEditProfile.removeClass('open')

        })

        this.el.btnNewContact.on('click', (e) => {

            this.closeAllLeftPanel()
            this.el.panelAddContact.show()
            
            setTimeout(()=>{

                this.el.panelAddContact.addClass('open')

            }, 300)

        })

        this.el.btnClosePanelAddContact.on('click', e=>{

            this.el.panelAddContact.removeClass('open')

        })

        this.el.photoContainerEditProfile.on('click', e => {

            this.el.inputProfilePhoto.click()
            
        })

        this.el.inputNamePanelEditProfile.on('keypress', e=>{

            if(e.key === 'Enter'){

                e.preventDefault()
                this.el.btnSavePanelEditProfile.click()

            }

        })

        this.el.btnSavePanelEditProfile.on('click', e =>{

            console.log(this.el.inputNamePanelEditProfile.innerHTML)

        })

        
        this.el.formPanelAddContact.on('submit', e =>{

            e.preventDefault()

            const formData = this.el.formPanelAddContact.getForm()


        })


        this.el.contactsMessagesList.querySelectorAll('.contact-item').forEach( item =>{

            item.on('click', e => {

                this.el.home.hide()
                this.el.main.css({
                    display:'flex'
                })


            })

        })

        
        this.el.btnAttach.on('click', e => {

            e.stopPropagation()
            this.el.menuAttach.addClass('open')
            document.addEventListener('click', this.closeMenuAttach.bind(this))

        })


        this.el.btnAttachPhoto.on('click', e => {

            this.el.inputPhoto.click()

        })

        this.el.inputPhoto.on('change', e => {

            console.log(this.el.inputPhoto.files)

            Array.from(this.el.inputPhoto.files).forEach(file =>[

                console.log(file)

            ])
        })
        
        this.el.btnAttachCamera.on('click', e => {

            this.closeAllMainPanel()
            this.el.panelCamera.addClass('open')
            this.el.panelCamera.css({
            
                'height':'calc(100% - 120px)'

            })
        })

        this.el.btnClosePanelCamera.on('click', e =>{

            this.closeAllMainPanel()
            this.el.panelMessagesContainer.show()

        })

        this.el.btnTakePicture.on('click', e =>{

            console.log('take picture')

        })
        
        this.el.btnAttachDocument.on('click', e => {

            this.closeAllMainPanel()
            this.el.panelDocumentPreview.addClass('open')
            this.el.panelDocumentPreview.css({
            
                'height':'100%'

            })

        })

        this.el.btnClosePanelDocumentPreview.on('click', e =>{

            this.closeAllMainPanel()
            this.el.panelMessagesContainer.show()

        })

        this.el.btnSendDocument.on('click', e => {

            console.log('send document')

        })

        this.el.btnAttachContact.on('click', e => {

            this.el.modalContacts.show()

        })

        this.el.btnCloseModalContacts.on('click', e => {

            this.el.modalContacts.hide()

        })
    }

    closeAllLeftPanel(){

        this.el.panelAddContact.hide()
        this.el.panelEditProfile.hide()

    }

    closeAllMainPanel(){

        this.el.panelMessagesContainer.hide()
        this.el.panelDocumentPreview.removeClass('open')
        this.el.panelCamera.removeClass('open')

    }

    closeMenuAttach(e){

        document.removeEventListener('click', this.closeMenuAttach)
        this.el.menuAttach.removeClass('open')

    }
}

export const whatsAppView = new WhatsAppView()