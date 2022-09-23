export class MicrophoneController{

    constructor(view, service){
        this.view = view
        this.service = service
    }

    startMicrophone(){

        this.service.startMicrophone()

    }

    stopMicrophone(){

        this.service.stopMicrophone()

    }
}