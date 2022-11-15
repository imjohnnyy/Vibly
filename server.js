const express = require('express');
const app = express();
require('dotenv').config();
const dbConfig = require('./config/dbConfig');

app.use(express.json());
const userRoute = require('./routes/userRoute');


app.use('/api/users', userRoute);
const port = 5000;


// Starts the server in Port ____, if it is successful then something is returned 
// (A message in this context)
app.listen(port, () => console.log(`App is listening on port ${port}`));