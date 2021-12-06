require('dotenv').config();

// load express
const express = require('express');

// load bodyparser to parse post bosy
const bodyparser = require('body-parser');

// load logger for easy debug
const logger = require('./bin/logger/winston');
const {sendEmail} = require("./bin/mailer")

const cors = require("cors")

// create instance of express
const app = express();

// define port to start server on
const port = process.env.PORT || 3000;

// connect to databse
const database = require('./bin/database/connect');
const {authMiddleware} = require("./bin/auth")

const userRoutes = require("./modules/user/routes");
const productRoutes = require("./modules/product/routes");
const authRoutes = require("./modules/auth/routes");


// parse valid requests only
app.use(
  bodyparser.urlencoded({
    extended: true,
  }),
);
app.use(cors())
app.use(bodyparser.json());

// authenticate all requests
app.use('/auth', authRoutes)
app.use(authMiddleware)

// bind routes to application
app.use('/user', userRoutes);
app.use('/product', productRoutes)

// start listening on ports
app.listen(port, () => {
  logger.info(`[express] server started at port: ${port}`);
});


// sendEmail("yk.verma2000@gmail.com", "test", "test")