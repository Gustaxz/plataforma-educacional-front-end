import type { AppProps } from 'next/app'
import { setCookie } from 'nookies'
import { useState } from 'react'
import { LoginContext } from '../contexts/LoginContext'
import "../styles/global.css"

function MyApp({ Component, pageProps }: AppProps) {

  const [login, setLogin] = useState({data: {id: '', lastname: '', bio: ''}})

  
  function signIn(id: string) {
    let token = id

    setCookie(undefined, 'loginauth.token', token, {
      maxAge: 60 * 60 * 1, // 1 hour
    })
  }

  return (
    <LoginContext.Provider value = {{login, setLogin, signIn}}>
      <Component {...pageProps} />
    </LoginContext.Provider>
  )
}

export default MyApp
