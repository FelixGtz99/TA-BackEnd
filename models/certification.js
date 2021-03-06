const {Schema, model}=require('mongoose')

const CertificationSchema=Schema({
    description:{
        type:String,
        require:true
    },
    category:{
        type:Schema.Types.ObjectId,
        ref:'Category',
        require:true
    },
    docRef:{
        type:String,
        require:true
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:'User',
        require:true
    },
    //Approved, rejected, pending
    status:{
        type:String,
        default:'pending'
    },
    feedback:{
        type:String,
        
    },
    

})

module.exports=model('Certification', CertificationSchema)