import Component from "../templates/components";
import '../styles/item.css'
import { addToCart, deleteItemIcon } from '../api/iconsUrl'
import { deleteItemFromOrder, setBinItems } from "../state/actions";
import { deleteItem } from "../api/firebaseData";


class ItemBlock extends Component {
    private item: {title : string , url: string, price: string, description: string, id: number, category: string, count?:number};
    private page: string;

    constructor(tagName: string, className: string, itemData: {title : string , url: string, price: string, description: string, id: number, category: string, count?:number}, page: string){
        super(tagName, className)
        this.item = itemData
        this.page = page  
    }

    private createImg(url : string, className: string) {
       
       let itemImg = document.createElement('img')
       itemImg.src = url
       itemImg.alt = className
       itemImg.className = className
       className === 'itemImage' && itemImg.addEventListener('click', () => {
        window.location.hash = '#item/' + this.item.id
    })
       return itemImg
    }

    private createDeleteButton(){
        let delButton = document.createElement('div')

        delButton.innerText = 'DELETE'

        delButton.className = 'item_delete_button'

        return delButton
    }
    

    private createTextBlock(){
        let itemTextBlock = document.createElement('div')

        let title = document.createElement('p')
        title.innerText = this.item.title
        title.className = this.page === 'main' ? 'itemTitle' : 'adminTitle'
        title.addEventListener('click', () => {
            window.location.hash = '#item/' + this.item.id
        })

        let priceBlock = document.createElement('div')
        priceBlock.className = this.page === 'main' ? 'itemPrice__name' : 'adminPrice__name'

        let price = document.createElement('p')
        price.innerText = `${this.item.price}p`
        price.className = this.page === 'main' ? 'itemPrice' : 'adminPrice'
        priceBlock.append(price)
        
        let button : HTMLElement = this.page === 'main' ? this.createImg(addToCart, 'buyLogo') : this.page === 'bin' ? this.createImg(deleteItemIcon, 'buyLogo') : this.createDeleteButton()

        

        button.addEventListener('click', () => {
            this.page === 'main' ? setBinItems(this.item) : 
            this.page === 'bin' ? deleteItemFromOrder(this.item.id) : 
            deleteItem(this.item.id)
        })

        priceBlock.append(button)
        itemTextBlock.append(title)
        itemTextBlock.append(priceBlock)

        if(this.page === 'bin'){
            const qty = document.createElement('div')

            qty.innerText = 'QTY: ' + this.item.count

            itemTextBlock.append(qty)
        }

        return itemTextBlock
    }


    renderPageItems() {
        this.container.className = this.page === 'main' ? 'pageItem' : this.page === 'admin' ? 'adminItem' : 'binItem'

        this.container.append(this.createImg(this.item.url, this.page === 'main' ?  'itemImage' : 'adminImage'))
        this.container.append(this.createTextBlock())
    }

    render(){
        this.renderPageItems()
        
        return this.container
    }
}

export default ItemBlock