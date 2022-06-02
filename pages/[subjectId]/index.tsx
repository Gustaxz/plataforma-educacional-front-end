import Link from "next/link"
import { subjects } from "../../assets/subjects"
import { api } from "../../assets/api"
import { GetStaticProps } from "next"

interface ResponseType {
    id: string
    title: string
}

interface PropsType {
    id: string
    response: ResponseType[]
}

export default function Subjects({ id, response } : PropsType) {

    return (
        <>
        <h1>Você está na sessão {id}</h1>
        {response.map(item => {
            return (
                <>
                <Link key = {item.id}href={`/${id}/topicos/${item.id}`}><a>{item.title}</a></Link><br />
                </>
            )
        })}
        </>
        
    )
}

export function getStaticPaths() {
    let paths = subjects.map((item) => ({ params: { subjectId: item.subjectId}}))

    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps({params} : any) {
    const id = params.subjectId
    
    const response = await api.get(`/subjects?subject=${id}`).then(response => response.data).catch(e => console.log(e))
    return {
        props: {
             id,
             response
        },
        revalidate: 10, // after 10 seconds
    }
    
}