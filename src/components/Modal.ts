import Component from "../templates/components";
import ModalForm from './ModalForm'
import '../styles/modal.css'
import { closeIcon } from "../api/iconsUrl";
import { closeModal } from "../utils/modal";
import { Item, Category, Order } from '../api/itemsData'
import { createOrdersBlock } from "../utils/domElements";


class Modal extends Component {
    type: string = ''
    categories: Array<Category> = []
    items: Array<Item> = []
    orders: Array<Order> = []

    constructor(type: string, categories?: Array<Category>, items?: Array<Item>, orders?: Array<Order>){
        super('div', type === 'addItem' ? 'modalWindow' : type === 'sendOrder' ? 'modalWindowOrder' : type === 'showOrders' ? 'modalWindowOrders' : 'modalWindowCategory')
        if(categories){
            this.categories = categories
        }
        this.type = type
        if(items){
            this.items = items
        }
        if(orders){
            this.orders = orders
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
        
        const orders = createOrdersBlock(this.orders)

        this.container.append(this.createButton())
        this.orders.length > 0 ? this.container.append(orders) : this.container.append(form.render())
       
        this.container.id = 'modalWindow'
        return this.container
    }
}


export default Modal