var axios = require('axios');
const sessionEmail = async (req, resp, User, Sessions, routeMobile,smtpUser) => {
    const session = await Sessions.findOne({ '_id': req.body.id });
    const usr = await User.findOne({ 'email': session.user });
     console.log(smtpUser)
    var data = {
        "owner_id": routeMobile.Username,
        "token": routeMobile.Password,
        "smtp_user_name": smtpUser.smtp_user_name,
        "message": {
            "html": "<h1>Reminder</h1>Hi "+usr.firstname +" "+ usr.lastname+",<br>Your session is scheduled at " + session.time + ".Join Now at: <a href=https://shrink4shrink.netlify.app/login><h3>S4S</h3></a>",
            "text": "Reminder For Session Scheduled at " + session.time + ".Connect Soon",
            "subject": "Reminder For Session Scheduled at " + session.time,
            "from_email": "noreply@rapidemail.rmlconnect.net",
            "from_name": "Shrink4Shrink",
            "to": [
                {
                    "email": usr.email,
                    "name": usr.firstname +" "+ usr.lastname,
                    "type": "to"
                }
            ],
            "headers": {
                "Reply-To": "noreply@rapidemail.rmlconnect.net",
                "X-Unique-Id": session._id
            }
        }
    }
    // console.log(data)
    // console.log(routeMobile)
    var config = {
        method: 'post',
        url: 'https://rapidemail.rmlconnect.net/v1.0/messages/sendMail',
        headers: {
            'Reply-To': 'message.reply@example.com',
            'X-Unique-Id': session._id
        },
        data: data
    };
    axios(config)
        .then(function (response) {
            console.log(JSON.stringify(response.data));
            return resp.json(response.data);
        })
        .catch(function (error) {
            console.log(error);
            return resp.json(response.data);
        });

}
module.exports = {
    sessionEmail: sessionEmail
};