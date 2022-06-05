import { CircleNotch, EyeSlash, Eye } from "phosphor-react"
import { useContext, useState } from "react"
import { useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup';
import { getUser, newUser } from "../../assets/useCases/userCases"
import styles from "../../styles/Sign.module.css"
import { schema } from "../../assets/formSchema";
import { useRouter } from "next/router";
import Head from "next/head";
import { LoginContext } from "../../contexts/LoginContext";
import Link from "next/link";



export default function Login() {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    })
    const [isSending, setIsSending] = useState(false)
    const router = useRouter()
    const { setLogin, login } = useContext(LoginContext)
    const [emailRegister, setEmailRegister] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    const onSubmit = async (data: any) => {
        setIsSending(true)
        const response = await getUser(data.email)
        console.log(login)
        setIsSending(false)

        if (response === null) {
            let registerValidation = await newUser(data)
            setLogin(registerValidation)
            router.push('/signup/confirm')
        } else {
            setEmailRegister(true)
        }

    }

    return (
        <>
        <Head>
            <title>Cadastre-se</title>
        </Head>

        <div className={styles.full_container}>
            <div className = {styles.side_container}>

            </div>
            <div className={styles.form_container}>
                <div>
                </div>

                <form className = {styles.form} onSubmit = {handleSubmit(onSubmit)}>
                    <div className={styles.inputs}>
                        <label htmlFor="email">Email: </label>
                        <input {...register("email", { required: true, minLength: 10 })} 
                            type="text" name="email" placeholder="Escolha seu melhor email" 
                            onChange={() => emailRegister && setEmailRegister(false)} />
                        <span className={styles.warning}>
                            { errors.email?.message ? (errors.email?.message) 
                                : emailRegister ? "Email já cadastrado" : "" }
                        </span>
                    </div>

                    <div className={styles.inputs}>
                        <label htmlFor="password">Senha: </label>
                        <div className={styles.inputs_container}>
                            <input {...register("password", { required: true, minLength: 5 })}
                                type= { showPassword ? "text" : "password" } name="password" 
                                placeholder="Escolha sua senha" />
                            { showPassword ? 
                                <Eye size = {20} style = {{cursor: 'pointer'}} 
                                    onClick = {() => setShowPassword(!showPassword)} /> : 
                                <EyeSlash size = {20} style = {{cursor: 'pointer'}}  
                                    onClick = {() => setShowPassword(!showPassword)}/> 
                            }
                        </div>
                            <span className={styles.warning}>{
                                errors.password?.message ? (errors.password?.message) : "" }
                            </span>
                     </div>        
                        
                    <div className={styles.inputs}>
                        <label htmlFor="confirm">Confime sua senha: </label>
                        <div className={styles.inputs_container}>
                            <input {...register("confirm", { required: true })} 
                                type= { showPassword ? "text" : "password" } name="confirm"
                                placeholder="Confirme" />
                            { showPassword ? 
                                <Eye size = {20} style = {{cursor: 'pointer'}} 
                                    onClick = {() => setShowPassword(!showPassword)} /> : 
                                <EyeSlash size = {20} style = {{cursor: 'pointer'}}  
                                    onClick = {() => setShowPassword(!showPassword)}/> 
                            }
                        </div>
                            <span className={styles.warning}>{
                                errors.confirm?.message ? (errors.confirm?.message) : "" }
                            </span>
                     </div>   
                            
                     <button type="submit" className={styles.form_buttom}>
                         {isSending ? <CircleNotch className={styles.loading}/> : 'Cadastrar' }
                     </button>   

                     <Link href="/login"><a>Já possui cadastro?</a></Link>   
                </form>
            </div>
        </div>
        </>
    )
}

