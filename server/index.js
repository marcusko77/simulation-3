require('dotenv').config();
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const Auth0Strategy= require('passport-auth0');
const massive = require('massive');

const {
    SERVER_PORT,
    SESSION_SECRET,
    DOMAIN,
    CLIENT_ID,
    CLIENT_SECRET,
    CALLBACK_URL,
    CONNECTION_STRING,
}= process.env



const app = express()

massive(CONNECTION_STRING).then( db => {
    app.set( 'db', db);
})

app.use(session({
    secret: SESSION_SECRET,
    resave:false,
    saveUninitialized: true,

}))

app.use(passport.initialize());
app.use(passport.session());

passport.use( new Auth0Strategy({
    domain: DOMAIN,
    clientID: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    callbackURL: CALLBACK_URL,
    scope: 'openid profile',
},
 function(acessToken, refreshToken, extraParams, profile, done) {
const db = app.get('db')
db.find_user([profile.id]).then( users => {
    if(!users[0]) {
        console.log(profile)
        db.create_user([profile.displayName, profile.id, profile.name.givenName, profile.name.familyName]).then( userCreated => {
           console.log(profile)
            done(null, userCreated[0].id)
        })
    }else {
        done(null, users[0].id)
    }
})
}

))

passport.serializeUser( (id, done) => {
    done(null, id)
});

passport.deserializeUser( (id, done) => {
    app.get('db').find_session_user([id]).then( user => {
        done(null, user[0]);
    })
})


app.get('/auth', passport.authenticate('auth0'));
app.get('/auth/callback', passport.authenticate('auth0', {
    successRedirect: 'http://localhost:3000/#/Dashboard',
    failureRedirect: 'http://localhost:3000',
}))
app.get('/auth/me', (req, res)=>{
    if(req.user) {
        res.status(200).send(req.user)
    }else{
        res.status.send(401)
    }
})

app.get('/auth/logout', (req, res) => {
    req.logOut();
    res.redirect('http://localhost:3000/')
    }
)


app.listen(SERVER_PORT, ()=> console.log(`Listening on port: ${SERVER_PORT}`))