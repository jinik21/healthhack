const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const passport_mongoose = require('passport-local-mongoose');
const mongoose = require('mongoose');
const db = require("./config/keys").mongodb.mongoURI;
const ibm = require("./config/keys").ibm_key;
const { IamTokenManager } = require("ibm-watson/auth");

const signin = require('./controllers/signin');
const signup = require('./controllers/signup');
const Schema = require('./models/user');
const userSessionSchema = require('./models/sessions');
const userdata = require('./controllers/userdata')
const usersessions = require('./controllers/usersessions')
const newSession = require('./controllers/new_session')


const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(session({
    secret: "kuchbhi",
    resave: false,
    saveUninitialized: false
}));
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB successfully connected"))
    .catch(err => console.log(err));
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
  

//Routes


app.get('/', (req, resp) => { resp.send('working ') })
app.post('/api/signin', (req, resp) => { signin.handlesignin(req, resp, User) })
app.post('/api/signup', (req, resp) => { signup.handlesignup(req, resp, User) })
app.post('/api/userdata', (req, resp) => { userdata.userdata(req, resp, User) })
app.post('/api/usersessions', (req, resp) => { usersessions.usersessions(req, resp, User, Sessions) })
app.post('/api/patient_details', (req, resp) => { signup.handlesignup(req, resp, User, Sessions) })

app.post('/api/new_session', (req, resp) => { newSession.newSession(req, resp, User, Sessions) })
app.post('/api/close_session', (req, resp) => { signup.handlesignup(req, resp, User, Sessions) })
app.post('/api/assign_doctor', (req, resp) => { signup.handlesignup(req, resp, User, Sessions) })
app.post('/api/patient_feedback', (req, resp) => { signup.handlesignup(req, resp, User, Sessions) })
app.post('/api/doctor_feedback', (req, resp) => { signup.handlesignup(req, resp, User, Sessions) })


const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`app is runing on ${port}`)
})