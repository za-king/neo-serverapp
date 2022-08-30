const {verify} = require("jsonwebtoken")


const validateToken = (req ,res , next) =>{
    const accesToken = req.header("accessToken")

    if(!accesToken){
        return res.json({error : "user not login"})
    }else{
        try{
            const validToken =verify( accesToken ,"scretKey" )

            if(validToken){
                return next()
                
            }
        }catch (err){
            res.json({error : err})

        }
    }
}

module.exports = validateToken