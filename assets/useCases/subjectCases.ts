import { api } from "../api";
import { sendaDataProps } from "../interfaces";

export async function sendData({container, title, subject, madeBy} : sendaDataProps) {
    await api.post('/', {
        container,
        title, 
        subject,
        madeBy
    })
    alert('Em alguns instantes, o tópico será postado!')
}