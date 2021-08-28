import React,{createContext, useContext, useState} from "react"


export const PartyContext = createContext(null);


export const usePartyContext = () => useContext(PartyContext);

export const PartyProvider =({children}) =>{

 const [ organiser, setOrganiser] = useState(null) 
 
 
 return (
     <PartyContext.Provider value={{organiser, setOrganiser}}>
         {children}
     </PartyContext.Provider>
 )

}

