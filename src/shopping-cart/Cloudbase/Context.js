import React,{ useContext } from 'react'
import Cloudbase from './Cloudbase';



const cloudbaseContext = React.createContext();

export default function CloudbaseContextProvider({children}) {
    const cloudbase = new Cloudbase();
    return (
        <cloudbaseContext.Provider value={{
            cloudbase,

        }}>
            {children}
        </cloudbaseContext.Provider>
    )
}

export function useGlobalCloudbase() {
    return useContext(cloudbaseContext);
}