import Page from "../templates/page";
import '../styles/404.css'


class ErrorPage extends Page {
    static TextObject = {
        MainTitle: '404 page'
    }

    constructor(id: string){
        super(id)
    }

    createBody(){
        const bodyBlock = document.createElement('div')
        bodyBlock.className = 'page404Block'

        const leftBlock = document.createElement('div')
        leftBlock.className = 'page404__leftBlock'

        const rightBlock = document.createElement('div')
        rightBlock.className = 'page404__rightBlock'
        
        const rightBlockTitle = document.createElement('p')
        rightBlockTitle.className = 'page404__rightBlockTitle'
        rightBlockTitle.innerText = '404'

        const rightBlockTitleSmall = document.createElement('p')
        rightBlockTitleSmall.className = 'page404__rightBlockTitle_small'
        rightBlockTitleSmall.innerText = "Sorry we can't found your page"

        const link = document.createElement('a')

        link.className = 'page404__rightBlockLink'
        link.href = '/'
        link.innerText = 'Go to the main page.'

        rightBlock.append(rightBlockTitle)
        rightBlock.append(rightBlockTitleSmall)
        rightBlock.append(link)

        bodyBlock.append(leftBlock)
        bodyBlock.append(rightBlock)

        this.container.append(bodyBlock)
    }


    render() {
       const title = this.createHeaderTitle(ErrorPage.TextObject.MainTitle, 'errorHeader') 
       this.container.append(title)

       this.createBody()

       return this.container
    }
}

export default ErrorPage