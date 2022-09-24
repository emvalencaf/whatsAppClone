import { FormatTimestamp } from "../utils/formatTimestamp.utils.js"

export class MicrophoneController{

    constructor(view, service){
        this.view = view
        this.service = service

        this.service.on('ready', audio => {

            console.log('ready event')

            this.service.startMicrophoneRecord()
        })

        this.service.on('recordTimer', (timer, el) => {

            el.innerHTML = FormatTimestamp.toTime((timer))

        })
    }

    startMicrophone(){
        const fnView = this.view.startRecordMicrophoneTime
        this.service.startMicrophone(this.view._el.recordMicrophoneTimer)

    }

    stopMicrophone(){
        
        this.service.stopMicrophoneRecord()
        this.view.closeRecordMicrophone()
        this.stopTimer()
    }

    stopTimer(){

        clearInterval(this.service._recordMicrophoneInterval)
        
    }
}