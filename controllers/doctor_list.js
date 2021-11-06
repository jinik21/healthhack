const getDoctor = async (req, resp, User) => {

    const usr = await User.find({ 'doctor': true }).sort({ 'date': -1 });

    return resp.json(usr);
    
}
module.exports = {
    getDoctor: getDoctor
};