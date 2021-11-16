const axios = require('axios');
const sessionStatus = async (req, resp, User, Sessions) => {

    const usr = await User.findOne({ 'email': req.body.email });
    const session = await Sessions.findOne({ '_id': req.body.id });

    try {
        if (req.body.status == '1') {
            session.update({ status: req.body.status }, function (err, result) {
                if (err) {
                    console.log(err)
                } else {
                    console.log("Result :", result)
                }
            })
            session.save()
            
            resp.json("Session Accepted");
        }
        else if (req.body.status == '-1') {
            session.update({ status: req.body.status }, function (err, result) {
                if (err) {
                    console.log(err)
                } else {
                    console.log("Result :", result)
                }
            })
            session.save()
            resp.json("Session Denied.");

        }
    }
    catch {
        resp.json("Error while Changing Session");
    }

}
module.exports = {
    sessionStatus: sessionStatus
};