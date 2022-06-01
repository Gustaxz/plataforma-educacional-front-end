import { useState } from "react";
import dynamic from "next/dynamic";

import styles from "../styles/Editor.module.css";
import Link from "next/link";
import SendButton from "../components/SendButton";
import { subjects } from "../assets/subjects";

const importJodit = () => import("jodit-react");

const JoditEditor = dynamic(importJodit, {
  ssr: false,
});

function Editor() {
  const [content, setContent] = useState("Comece a escrever");
  const [subject, setSubject] = useState('')
  const [title, setTitle] = useState('')

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
            <div className={styles.logo}></div>
            <p>Plataforma de Ensino</p>
          </div>
          <button>Login</button>
        </div>
        <Link href="/">
          <a className={styles.header_anchor}>HOME</a>
        </Link>
      </header>

      <div className={styles.input_title}>
        <label htmlFor="title">Digite o título da publicação</label>
        <input type="text" name="title" onChange={(e) => setTitle(e.target.value)} />
      </div>

      <div className={styles.input_select}>
        <p>Selecione a matéria da publicação</p>
        <select onChange={(e) => setSubject(e.target.value)}>
          {subjects.map(item => {
            return (
              <option value={`${item.subjectId}`}>{item.name}</option>
            )
          })}
        </select>
      </div>


      <div className={styles.editor}>
        <JoditEditor
          value={content}
          config={config}
          onBlur={(newContent) => {
            setContent(newContent);
          }}
        />
      </div>
      <div className={styles.div_send}>
        <SendButton contentString={contentString} title={title} subject={subject} />
      </div>
    </>
  );
}

export default Editor;
