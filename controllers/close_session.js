const axios = require('axios');
const closeSession = async (req, resp, User, Sessions) => {

    const usr = await User.findOne({ 'email': req.body.email });
    const session = await Sessions.findOne({ '_id': req.body.id });

    try {

        session.update({ upcoming: false }, function (err, result) {
            if (err) {
                console.log(err)
            } else {
                console.log("Result :", result)
            }
        })
        session.save()
        
        resp.json("Session Sucessfully Closed");
    }
    catch {
        resp.json("Error while Closing Session");
    }

}
module.exports = {
    closeSession: closeSession
};