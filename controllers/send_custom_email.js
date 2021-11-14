var axios = require('axios');
const sessioncustomEmail = async (req, resp, User, Sessions, routeMobile, smtpUser) => {
    if (req.body.newUser) {
            const usr = await User.findOne({ 'email': req.body.email });
            console.log(smtpUser)
            var data = {
                "owner_id": routeMobile.Username,
                "token": routeMobile.Password,
                "smtp_user_name": smtpUser.smtp_user_name,
                "message": {
                    "html": "Hi " + usr.firstname + " " + usr.lastname + ",<br>You have successfully registered with shrink4shrink ,Please Go ahead and choose from one of our experts and schedule a seession Now at: <a href=https://shrink4shrink.netlify.app/login><h3>S4S</h3></a><br/><h4>Regards</h4><br/><h2>Shrink4Shrink</h2>",
                    "text": "Congratulations,You have have Successfully Registered",
                    "subject": "Congratulations,You have have Successfully Registered",
                    "from_email": "noreply@rapidemail.rmlconnect.net",
                    "from_name": "Shrink4Shrink",
                    "to": [
                        {
                            "email": usr.email,
                            "name": usr.firstname + " " + usr.lastname,
                            "type": "to"
                        }
                    ],
                    "headers": {
                        "Reply-To": "noreply@rapidemail.rmlconnect.net",
                        "X-Unique-Id": usr._id
                    },
                }
            }
            var config = {
                method: 'post',
                url: 'https://rapidemail.rmlconnect.net/v1.0/messages/sendMail',
                headers: {
                    'Reply-To': 'message.reply@example.com',
                    'X-Unique-Id': usr._id
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
        console.log("hello")
        if (req.body.closeSession) {
            console.log("hello")
            const session = await Sessions.findOne({ '_id': req.body.id });
            const usr = await User.findOne({ 'email': session.user });
            console.log(smtpUser)
            var data = {
                "owner_id": routeMobile.Username,
                "token": routeMobile.Password,
                "smtp_user_name": smtpUser.smtp_user_name,
                "message": {
                    "html": "<h1>Thank You</h1><br>Hi " + usr.firstname + " " + usr.lastname + ",<br>Hope You had a great session scheduled at " + session.time + "Go ahead and view session ratings and prescriptions at: <a href=https://shrink4shrink.netlify.app/login><h3>S4S</h3></a><br/><h4>Regards</h4><br/><h2>Shrink4Shrink</h2>",
                    "text": "Reminder For Session Scheduled at " + session.time + ".Connect Soon",
                    "subject": "Reminder For Session Scheduled at " + session.time,
                    "from_email": "noreply@rapidemail.rmlconnect.net",
                    "from_name": "Shrink4Shrink",
                    "to": [
                        {
                            "email": usr.email,
                            "name": usr.firstname + " " + usr.lastname,
                            "type": "to"
                        }
                    ],
                    "headers": {
                        "Reply-To": "noreply@rapidemail.rmlconnect.net",
                        "X-Unique-Id": session._id
                    },
                }
            }
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

        if (req.body.sessionAccept) {
            const session = await Sessions.findOne({ '_id': req.body.id });
            const usr = await User.findOne({ 'email': session.user });
            console.log(smtpUser)
            var data = {
                "owner_id": routeMobile.Username,
                "token": routeMobile.Password,
                "smtp_user_name": smtpUser.smtp_user_name,
                "message": {
                    "html": "<h1>Reminder</h1>Hi " + usr.firstname + " " + usr.lastname + ",<br>Your session is scheduled at " + session.time + ".Join Now at: <a href=https://shrink4shrink.netlify.app/login><h3>S4S</h3></a>",
                    "text": "Reminder For Session Scheduled at " + session.time + ".Connect Soon",
                    "subject": "Reminder For Session Scheduled at " + session.time,
                    "from_email": "noreply@rapidemail.rmlconnect.net",
                    "from_name": "Shrink4Shrink",
                    "to": [
                        {
                            "email": usr.email,
                            "name": usr.firstname + " " + usr.lastname,
                            "type": "to"
                        }
                    ],
                    "headers": {
                        "Reply-To": "noreply@rapidemail.rmlconnect.net",
                        "X-Unique-Id": session._id
                    }
                }
            }
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
    }
    module.exports = {
        sessioncustomEmail: sessioncustomEmail
    };

