import Header from "../components/Header";
import Page from "../templates/page";
import ErrorPage from "./404";
import AdminPage from "./AdminPage";
import BinPage from "./Bin";
import MainPage from "./MainPage";
import "../styles/index.css"
import SignUpPage from "./SingUp";
import SignInPage from "./SignIn";
import ItemPage from "./ItemPage";
import { PageIds } from "../api/itemsData";



class App {
    public static container: HTMLElement = document.body;
    public static defaultPageId: string = 'current-page';
    public header: Header;
    

    static renderNewPage(idPage: string) {
        const currentPageHTML = document.querySelector(`#${App.defaultPageId}`)

        const logined = JSON.parse(localStorage.logined)
        const admin = JSON.parse(localStorage.admin)
        if(currentPageHTML){
            currentPageHTML.remove()
        }

        let page: Page | null = null;

        if(idPage === PageIds.MainPage){
            page = new MainPage(idPage)
        } else if(idPage === PageIds.AdminPage && logined && admin){
            page = new AdminPage(idPage)
        } else if(idPage === PageIds.BinPage){
            page = new BinPage(idPage)
        } else if(idPage === PageIds.SignUp && !logined) {
            page = new SignUpPage(idPage)
        } else if(idPage === PageIds.SignIn && !logined) {
            page = new SignInPage(idPage)
        }else if(idPage === PageIds.ItemPage) {
            page = new ItemPage(idPage)
        } else {
            page = new ErrorPage('error')
        }

        if(page) {
            const pageHTML = page.render()
            pageHTML.id = App.defaultPageId
            App.container.append(pageHTML)
        }

    }

    private enableRouteChange(){
        return window.addEventListener('hashchange', () => {
            const hash = window.location.hash.slice(1)
            
            App.renderNewPage(hash.includes('/') ? hash.split('/')[0] : hash)
        })
    }

    constructor(){
        this.header = new Header('header', 'header')
    }



    run() {
        const hash = window.location.hash.slice(1)
        
        App.container.append(this.header.render())
        App.renderNewPage(hash.includes('/') ? hash.split('/')[0] : hash)
        
        this.enableRouteChange()
    }
}




export default App