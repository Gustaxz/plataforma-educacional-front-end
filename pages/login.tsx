import Link from "next/link";
import Router from "next/router";
import { CircleNotch } from "phosphor-react";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { getUser } from "../assets/useCases/userCases";
import { LoginContext } from "../contexts/LoginContext";

import styles from "../styles/Login.module.css"

export default function Login() {
    const { signIn } = useContext(LoginContext)
    const { register, handleSubmit, formState: { errors } } = useForm()

    const [isSending, setIsSending] = useState(false)
    const [correctEmail, setCorrectEmail] = useState(true)
    const [correctLogin, setCorrectLogin] = useState(true)

    
    const onSubmit = async (data: any) => {
        setIsSending(true)
        const response = await getUser(data.email)

        if ( response === null ) {
            setCorrectEmail(false)
        } else {
            if (response.password !== data.password || response.email !== data.email) {
                setCorrectLogin(false)
            } else {
                signIn(response.id)
                Router.push('/dashboard')
            }
        }

        setIsSending(false)
    }

    const cleadnDisplay = (value : boolean) => {
        setCorrectEmail(value)
        setCorrectLogin(value)
    }

    return (
        <>
            <div className={styles.grid_container}>
                <div className={styles.form_container}>
                    <form  onSubmit = {handleSubmit(onSubmit)} className = {styles.form}>

                    <div className={styles.message_container}>
                            { !correctEmail || !correctLogin ? ( 
                                <div className={styles.message}>
                                    { !correctEmail ? 'Esse email não está cadastrado' : 
                                        !correctLogin ? 'Email ou senha errados' : '' }
                                </div> ) : '' }
                          </div>                            

                        <div className={styles.inputs}>
                            <label htmlFor="email">Email: </label>
                            <input {...register("email", { required: true, minLength: 10 })} 
                                type="text" name="email" placeholder="Coloque seu e-mail cadastrado"
                                onChange={() => cleadnDisplay(true)} />
                        </div>

                        <div className={styles.inputs}>
                            <label htmlFor="password">Senha: </label>
                            <input {...register("password", { required: true, minLength: 5 })}
                                type="text" name="password" placeholder="Coloque sua senha cadastrada" 
                                onChange={() => cleadnDisplay(true)} />
                        </div>        
                                
                        <button type="submit" className={styles.form_buttom}>
                            {isSending ? <CircleNotch className={styles.loading}/> : 'Logar' }
                        </button>

                        <Link href="/signup"><a>Ainda não é cadastrado?</a></Link>
                        <div className={styles.message_container}></div>
                    </form>
                </div>
                <div className={styles.side_bg}></div>
            </div>
        </>
    )
}