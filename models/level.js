const {Schema, model}=require('mongoose')

const LevelSchema=Schema({
    name:{
        require:true,
        type:String,
    },
    sequence:{
        require:true,
        type:Number
    }
    
})


module.exports=model('Level', LevelSchema)