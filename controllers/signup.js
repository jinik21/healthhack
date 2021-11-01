

const handlesignup=(req,resp,User)=>{
    // console.log(req);
    // console.log("-------------------------------------------")
    User.register({username:req.body.email,email:req.body.email,name:req.body.name,phone:req.body.phone,branch:req.body.branch,picture:req.body.picture},req.body.password,
        function (err,user) {
            if(err)
            {
                // console.log(err);
                return resp.status(400).json("Incorrect form submission");
            }
            else
            {
                var authenticate = User.authenticate();
                authenticate(req.body.email, req.body.password, function(err, result) {
                 if (err) 
                 {
                     //console.log(err);
                     return resp.status(400).json("Incorrect form submission");
                }
                 else{
                    var jsonObject = 
                    {
                        "email": result.email,
                        "name": result.name,
                        "phone": result.phone,
                        "branch": result.branch,
                        "picture": result.picture,
                    }
                 return resp.status(200).json(jsonObject);
                 }
                });
            }
        }
    );
}


module.exports={
    handlesignup:handlesignup
};
