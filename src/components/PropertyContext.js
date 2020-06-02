import React,{ useState, createContext } from 'react';


export const PropertyContext = createContext();

export const PropertyProvider = props => {
    const[propertyType, setPropertyType] = useState({              
               propertyTypeDetails:[]
    })
    const[propertyTypeDetails, setPropertyTypeDetails] = useState([])

    return (
        <PropertyContext.Provider value = { [propertyType, setPropertyType],[propertyTypeDetails, setPropertyTypeDetails] }>
            {props.children}
        </PropertyContext.Provider>
    )
}