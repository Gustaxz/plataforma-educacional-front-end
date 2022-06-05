import { api } from "../api"
import { UserProps } from "../interfaces"

export async function newUser({email, password}: UserProps) {

    const response = await api.post('http://localhost:3333/users', {
        email, 
        password
    })


    if (response.data.error) {
        return false
    }

    return response.data
}


export async function updateUser(id: string, infos: any){
    const data = JSON.stringify(infos)

    const response = await api.patch('/users/update', {
        id,
        data,
    })

}

export const getUser = async (email: string) => {

    try {
        
        const response = (await api.get(`/users/email?email=${email}`)).data
        return response

    } catch {
        return false
    }
   
}

export const getUsers = async () => {
    try {
        const response = await api.get('/allusers')
        return response.data
    } catch  {
        return "error"
    }
}

export const updatePermissions = async (id: string, adm: boolean, teacher: boolean) => {
    try {
        const response = await api.patch('/users/update/permissions', {
            id,
            adm,
            teacher,
        })
        return response
    } catch  {
        return "error"
    }
}