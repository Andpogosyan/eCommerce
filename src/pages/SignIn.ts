import Page from "../templates/page";
import '../styles/mainPage.css'
import SignForm from "../components/SignForm";



class SignInPage extends Page {
    static textObject = {
        MainTitle: 'SingIn Page'
    }

    constructor(id: string) {
        super('signup-page')
    }

    render(){
        const form = new SignForm('signIn')

        const title = this.createHeaderTitle(SignInPage.textObject.MainTitle, 'mainPageHeader')
    
        title.className = 'mainPageHeader'
        title.id = 'mainPageHeader'

        this.container.append(title)

        this.container.append(form.render())

        return this.container
    }
}

export default SignInPage