import toast from "react-hot-toast";
import { highlight } from "./utilities/API";
import { apiConnector } from "./utilities/apiCOnnector";


export async function createHighlight(title,description,image,newType){
    try{

        const token=localStorage.getItem('token');

        const result= await apiConnector("POST",highlight.CREATE_HIGHLIGHT,{
            title,description,image,token,newType
        }, {
            'Content-Type': 'multipart/form-data',
        }, {});

        if(result)
            toast.success("Highlight Created succfully");
        else    
            toast.error("Error while createing highlight");
        return result.data;
    }catch(e){
        console.log("ERROR AT THE CREATE HIGHLIGHT",e);
        toast.error("Something went wrong while creating highlight")
    }
}

export async function updateHighlight(id,title,description,image){
    try{

        const token=localStorage.getItem('token');

        const result= await apiConnector("POST",highlight.UPDATE_HIGHLIGHT,{
            title,description,image,token,id
        }, {
            'Content-Type': 'multipart/form-data',
        }, {});

        if(result)
            toast.success("Highlight updated succfully");
        else    
            toast.error("Error while updateing highlight");
        return result.data;
    }catch(e){
        console.log("ERROR AT THE UPDATE HIGHLIGHT",e.message);
        toast.error("Something went wrong while updating highlight");
    }
}

export async function deleteHighlight(id){
    try{
        const token=localStorage.getItem('token');
        
        const result= await apiConnector("POST",highlight.DELETE_HIGHLIGHT,{id,token});

        if(result)
        toast.success("Highlight deleted succfully");
    else    
        toast.error("Error while deleted highlight");

    }catch(e){
        console.log("ERROR AT DELETE HIGHLIGHT ",e.messsage);
        toast.error("Something went wrong while creating new");
    }
}

export async function getAllHighlight(newType){
    try{
        const token=localStorage.getItem('token');
        const result=await apiConnector("POST",highlight.GETALLHIGHLIGHT,{token,newType});

        if(result){
            
        }
            //  toast.success("Highlight fetched succfully");
        else    
             toast.error("Error while fetching highlight");
        return result.data;
    }catch(e){
        console.log("ERROR AT GET ALL HIGHLIGHT ",e.message);
    }
}