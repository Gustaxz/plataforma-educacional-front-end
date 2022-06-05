import { Check, CircleNotch } from "phosphor-react"
import { useState } from "react"
import { updatePermissions } from "../assets/useCases/userCases"

import styles from "../styles/Dashboard.module.css"

interface UserCardDataProps {
    id: string
    email: string
    password: string
    adm: boolean
    teacher: boolean
}



export default function UserCard(data: UserCardDataProps) {
    const [adm, setAdm] = useState(false)
    const [teacher, setTeacher] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    async function confirm() {
        setIsLoading(true)
        await updatePermissions(data.id, adm, teacher)
        setIsLoading(false)
    }

    return (
        <div className={styles.user_card}>
            <div className={styles.info_card}>
                <p><strong>ID: </strong>{data.id}</p>
                <p><strong>E-mail: </strong>{data.email}</p>
                <p><strong>Senha: </strong>{data.password}</p>
                <p><strong>É ADM: </strong>{data.adm === null || data.adm === false ? "Não" : "Sim"}</p>
                <p><strong>É professor: </strong>{data.teacher === null || data.teacher === false ? "Não" : "Sim"}</p>
                <div>
                    <label htmlFor="checkadm"><strong>Tornar ADM</strong> </label><input name = "checkadm"type="checkbox" 
                        onChange={() => setAdm(!adm)} />
                </div>
                <div>
                    <label htmlFor="checkteacher"><strong>Tornar Professor</strong> </label><input name = "checkteacher"type="checkbox" 
                        onChange={() => setTeacher(!teacher)} />
                </div>
            </div>
            <div onClick = {() => confirm()}>{isLoading ? <CircleNotch className={styles.loading}/> : <Check size={24} />}</div>
        </div>
    )
}
