const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const cors = require('cors');
const morgan = require('morgan');
const connectToDb = require('./utils/dbConnect');
const AppError = require('./utils/appError');
const employeeRoutes = require('./routes/employeeRoutes');
const accountActRoutes = require('./routes/accountActRoutes');
const globalErrorHandler = require('./controllers/errorController');
const employeeController = require('./controllers/employeeController');
const helmet = require('helmet');
const app = express();

//Middlewares
app.use(morgan("common"));
app.use(helmet());
app.use(express.json());
app.use(cors());

//Connect to DB
connectToDb();

//Routes
app.use('/employees',employeeRoutes);

//route for account activation

app.use('/account-activation',accountActRoutes);
//Handle error route
app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});
  
//Global error handler
app.use(globalErrorHandler);

app.listen(process.env.PORT,() => {
    console.log('Server listening on port : ',process.env.PORT);
});