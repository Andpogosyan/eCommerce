import Page from "../templates/page";
import { createFeed, createModalOpenButton, createModalOpenButtonOrders } from "../utils/domElements";
import '../styles/binPage.css'
import Modal from "../components/Modal";
import { closeModal } from "../utils/modal";
import { onValue, ref } from "firebase/database";
import { db } from "../api/firebaseData";
import { Item, Category, Order } from '../api/itemsData'
import { historyIcon } from "../api/iconsUrl";

class BinPage extends Page {
    public visibleItems : string = 'all'
    public orders : Array<Order>
    public toLoadOrders : boolean = true
    static TextObject = {
        MainTitle: 'Your Bin'
    }

    constructor(id: string){
        super(id)
    }
    setOrders (orders: Array<Order>) {
        this.orders = orders
        this.container.innerHTML = ''
        this.toLoadOrders = false

        this.render()
    }
    createTotal (items: Array<{title: string, url: string, price: string, id: number, description: string, count: number}>) {
        let total = 0
    
        items.concat().forEach((el: {title: string, url: string, price: string, id: number, description: string, count: number}) => {
            return total = total + (+el.price * el.count)
        });

        const totalBlock = document.createElement('p')
        totalBlock.innerText = `Total: ${total}р`
        totalBlock.className = 'binPageTotal'
        
        return totalBlock
    }

    render() {
        console.log(this.container, 'blya eto ebuchi container')


       

        const logined = localStorage.logined
        const email = localStorage.email


        if(logined && JSON.parse(logined) && !this.orders && this.toLoadOrders){
            const ordersRef = ref(db)
            onValue(ordersRef, (snapshot) => {
                const { orders } = snapshot.val()
                
                const ordersData: Array<Order> = Object.values(orders)
                
                this.setOrders(ordersData.filter(el => el.user.email === JSON.parse(email)))
            })
        }
        
        if(this.orders && !this.toLoadOrders){
        console.log(this.container)
        this.container.innerHTML = ''

        const titleCheck = document.querySelector('.binHeader')
       
        const title = this.createHeaderTitle(BinPage.TextObject.MainTitle, 'binHeader') 

        
        titleCheck ? '' : this.container.append(title)
        
        title.append(createModalOpenButtonOrders(this.container, historyIcon, this.orders))
        
        
        const localStorageItemsData : any  = localStorage.items
        
        if(localStorageItemsData && JSON.parse(localStorageItemsData).length > 0){
            const oldTotal = document.querySelector('.binPageTotal')
            oldTotal?.remove()

            const totalBlock = this.createTotal(JSON.parse(localStorageItemsData))
            this.container.append(totalBlock)
            

            createFeed(this.container, this.visibleItems, JSON.parse(localStorageItemsData), 'bin')

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
                    
                let modalBlock = new Modal('sendOrder', [], JSON.parse(localStorageItemsData))
            
                // modalBackground.append(modalBlock.render())
            
                const body = document.body
            
                body.style.overflow = 'hidden'
                body.style.marginRight = '15px'
            
                this.container.append(modalBackground)
                this.container.append(modalBlock.render())
            })

            this.container.append(button)
        }  else {
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
        }
        return this.container
     }
}

export default BinPage