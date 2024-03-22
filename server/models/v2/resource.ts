import type{ H3Event} from 'h3'
import { useMultipartReader } from '~/server/utils/multipart'
import { utils } from '~/utils/utilities'

export const upload = async (event: H3Event) => {
    try {
        const body = await useMultipartReader(event)
        const formData = new FormData()
        formData.append('file', new Blob([body.file.data], {type:body.file.type}), body.file.filename)
        const {item}:any = await fetchWithAuth(`${useRuntimeConfig().public.apiUrl}/com/resources/file`,{
            method: 'POST',
            body:formData
        }, event)

        return item
    } catch (error) {
        utils.log('error', error)
        return null
    }
}