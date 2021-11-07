const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const passport_mongoose = require("passport-local-mongoose");
const mongoose = require("mongoose");
const db = require("./config/keys").mongodb.mongoURI;
const ibm = require("./config/keys").ibm_key;

const agora = require("./config/keys").agora;
const middleware = require("./middleware/agoraMiddleware");
const { RtcTokenBuilder, RtcRole } = require("agora-access-token");

const { IamTokenManager } = require("ibm-watson/auth");

const signin = require("./controllers/signin");
const signup = require("./controllers/signup");
const Schema = require("./models/user");
const userSessionSchema = require("./models/sessions");
const userdata = require("./controllers/userdata");
const usersessions = require("./controllers/usersessions");
const newSession = require("./controllers/new_session");
const closeSession = require("./controllers/close_session");
const doctorFeedback = require("./controllers/doctor_feedback");
const patientFeedback = require("./controllers/patient_feedback");
const addPresciption = require("./controllers/add_prescription");
const addNotes = require("./controllers/add_notes");
const getDoctor = require("./controllers/doctor_list");
const getPatient = require("./controllers/patient_list");
const assignDoctor = require("./controllers/assign_doctor");
const updateProfile = require("./controllers/update_profile");

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(
  session({
    secret: "kuchbhi",
    resave: false,
    saveUninitialized: false,
  })
);
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB successfully connected"))
  .catch((err) => console.log(err));
Schema.plugin(passport_mongoose);
app.use(passport.initialize());
app.use(passport.session());

const User = mongoose.model("User", Schema);
const Sessions = mongoose.model("Sessions", userSessionSchema);
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

const sttAuthenticator = new IamTokenManager({
  apikey: ibm.SPEECH_TO_TEXT_IAM_APIKEY,
});

app.use("/api/speech-to-text/token", function (req, res) {
  return sttAuthenticator
    .requestToken()
    .then(({ result }) => {
      res.json({
        accessToken: result.access_token,
        url: ibm.SPEECH_TO_TEXT_URL,
      });
    })
    .catch(console.error);
});

// Agora token endpoint
app.get("/api/agora-call/token", middleware, (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  const channel = req.query.channel;
  if (!channel) {
    return res.status(500).json({ error: "channel name missing" });
  }
  let uid = 0;
  let role = RtcRole.PUBLISHER;
  let expireTime = 3600;
  const currentTime = Math.floor(Date.now() / 1000);
  const privilegeExpireTime = currentTime + expireTime;
  const token = RtcTokenBuilder.buildTokenWithUid(
    agora.APP_ID,
    agora.APP_CERTIFICATE,
    channel,
    uid,
    role,
    privilegeExpireTime
  );
  return res.json({ token: token });
});

//Routes
app.get('/', (req, resp) => { resp.send('working ') })
app.post('/api/signin', (req, resp) => { signin.handlesignin(req, resp, User) })
app.post('/api/signup', (req, resp) => { signup.handlesignup(req, resp, User) })
app.post('/api/userdata', (req, resp) => { userdata.userdata(req, resp, User) })
app.post('/api/usersessions', (req, resp) => { usersessions.usersessions(req, resp, User, Sessions) })
app.post('/api/get_doctors', (req, resp) => { getDoctor.getDoctor(req, resp, User) })
app.post('/api/get_patient', (req, resp) => { getPatient.getPatient(req, resp, User) })
app.post('/api/patient_details', (req, resp) => { signup.handlesignup(req, resp, User, Sessions) })

app.post('/api/new_session', (req, resp) => { newSession.newSession(req, resp, User, Sessions) })
app.post('/api/close_session', (req, resp) => { closeSession.closeSession(req, resp, User, Sessions) })
app.post('/api/patient_feedback', (req, resp) => { patientFeedback.newPatientFeedback(req, resp, User, Sessions) })
app.post('/api/doctor_feedback', (req, resp) => { doctorFeedback.newDoctorFeedback(req, resp, User, Sessions) })
app.post('/api/add_presciption', (req, resp) => { addPresciption.newPrescription(req, resp, User, Sessions) })
app.post('/api/add_notes', (req, resp) => { addNotes.newNotes(req, resp, User, Sessions) })
app.post('/api/assign_doctor', (req, resp) => { assignDoctor.assignDoctor(req, resp, User) })
app.post('/api/update_profile', (req, resp) => { updateProfile.updateProfile(req, resp, User) })


const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`app is runing on ${port}`);
});
