import { FormatTimestamp } from "../utils/formatTimestamp.utils.js"

export class MicrophoneController{

    constructor(view, service){
        this.view = view
        this.service = service

        this.service.on('ready', audio => {

            console.log('ready event')

            this.service.startMicrophoneRecord(this.view._el.recordMicrophoneTimer)
        })

        this.service.on('recordTimer', (timer, el) => {
            console.log(timer)
            el.innerHTML = FormatTimestamp.toTime((timer))

        })
    }

    startMicrophone(){
        
        this.service.startMicrophone()

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