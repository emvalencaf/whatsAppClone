import { ElementPrototype } from "../utils/elementPrototype.utils.js"
import { whatsAppView } from "../view/whatsapp.view.js"

class WhatsAppController{

    constructor(view){

        console.log('WhatsAppController Ok')
        ElementPrototype.elementsProtoType()
        this.view = view
        this.initEvents()
    }

    initEvents(){

        this.view.initEvents()

    }
}

export const whatsApController = new WhatsAppController(whatsAppView)