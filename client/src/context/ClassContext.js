import { createContext } from "react";

export const ClassContext = createContext();


export const ClassContextProvider = (props) => {
    const [clazz, setClazz] = useState([]);
    
    <ClassContext.Provider value={{clazz , setClazz}}>
        { props.childern }
    </ClassContext.Provider>
}