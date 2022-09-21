export class CameraController{

    constructor(view){

        this.view = view
/*        
        navigator.mediaDevices.getUserMedia({
            video:true
        })
            .then(mediaStream => {


                this.view._el.videoCamera.srcObject = mediaStream

                this.view._el.videoCamera.onloadedmetadata = () =>{

                    this.view._el.videoCamera.play()

                }

            })
            .catch(err => {

                console.error(err)

            })*/
    }

}