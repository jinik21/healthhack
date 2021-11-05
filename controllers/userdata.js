const userdata = async (req, resp, User) => {

    const usr = await User.findOne({ 'email': req.body.email });
    console.log(usr);
    return resp.json(usr);

}
module.exports = {
    userdata: userdata
};