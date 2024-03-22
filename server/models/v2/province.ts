import type{ H3Event} from 'h3'
import Base from "./base";
 
export interface Province extends Base {
    id?: number | string
    countryId?: number
    regionId?: number
    stateId?: number
    title?: string
    postalCode?: string
    description?: string
    status?: number
}
export const getall = async (event: H3Event) => {
    try {
        const { apiUrl } = useRuntimeConfig().public;
        
        const { items }: any = await $fetch(`${apiUrl}/api-v1/com/location/province/all`,{})
        
        return { items };
    } catch (error) {
        handleError(error);
    }
}