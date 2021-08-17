const {Schema, model}=require('mongoose')

const CategorySchema=Schema({
    name:{
        require:true,
        type:String,
    },
    
})


module.exports=model('Category', CategorySchema)