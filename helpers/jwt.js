const jwt=require('jsonwebtoken')

const generateJWT=(uid)=>{
return new Promise((resolve, reject)=>{
    const payload={
    uid
}
    jwt.sign(payload, process.env.JWT_SECRET,{
        expiresIn:'12h'
    },(error, token)=>{

        if(error){
            console.log(error)
            reject('Nose pudo crear el token')
        }else{
            resolve(token)
        }


    }
    
    )
})

//se puee guardar cualquien inforrmacion





}
module.exports={
    generateJWT
}