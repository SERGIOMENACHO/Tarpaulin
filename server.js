const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const routes = require('./routes');
const passport = require("passport");
const session = require('express-session');

const dotenv = require('dotenv');
dotenv.config()


// Swagger set up
const swaggerUi = require('swagger-ui-express');
const swaggerDoc = require('./swagger.json');

// connect to the mongoDB datase
mongoose.connect(process.env.MONGO_URI,
{useNewUrlParser: true}, (err, res)=> {
    if (err) {
        console.log('Connection failed: ' + err);
     }
     else {
        console.log('Connection to database successful!');
     }
})

const app = express()
const port = 3000

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app
.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc))
.use(bodyParser.json())
.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    next();
  })

require("./config/passport");

app.use(session({
  secret: 'test',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: true }
}))

app.use(passport.initialize())
app.use(passport.session())

  
app.use('/', routes)

process.on('uncaughtException', (err, origin) => {
    console.log(process.stderr.fd, `Caught exception: ${err}\n` + `Exception origin: ${origin}`);
  });

app.listen(port, ()=> {
    console.log(`Listening on port ${port}`)
})
