import { yupResolver } from "@hookform/resolvers/yup"
import Head from "next/head"
import Router from "next/router"
import { CircleNotch } from "phosphor-react"
import { useContext, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { confirmSchema } from "../../assets/formSchema"
import { updateUser } from "../../assets/useCases/userCases"
import { LoginContext } from "../../contexts/LoginContext"

import styles from "../../styles/Confirm.module.css"

export default function ConfirmSignUp() {
    const { login, signIn } = useContext(LoginContext)
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(confirmSchema)
    })
    const [isSending, setIsSending] = useState(false)

    const onSubmit = async (data: any) => {
        setIsSending(true)
        await updateUser(login.data.id, data)
        signIn(login.data.id)
        setIsSending(false)
        Router.push('/dashboard')
    }

    useEffect(() => {
        if (login.data.id === "") {
            Router.push('/')
        }
    }, [])


    return (
        <>
            <Head>
                <title>Cadastre-se</title>
            </Head>

            <div className = {styles.container}>
                <div className = {styles.container_form}>
                    <h2>Complete seu cadastro</h2>
                    <form className={styles.form} onSubmit= {handleSubmit(onSubmit)}>

                        <div className={styles.inputs}>
                                <label htmlFor="name">Qual seu primeiro nome?</label>
                                <input {...register("name")} type="text" 
                                    name = "name" placeholder="Ednaldo"/>
                                <span className={styles.warning}>
                                    { errors.name?.message ? (errors.name?.message)  : "" }
                                </span>
                        </div>

                            <div className={styles.inputs}>
                                <label htmlFor="lastname">Coloque seus sobrenomes aqui</label>
                                <input {...register("lastname")} type="text" 
                                    name = "lastname"  placeholder="Pereira"/>
                                <span className={styles.warning}>
                                    { errors.lastname?.message ? (errors.lastname?.message)  : "" }
                                </span>
                            </div>

                            <div className={styles.input_bio}>
                                <label htmlFor="bio">Escreva algo legal sobre você</label>
                                <textarea {...register("bio")} name="bio" 
                                  placeholder="..." />
                                <span className={styles.warning}>
                                    { errors.bio?.message ? (errors.bio?.message)  : "" }
                                </span>
                            </div>

                            <button type="submit">
                                { isSending ? <CircleNotch className={styles.loading}/> : 'Concluir'}
                            </button>   
                    </form>
                </div>
            </div>
        </>
    )
}