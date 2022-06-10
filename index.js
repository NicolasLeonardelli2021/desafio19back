const express = require("express")
const app = express()
let {mongo_db,facebook} = require("./config");
let cors = require("cors")
let path = require('path');
let {Server: HttpServer} = require('http');
let {Server:SocketIO} = require('socket.io');
const cookieParser = require("cookie-parser")
const session = require("express-session")
const MongoStore = require('connect-mongo');
const passport = require("passport");
const FacebookStrategy = require("passport-facebook").Strategy;
const {port} = require("./config/puerto");
let responseTime = require("response-time")
let gzip = require("compression")
let serverRoutes = require("./routes");
const advancedOptions = {useNewUrlParser:true,useUnifiedTopology:true}
const serverSocket = require("./utils/socket/server")

app.use(express.static("public"));

app.use(cors("*"));

app.use(responseTime());
app.use(gzip());

app.use(express.json());                    
app.use(express.urlencoded({extended:true}));

app.set("views", path.join(__dirname,"./views"));
app.set("view engine", "ejs");

app.use(cookieParser())

 app.use(session({
    //store: new File_store({path: "./sesiones", ttl:300,retries:0}),
    store: MongoStore.create({
        mongoUrl: mongo_db.uri,
        mongoOptions: advancedOptions
    }),

    secret: "secret",
    resave: true,
    saveUninitialized:true,
      cookie:{
        maxAge:60000
    }   

})); 

    passport.use(new FacebookStrategy({
        clientID: facebook.app_id,
        clientSecret: facebook.app_secret,
        callbackURL: '/auth/facebook/callback'
    },
     (token, tokensecret, profile,done)=>{
         console.log(profile.displayName)
        done(null,profile);
    } 
    ));
    
    passport.serializeUser((user,done)=>{
        done(null, user);
    })
    
    passport.deserializeUser((obj,done)=>{
        done(null,obj)
    })
    
    app.use(passport.initialize());
    app.use(passport.session());

// ----------Socket-----------------
 let http = new HttpServer(app);
let io = new SocketIO(http);
serverSocket(io);
      
// -------API REST ------------

app.get('/auth/facebook',passport.authenticate('facebook'));
app.get("/auth/facebook/callback", passport.authenticate('facebook',{successRedirect: '/',failureRedirect: '/auth'}));
 
serverRoutes(app);

http.listen(port, ()=>{
   // app.listen(PORT, ()=>{
    console.log(`estamos escuchando en esta url: http://localhost:${port}/auth || Worker: ${process.pid}`)
})

