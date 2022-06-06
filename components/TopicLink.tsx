import Link from "next/link"
import styles from "../styles/Subject.module.css"

interface TopicLinkProps {
    id: string
    name: string
    createdAt: Date
    subjectId: string
    color?: string
}

export default function TopicLink({id, name, createdAt, subjectId, color}: TopicLinkProps) {
    const date = new Date(createdAt)
    return (
        <div className = {styles.topic_card} style = {{borderColor: color}}>
            <h5><Link href = {`/${subjectId}/topicos/${id}`}><a>{name}</a></Link></h5>
            <p>Publicado em: {date.toLocaleDateString('pt-br', {
                timeZone: 'America/Sao_Paulo',
                hour:'2-digit',
                minute: '2-digit',
                second: '2-digit',
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            })}</p>
        </div>
    )
}