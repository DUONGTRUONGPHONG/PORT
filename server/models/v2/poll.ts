import { utils } from "~/utils/utilities";
import Base from "./base";
import { H3Event } from "h3";

export type Poll = {
    id: number,
    siteId: number,
    title: string,
    code: string,
    description?: string,
    thumbnail?: string,
    keywords?: string,
    startTime?: string,
    endTime?: string,
    participant?: number, // 1: guest, 2: member, 3: both
    resultPublication?: number, // 0: private, 1: public, 2: after voting, 3: after voting and end time
    feature?:string
} & Base

export type PollOption = {
    id: number,
    siteId: number,
    pollId: number,
    title: string,
    description?: string,
    thumbnail?: string,
    order: number,
    voteCount: number
} & Base

export type PollResponse = {
    id: number,
    siteId: number,
    pollId: number,
    pollOptionId: number,
    readerId?: number,
} & Base

export const getPoll = async(event: H3Event) =>{
    try {
        const pollId = event.context.params?.id        
        return await $fetch(`${useRuntimeConfig().public.apiUrl}/cms/poll/${pollId}`)
    } catch (error) {
        return null
    }
}

export const getPollOptions = async(event: H3Event) =>{
    try {
        const pollId = event.context.params?.id
        return await $fetch(`${useRuntimeConfig().public.apiUrl}/cms/poll-option/poll:${pollId}`)
    } catch (error) {
        return null
    }
}

export const vote = async (event: H3Event)=>{
    try {
        const pollOptionId = await readBody(event)

        utils.log("pollOptionId", JSON.stringify(pollOptionId))

        const {item}: any = await fetchWithAuth(`${useRuntimeConfig().public.apiUrl}/cms/poll-response`, {
            method: "POST",
            body: pollOptionId
        },
        event)

        return item
    } catch (error) {
        utils.log("error", error)
        return null
    }
}