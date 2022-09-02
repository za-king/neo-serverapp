const {verify} = require("jsonwebtoken")


const validateTokenUser = (req ,res , next) =>{
    const accesToken = req.header("accessToken")

    if(!accesToken){
        return res.json({error : "user not login"})
    }else{
        
            const validToken =verify( accesToken ,"scretKeyUser" )

            if(validToken){
                return next()
                
            }
       
    }
}

module.exports = validateTokenUser