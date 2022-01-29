import Component from '../templates/components'
import { submitForm, sendOrder } from '../api/firebaseData';
import { fields, loginFields } from '../api/itemsData';


class ModalForm extends Component {
    private title: string = '';
    private description: string = '';
    private price: string = '';
    private url: string = '';
    private category: string = '';
    private showWarning: boolean = false;
    private categoryName: string = '';
    private type: string = ''
    private categories: Array<{name: string, id: number}> = []
    private name: string = ''
    private email: string = JSON.parse(localStorage.email)
    private items: Array<{title: string, description: string, price: string, url: string, category: string, id: number, name: string, count: number}> = []

    constructor(type: string, categories: Array<{name: string, id: number}>, items?:Array<{title: string, description: string, price: string, url: string, category: string, id: number, name: string, count: number}>){
        super('div', 'modalForm')
        if(categories.length > 0){
            this.categories = categories
            this.category = categories[0].name 
        }
        
        this.type = type
        if(items){
            this.items = items
        }
    }


    craeteForm() {
        if(this.type === 'addItem'){
            fields.forEach((field: {name: String, component: string}) => {
                const fieldBlock = document.createElement('div')
                fieldBlock.className = 'modalBlock__fieldBlock'
                const title = document.createElement('p')
                title.innerText = field.name + ': '
                
                fieldBlock.append(title)
    
                const input = document.createElement(field.component)
                input.id = field.name.toLowerCase()
    
                if(field.component === 'select'){
                    this.categories.map(el => {
                        const option = document.createElement('option')
                        option.value = el.name
                        option.innerText = el.name
                        input.append(option)
                    })
                }
    
                const handleChange = (e: any, inputName: String = field.name) => {
                    
                    if(e.target.id === 'title') {
                        this.title = e.target.value
                        
                    } else if (e.target.id === 'description') {
                        this.description = e.target.value
                        
                    } else if (e.target.id === 'price') {
                        this.price = e.target.value
                        
                    } else if (e.target.id === 'url') {
                        this.url = e.target.value
                       
                    } else if(e.target.id === 'categoryname'){
                        this.category = e.target.value
                    } else if(e.target.id === 'name'){
                        this.name = e.target.value
                    } else if(e.target.id === 'email'){
                        this.email = e.target.value
                    }
                }
    
                input.addEventListener('input', (e: any) => {
                    handleChange(e)
                })
                fieldBlock.append(input)
                this.container.append(fieldBlock)
            })
        } else if(this.type === 'sendOrder') {
            loginFields.forEach((field: {name: String, component: string}) => {
                const fieldBlock = document.createElement('div')
                fieldBlock.className = 'modalBlock__fieldBlock'
                const title = document.createElement('p')
                title.innerText = field.name + ': '
                
                fieldBlock.append(title)
    
                let input = document.createElement(field.component) as HTMLInputElement
                input.id = field.name.toLowerCase()
                const email : string = JSON.parse(localStorage.email)
                if(field.name === 'Email' && email){
                    input.value = email as string
                }
    
                const handleChange = (e: any, inputName: String = field.name) => {
                    
                   if(e.target.id === 'name'){
                        this.name = e.target.value
                    } else if(e.target.id === 'email'){
                        this.email = e.target.value
                    }
                }
    
                input.addEventListener('input', (e: any) => {
                    handleChange(e)
                })
                fieldBlock.append(input)
                this.container.append(fieldBlock)
            })
            
        } else {
            const fieldBlock = document.createElement('div')
                fieldBlock.className = 'modalBlock__fieldBlock'
                const title = document.createElement('p')
                title.innerText = 'Category name: '
                
                fieldBlock.append(title)
    
                const input = document.createElement('input')
                input.id = 'categoryName'

                input.addEventListener('input', (e: any) => {
                    this.categoryName = e.target.value
                })

                fieldBlock.append(input)
                this.container.append(fieldBlock)
        }
        
        const sendButton = document.createElement('div')
        
        sendButton.innerText = 'Submit'
        sendButton.className = 'submitButton'

        const id = +(Math.random() * 100000000000).toFixed(0)

        sendButton.addEventListener('click', this.type === 'addItem' ?
         () => submitForm('/items/' + id, {title: this.title, description: this.description, url: this.url, price: this.price, category: this.category, id}) :
         this.type === 'sendOrder' ? () => sendOrder(this.items, {name: this.name, email: this.email}, id):
          () => submitForm('/categories/' + id, {name: this.categoryName, id})
         )

        this.container.append(sendButton)
    }

    createInfo(items: Array<{title: string, description: string, price: string, url: string, category: string, id: number, name: string, count: number}>){
        const infoBlock = document.createElement('div')
        infoBlock.className = 'modalForm__infoBlock'

        let total = 0
        items.forEach(el => {
            const field = document.createElement('div')
            field.className = 'sendOrderField'

            total = total + (+el.price * el.count)

            const title = document.createElement('p')
            title.innerText = el.title

            const category = document.createElement('p')
            category.innerText = el.category

            const price = document.createElement('p')
            price.innerText = (+el.price * el.count) + 'р'

            const qty = document.createElement('p')
            qty.innerText = 'QTY: ' + el.count

            field.append(title)
            field.append(category)
            field.append(qty)
            field.append(price)

            infoBlock.append(field)
        })
        const totalBlock = document.createElement('p')
        totalBlock.className = 'modalTotalBlock'
        totalBlock.innerText = "Total: " + total + 'р'
        this.container.append(totalBlock)

        this.container.append(infoBlock)
    }

    render(){
        
        if(this.type === 'sendOrder'){
            this.createInfo(this.items)
        }
        
        this.craeteForm()

        return this.container
    }
}

export default ModalForm