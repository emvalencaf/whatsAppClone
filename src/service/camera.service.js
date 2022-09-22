class CameraService{

    stopCamera(){

        this._mediaStream.getTracks().forEach(track => {

            track.stop()

        })

    }

    startCamera(view){

        navigator.mediaDevices.getUserMedia({
            video:true
        })
            .then(mediaStream => {

                this._mediaStream = mediaStream

                view.srcObject = mediaStream

                view.onloadedmetadata = () =>{

                    view.play()

                }

            })
            .catch(err => {

                console.error(err)

            })

    }

    takePicture(mimeType = 'image/png', view){
        
        const canvas = document.createElement('canvas')
        
        canvas.setAttribute('height', view.videoHeight)
        canvas.setAttribute('width', view.videoWidth)
        let context = canvas.getContext('2d')
        
        context.drawImage(view, 0, 0, canvas.width, canvas.height)
        
        return canvas.toDataURL(mimeType)
    }

}

export const cameraService = new CameraService()