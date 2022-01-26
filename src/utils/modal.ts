export const closeModal = () => {
    let modal: HTMLElement | null = document.getElementById('modalWindow')
                modal?.remove()

                let modalBackground: HTMLElement | null = document.getElementById('modalBackground')
                modalBackground?.remove()

                const body = document.body

                body.style.overflow = 'auto'
                body.style.marginRight = '0'
}