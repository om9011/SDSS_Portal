// import { useState } from "react";
import { apiConnector } from "./utilities/apiCOnnector";

import auth, {loading,setLoading,setToken,token,setUser} from "../slices/auth"
import toast from "react-hot-toast";
import {user}  from  "../Services/utilities/API" 
// import {} from ""


export  function login(username,password,navigate){
    
    return async (dispatch)=>{
        
        try{
            dispatch(setLoading(true));
            
            const result= await apiConnector("POST",user.LOGIN_IN,{
                id:username,
                password:password,
            });

            console.log("LOGIN DATA:",result);
            if(result.status>200){
                toast.error("Invalid credintial");
                return;
            }
            
            // set token
            dispatch(setToken(result.data.token))
            // set user
            dispatch(setUser(result.data.user))

            // store token and user in localstorage
            
            localStorage.setItem("token",result.data.token)
            localStorage.setItem("user",JSON.stringify(result.data.user[0]))
            
            navigate("/home")
        
            // console.log("SETTED TOKEN:",token)
            dispatch(setLoading(false));

        }catch(e){
            console.log("ERROR AT AUTH FOR SIGNUP ",e.message);
            toast.error("Invalid credintial");
        }
        }
        
        

}

export function signUp(firstName,lastName,contact,email,password,role){

    return async (dispatch)=>{
    
        try{


        }catch(e){
            console.log("ERROR AT SIGNUP",e);
        }

    }
}

export function getUser(){
    return async (dispatch)=>{

        try{
            const token = localStorage.getItem("token");

            const result= await apiConnector("POST",user.GET_STUDENT,{token});

            console.log(result.data.user)

        }catch(e){
            console.log("ERROR AT GETSTUDENT",e.message)
        }


    }
}

export function logoutUser(navigate){
    return async (dispatch)=>{

        try{

            // set token  ans user as null in slice
            setToken(null)
            setUser(null);

            // set token and user null at localstorage
            // localStorage.setItem("token",null)
            // localStorage.setItem("user",null)
            localStorage.removeItem("token");
            localStorage.removeItem("user")

            console.log("Hello");
            // redirect to login
            navigate("/login")
            
        }catch(e){
            console.log("ERROR AT LOGOUT ",e.message)
        }

    }
}