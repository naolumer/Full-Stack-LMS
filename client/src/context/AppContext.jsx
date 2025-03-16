import { createContext, useEffect } from "react";
import { dummyCourses } from "../assets/assets";
import { useState } from "react";

export const AppContext = createContext()

export const AppContextProvider = (props)=>{

    // const currency = import.meta.env.VITE_CURRENCY
    const [allCourses, setAllCourses] = useState([])

    // Fetch aLL cOUrses
    const fetchAllCourses = async ()=>{
        setAllCourses(dummyCourses)
    }

    useEffect(()=>{
        fetchAllCourses()
    },[])

    const value = {
        allCourses

    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

