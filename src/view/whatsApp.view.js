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

}

export const whatsAppView = new WhatsAppView()