const {verify} = require("jsonwebtoken")


const validateToken = (req ,res , next) =>{
    const accesToken = req.header("accessToken")

    if(!accesToken){
        return res.json({error : "user not login"})
    }else{
        
            const validToken =verify( accesToken ,"scretKey" )

            if(validToken){
                return next()
                
            }
        
    }
}

module.exports = validateToken