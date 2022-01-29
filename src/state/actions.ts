import { isTemplateMiddleOrTemplateTail } from "typescript"
import Header from "../components/Header"
import BinPage from "../pages/Bin"



export const setBinItems = (item: {title: string, id: number, url: string, price: string, description: string}) => {
    const items = localStorage.items
    

    if(items){
        const array = JSON.parse(items)

        const haveItem = array.some((el: { id: number }) => el.id === item.id)

        if(haveItem){
            const currentArray = array.map((el: { id: number; count: number }) => {
                if(el.id === item.id){
                    return {
                        ...el,
                        count: el.count + 1
                    }
                } else {
                    return el
                }
            })
            localStorage.setItem('items', JSON.stringify(currentArray))

        } else {
            localStorage.setItem('items', JSON.stringify([...array, {...item, count: 1}]))
        }

        
    } else {

        localStorage.setItem('items', JSON.stringify([{...item, count: 1}]))
    }
    
    
    const oldHeader = document.querySelector('.header')
    oldHeader?.remove()
    
    const newHeader = new Header('header', 'header')

    document.body.prepend(newHeader.render())
}


export const clearBin = () => {
    const items = localStorage.items

    localStorage.setItem('items', JSON.stringify([]))

    const total = document.querySelector('.binPageTotal')

    total?.remove()

    const oldHeader = document.querySelector('.header')
    
    oldHeader?.remove()

    const newHeader = new Header('header', 'header')

    document.body.prepend(newHeader.render())
    
}

export const deleteItemFromOrder = (id: number) => {
    const items = localStorage.items

    const orderItems = JSON.parse(items)

    const finalItems = orderItems.filter((el: any) => el.id !== id)

    localStorage.setItem('items', JSON.stringify(finalItems))
    
    const oldHeader = document.querySelector('.header')
    oldHeader?.remove()
    
    const newHeader = new Header('header', 'header')

    document.body.prepend(newHeader.render())

    const currPage = document.getElementById('current-page')

    currPage?.remove()

    const newBin = new BinPage('bin')

    const newBinPage = document.createElement('div')
    newBinPage.id = 'current-page'
    newBinPage.append(newBin.render())

    document.body.append(newBinPage)
}

function el(el: any) {
    throw new Error("Function not implemented.")
}

