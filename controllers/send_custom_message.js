var axios = require('axios');


const sessioncustomSMS = async (req, resp, User, Sessions, routeMobile) => {

    if (req.body.newUser) {
        const usr = await User.findOne({ 'email': req.body.email });
        var sms = "Hi " + usr.firstname + " " + usr.lastname + ",\n" + "You have successfully registered on our Platform. Login Now to Schedule Apointment with our Experts at www.shrink4shrink.netlify.app " + "\nRegards,\nShrink4Shrink";
        var url = "https://rapidapi.rmlconnect.net:9443/bulksms/bulksms?username=" + routeMobile.Username + "&" + "password=" + routeMobile.Password + "&" + "type=5&dlr=0&destination=" + usr.phone + "&" + "source=RMLPRD&message=" + sms
        var config = {
            method: 'get',
            url: url,
            headers: {}
        };

        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
                return resp.json(response.data)
            })
            .catch(function (error) {
                console.log(error);
                return resp.json(response.data)
            });
    }
    if (req.body.closeSession) {
        const session = await Sessions.findOne({ '_id': req.body.id });
        const usr = await User.findOne({ 'email': session.user });
        var sms = "Hi " + usr.firstname + " " + usr.lastname + ",\nThank You for attending Session. Hope It was nice.Click on link to get the details and download prescription of the session.\n www.shrink4shrink.netlify.app/session/" + session._id + "\nRegards,\nShrink4Shrink";
        var url = "https://rapidapi.rmlconnect.net:9443/bulksms/bulksms?username=" + routeMobile.Username + "&" + "password=" + routeMobile.Password + "&" + "type=5&dlr=0&destination=" + usr.phone + "&" + "source=RMLPRD&message=" + sms
        var config = {
            method: 'get',
            url: url,
            headers: {}
        };

        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
                return resp.json(response.data)
            })
            .catch(function (error) {
                console.log(error);
                return resp.json(response.data)
            });
    }
    if (req.body.sessionAccept) {
        const session = await Sessions.findOne({ '_id': req.body.id });
        const usr = await User.findOne({ 'email': session.user });
        var sms = "Hi " + usr.firstname + " " + usr.lastname + ",\nTYour Session was accepted by Dr." + session.doctor.split("@")[0] + ".Kindly Be present on time .Click on link to view other details.\n www.shrink4shrink.netlify.app/ \nRegards,\nShrink4Shrink";
        var url = "https://rapidapi.rmlconnect.net:9443/bulksms/bulksms?username=" + routeMobile.Username + "&" + "password=" + routeMobile.Password + "&" + "type=5&dlr=0&destination=" + usr.phone + "&" + "source=RMLPRD&message=" + sms
        var config = {
            method: 'get',
            url: url,
            headers: {}
        };

        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
                return resp.json(response.data)
            })
            .catch(function (error) {
                console.log(error);
                return resp.json(response.data)
            });
    }
}
module.exports = {
    sessioncustomSMS: sessioncustomSMS
};