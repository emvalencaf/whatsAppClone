import { cameraService } from "../service/camera.service.js"
import { documentPreviewService } from "../service/documentPreview.service.js"
import { ElementPrototype } from "../utils/elementPrototype.utils.js"
import { CameraView } from "../view/camera.view.js"
import { DocumentPreviewView } from "../view/documentPreview.view.js"
import { whatsAppView } from "../view/whatsapp.view.js"
import { CameraController } from "./camera.controller.js"
import { DocumentPreviewController } from "./documentPreview.controller.js"

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
            this.view.el.filenamePanelDocumentPreview
        )
                
        this.controller = {
            _camera: new CameraController(cameraView, cameraService),
            _documentPreview: new DocumentPreviewController(documentPreviewView, documentPreviewService)
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

    takePicture(mimeType = 'image/png'){
        this.controller._camera.takePicture(mimeType)
    }

    reshootPicture(){
        this.controller._camera.reshootPicture()
    }

    getPreviewData(file){

        this.controller._documentPreview.getPreviewData(file)
    }
}

export const whatsAppController = new WhatsAppController(whatsAppView)