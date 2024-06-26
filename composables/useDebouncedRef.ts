const debounce = (fn: (...args: any[]) => void, delay = 0, immediate = false) => {
    let timeout: string | number | NodeJS.Timeout
    return (...args: any[]) => {
        if (immediate && !timeout) fn(...args)
        clearTimeout(timeout)

        timeout = setTimeout(() => {
            fn(...args)
        }, delay)
    }
}

const useDebouncedRef = (initialValue: any, delay?: number, immediate?: boolean) => {
    const state = ref(initialValue)
    const debouncedRef = customRef((track: () => void, trigger: () => void) => ({
        get() {
            track()
            return state.value
        },
        set: debounce(
            (value: any) => {
                state.value = value
                trigger()
            },
            delay,
            immediate
        ),
    }))
    return debouncedRef
}

export default useDebouncedRef