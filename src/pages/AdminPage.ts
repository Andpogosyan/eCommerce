import { addCategoryIcon, plusIcon } from "../api/iconsUrl";
import Page from "../templates/page";
import '../styles/adminPage.css';
import { db } from "../api/firebaseData";
import { onValue, ref } from "firebase/database";
import { createFeed, createModalOpenButton, createSelect } from "../utils/domElements";





class AdminPage extends Page {
    items: Array<{title: string, description: string, price: string, url: string, id: number, category: string}> | null = null
    visibleItems: string = 'all'
    categories: Array<{id: number, name: string}> = []
    
    static TextObject = {
        MainTitle: 'Admin Page'
    }
    
    constructor(id: string){
        super(id)
    }

    handleChangeSort(e: any){
        this.setSort(e.target.value)
    }

    setSort (value: string) {
        this.visibleItems = value
        
        this.render()
    }

    setItems (data: Array<{title: string, description: string, price: string, url: string, id: number, category: string}>, categories: Array<{id: number, name: string}>) {
        this.items = data
        this.categories = categories

        this.render()
    }



    render() {
        if(this.items !== null){
        
            const checkCategories = document.querySelector('.adminPageHeader')
            checkCategories?.remove()
            
            const title = this.createHeaderTitle(AdminPage.TextObject.MainTitle, 'adminPageHeader') 

            !this.items && this.container.append(title)

            title.append(createSelect(this.handleChangeSort.bind(this), this.categories, this.visibleItems))
            title.append(createModalOpenButton(this.container, addCategoryIcon, 'addCategory', this.categories))
            title.append(createModalOpenButton(this.container, plusIcon, 'addItem', this.categories))

            this.container.append(title)
        }
       
        if(this.items === null){ 
            const itemsRef = ref(db)
        
            onValue(itemsRef, (snapshot) => {
                const {items, categories} = snapshot.val()

                const dataValues: Array<{title: string, description: string, price: string, url: string, id: number, category: string}> = Object.values(items)
                const categoriesValues: Array <{id: number, name: string}> = Object.values(categories)
            
                this.setItems(dataValues, categoriesValues)
            })
        }
         else {
            createFeed(this.container, this.visibleItems, this.items, 'admin')
        }
        
        return this.container
    }
}

export default AdminPage