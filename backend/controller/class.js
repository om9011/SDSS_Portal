const Class = require("../db/class");
const User = require("../db/user");

exports.createClass=async(req,res)=>{

    try{

        const{classsName, classTeacher}=req.body;
        if(!classsName || !classTeacher)
            return res.status(400).json({
        message:"Something missing at the  create class"})

        const studentList=[]
        const  updateForClass="No Update"
        const updateInFileFormate="No Update"

        const createClass= await Class.create({classsName:classsName,classTeacher:classTeacher,studentList:studentList,updateForClass:updateForClass,updateInFileFormate:updateInFileFormate});

        console.log(createClass)
        if(createClass)
                return res.status(200).json({message:"Class created succefully",
            createClass,
            sucess:true})


    }catch(e){
        console.log("ERROR AT CREATE CLASS:",e.message);
    }
}



exports.getStudentByClass=async(req,res)=>{

    try{
    
        const{classId}=req.body;
    
        if(!classId){
            return res.status.json({message:"Something missing at getclass studnet"});
        }
    
        const result=await Class.findById({_id:classId});
    
        // console.log(result)
        // if(result)
        const studentList = [];
        if(result==null)
            return res.status(400).json({
                message:"Class not presnet"
            })

        // Loop through each student ID in the class and fetch their data
        for (const studentId of result.studentList) {
            const student = await User.findById({ _id: studentId });
    
            if (student) {
                studentList.push(student);
            }
        }
        const teacherId = result.classTeacher;
        const teacher = await User.findById({ _id: teacherId });
    
        console.log(teacher);
    
        return res.status(200).json({
            message: "Students fetched successfully",
            classTeacher:teacher,
            data: studentList,
        });
    
    }catch(e){
        console.log("ERROR AT STUDENTBYCLASS:",e.message)
    }
    
    }
    

exports.getAllClass=async(req,res)=>{

    try{

        const result=await Class.find({});
        // console.log(result)

        return res.status(200).json({
            result
        })

    }catch(e){
        console.log("ERROR AT GET ALL CLASS ",e)
    }
}

exports.deleteClass=async(req,res)=>{

    try{
        const{classId}=req.body;
    
        if(!classId){
            return res.status.json({message:"Something missing at getclass studnet"});
        }
    
        const result=await Class.findById({_id:classId});
        const deleteClass=await Class.findByIdAndDelete({_id:classId});
        // console.log(result)
        // if(result)
        const studentList = [];
        if(result==null)
            return res.status(400).json({
                message:"Class not presnet"
            })

        // Loop through each student ID in the class and fetch their data
        for (const studentId of result.studentList) {
            const student = await User.findById({ _id: studentId });
    
            if (student) {
                student.class=null;
                student.save();
                studentList.push(student);
            }
        }
        

        return res.status(200).json({
            message:"Student class succfully",
            studentList
        })
    }catch(e){
        console.log("ERROR AT DELETE CLASS",e);
    }
}