import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import passport from "passport";
import session from "express-session";
import User from "./models/users";

var PassportLocal = require("passport-local").Strategy;

//initialization
const app = express();

//login
app.use(cookieParser("549_TZ3GbBCRJI-KKH2Q123O"));
app.use(session({
    secret: "549_TZ3GbBCRJI-KKH2Q123O",
    resave: true,
    saveUninitialized: true
}));

//Passport
app.use(passport.initialize());
app.use(passport.session());

passport.use(new PassportLocal(function (username, password, done) {
    User.findOne({
        where: {
            email: username
        }
    }).then((u) => {
        if (u===null) {
            console.log("incorrect username")
            return done(null, false, { message: 'Incorrect username.' });
        }
        if (u.dataValues.password!==password) {
            console.log("incorrect password")
            return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, u);
    }).catch(err => {
        return done(err);
    });
}));
passport.serializeUser(function (u, done) {
    done(null, u.id);
});
passport.deserializeUser(function (id, done) {
    User.findByPk(id)
        .then((u) => {
            done(null, u);
        })
        .catch(err => {
            return done(err);
        })
});

// helmet
var helmet = require('helmet');
app.use(helmet());

//routes
import userRoutes from "./routes/users";
import productRoutes from "./routes/products";

//middlewares
app.use(express.json());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3001');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
  });

//routes
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);

// handleErrors
function handleErrors(err, req, res, next){
    console.log(err);
    res.status(500).send(`Algo salio mal: ${err.message}`);
}
app.use(handleErrors);

export default app;