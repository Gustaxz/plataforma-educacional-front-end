import Link from "next/link"
import axios from "axios"
import { subjects } from "../../assets/subjects"

interface ResponseType {
    id: string
    title: string
}

interface PropsType {
    id: string
    response: ResponseType[]
}

export default function Subjects({ id, response} : PropsType) {

    return (
        <>
        <h1>Você está na sessão {id}</h1>
        {response.map(item => {
            return (
                <>
                <Link href={`/${id}/topicos/${item.id}`}><a>{item.title}</a></Link><br />
                </>
            )
        })}
        </>
        
    )
}

export function getStaticPaths() {
    return {
        paths: subjects.map((item) => ({ params: { subjectId: item.subjectId}})),
        fallback: false
    }
}

export async function getStaticProps({params} : any) {
    const id = params.subjectId
    
    const response = await axios.get(`http://localhost:3333/subjects?subject=${id}`).then(response => response.data)
    
    return {
        props: {
             id,
             response
        },
        revalidate: 10, // after 10 seconds
    }
}