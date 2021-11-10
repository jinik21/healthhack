const userRoutines = async (req, resp, User) => {

    const usr = await User.findOne({ 'email': req.body.email });
    // console.log(usr);
    return resp.json(usr.routines);
}
module.exports = {
    userRoutines: userRoutines
};