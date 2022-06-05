import { parseCookies } from "nookies"
import { api } from "../api"

export const getCookies = async (ctx: any) => {
    const { ['loginauth.token']: token } = parseCookies(ctx)

    try {
        if (token) {
            const response = await (await api.get(`/users?user=${token}`)).data

            return response
        }
        return 
    }
    catch {
        return ''
    }

    
}