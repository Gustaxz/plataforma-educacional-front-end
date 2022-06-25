import Image from "next/image";
import Head from "next/head";
import styles from "../styles/Home.module.css";

import { subjects } from "../assets/subjects";
import SubjectCards from "../components/SubjectCards";
import Link from "next/link";

const Home = () => {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>

      <header className={styles.header}>
         <div className={styles.header_top}>
          <Image src="/images/mainicon.png" width={56} height={24} alt="logo fundação futuro"/>
          <div className={styles.title}>Fundação Futuro</div>
        </div> 
        <div className={styles.header_container}>
          <h1>Agora seu estudo pode ser melhor que nunca</h1>
          <p>
            Cansado de procurar o que estudar e nunca achar um conteúdo de
            qualidade? Aqui você conta com inúmeras matérias de qualidade, com
            todo suporte para seu aprendizado!
          </p>
          <div className={styles.links}>
            <Link href="/signup">
              <a>Cadastre-se</a>
            </Link>
            <Link href="/login">
              <a>Login</a>
            </Link>
          </div>
        </div> 
      </header>
      <main>
        <section className={styles.container_cards_full}>
          <h2>Escolha sua próxima área de ensino: </h2>
          <div className={styles.container_cards}>
            {subjects.map((item) => {
              return (
                <>
                  <SubjectCards
                    key={item.id}
                    name={item.name}
                    subjectId={item.subjectId}
                    img={item.img}
                    color={item.color}
                  />
                </>
              );
            })}
          </div>
        </section>
      </main>
      <footer className={styles.footer}>
        <a href="https://www.flaticon.com/free-icons/math" title="math icons">
          Math icons created by itim2101 - Flaticon
        </a>
        <a href="https://www.flaticon.com/free-icons/edit" title="edit icons">
          Edit icons created by Freepik - Flaticon
        </a>
        <a
          href="https://www.flaticon.com/free-icons/global"
          title="global icons"
        >
          Global icons created by Freepik - Flaticon
        </a>
        <a
          href="https://www.flaticon.com/free-icons/hourglass"
          title="hourglass icons"
        >
          Hourglass icons created by Freepik - Flaticon
        </a>
        <a
          href="https://www.flaticon.com/free-icons/momentum"
          title="momentum icons"
        >
          Momentum icons created by Freepik - Flaticon
        </a>
        <a
          href="https://www.flaticon.com/free-icons/poison"
          title="poison icons"
        >
          Poison icons created by smalllikeart - Flaticon
        </a>
        <a
          href="https://www.flaticon.com/free-icons/bacteria"
          title="bacteria icons"
        >
          Bacteria icons created by Freepik - Flaticon
        </a>
        <a href="https://br.freepik.com/fotos-vetores-gratis/escritor">
          Escritor vetor criado por pch.vector - br.freepik.com
        </a>
        <a href="https://br.freepik.com/fotos-vetores-gratis/ensino-online">
          Ensino online vetor criado por pch.vector - br.freepik.com
        </a>
      </footer>
    </>
  );
};

export default Home;
