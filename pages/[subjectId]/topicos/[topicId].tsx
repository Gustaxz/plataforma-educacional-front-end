import parse from "html-react-parser"
import { api } from "../../../assets/api"

import styles from "../../../styles/Topic.module.css"

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
    }
}

export default function Topics({response}: TopicsProps) {
    return (
        <>
            <h1>Você está no tópico {response.title}</h1>
            <main className={styles.main}>
                {parse(JSON.parse(response.container))}
            </main>
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