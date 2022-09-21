import { cameraService } from "../service/camera.service.js"
import { ElementPrototype } from "../utils/elementPrototype.utils.js"
import { CameraView } from "../view/camera.view.js"
import { whatsAppView } from "../view/whatsapp.view.js"
import { CameraController } from "./camera.controller.js"

class WhatsAppController{

    constructor(view){

        console.log('WhatsAppController Ok')
        ElementPrototype.elementsProtoType()
        this.view = view
        console.log(this.view.el.videoCamera)
        const cameraView = new CameraView(this.view.el.videoCamera)
        
                
        this.controller = {
            _camera: new CameraController(cameraView, cameraService)
        }

        this.initEvents()
    }

    initEvents(){

        this.view.initEvents(this)

    }

    startCamera(){
        this.controller._camera.startCamera()
    }

    stopCamera(){
        this.controller._camera.stopCamera()
    }
}

export const whatsAppController = new WhatsAppController(whatsAppView)