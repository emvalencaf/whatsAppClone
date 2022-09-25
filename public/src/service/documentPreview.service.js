const pdfjsLib = require('pdfjs-dist')
const path = require('path')

pdfjsLib.GlobalWorkerOptions.workerSrc = path.resolve(__dirname, '../../dist/js/pdf.worker.bundle.js')

class DocumentPreviewService{

    getPreviewData(file){

        return new Promise((resolve, reject) => {
            
            let reader = new FileReader()

            switch(file.type){
                case 'image/png':
                case 'image/jpeg':
                case 'image/jpg':
                case 'image/gif':
                    reader.onload = e => {

                        resolve({
                            src:reader.result,
                            info: file.name
                        })

                    }
                    reader.onerror = err => {

                        reject(err)

                    }
                    reader.readAsDataURL(file)
                    break
                case 'application/pdf':
                    reader.onload = e =>{

                        const loadingTask = pdfjsLib.getDocument(new Uint8Array(reader.result))

                        loadingTask.promise
                            .then(pdf => {

                                pdf.getPage(1)
                                    .then(page => {
                                        console.log(page)
                                        let viewport = page.getViewport({scale: 1})
                                        let canvas = document.createElement('canvas')
                                        let canvasContext = canvas.getContext('2d')
                                        console.log(viewport.height, viewport.width)
                                        canvas.width = viewport.width
                                        canvas.height = viewport.height

                                        page.render({
                                            canvasContext,
                                            viewport
                                        }).promise
                                            .then(() => {
                                                console.log((canvas.toDataURL('image/png')))
                                                resolve({
                                                    src: canvas.toDataURL('image/png'),
                                                    info: `${pdf.numPages} página${pdf.numPages > 1? 's':''}.`
                                                })

                                            })
                                            .catch(err => {

                                                reject(err)

                                            })
                                    })
                                    .catch(err => {
                                        reject(err)

                                    })

                            })
                            .catch(err => {

                                reject(err)

                            })

                    }

                    reader.readAsArrayBuffer(file)
                    break
                default:
                    reject()
                    break
            }

        })
    
    }

}


export const documentPreviewService = new DocumentPreviewService()