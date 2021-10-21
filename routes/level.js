const {Router} =require('express')
const router=Router()
const Level=require('../models/level')

router.get('/', async (req, res)=>{
    const levels=await Level.find()
    res.json({
        levels
    })
})

module.exports=router