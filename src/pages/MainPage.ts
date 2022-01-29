import Page from "../templates/page";
import '../styles/mainPage.css'
import { db } from "../api/firebaseData";
import { onValue, ref } from "firebase/database";
import { createFeed, createSelect } from "../utils/domElements";




class MainPage extends Page {
    items: Array<{title: string, description: string, price: string, url: string, id: number, category: string}> | null = null
    visibleItems: string = 'all'
    categories: Array<{id: number, name: string}> = []

    static textObject = {
        MainTitle: 'Main Page'
    }

    constructor(id: string) {
        super('main-page')
    }

    setItems (data: Array<{title: string, description: string, price: string, url: string, id: number, category: string}>, categories: Array<{id: number, name: string}>) {
        this.items = data
        this.categories = categories
        
        this.render()
    }

    setSort (value: string) {
        this.visibleItems = value
        
        this.render()
    }

    handleChangeSort(e: any){
        this.setSort(e.target.value)
    }

    render(){
        if(this.categories.length > 0){
            const checkCategories = document.querySelector('.mainPageHeader')
            
            checkCategories?.remove()

            const title = this.createHeaderTitle(MainPage.textObject.MainTitle, 'mainPageHeader')
            title.className = 'mainPageHeader'
            title.id = 'mainPageHeader'
            title.append(createSelect(this.handleChangeSort.bind(this), this.categories, this.visibleItems))

            this.container.append(title)    
        }
        
        if(this.items === null){ 
            const itemsRef = ref(db)
            onValue(itemsRef, (snapshot) => {
                const {items, categories} = snapshot.val()
                
                const dataValues: Array<{title: string, description: string, price: string, url: string, id: number, category: string}> = Object.values(items)
                const categoriesValues: Array<{id: number, name: string}> = Object.values(categories)
                this.setItems(dataValues, categoriesValues)
            })
        } else {
            createFeed(this.container, this.visibleItems, this.items, 'main')
        }
       
        return this.container
    }
}

export default MainPage