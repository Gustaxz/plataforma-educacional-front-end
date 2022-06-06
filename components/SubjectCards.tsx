import Image from "next/image"
import Link from "next/link"
import styles from "../styles/Home.module.css"

interface SubjectCardsProps {
    name: string
    img: string
    subjectId: string
    color: string
}

export default function SubjectCards({name, img, subjectId, color}: SubjectCardsProps) {
    return (
        <>
        <Link href={`/${subjectId}`}>
            <div className={styles.subject_card} style = {{borderColor : `${color}`, boxShadow: `3px 3px 10px ${color}`}}>
            <Image src={`/images/${img}.png`} alt={`imagem da matéria ${name}`} 
                width = '70%' height='70%' />
            <h4 style = {{color: `${color}`}}>{name}</h4>
            </div>
        </Link>
        </>
    )
}