import { H3Error} from 'h3'

export function handleError(error: any){
    const h3Error = new H3Error('')

    h3Error.statusCode = error.statusCode||500
    h3Error.statusMessage = error.statusMessage||'Internal Server Error'
    h3Error.data = error.data

    throw createError(h3Error)
}