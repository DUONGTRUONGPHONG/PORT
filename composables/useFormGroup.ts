import { type UseEventBusReturn } from '@vueuse/core'

type InputProps = {
    group?: string;
}

export const useFormGroup = (inputProps?: InputProps) =>{
    const profileFormEvent = inject<UseEventBusReturn<any, any>|undefined>('profile-form-event', undefined)
    const profileFormStatus = inject('profile-form-status', {} as any)
    
    const status = computed(()=>profileFormStatus?.value[inputProps?.group||''])    

   const emitFieldUpdate = (data:any)=>{
        profileFormEvent?.emit({type:'update',field:inputProps?.group, data})
    }

    const changeStatus = (status:string)=>{
        profileFormEvent?.emit({type:'status',field:inputProps?.group, data:status})
    }

    return {
        status,
        emitFieldUpdate,
        changeStatus
    }
}