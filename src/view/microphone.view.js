import { FormatTimestamp } from "../utils/formatTimestamp.utils.js"

export class MicrophoneView{

    constructor(recordMicrophoneTimer, recordMicrophone, btnSendMicrophone){
        this._el = {

            recordMicrophoneTimer,
            recordMicrophone,
            btnSendMicrophone
        }
    }
/*
    startRecordMicrophoneTime(){

        const start = Date.now()

        this._recordMicrophoneInterval = setInterval(()=>{

            //this._el.recordMicrophoneTimer.innerHTML = FormatTimestamp.toTime((Date.now() - start))

        }, 100)

    }*/

    closeRecordMicrophone(){

        this._el.recordMicrophone.hide()
        this._el.btnSendMicrophone.show()

    }

}