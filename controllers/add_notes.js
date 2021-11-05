const newNotes = async (req, resp, User, Sessions) => {

    const usr = await User.findOne({ 'email': req.body.email });
    const session =  await Sessions.findOne({'_id':req.body.id});
    try {

        session.update({notes:req.body.notes},function (err, result) {
            if (err){
                console.log(err)
            }else{
                console.log("Result :", result) 
            }})
            session.save()
        resp.json("Notes Sucessfully added");
    }
    catch {
        resp.json("Error while Adding Notes");
    }

}
module.exports = {
    newNotes: newNotes
};