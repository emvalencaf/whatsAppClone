export class MicrophoneView{

    constructor(recordMicrophoneTimer, recordMicrophone, btnSendMicrophone){
        this._el = {

            recordMicrophoneTimer,
            recordMicrophone,
            btnSendMicrophone
        }
    }

    closeRecordMicrophone(){

        this._el.recordMicrophone.hide()
        this._el.btnSendMicrophone.show()

    }

}