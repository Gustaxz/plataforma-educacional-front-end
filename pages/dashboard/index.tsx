import Head from "next/head"
import Link from "next/link"
import { getCookies } from "../../assets/useCases/cookies"
import { CheckCircle, Pencil, Envelope, HandWaving, Gear, GraduationCap } from "phosphor-react"
import Image from "next/image"

import styles from "../../styles/Dashboard.module.css"
import { useContext, useEffect } from "react"
import { LoginContext } from "../../contexts/LoginContext"

interface UserProps {
    user: {
        id: string
        email: string
        password: string
        infos: string
        adm: boolean
        teacher: boolean
    }
}

interface UserInfos {
    name: string
    lastname: string
    bio: string
}

export default function Dashboard(props : UserProps) {

    const { setLogin } = useContext(LoginContext)
    const infos: UserInfos = JSON.parse(JSON.parse(props.user.infos))

    const loginProps = { data: { id: props.user.id, bio: '', lastname: '' } }

    useEffect(() => {
        setLogin(loginProps)
    }, [])

    return (
        <>  
            <Head><title>Dashboard - Profile</title></Head>
            <header className = {styles.header}>
                <Link href="/"><a><Image src = "/images/mainicon.png" width={48} height ={48}/></a></Link>
                <h2>Olá {props.user.infos ? (infos.name) : '!'}</h2>
            </header>
            <div className={styles.grid_container}>
                <div className={styles.side_bar}>
                    <Link href = "/dashboard"><a>Seu perfil</a></Link>
                    { props.user.adm === true ? <Link href = "/dashboard/perfis"><a>Perfis cadastrados</a></Link> : ''}
                    { props.user.teacher ===  true || props.user.adm === true ? 
                        <Link href = "/editor"><a>Publicar matéria</a></Link> : ''}
                </div>
                <div className={styles.container}>
                    { !props.user.infos ? (
                        <div className={styles.null_profile}>
                            <p><CheckCircle size={28} /><strong>Seu E-mail:</strong> { props.user.email }</p>
                            <div className = {styles.confirm}>
                                <p>Você ainda não completou suas informações!</p>
                                <Link href="/signup/confirm"><a>Completar cadastro</a></Link>
                            </div>
                        </div>
                    ) : (
                        <div className = {styles.profile}>
                            <p><Pencil size={28} /><strong>Seu Nome:</strong> { `${infos.name} ${infos.lastname}` }</p>
                            <p><Envelope size={28} /><strong>Seu E-mail:</strong> { props.user.email }</p>
                            <p><HandWaving size={28} /><strong>Bio:</strong> { infos.bio }</p>
                            <p><Gear size={28} /><strong>É ADM:</strong> { props.user.adm ? "Sim" : "Não" }</p>
                            <p><GraduationCap size={28} /><strong>É professor:</strong> { props.user.teacher ? "Sim" : "Não" }</p>
                        </div>
                    ) }
                </div>
            </div>
        </>
    )
}

export async function getServerSideProps(ctx?: any) {
    
    const user = await getCookies(ctx)

    if ( user ) {
        return {
            props : {
                user
            }
        }
    }

    return {
        redirect: {
          destination: '/',
          permanent: false,
        }
      }
    
}