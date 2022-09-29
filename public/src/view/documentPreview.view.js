export class DocumentPreviewView{

    constructor(imagePanelDocumentPreview, imgPanelDocumentPreview, filePanelDocumentPreview, infoPanelDocumentPreview, iconPanelDocumentPreview, filenamePanelDocumentPreview,panelDocumentPreview){
        this._el = {
            imagePanelDocumentPreview,
            imgPanelDocumentPreview,
            filePanelDocumentPreview,
            infoPanelDocumentPreview,
            iconPanelDocumentPreview,
            filenamePanelDocumentPreview,
            panelDocumentPreview
        }
    }

    getPreviewData(result){
        console.log('usado o getPreviewData')
        this._el.imgPanelDocumentPreview.src = result.src
        this._el.infoPanelDocumentPreview.innerHTML = result.info
        this._el.imagePanelDocumentPreview.show()
        this._el.filePanelDocumentPreview.hide()
        this._el.panelDocumentPreview.css({
            'height': '100%'
        })
    }

    renderPreviewIcon(file){
        console.log('usado o renderPreviewIcon')
        this._el.panelDocumentPreview.css({
            'height': '100%'
        })

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