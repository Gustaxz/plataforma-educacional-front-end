import {  useRef, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image"
import styles from "../styles/Editor.module.css";

import SendButton from "../components/SendButton";
import { subjects } from "../assets/subjects";
import { getCookies } from "../assets/useCases/cookies";
import { UserInfos, UserPropsData } from "../assets/interfaces";

const importJodit = () => import("jodit-react");

const JoditEditor = dynamic(importJodit, {
  ssr: false,
});


function Editor(props: UserPropsData) {
  const [content, setContent] = useState("Comece a escrever");
  const titleForm = useRef<HTMLInputElement>(null)
  const subjectForm = useRef<HTMLSelectElement>(null)

  const infos: UserInfos = JSON.parse(JSON.parse(props.user.infos))

  const config = {
    readonly: false,
    height: 500,
    width: 700,
  };

  let contentString = JSON.stringify(content);

  return (
    <>
      <header className={styles.header}>
        <div className={styles.main_header}>
          <div className={styles.main_header_logo}>
            <Link href="/"><Image src="/images/mainicon.png" width={48} height={48} /></Link>
            <p>Fundação Futuro</p>
          </div>
          <h2>{ `Olá ${infos.name}` }</h2>
        </div>
      </header>

        <div className={styles.input_infos}>
          <div className={styles.input_title}>
            <label htmlFor="title">Título do tópico</label>
            <input type="text" name="title" ref={titleForm} placeholder = "Segunda guerra mundial"/>
          </div>

          <div className={styles.input_select}>
            <p>Selecione a matéria da publicação</p>
            <select ref={subjectForm}>
              {subjects.map(item => {
                return (
                  <option key = {item.id} value={`${item.subjectId}`}>{item.name}</option>
                )
              })}
            </select>
          </div>
        </div>

        <div className={styles.editor_container}>
            <JoditEditor
                value={content}
                config={config}
                onBlur={(newContent) => {
                  setContent(newContent);
                }}
            />
        </div>
        <div className={styles.div_send}>
          <SendButton 
              contentString={contentString} 
              title={titleForm.current?.value} 
              subject={subjectForm.current?.value} 
              madeBy = {JSON.stringify({name: infos.name, lastname: infos.lastname})}
          />
        </div>
    </>
  );
}

export default Editor;

export async function getServerSideProps(ctx: any) {
  const user = await getCookies(ctx)

  if (user) {
    return {
      props : { user }
    }
  }

  return {
    redirect: {
      destination: '/',
      permanent: false,
    }
  }
}
