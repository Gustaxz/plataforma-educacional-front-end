import axios from "axios"
import parse from "html-react-parser"
import { GetStaticProps } from "next"

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
    console.log(response)
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


    const response: ResponseType[] = await axios.get(`http://localhost:3333/subjects`)
        .then(response => response.data)

    console.log(response)
    
    return {
        paths: response.map((item) => ({ params: { subjectId: item.subject, topicId: item.id.toString()}})),
        fallback: 'blocking'
    }
}

export async function getStaticProps({params} : any) {
    const id = params.topicId

    const response = await axios.get(`http://localhost:3333/topics?topic=${id}`).then(response => response.data)
    return {
        props: { response },
        revalidate: 10,
        
    }
}