export class DocumentPreviewController{

    constructor(view, service){
        this.view = view
        this.service = service
    }

    getPreviewData(file){

        this.service.getPreviewData(file)
            .then(result => {

                console.log('ok', result)
                this.view.getPreviewData(result)

            })
            .catch(err => {

                this.view.renderPreviewIcon(file)
            })
    }
}
