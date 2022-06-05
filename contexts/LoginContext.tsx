import { createContext, Dispatch, SetStateAction} from "react";

interface LoginProps {
    data: {
        id: string
        lastname: string
        bio: string
    }
}

interface LoginContextProps {
    login: LoginProps
    setLogin: Dispatch<SetStateAction<LoginProps>>
    signIn: (id: string) => void
}


export const LoginContext = createContext<LoginContextProps>({login: 
        {data: {id: '', lastname: '', bio: ''}}, 
        setLogin: () => {},
        signIn: () => {}
    })

