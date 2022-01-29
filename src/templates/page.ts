abstract class Page {
    protected container: HTMLElement;
    static TextObject = {}

    constructor(id: string) {
        this.container = document.createElement('div');
        this.container.id = id
    }

    protected createHeaderTitle(text: string, className: string) {

        
        const header = document.createElement('div')
        header.className = className

        const title = document.createElement('p')

        title.innerText = text;
        title.className = 'headerTitle'
        
        header.append(title)
        
        return header;
    }

    render(){
        return this.container
    }
}

export default Page