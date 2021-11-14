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
        const url1 = "https://shrink4shrink.herokuapp.com/api/send_custom_meassage";
        const Option = {
            method: 'post',
            url: url1,
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                id: session._id,
                closeSession: true
            }
        };
        axios(Option)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
            })
            .catch(function (error) {
                console.log(error);
            });
            const url2 = "https://shrink4shrink.herokuapp.com/api/send_custom_email";
            const Option2 = {
                method: 'post',
                url: url2,
                headers: {
                    'Content-Type': 'application/json'
                },
                data: {
                    id: session._id,
                    closeSession: true
                }
            };
            axios(Option2)
                .then(function (response) {
                    console.log(JSON.stringify(response.data));
                })
                .catch(function (error) {
                    console.log(error);
                });



        resp.json("Session Sucessfully Closed");
    }
    catch {
        resp.json("Error while Closing Session");
    }

}
module.exports = {
    closeSession: closeSession
};