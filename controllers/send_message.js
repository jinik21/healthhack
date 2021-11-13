var axios = require('axios');


const sessionSMS = async (req, resp, User, Sessions, routeMobile) => {
    const session = await Sessions.findOne({ '_id': req.body.id });
    const usr = await User.findOne({ 'email': session.user });
    var sms="Hi"+usr.firstname+" "+usr.lastname+",\nReminder For Session Scheduled Today at " + session.time +"for "+session.title+ ".Join now at https://www.shrink4shrink.com. \nRegards,\nShrink4Shrink";
    var url="https://rapidapi.rmlconnect.net:9443/bulksms/bulksms?username="+routeMobile.Username+"&"+"password="+routeMobile.Password+"&"+"type=5&dlr=0&destination="+usr.phone+"&"+"source=RMLPRD&message="+sms
    var config = {
        method: 'get',
        url: url,
        headers: { }
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
module.exports = {
    sessionSMS: sessionSMS
};