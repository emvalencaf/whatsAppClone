export class CameraController{

    constructor(view, service){

        this.view = view
        this.service = service
        
    }

    startCamera(){

        this.service.startCamera(this.view._el.videoCamera)

    }

    stopCamera(){

        this.service.stopCamera()

    }

    takePicture(mimeType = 'image/png'){
        const dataURL = this.service.takePicture(mimeType, this.view._el.videoCamera)
        this.view.takePicture(dataURL)
    }

    reshootPicture(){
        this.view.reshootPicture()
    }
}