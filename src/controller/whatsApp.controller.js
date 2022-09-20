import { ElementPrototype } from "../utils/elementPrototype.utils.js"
import { whatsAppView } from "../view/whatsapp.view.js"

class WhatsAppController{

    constructor(view){

        console.log('WhatsAppController Ok')
        ElementPrototype.elementsProtoType()
        this.view = view
    }

}

export const whatsApController = new WhatsAppController(whatsAppView)