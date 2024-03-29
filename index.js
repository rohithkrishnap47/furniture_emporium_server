const express = require("express")
const cors = require("cors")
const router = express.Router();
const app = express()
const database = require("./database")
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
app.use(cookieParser());
app.use(bodyParser.json({ type: 'application/*+json' }))
require('dotenv').config();


app.use(express.json())
app.use(cors({ origin: ['http://127.0.0.1:5508','http://127.0.0.1:5501'],  credentials: true, }))
// app.use(cors())

// PORT DECLARING
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`port is now running`, PORT)
})
// database connect 
database.connect()

// routing happens here
require("./routes/index")(app)


module.exports = { app, router }
