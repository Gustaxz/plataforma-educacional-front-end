import axios from "axios"

const api = axios.create({
    baseURL: "http://localhost:3333"
})

interface sendaDataProps {
    container: string
    title: string
    subject: string
}

export async function sendData({container, title, subject} : sendaDataProps) {
    await api.post('/', {
        container,
        title, 
        subject
    })
}
