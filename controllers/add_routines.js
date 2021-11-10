const newRoutine = async (req, resp, User) => {

    const usr = await User.findOne({ 'email': req.body.email });
    try {
        var rs={
            date:req.body.date,
            link:req.body.link
        }
        // data.push(rs);

        usr.update({ 
            $addToSet: {
                routines: rs
            }
        },function (err, result) {
            if (err){
                console.log(err)
            }else{
                // console.log("Result :", result) 
            }})
            usr.save()
        resp.json("Routine Sucessfully added");
    }
    catch {
        resp.json("Error while Adding Routine");
    }

}
module.exports = {
    newRoutine: newRoutine
};