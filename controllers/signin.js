
const handlesignin=(req,resp,User)=>{
    const user=new User({
        username:req.body.email,
        password:req.body.password,
    });
    req.login(user,function(err){
        if(err)
        {
            console.log(err);
            return resp.status(400).json("Not Logged in");
        }
        else
        {
            var authenticate = User.authenticate();
            authenticate(req.body.email, req.body.password, function(err, result) {
                if(err)
                {
                    return resp.status(400).json("Not Logged in");
                }
                else
                {
                    if(result===false){
                        //console.log("not logged in");
                        return resp.status(400).json("Not Logged in");
                    }
                    else
                    {
                        //console.log("logged in");
                        if((req.body.admin=='true' && result.admin==true)||(req.body.admin=='false' && result.admin==false) ){
                            
                        var jsonObject = 
                {
                    "email": result.email,
                    "firstname": result.firstname,
                    "lastname": result.lastname,
                    "phone": result.phone,
                    "address": result.address,
                    "age": result.age,
                    "picture": result.picture,
                    "doctor": result.doctor,
                }
                        return resp.status(200).json(jsonObject);
                    }
                    else{
                        return resp.status(400).json("Not Logged in");
                    }
                }
                }
    });
        }
    });

}


module.exports={
    handlesignin:handlesignin
};
