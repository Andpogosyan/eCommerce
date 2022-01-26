export const enum PageIds {
    MainPage = '',
    SignIn = 'signin',
    SignUp = 'signup',
    AdminPage = 'admin-page',
    BinPage = 'bin',
    ItemPage = 'item',
}

export const Buttons = [
    {
        id: PageIds.MainPage,
        text: 'Main Page'
    },
    {
        id: PageIds.AdminPage,
        text: 'Admin Page'
    },
    {
        id: PageIds.BinPage,
        text: 'Bin Page'
    }
]

export const loginFields = [
    {
        name: 'email',
        component: 'input'
    },
    {
        name: 'password',
        component: 'input'
    }
]

export const fields = [
    {
        name: 'Title',
        component: 'input'
    },
    {
        name: 'Description',
        component: 'textarea'
    },
    {
        name: 'Price',
        component: 'input'
    },
    {
        name: 'Url',
        component: 'input'
    },
    {
        name: 'CategoryName',
        component: 'select'
    }
]