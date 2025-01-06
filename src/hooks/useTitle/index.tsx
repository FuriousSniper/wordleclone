import { useEffect } from "react"

const useTitle = (newTitle: string) =>{
    useEffect(()=>{
        document.title=newTitle
    },[])
}

export default useTitle