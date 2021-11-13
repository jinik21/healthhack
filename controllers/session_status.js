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
            const url1 = "http://127.0.0.1:3001/api/send_custom_meassage";
            const Option = {
                method: 'post',
                url: url1,
                headers: {
                    'Content-Type': 'application/json'
                },
                data: {
                    id: session._id,
                    sessionAccept: true
                }
            };
            axios(Option)
                .then(function (response) {
                    console.log(JSON.stringify(response.data));
                })
                .catch(function (error) {
                    console.log(error);
                });
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