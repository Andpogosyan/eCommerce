import Component from "../templates/components";
import { freeCart, adminIcon, mainPageIcon } from '../api/iconsUrl'
import '../styles/header.css'
import { handleSignOut } from "../api/firebaseData";
import { Buttons } from "../api/itemsData";



class Header extends Component {
    
    constructor(tagName: string, className: string){
        super(tagName, className)
    }

    createIconButton(url: string){
        const imgHTML = document.createElement('img')

        imgHTML.src = url
        imgHTML.alt = 'headerIcon'
        imgHTML.className = 'headerIcon'

        return imgHTML
    }

    createListener(button: HTMLElement, hash: string){
        button.addEventListener('click', () => {
            const currentHash = window.location.hash.slice(1)

            if(currentHash !== hash){
                const pageHeader = document.querySelector('.mainPageHeader')
                pageHeader?.remove()
            }
        })
    }

    createSignInOrOut(){
        const button = document.createElement('div')
        button.className = 'loginButton'
        const logined = JSON.parse(localStorage.logined)

        if(logined){
            button.innerText = 'Sign Out'
            button.addEventListener('click', () => {
                handleSignOut()
            })
        } else {
            
            const linkIn = document.createElement('a')
            linkIn.href = '#signin'
            linkIn.innerText = 'Sign In'

            const linkUp = document.createElement('a')
            linkUp.href = '#signup'
            linkUp.innerText = 'Sign Up'

            button.append(linkIn)
            button.append(linkUp)
        }

        this.container.append(button)
    }

    renderPageButtons(countItems: number) {
       const pageButtons = document.createElement('div')
       
       const logined = JSON.parse(localStorage.logined)
       const admin = JSON.parse(localStorage.admin)

       Buttons.forEach((button) => {
           const buttonHTML = document.createElement('a')
           buttonHTML.className = `headerButton ${button.id}`
           buttonHTML.href = `#${button.id}`
           
           if(button.id === 'bin'){
               buttonHTML.append(this.createIconButton(freeCart))
               if(countItems > 0 ){
                   
                const count = document.createElement('span')
                count.innerText = `${countItems}`
                count.className = 'headerBinCount'
                buttonHTML.append(count)
                }
           } else if(button.id === ''){
            buttonHTML.append(this.createIconButton(mainPageIcon))
        } else if(button.id === 'admin-page'){
            if(logined && admin){
                buttonHTML.append(this.createIconButton(adminIcon))
            }    
        } else{
               buttonHTML.innerText = button.text
           }
           pageButtons.append(buttonHTML)
       })
       this.container.append(pageButtons)
    }

    render(){
        const localStorageItems = JSON.parse(localStorage.items)
        
        let count = 0
        localStorageItems.forEach((element: { count: number; }) => {
          return count = count + element.count
        });

        this.renderPageButtons(count)
        this.createSignInOrOut()
        return this.container
    }
}

export default Header