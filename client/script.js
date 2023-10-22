mport { io } from "https://cdn.socket.io/4.3.2/socket.io.esm.min.js"



const form = document.getElementById('form')
const input = document.getElementById('input')
const messages = document.getElementById('messages')
let username = localStorage.getItem('username') || 'anonymous'
let lastLi = 0

const getUsername = async () => {

    if (username != 'anonymous') {
        console.log(`User existed ` + username)
        return username
    }
    const res = await fetch(`https://random-data-api.com/api/users/random_user`)
    const { username: randomUsername } = await res.json()

    console.log(res.json().id)


    localStorage.setItem('username', randomUsername)
    return randomUsername
}
const socket = io({
    auth: {
        username: await getUsername(),
        indice: 0
    }
})

socket.on('chat message', (nextChat) => {
    socket.auth.indice = nextChat.indice
    let indiceCp = (nextChat.indice === 0) ? 1 : nextChat.indice
    lastLi = document.getElementById('messages').lastChild?.value ?? 0

    if (indiceCp > lastLi) {
        const item = `<li value=${nextChat.indice}>
        <p><small>${nextChat.user} </small> :  ${nextChat.msg}</p>                
            </li>`
        messages.insertAdjacentHTML('beforeend', item)
    }
})

form.addEventListener('submit', (e) => {
    e.preventDefault()
    if (input.value) {
        socket.emit('chat message', input.value)
        input.value = ""
    }
})