import { H3Event } from "h3";
import Base from "./base";

export type Profile = {
id: number;
siteId: number;
userId: number;
alias?: string;
avatar?: string;
phone?: string;
firstName?: string;
lastName?: string;
birthDate?: string;
gender?: number;
} & Base

export type ProfileWithoutId = Omit<Profile, 'id'>

export type ProfileWithoutIdAndUserId = Omit<Profile, 'id'|'userId'>
export type ProfileWithNameAndTotalCommentAndEmail = {
    email?: string;
    name: string;
    totalComment: number;
    externalLoginProvider?: string
} & Profile

export type Reader = {
id: number;
siteId: number;
totalComment: number;
name: string;
alias?: string;
avatar?: string;
firstName?: string;
lastName?: string;
createdOn?: string;
}

export const create = async (event: H3Event) =>{
    try {
        const payload = await readBody<ProfileWithoutId>(event)

        const {item}:{item:Profile}= await fetchWithAuth( 
            `${useRuntimeConfig().public.apiUrl}/com/client/profile/`,
            {
                method: 'POST',
                body: {...payload},
            },
            event
        )

        return item
    } catch (error) {
        handleError(error)
    }

}

export const update = async (event: H3Event) =>{
    try {
        const payload = await readBody<Profile>(event)

        const {item}:{item:Profile}= await fetchWithAuth(
            `${useRuntimeConfig().public.apiUrl}/com/client/profile/`,
            {
                method: 'PATCH',
                body: payload,
            },
            event
        )

        return item
    } catch (error) {
        handleError(error)
    }
}