import Component from '../templates/components'
import { getDatabase, ref, set, onValue } from "firebase/database"
import { base , getItemsData, db, submitForm, sendOrder, registerUser, loginUser } from '../api/firebaseData';
import { closeModal } from '../utils/modal';
import '../styles/signForm.css'
import { loginFields } from '../api/itemsData';


class SignForm extends Component {
    private type: string = ''
    private email: string = ''
    private password: string = ''



    constructor(type: string){
        super('div', 'signFormMain')
        this.type = type
    }
    
    createForm(){
        const fields = loginFields 

        const formBlock = document.createElement('div')
        formBlock.className = 'signForm'

        const handleChange = (e: any) => {
                    
           if(e.target.id === 'email'){
                this.email = e.target.value
            } else if(e.target.id === 'password'){
                this.password = e.target.value
            }
        }

        fields.forEach(el => {
            
            const fieldBlock = document.createElement('div')
            fieldBlock.className = 'signForm__field'

            const title = document.createElement('p')
            title.className = 'signForm__field_title'
            
            title.innerText = el.name + ': '

            const input = document.createElement('input')
            input.type = el.name
            input.className = 'signForm__field_input'
            input.id = el.name

            input.addEventListener('input', (e: any) => {
                handleChange(e)
            })

            fieldBlock.append(title)
            fieldBlock.append(input)

            formBlock.append(fieldBlock)
        })
        formBlock.append(this.createButton())
        
        return formBlock
    }
    
    createButton(){
        const button = document.createElement('div')

        button.innerText = this.type === 'signIn' ? 'Login' : 'Register'

        button.className = 'registerButton'

        button.addEventListener('click', this.type === 'signIn' ? () => loginUser(this.email, this.password) : () => registerUser(this.email, this.password))

        return button
    }
    

    render(){
        this.container.append(this.createForm())
        
        return this.container
    }
}

export default SignForm