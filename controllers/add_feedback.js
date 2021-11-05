const newFeedback = async (req, resp, User, Sessions) => {

    const usr = await User.findOne({ 'email': req.body.email });
    const session =  await Sessions.findOne({'_id':req.body.id});
    try {

        session.update({patient_feedback:req.body.patient_feedback},function (err, result) {
            if (err){
                console.log(err)
            }else{
                console.log("Result :", result) 
            }})
            session.save()
        resp.json("Feedback Sucessfully added");
    }
    catch {
        resp.json("Error while Adding Feedback");
    }

}
module.exports = {
    newFeedback: newFeedback
};