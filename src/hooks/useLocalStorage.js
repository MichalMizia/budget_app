import { useEffect, useState } from "react"

export function useLocalStorage(key, defaultValue){
    const [value, setValue] = useState(()=>{
        const jsonVal = localStorage.getItem(key)
        if(jsonVal != null) return JSON.parse(jsonVal)

        if(typeof defaultValue === "function") return defaultValue()
        return defaultValue
    })

    useEffect(()=>{
        localStorage.setItem(key, JSON.stringify(value))
    }, [key, value])
    
    return [value, setValue]
}