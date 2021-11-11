const adminData = async (req, resp, User,Sessions) => {

    const users = await User.find({"doctor":false});
    const doctor = await User.find({"doctor":true});
    const sessions = await Sessions.find();
    const usrpreviousmonth=await User.find({"doctor":false,"date": 
    {
        $gte: (new Date((new Date()).getTime() - (30 * 24 * 60 * 60 * 1000)))
    }});
    const doctorspreviousmonth=await User.find({"doctor":true,"date": 
    {
        $gte: (new Date((new Date()).getTime() - (30 * 24 * 60 * 60 * 1000)))
    }});

    var data={
        "users":users.length,
        "sessions":sessions.length,
        "doctor":doctor.length,
        "usrpreviousmonth":usrpreviousmonth.length,
        "doctorspreviousmonth":doctorspreviousmonth.length,
    }
    // console.log(data);
    return resp.json(data);

}
module.exports = {
    adminData: adminData
};