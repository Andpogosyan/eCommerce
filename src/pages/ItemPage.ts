import Page from "../templates/page";
import { createItemPage } from "../utils/domElements";
import '../styles/itemPage.css'
import { db } from "../api/firebaseData";
import { onValue, ref } from "firebase/database";


class ItemPage extends Page {
    item: {title: string, description: string, price: string, url: string, id: number, category: string} | null = null
    static TextObject = {
        MainTitle: 'Item Page'
    }

    constructor(id: string){
        super(id)
    }
    
    setItem (data: {title: string, description: string, price: string, url: string, id: number, category: string}) {
        this.item = data
        document.querySelector('.binHeader')?.remove()
        
        this.render()
    }

    render() {
        const hash = window.location.hash.slice(1)

        if(this.item === null){
            const itemsRef = ref(db)

            onValue(itemsRef, (snapshot) => {
                const {items, categories} = snapshot.val()
                
                const dataValues: Array<{title: string, description: string, price: string, url: string, id: number, category: string}> = Object.values(items)
                const categoriesValues: Array<{id: number, name: string}> = Object.values(categories)
                
                const item = dataValues.filter(el => el.id+'' === hash.split('/')[1])[0]
                if(item) {
                    this.setItem(item)
                } else {
                    window.location.hash = '404'
                }
            })
        } else {
            this.container.append(createItemPage(this.item)) 
        }

        return this.container
     }
}

export default ItemPage