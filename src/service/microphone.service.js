class MicrophoneService{

    startMicrophone(){

        navigator.mediaDevices.getUserMedia({
            audio:true
        })
            .then(mediaStream => {
                console.log('microfone on')
                this._mediaStream = mediaStream

                let audio = new Audio()

                audio.srcObject = this._mediaStream

                audio.onloadedmetadata = () =>{

                    audio.play()

                }

            })
            .catch(err => {

                console.error(err)

            })

    }

    stopMicrophone(){
        console.log('microfone off')
        
        this._mediaStream.getAudioTracks().forEach(track => {

            track.stop()

        })

    }
}

export const microphoneService = new MicrophoneService()