import parse from "html-react-parser"
import Head from "next/head"
import Link from "next/link"
import Image from "next/image"
import { api } from "../../../assets/api"
import { GithubLogo, GitlabLogoSimple, GitPullRequest } from "phosphor-react"

import styles from "../../../styles/Topic.module.css"
import { subjects } from "../../../assets/subjects"

interface ResponseType {
    id: string
    subject: string
}

interface TopicsProps {
    response: {
        container: string
        createdAt: Date
        id: number
        subject: string
        title: string
        madeBy?: string
    }
}

export default function Topics({response}: TopicsProps) {
    const subject = subjects.find(e => (e.subjectId === response.subject))

    let authorInfo
    if (response.madeBy) {  authorInfo = JSON.parse(response.madeBy) }

    return (
        <>
            <Head><title>{response.title}</title></Head>
            <header className={styles.header} style = {{background: subject?.color}}>
                <div className={styles.main_header}>
                <div className={styles.main_header_logo}>
                    <Link href="/"><Image src="/images/mainicon.png" width={48} height={48} /></Link>
                    <p>Fundação Futuro</p>
                </div>
                <Link href={`/${response.subject}`}><h2>{ subject?.name }</h2></Link>
                </div>
            </header>
            <main className={styles.main}>
                <h1>{ response.title }</h1>
                <h3>Por {response.madeBy ? `${authorInfo.name} ${authorInfo.lastname}` : "Autor anônimo"}</h3>
                <div className={styles.container_text}>
                 {parse(JSON.parse(response.container))}
                </div>
            </main>
            <footer className={styles.footer} style = {{background: subject?.color}}>
                Acesse o respositório: <Link href = "https://github.com/Gustaxz/plataforma-educacional-front-end"><a><GithubLogo 
                    size={36} style = {{color: "purple", marginLeft: '8px'}}/></a></Link>
            </footer>
        </>
        
    )
}

export async function getStaticPaths() {

    const response: ResponseType[] = await api.get(`/subjects`)
        .then(response => response.data)


    let paths = response.map((item) => ({ params: { subjectId: item.subject, topicId: item.id.toString()}}))

    return {
        paths,
        fallback: 'blocking'
    }
}

export async function getStaticProps({params} : any) {
    const id = params.topicId

    const response = await api.get(`/topics?topic=${id}`).then(response => response.data)


    return {
        props: { response },
        revalidate: 10,
        
    }
}