import  React , { createContext , useState  } from 'react';


const LoadingContext  = createContext();

const LoadingContextProvider = (props) => {
    const [percent , setPercent] =  useState([]);

    return (
        <LoadingContext.Provider value={{percent , setPercent}}>
            { props.children }
        </LoadingContext.Provider>
    );
};

export {LoadingContext};
export default LoadingContextProvider;