import { ClassEvent } from "../utils/classEvent.utils.js"

class MicrophoneService extends ClassEvent{
    constructor(){
        super()
        this._mimetype = 'audio/webm'
        this._available = false
    }

    startMicrophone(){

        navigator.mediaDevices.getUserMedia({
            audio:true
        })
            .then(mediaStream => {
                console.log('microfone on')
                this._mediaStream = mediaStream

                this._available = true

                const audio = new Audio()

                audio.srcObject = this._mediaStream

                audio.onloadedmetadata = () =>{

                    this.trigger('ready', audio)
                }

            })
            .catch(err => {

                console.error(err)

            })

    }

    isAvailable(){

        return this._available 

    }

    stopMicrophone(){
        console.log('microfone off')
        
        this._mediaStream.getAudioTracks().forEach(track => {

            track.stop()

        })
    }

    startMicrophoneRecord(view){

        if(!this.isAvailable) return

        this._mediaRecorder = new MediaRecorder(this._mediaStream, {
            mimetype: this._mimetype
        })

        this._recorderChunks = []

        this._mediaRecorder.addEventListener('dataavailable', e => {

            if(e.data.size > 0) this._recorderChunks.push(e.data)

        })

        this._mediaRecorder.addEventListener('stop', e => {

            const blob = new Blob(this._recorderChunks,{

                type: this._mimetype
            })

            const filename = `rec${Date.now()}.webm`

            const file = new File([blob], filename, {type: this._mimetype, lastModified: Date.now()})

            console.log('file', file)
/*
            const reader = new FileReader()

            reader.onload = e => {

                console.log('reader file', file)

                let audio = new Audio(reader.result)

                audio.play()

            }

            reader.readAsDataURL(file)*/
        })

        this._mediaRecorder.start()
        this.startTimer(view)
        console.log(view)
    }

    stopMicrophoneRecord(){

        if(!this.isAvailable) return

        this._mediaRecorder.stop()
        this.stopMicrophone()

    }

    startTimer(view){
        let start = Date.now()
        console.log(view)
        this._recordMicrophoneInterval = setInterval(() => {

            this.trigger('recordTimer', (Date.now() - start), view)

        }, 100)

    }
}

export const microphoneService = new MicrophoneService()