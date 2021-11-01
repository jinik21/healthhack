

const handlesignup=(req,resp,User)=>{
    // console.log(req);
    // console.log("-------------------------------------------")
    User.register({username:req.body.email,email:req.body.email,firstname:req.body.firstname,lastname:req.body.lastname,phone:req.body.phone,age:req.body.age,address:req.body.address,state:req.body.state,city:req.body.city,pincode:req.body.pincode,picture:req.body.picture},req.body.password,
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
                        "firstname": result.firstname,
                        "lastname": result.lastname,
                        "phone": result.phone,
                        "address": result.address,
                        "age": result.age,
                        "picture": result.picture
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
