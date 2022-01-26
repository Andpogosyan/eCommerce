import Page from "../templates/page";
import '../styles/mainPage.css'
import SignForm from "../components/SignForm";






class SignUpPage extends Page {
    static textObject = {
        MainTitle: 'SingUp Page'
    }

    constructor(id: string) {
        super('signup-page')
    }

    render(){
        const form = new SignForm('signUp')

        const title = this.createHeaderTitle(SignUpPage.textObject.MainTitle, 'mainPageHeader')
    
        title.className = 'mainPageHeader'
        title.id = 'mainPageHeader'

        this.container.append(title)

        this.container.append(form.render())

        return this.container
    }
}

export default SignUpPage