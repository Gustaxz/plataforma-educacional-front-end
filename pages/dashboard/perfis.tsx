import Head from "next/head"
import Link from "next/link"
import { getCookies } from "../../assets/useCases/cookies"
import Image from "next/image"

import styles from "../../styles/Dashboard.module.css"
import { getUsers } from "../../assets/useCases/userCases"
import UserCard from "../../components/UserCard"

interface UserProps {
    id: string
    email: string
    password: string
    infos: string
    adm: boolean
    teacher: boolean
}

interface ServerDataProps {
    user: UserProps
    users: UserProps[]
}

interface UserInfos {
    name: string
    lastname: string
    bio: string
}

export default function Dashboard(props : ServerDataProps) {

    const infos: UserInfos = JSON.parse(JSON.parse(props.user.infos))

    return (
        <>  
            <Head><title>Dashboard - Perfis</title></Head>
            <header className = {styles.header}>
                <Link href="/"><a><Image src = "/images/mainicon.png" width={48} height ={48}/></a></Link>
                <h2>Olá {props.user.infos ? (infos.name) : '!'}</h2>
            </header>
            <div className={styles.grid_container}>
                <div className={styles.side_bar}>
                    <Link href = "/dashboard"><a>Seu perfil</a></Link>
                    { props.user.adm !==  null || props.user.adm === false? 
                        <Link href = "/dashboard/perfis"><a>Perfis cadastrados</a></Link> : ''}
                    { props.user.teacher !==  null || props.user.teacher !==  false|| props.user.adm === false || props.user.adm !== null ? 
                        <Link href = "/editor"><a>Publicar matéria</a></Link> : ''}
                </div>
                <div className={styles.container}>
                    <div className={styles.usercard_container}>
                        { props.users.map(item => {
                            return (
                                <UserCard key = {item.id} 
                                    id = {item.id} 
                                    email = {item.email} 
                                    password = {item.password} 
                                    adm = {item.adm} 
                                    teacher = {item.teacher} 
                                />
                            )
                        }) }
                    </div>
                </div>
            </div>
        </>
    )
}

export async function getServerSideProps(ctx?: any) {
    
    const user = await getCookies(ctx)

    const users = await getUsers()

    if (user) {
        if ( user.adm !== null || user.adm !== false ) {
            return {
                props : {
                    user,
                    users,
                }
            }
        }
    }

    return {
        redirect: {
          destination: '/dashboard',
          permanent: false,
        }
      }
    
}