import jwt from "jsonwebtoken"

export const protect = (req,res,next)=>{
try {
    const authHeader = req.headers.authoriztion;

    if(!authHeader){
        return res.status(401).json({
            success:false,
            message:"Authorization token is required"
        });
    }

    const parts = authHeader.split(" ");
    if(parts.length !==2 || parts[0] !== "Bearer"){
        return res.status(401).json({
            success:false,
            message:"invalid Authorization format"
        });
    }

    const token = parts[1]
    const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET
    );
    

    req.user = decoded;
    next();
} catch (error) {
    console.log(error)
    res.status(500).json({
        success:false,
        message:"internal Server Error",
        error:error.message,
    })
}
}






