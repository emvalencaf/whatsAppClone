import { whatsAppView } from "../view/whatsapp.view.js"

class WhatsAppController{

    constructor(view){

        console.log('WhatsAppController Ok')
        this.view = view
    }

}

export const whatsApController = new WhatsAppController(whatsAppView)