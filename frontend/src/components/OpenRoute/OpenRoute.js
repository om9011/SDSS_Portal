import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"

import React from 'react'

function OpenRoute({children}) {

    const {token}=useSelector((state)=>state.auth)
    console.log("Token at open route",token);
    // console.log(children)
    if(token==null)
        return children
    else
        return <Navigate to="/home"/>
 
}

export default OpenRoute