const connectToMongo = require('./db');
const express = require('express');
var cors = require('cors')
connectToMongo();

const dotenv = require("dotenv")
dotenv.config();

const app = express();
const port = process.env.PORT||3000;

app.use(cors());
app.use(express.json());

app.use('/api/notes', require('./routes/notes'));
app.use('/api/auth', require('./routes/auth'));

app.listen(port, () => {
    console.log(`API app listening on port ${port}`)
})