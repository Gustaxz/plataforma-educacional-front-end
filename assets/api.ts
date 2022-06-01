import axios from "axios"

export const api = axios.create({
    baseURL: process.env.DB_HOST
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
