export class DocumentPreviewView{

    constructor(imagePanelDocumentPreview, imgPanelDocumentPreview, filePanelDocumentPreview, infoPanelDocumentPreview, iconPanelDocumentPreview, filenamePanelDocumentPreview){
        this._el = {
            imagePanelDocumentPreview,
            imgPanelDocumentPreview,
            filePanelDocumentPreview,
            infoPanelDocumentPreview,
            iconPanelDocumentPreview,
            filenamePanelDocumentPreview
        }
    }

    getPreviewData(result){

        this._el.imgPanelDocumentPreview.src = result.src
        this._el.infoPanelDocumentPreview.innerHTML = result.info
        this._el.imagePanelDocumentPreview.show()
        this._el.filePanelDocumentPreview.hide()

    }

    renderPreviewIcon(file){
        switch(file.type){

            case 'application/vnd.ms-excel':
            case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
                this._el.iconPanelDocumentPreview.className = 'jcxhw icon-doc-xls'
                break
            case 'application/vnd.ms-powerpoint':
            case 'application/vnd.openxmlformats-officedocument.presentationml.presentat':
                this._el.iconPanelDocumentPreview.className = 'jcxhw icon-doc-ppt'
                break
            
            case 'application/msword':
            case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
                this._el.iconPanelDocumentPreview.className = 'jcxhw icon-doc-doc'
                break
            default:
                this._el.iconPanelDocumentPreview.className = 'jcxhw icon-doc-generic'
                break

        }

        this._el.filenamePanelDocumentPreview.innerHTML = file.name
        this._el.imagePanelDocumentPreview.hide()
        this._el.filePanelDocumentPreview.show()
    }
}