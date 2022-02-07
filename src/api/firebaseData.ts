import * as firebase from 'firebase/app'
import { getDatabase, ref, set, onValue, remove } from "firebase/database"
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, updateProfile } from "firebase/auth";
import BinPage from '../pages/Bin';
import { clearBin } from '../state/actions';
import { closeModal } from '../utils/modal';

const API_KEY = process.env.API_KEY
const AUTH_DOMAIN = process.env.AUTH_DOMAIN
const DATABASE_URL = process.env.DATABASE_URL
const PROJECT_ID = process.env.PROJECT_ID
const STORAGE_BUCKET = process.env.STORAGE_BUCKET
const MESSAGING_SENDER_ID = process.env.MESSAGING_SENDER_ID
const APP_ID = process.env.APP_ID

const firebaseConfig = {
    apiKey: API_KEY,
    authDomain: AUTH_DOMAIN,
    databaseURL: DATABASE_URL,
    projectId: PROJECT_ID,
    storageBucket: STORAGE_BUCKET,
    messagingSenderId: MESSAGING_SENDER_ID,
    appId: APP_ID
}

export const base = firebase.initializeApp(firebaseConfig)

export const db = getDatabase(base)
        
const itemsRef = ref(db, '/items')

const auth = getAuth()

const check = () => {
    onAuthStateChanged(auth, (user) => {
        if(user){
            localStorage.setItem('logined', JSON.stringify(true))
            localStorage.setItem('email', JSON.stringify(user.email))

            if(user.email === 'youngpo@yandex.ru'){
                localStorage.setItem('admin', JSON.stringify(true))
            } else {
                localStorage.setItem('admin', JSON.stringify(false))
            }
        } else {
            localStorage.setItem('logined', JSON.stringify(false))
            localStorage.setItem('admin', JSON.stringify(false))
            localStorage.setItem('email', JSON.stringify(''))
        }
    })
}

check()

export const handleSignOut = () => {
    signOut(auth).then(res => {
        window.location.href = '/'
        window.location.reload()
    })
}

export const updateUserInfo = (name: string, url: string) => {
    if(auth.currentUser) {
        updateProfile(auth.currentUser, {
            displayName: name, photoURL: url
        })
    } 
}


export const registerUser = (email: string, password: string) => {
    createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
        console.log('success')
        window.location.href = '/'
    }).catch((e) => {
        console.log(e, 'fail')
    })
}


export const loginUser = (email: string, password: string) => {
    signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
        console.log('success')
        window.location.href = '/' 
    }).catch((e) => {
        console.log(e, 'fail')
    })
}


export const getItemsData = async () => {
    let items : null | any

    onValue(itemsRef, (snapshot) => {
        const data = snapshot.val()
        items = data
    })

    return items
}

export const deleteItem = (id: number) => {
    let list = document.querySelector('.mainPage__itemsList')
    list?.remove()
    
    let itemRef = ref(db, 'items/' + id)
        remove(itemRef) 
}

export const deleteOrder = (id: number) => {
    let orderRef = ref(db, 'orders/' + id)
    remove(orderRef)
}

export const  submitForm = (url: string, data: {title?: string, description?: string, price?: string, url?: string, category?: string, id?: number, name?: string}) => {
    set(ref(db, url), data)
    let list = document.querySelector('.mainPage__itemsList')
        // list?.remove()
    closeModal()  
}


export const sendOrder = (data: Array<{title: string, description: string, price: string, url: string, category: string, id: number, name: string, count: number}>, userData: {name: string, email: string}, orderId: number) => {
    let total = 0

    data.forEach(el => {
        return total = total + (+el.price * el.count)
    })


    const finalOrder = {
        id: orderId,
        items: data,
        user: userData,
        total
    }


    set(ref(db, '/orders/' + orderId), finalOrder)
    
    closeModal()
    clearBin()

    const currentPage = document.getElementById('current-page')

    const binHeader = document.querySelector('.binHeader')
    binHeader?.remove()

    const itemsList = document.querySelector('.mainPage__itemsList')
    itemsList?.remove()

    const buyButton = document.querySelector('.buyButton')
    buyButton?.remove()

    const newBin = new BinPage('bin')

    currentPage?.append(newBin.render())
}

