import { Menu, Transition } from "@headlessui/react";
import Router from "next/router";
import { destroyCookie } from "nookies";
import { CaretCircleDown } from "phosphor-react";

import styles from "../styles/Dashboard.module.css"

export function MyDropdown() {

    const killCookies = () => {
        destroyCookie(null, 'loginauth.token')
        Router.reload()
    }

    return (
      <Menu>
        <Menu.Button className={styles.menu_button}><CaretCircleDown size={24}/></Menu.Button>
        <Menu.Items className = {styles.dropdown}>
          <Menu.Item>
            {({ active }) => (
              <div className={styles.menu_item} onClick = {() => killCookies()}>Deslogar</div>
            )}
          </Menu.Item>
        </Menu.Items>
      </Menu>
    )
  }