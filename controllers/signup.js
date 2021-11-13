const axios = require('axios');
const handlesignup = (req, resp, User) => {
    // console.log(req);
    // console.log("-------------------------------------------")
    if (req.body.doctor == 'false') {
        User.register({ username: req.body.email, email: req.body.email, firstname: req.body.firstname, lastname: req.body.lastname, phone: req.body.phone, dob: req.body.dob, address: req.body.address, state: req.body.state, city: req.body.city, pincode: req.body.pincode, picture: req.body.picture }, req.body.password,
            function (err, user) {
                if (err) {
                    console.log(err);
                    return resp.status(400).json("Incorrect form submission");
                }
                else {
                    var authenticate = User.authenticate();
                    authenticate(req.body.email, req.body.password, function (err, result) {
                        if (err) {
                            //console.log(err);
                            return resp.status(401).json("Incorrect form submission");
                        }
                        else {
                            const url1 = "http://127.0.0.1:3001/api/send_custom_meassage";
                            const Option = {
                                method: 'post',
                                url: url1,
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                data: {
                                    email: result.email,
                                    newUser: true
                                }
                            };
                            axios(Option)
                                .then(function (response) {
                                    console.log(JSON.stringify(response.data));
                                })
                                .catch(function (error) {
                                    console.log(error);
                                });


                            return resp.status(200).json(result);
                        }
                    });
                }
            }
        );
    }
    else {
        var data = { data: { yearofexperience: req.body.yearofexperience, liscence: req.body.liscence, liscence_doc: req.body.liscence_doc } }
        User.register({ username: req.body.email, email: req.body.email, firstname: req.body.firstname, lastname: req.body.lastname, phone: req.body.phone, dob: req.body.dob, address: req.body.address, state: req.body.state, city: req.body.city, pincode: req.body.pincode, picture: req.body.picture, doctor: req.body.doctor, doctorinfo: data }, req.body.password,
            function (err, user) {
                if (err) {
                    console.log(err);
                    return resp.status(400).json("Incorrect form submission");
                }
                else {
                    var authenticate = User.authenticate();
                    authenticate(req.body.email, req.body.password, function (err, result) {
                        if (err) {
                            //console.log(err);
                            return resp.status(401).json("Incorrect form submission");
                        }
                        else {

                            return resp.status(200).json(result);
                        }
                    });
                }
            }
        );
    }
}


module.exports = {
    handlesignup: handlesignup
};
