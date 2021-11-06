const assignDoctor = async (req, resp, User) => {

    const usr = await User.findOne({ 'email': req.body.email });
    try {
        if (req.body.doctor_email) {
            usr.update({ doctor_assigned: req.body.doctor_email }, function (err, result) {
                if (err) {
                    console.log(err)
                } else {
                    console.log("Result :", result)
                }
            })
            usr.save()
            resp.json("Doctor Assigned Sucessfully added");
        }
        resp.json("Error while Assigning Doctor");
    }
    catch {
        resp.json("Error while Assigning Doctor");
    }

}
module.exports = {
    assignDoctor: assignDoctor
};