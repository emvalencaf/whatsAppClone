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
}