var axios = require('axios');


const sessionCall = async (req, resp, User, Sessions, routeMobile) => {
    const session = await Sessions.findOne({ '_id': req.body.id });
    const usr = await User.findOne({ 'email': session.user });
var url="https://rapidvoice.rmlconnect.net/api/voice/voice_broadcast.php?username="+routeMobile.Username+"&token="+routeMobile.Password+"&announcement_id="+"25"+"&plan_id="+routeMobile.PlanID+"&caller_id=91&contact_numbers="+usr.phone
var config = {
  method: 'post',
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
    sessionCall: sessionCall
};