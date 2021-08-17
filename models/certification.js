const {Schema, model}=require('mongoose')

const CertificationSchema=Schema({
    description:{
        type:String,
    },
    category:{
        type:Schema.Types.ObjectId,
        ref:'Category',
        require:true
    },
    docref:{
        type:String,
        require:true
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:'User',
        require:true
    },
    status:{
        type:String,
        require:true
    },
    feedback:{
        type:String,
        require:true
    },
    

})

module.exports=model('Certification', CertificationSchema)