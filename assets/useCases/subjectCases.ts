import { api } from "../api";
import { sendaDataProps } from "../interfaces";

export async function sendData({container, title, subject} : sendaDataProps) {
    await api.post('https://plataforma-educacional-back-end-production.up.railway.app', {
        container,
        title, 
        subject
    })
}