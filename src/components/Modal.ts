import Component from "../templates/components";
import ModalForm from './ModalForm'
import '../styles/modal.css'
import { closeIcon } from "../api/iconsUrl";
import { closeModal } from "../utils/modal";


class Modal extends Component {
    type: string = ''
    categories: Array<{name: string, id: number}> = []
    items: Array<{title: string, description: string, price: string, url: string, category: string, id: number, name: string, count: number}> = []

    constructor(type: string, categories?: Array<{name: string, id: number}>, items?: Array<{title: string, description: string, price: string, url: string, category: string, id: number, name: string, count: number}>){
        super('div', type === 'addItem' ? 'modalWindow' : type === 'sendOrder' ? 'modalWindowOrder' : 'modalWindowCategory')
        if(categories){
            this.categories = categories
        }
        this.type = type
        if(items){
            this.items = items
        }
    }
    
    createButton(){
        const closeBlock = document.createElement('div')
        closeBlock.className = 'modalHeader'

        const closeButton = document.createElement('img')
        closeButton.src = closeIcon
        closeButton.className = 'closeIcon'
        closeButton.addEventListener('click', () => {
            closeModal()
        })

        closeBlock.append(closeButton)

        return closeBlock
    }

    render(){
        const form = new ModalForm(this.type, this.categories, this.items)
        

        this.container.append(this.createButton())
        this.container.append(form.render())
       
        this.container.id = 'modalWindow'
        return this.container
    }
}


export default Modal