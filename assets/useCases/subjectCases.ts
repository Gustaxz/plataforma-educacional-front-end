import { api } from "../api";
import { sendaDataProps } from "../interfaces";

export async function sendData({container, title, subject} : sendaDataProps) {
    await api.post('/', {
        container,
        title, 
        subject
    })
}