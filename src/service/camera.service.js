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

}

export const cameraService = new CameraService()