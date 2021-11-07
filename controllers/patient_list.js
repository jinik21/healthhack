const getPatient = async (req, resp, User) => {

    const usr = await User.find({ 'doctor_assigned': req.body.email }).sort({ 'date': -1 });

    return resp.json(usr);
    
}
module.exports = {
    getPatient: getPatient
};