export const enum PageIds {
    MainPage = '',
    SignIn = 'signin',
    SignUp = 'signup',
    AdminPage = 'admin-page',
    BinPage = 'bin',
    ItemPage = 'item',
}

export interface Item {
    title: string, 
    description: string, 
    price: string, 
    url: string, 
    category: string, 
    id: number, 
    name: string, 
    count: number
}

export interface Category {
    name: string, 
    id: number
}

export interface Order {
    id: number,
            total: number, 
            items: 
                Array<Item>,
            user: {
                email: string,
                name: string
            }
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

export const sendOrderFields = [
    {
        name: 'email',
        component: 'input'
    },
    {
        name: 'name',
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