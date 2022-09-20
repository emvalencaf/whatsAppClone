export class CameraController{

    constructor(view){

        this.view = view
    
        navigator.mediaDevices.getUserMedia({
            video:true
        })
            .then(stream => {

                this.view._el.videoCamera.src = URL.createObjectURL(stream)
                this.view._el.videoCamera.play()

            })
            .catch(err => {

                console.error(err)

            })
    }

}