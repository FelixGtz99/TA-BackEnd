const {Schema, model}=require('mongoose')
//TODO: Darle tipado a las propiedades
const AdvisorySchema= Schema({
    days:{
        require:true,
    },
    course:{ 
        type:Schema.Types.ObjectId,
        ref:"Course",
        requiered:true
    },
    monday:{},
    tuesday:{},
    wednesday:{},
    thursday:{},
    friday:{},
    saturday:{},
    sunday:{}
})

module.exports=model("Advisory", AdvisorySchema)