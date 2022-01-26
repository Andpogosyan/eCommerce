import Page from "../templates/page";
import { createFeed } from "../utils/domElements";
import '../styles/binPage.css'
import Modal from "../components/Modal";
import { closeModal } from "../utils/modal";



class BinPage extends Page {
    private visibleItems : string = 'all'
    static TextObject = {
        MainTitle: 'Your Bin'
    }

    constructor(id: string){
        super(id)
    }

    createTotal (items: Array<{title: string, url: string, price: string, id: number, description: string, count: number}>) {
        let total = 0

        items.concat().forEach((el: {title: string, url: string, price: string, id: number, description: string, count: number}) => {
            return total = total + (+el.price * el.count)
        });
        
        const totalBlock = document.createElement('p')
        totalBlock.innerText = `Total: ${total}р`
        totalBlock.className = 'binPageTotal'
        
        this.container.append(totalBlock)

    }
    render() {
        const title = this.createHeaderTitle(BinPage.TextObject.MainTitle, 'binHeader') 
        this.container.append(title)

        const localStorageItems = JSON.parse(localStorage.items)

        if(localStorageItems.length > 0){
            this.createTotal(localStorageItems)

            createFeed(this.container, this.visibleItems, localStorageItems, 'bin')

            const button = document.createElement('div')
            button.className = 'buyButton'
            button.innerText = 'Buy'
            button.addEventListener('click', () => {

                let modalBackground = document.createElement('div')
                modalBackground.className = 'modalBackground'
                modalBackground.id = 'modalBackground'
                    
                modalBackground.addEventListener('click', () => {
                    closeModal()
                })
                    
                let modalBlock = new Modal('sendOrder', [], localStorageItems)
            
                // modalBackground.append(modalBlock.render())
            
                const body = document.body
            
                body.style.overflow = 'hidden'
                body.style.marginRight = '15px'
            
                this.container.append(modalBackground)
                this.container.append(modalBlock.render())
            })

            this.container.append(button)
        } else {
            const defaultBlock = document.createElement('div')
            defaultBlock.className = 'binDeafultBlock'

            const title = document.createElement('p')
            title.innerText = 'Bin is empty.'
            
            const link = document.createElement('a')
            link.innerText = 'Go to the main page.'
            link.href = `/`

            defaultBlock.append(title)
            defaultBlock.append(link)

            this.container.append(defaultBlock)
        }

        return this.container
     }
}

export default BinPage