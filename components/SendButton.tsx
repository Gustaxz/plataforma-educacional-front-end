import styles from "../styles/Editor.module.css"
import { sendData } from "../assets/useCases/subjectCases";
import { useState } from "react";

import { CircleNotch } from "phosphor-react"

interface SendButtonProps {
    contentString: string
    title?: string
    subject?: string
}

export default function SendButton({contentString, title, subject}: SendButtonProps) {
    const [sending, setSending] = useState(false)
    
    const handleSendData = async () => {
        setSending(true)
        await sendData({container: contentString, title: title, subject: subject})
        setSending(false)
    }
    
    return (
        <button className={styles.send} onClick = {handleSendData}>
        { sending ? <CircleNotch className={styles.loading}/> : 'Enviar'}
        </button>
    )
}