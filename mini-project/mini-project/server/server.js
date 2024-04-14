const express = require('express');
const bodyParser = require('body-parser');
require("dotenv").config();
const mongo = require("mongoose");
const userRouter = require('./routes/user');
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();
const port = process.env.PORT;
const {Web3} = require('web3');
const web3 = new Web3("https://sepolia.infura.io/v3/1b9af8af0732485fa891d76f42333e3c");

let corsOpts = {
        credentials: true,
        // origin: ['http://localhost:5173', 'http://localhost:8080'],
        origin: ['https://evidenceportal-server.onrender.com', 'https://evidenceportal-client.onrender.com'],
};

app.use(cors(corsOpts));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: false }));
app.use(cookieParser());

mongo.connect(process.env.URI).then(() => {
    console.log("DB Connected Successfully");
}).catch((error) => {
    console.log(error);
});
app.use('/user', userRouter);

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
