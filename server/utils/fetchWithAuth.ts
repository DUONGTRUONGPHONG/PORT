import {NitroFetchRequest, NitroFetchOptions} from 'nitropack'
import {H3Event} from 'h3'
import {getToken} from '#auth'
import defu from 'defu'

export async function fetchWithAuth<T>(
    request: NitroFetchRequest,
    options: NitroFetchOptions<NitroFetchRequest>,
    event: H3Event
): Promise<T>{

    const userAgent = getRequestHeaders(event)['user-agent']
    const token = await getToken({event})
    const site = useRuntimeConfig().public.site

    const _options = defu(options,{
        headers: {
            'Authorization': `Bearer ${token?.accessToken}`,
            'User-Agent': userAgent,
            'site': site,
        },
       
    }) as NitroFetchOptions<NitroFetchRequest>

    return $fetch<any>(request,_options)
}