const newPrescription = async (req, resp, User, Sessions) => {

    const usr = await User.findOne({ 'email': req.body.email });
    const session =  await Sessions.findOne({'_id':req.body.id});
    try {

        session.update({prescription:req.body.prescription},function (err, result) {
            if (err){
                console.log(err)
            }else{
                console.log("Result :", result) 
            }})
            session.save()
        resp.json("Prescription Sucessfully added");
    }
    catch {
        resp.json("Error while Adding Prescription");
    }

}
module.exports = {
    newPrescription: newPrescription
};