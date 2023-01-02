import { createContext, useState } from "react";

const AutoContext = createContext()

export const AutoContextProvider = ({children})=>{
    const [user, setUser]=useState(null)

    // login request
    const loginUser = async (userData)=>{
        try{
            const res = await fetch(`http//localhost:3000/api/login`, {
                method: "POST",
                headers: {
                    "Content-Type":"applicaion/json",

                },
                body:JSON.stringify({...userData})
            })
            const user = await res.json()
            console.log(user)

        }catch(err){
            console.log(err);
        }

    }


     // register request

     return <AutoContext.Provider value={{loginUser}} >
        {children}
     </AutoContext.Provider>


}

export default AutoContext









