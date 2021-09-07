const { model, Schema }=require('mongoose')

const EvaluationSchema=Schema({

    adjectives:{
        type:Array,
        require:true
    },

    score:{
        type:Number,
        require:true
    },
    teacher:{
        require:true,
        type:Schema.Types.ObjectId,
        ref:'User'

    },
    student:{
        require:true,
        type:Schema.Types.ObjectId,
        ref:'User'
       

    }
})

module.exports=model('Evaluation', EvaluationSchema)