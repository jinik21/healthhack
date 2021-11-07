const usersessions = async (req, resp, User, Sessions) => {

    const usr = await User.find({ 'email': req.body.email }).sort({ 'date': -1 });
    if( req.body.doctor=='true'){
    if (req.body.upcoming == 'true') {
        const upcoming_session = await Sessions.find({
            $and: [
                {
                    'doctor': req.body.email
                },
                {
                    upcoming: true
                }
            ]
        }).sort({ 'date': 1 });
        console.log(usr);
        console.log(upcoming_session);
        return resp.json(upcoming_session);
    }
    else {
        const previous_session = await Sessions.find({
            $and: [
                {
                    'doctor': req.body.email
                },
                {
                    upcoming: false
                }
            ]
        }).sort({ 'date': -1 });
        console.log(usr);
        console.log(previous_session);
        return resp.json(previous_session);
    }
}else{
    if (req.body.upcoming == 'true') {
        const upcoming_session = await Sessions.find({
            $and: [
                {
                    'user': req.body.email
                },
                {
                    upcoming: true
                }
            ]
        }).sort({ 'date': 1 });
        console.log(usr);
        console.log(upcoming_session);
        return resp.json(upcoming_session);
    }
    else {
        const previous_session = await Sessions.find({
            $and: [
                {
                    'user': req.body.email
                },
                {
                    upcoming: false
                }
            ]
        }).sort({ 'date': -1 });
        console.log(usr);
        console.log(previous_session);
        return resp.json(previous_session);
    }
}
}
module.exports = {
    usersessions: usersessions
};