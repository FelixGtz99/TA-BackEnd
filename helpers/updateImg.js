const User =require ('../models/user')
const Course =require('../models/course')
const Certification=require('../models/certification')
const fs=require('fs')

const deleteImg = (path)=>{
    if(fs.existsSync(path)){
        fs.unlinkSync(path)
    }
}

const updateImg = async (dataType, id,name)=>{
let oldPath = ''
switch(dataType){
    case 'user':
        const user=await User.findById(id)
        if(!user) return false;
        oldPath= `./uploads/users/${user.img}`
        deleteImg(oldPath)
        user.img=name
        await user.save()
        return true
    case 'certification':
        const certification=await Certification.findById(id)
        if(!certification) return false;
        oldPath= `./uploads/certifications/${certification.docref}`
        deleteImg(oldPath)
        certification.docref=name
        await certification.save()
        return true     
    case 'evidence':
            const course=await Course.findById(id)
            if(!course) return false;
            oldPath= `./uploads/evidences/${course.evidence}`
            deleteImg(oldPath)
            course.evidence=name
            await course.save()
            return true              
    }
}
module.exports={
    updateImg
}