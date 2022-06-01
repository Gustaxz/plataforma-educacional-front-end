import Image from 'next/image'
import Head from 'next/head'
import styles from "../styles/Home.module.css"

import { subjects } from '../assets/subjects'
import SubjectCards from '../components/SubjectCards'

const Home = () => {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>

      <header className={styles.header}>
        <div>
          {/* ícone */}
          Título
        </div>  
        <div>
          <button>Login</button>
        </div>
      </header> 
      <main>
      <section className={styles.container_text}>
          <p>Aqui você encontra conteúdo de ótima qualidade, com professores qualificados e experientes.
            O compromisso deles e o nosso é com seu aprendizado! Aproveite e aprenda bastante!  
          </p>
          <Image src= "/../public/images/main.jpg" width='500px' height = '300px' alt = 'menina estudando'/>
      </section>
      <section className={styles.container_cards_full}>
        <h2>Nossas matérias: </h2>
        <div className={styles.container_cards}>
          { 
              subjects.map((item) => {
                return (
                  <>
                    <SubjectCards 
                      key={item.id} 
                      name = {item.name} 
                      subjectId = {item.subjectId} 
                      img = {item.img}
                      color = {item.color}
                    />
                  </>
                )
              })
            }
        </div>
      </section>   
      </main>
      <footer>

      </footer>
    </>
  )
}

export default Home
