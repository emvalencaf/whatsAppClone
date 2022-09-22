class DocumentPreviewService{

    getPreviewData(file){

        return new Promise((resolve, reject) => {

            switch(file.type){
                case 'image/png':
                case 'image/jpeg':
                case 'image/jpg':
                case 'image/gif':
                    let reader = new FileReader()
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
                    break
                default:
                    reject()
                    break
            }

        })
    
    }

}


export const documentPreviewService = new DocumentPreviewService()