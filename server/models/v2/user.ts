import { utils } from "~/utils/utilities";
import Base from "./base";
import {H3Event} from "h3";
import { Profile } from "./profile";

export type  User = {
    id: number;
    siteId: number;
    name: string;
    email?: string;
} & Base

export type GeneralUser = {
    user: User;
    profile: Profile;
    totalComment: number;
}

export const changePassword = async (event: H3Event) => {
    try {
        const body = await readBody<{currentPassword: string, newPassword: string, confirmPassword: string}>(event)        

        const result = await fetchWithAuth(`${useRuntimeConfig().public.apiUrl}/com/client/user/change-password`, {
            method: "POST",
            body
        },event)

        return result
    } catch (error) {
        console.error(error);
        
        return null
    }
}

export const changeEmail = async (event: H3Event) => {
    try {
        const body = await readBody<{newEmail: string, password: string}>(event)
        const result = await fetchWithAuth(`${useRuntimeConfig().public.apiUrl}/com/client/user/change-email`, {
            method: "POST",
            body
        },event)
        return result
    } catch (error) {
        handleError(error)
    }
}

export const getCurrent = async (event: H3Event) => {
    try {
        const {item}:any = await fetchWithAuth(`${useRuntimeConfig().public.apiUrl}/com/client/user/current-user`, {},event)

        return item
    } catch (error) {
        return null
    }
}
//yenht them get user theo Id
export const getById = async (event: H3Event) =>{
    try {
        const id = event.context.params?.id

        const {item}:any = await fetchWithSite(
            `${useRuntimeConfig().public.apiUrl}/com/client/user/${id}`, {}
        )

        utils.log('user', item)
        return item
    } catch (error) {
        handleError(error)
    }
}
