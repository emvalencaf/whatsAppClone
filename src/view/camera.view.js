export class CameraView{

    constructor(videoEl, pictureCamera, btnReshootPanelCamera, containerTakePicture, containerSendPicture){
        
        this._el = {
            videoCamera: videoEl,
            pictureCamera,
            btnReshootPanelCamera,
            containerTakePicture,
            containerSendPicture
        }
    }

    takePicture(dataURL){

        this._el.pictureCamera.src = dataURL

        this._el.pictureCamera.show()
        this._el.videoCamera.hide()
        this._el.btnReshootPanelCamera.show()
        this._el.containerTakePicture.hide()
        this._el.containerSendPicture.show()

    }

    reshootPicture(){
        
        this._el.pictureCamera.hide()
        this._el.videoCamera.show()
        this._el.btnReshootPanelCamera.hide()
        this._el.containerTakePicture.show()
        this._el.containerSendPicture.hide()
    }
}