var axios = require('axios');
const sessionWhatsapp = async (req, resp, User, Sessions, routeMobile) => {
    const session = await Sessions.findOne({ '_id': req.body.id });
    const usr = await User.findOne({ 'email': session.user });
    // console.log(smtp.data)
    var data = {
        "phone": usr.phone,
        "media": {
            "type": "media_template",
            "template_name": "schedule_appointment",
            "lang_code": "en",
            "body": [
                {
                    "text": usr.firstname+" "+usr.lastname
                },
                {
                    "text": " Shrink4Shrink "
                },
                {
                    "text": " "+session.title+" at "+session.time 
                }
            ]
        }
    }
    // console.log(data)
    // console.log(routeMobile)
    var config = {
        method: 'post',
        url: 'https://rapidapi.rmlconnect.net/wbm/v1/message',
        headers: { 
          'Content-Type': 'application/json', 
          'Authorization': routeMobile.token
        },
        data : data
      };
    axios(config)
        .then(function (response) {
            console.log(JSON.stringify(response.data));
            return resp.json(response.data);
        })
        .catch(function (error) {
            console.log(error);
            return resp.json(error.data);
        });

}
module.exports = {
    sessionWhatsapp: sessionWhatsapp
};