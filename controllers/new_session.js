const newSession = async (req, resp, User, Sessions) => {

    const usr = await User.findOne({ 'email': req.body.email });
    try {
        const session = new Sessions({
            user: usr.email, doctor: usr.doctor_assigned, date: req.body.date,title:req.body.title,time:req.body.time
        })
        session.save();
        resp.json("Session Sucessfully Created");
    }
    catch {
        resp.json("Error while Creating Session");
    }

}
module.exports = {
    newSession: newSession
};