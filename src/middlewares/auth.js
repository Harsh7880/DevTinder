export const adminAuth = (req,res,next) => {
    const token = "xyzss";
    let isAuthorized = token === "xyz";
    if(!isAuthorized){
        res.status(401).send("UnAuthorized User");
    }else{
        console.log("Admin is Authorized")
        next();
    }
}


export const userAuth = (req,res,next) => {
    const token = "xyz";
    let isAuthorized = token === "xyz";
    if(!isAuthorized){
        res.status(401).send("UnAuthorized User");
    }else{
        console.log("User is Authorized")
        next();
    }
}