const sessionDetail = async (req, resp, Sessions) => {

    const session = await Sessions.findOne({ '_id': req.body.id });

    return resp.json(session)
}
module.exports = {
    sessionDetail: sessionDetail
};