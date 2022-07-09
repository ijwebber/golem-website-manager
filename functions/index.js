require("dotenv").config();

const express = require('express');
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const cookieParser = require("cookie-parser");

const app = express();
const port = 8000;

app.use(
    bodyParser.urlencoded({
        extended: false,
    })
);
app.use(bodyParser.json());

// Connect to the database
mongoose.connect(process.env.DATABASE_URI);
db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected To Database"));

app.use(cookieParser());
app.use(express.json());

// Passport middleware
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);

app.get('/', (req, res) => {
    res.send('Hello world!');      
});

const userRouter = require("./routes/golem/user");
app.use("/golem/user", userRouter);

app.listen(port, () => {
    console.log(`Now listening on port ${port}`); 
});