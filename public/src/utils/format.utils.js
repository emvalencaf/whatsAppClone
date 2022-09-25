export class Format{

//Para pegar as ids dos elementos
    static getCamelCase(string){

        let div = document.createElement('div')

        div.innerHTML = `<div data-${string}="id"></div>`

        return Object.keys(div.firstChild.dataset)[0]
    }

}
