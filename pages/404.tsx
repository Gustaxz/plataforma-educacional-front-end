import Head from "next/head"
import Link from "next/link";
import styles from "../styles/NotFound.module.css"


export default function nofFound() {
    return (
        <>
        <Head>
            <title>Página não encontrada</title>
        </Head>

        <div className={styles.container_notfound}>
            <h1>Erro 404</h1>
            <h3>Essa página que você está tentando acessar não existe!</h3>
            <Link href="/"><a>Votar pra Home</a></Link>
        </div>
        </>
    )
}