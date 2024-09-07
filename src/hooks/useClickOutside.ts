import { useEffect } from "react"

export const useClickOutside = (ref: React.RefObject<HTMLElement>, callback: () => void) => {
    useEffect(() => {
        const handleClickOutsite = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)){
                callback();
            }
        }
        document.addEventListener("mousedown", handleClickOutsite)
        return () => document.removeEventListener("mousedown", handleClickOutsite)
    }, [ref, callback])
}
