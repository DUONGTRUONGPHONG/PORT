import {NitroFetchRequest, NitroFetchOptions} from 'nitropack'
import defu from 'defu'
import { utils } from '~/utils/utilities'

export async function fetchWithSite<T>(
    request: NitroFetchRequest,
    options: NitroFetchOptions<NitroFetchRequest>
): Promise<T>{
    const _options = defu(options,{
        headers: {
            'site': useRuntimeConfig().public.site,
        },
       
    }) as NitroFetchOptions<NitroFetchRequest>

    return $fetch<any>(request,_options)
}