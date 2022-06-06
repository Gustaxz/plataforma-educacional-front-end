export interface sendaDataProps {
    container: string
    title?: string
    subject?: string
    madeBy?: string
}

export interface UserProps {
    email: string
    password: string
}

export interface UserPropsData {
    user: {
        id: string
        email: string
        password: string
        infos: string
        adm: boolean
        teacher: boolean
    }
}

export interface UserInfos {
    name: string
    lastname: string
    bio: string
}