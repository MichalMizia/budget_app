import { useEffect, useState } from "react"

export function useLocalStorage(key, defaultValue){
    const [value, setValue] = useState(()=>{
        let jsonVal = undefined
        if(typeof window !== "undefined"){
            jsonVal = localStorage.getItem(key)
        }
        if(jsonVal !== undefined) return JSON.parse(jsonVal)

        if(typeof defaultValue === "function") return defaultValue()
        return defaultValue
    })

    useEffect(()=>{
        localStorage.setItem(key, JSON.stringify(value))
    }, [key, value])
    
    return [value, setValue]
}