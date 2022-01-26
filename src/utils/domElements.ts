import { addCategoryIcon, plusIcon } from "../api/iconsUrl"
import ItemBlock from "../components/Item"
import Modal from "../components/Modal"
import { setBinItems } from "../state/actions"
import { closeModal } from "./modal"



export const createSelect = (func: (e: any) => void, categories: Array<{id: number, name: string}>, selectedCategory: string) => {
    
const select = document.createElement('select')
    select.className = 'sortingSelect'
    const categoriesCorrect = [...categories, {id: 0, name: 'all'}]
    categoriesCorrect.forEach(el => {
        const option = document.createElement('option')
                option.value = el.name
                option.innerText = el.name
                if(el.name === selectedCategory){
                    option.selected = true
                }
                select.append(option)
    })
    select.addEventListener('input', (e: any) => {
       func(e)
    })

    return select
}


export const createModalOpenButton = (container: HTMLElement, url: string, type: string, categories: Array<{name: string, id: number}>) => {
    const button = document.createElement('div')
    button.className = type + 'Button'

    const icon = document.createElement('img')
    icon.src = url
    icon.alt = 'addItemIcon'

    button.append(icon)

    button.addEventListener('click', () => {
        let modalBackground = document.createElement('div')
        modalBackground.className = 'modalBackground'
        modalBackground.id = 'modalBackground'
        
        
        modalBackground.addEventListener('click', () => {
            closeModal()
        })
        
        let modalBlock = new Modal(type, categories)

        // modalBackground.append(modalBlock.render())

        const body = document.body

        body.style.overflow = 'hidden'
        body.style.marginRight = '15px'

        container.append(modalBackground)
        container.append(modalBlock.render())
    })

    return button
}


export const createFeed = (container: HTMLElement, visibleItems: string, items: Array<{title: string, description: string, price: string, url: string, id: number, category: string, count?: number}>, page: string) => {
    const checkItemsMain = document.querySelector('.mainPage__itemsList')

    if(checkItemsMain){
        checkItemsMain.remove()
    }

    const itemsBlock = document.createElement('div')
    itemsBlock.className = 'mainPage__itemsList'
    

   

    if(visibleItems === 'all'){
        items.forEach(el => {
            const item = new ItemBlock('pageItem' , 'pageItem' , el, page)
            itemsBlock.append(item.render())
        })
    } else {
        items.filter(el => el.category === visibleItems).forEach(el => {
            const item = new ItemBlock('pageItem' , 'pageItem' , el, page)
            itemsBlock.append(item.render())
        })
    }
    container.append(itemsBlock)

}

export const createItemPage = (item: {title: string, description: string, price: string, url: string, id: number, category: string}) => {

    let mainBlock = document.createElement('div')
    mainBlock.className = 'itemsPage_mainBlock'

    let leftBlock = document.createElement('div')
    leftBlock.className = 'itemsPage_leftBlock'

    let image = document.createElement('img')
    image.src = item.url
    image.alt = 'itemImage'
    image.className = 'itemsPage_leftBlock__image'

    leftBlock.append(image)

    let rightBlock = document.createElement('div')
    rightBlock.className = 'itemsPage_rightBlock'

    let title = document.createElement('p')
    title.innerText = item.title
    title.className = 'itemsPage_title'

    let code = document.createElement('span')
    code.className = 'itemsPage_rightBlock__code inline_span_block'
    code.innerText = 'Code: ' + item.id

    let description = document.createElement('span')
    description.className = 'itemsPage_rightBlock_description inline_span_block'
    description.innerText = item.description

    let price = document.createElement('span')
    price.className = 'itemsPage_rightBlock_price inline_span_block'
    price.innerText = item.price + 'р'

    let addButton = document.createElement('div')
    addButton.className = 'itemsPage_rightBlock_addButton'
    addButton.innerText = 'to bin'

    addButton.addEventListener('click', () => {
     setBinItems(item)   
    })


    rightBlock.append(title)
    rightBlock.append(code)
    rightBlock.append(description)
    rightBlock.append(price)
    rightBlock.append(addButton)

    mainBlock.append(leftBlock)
    mainBlock.append(rightBlock)

    return mainBlock
}