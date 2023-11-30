const express = require("express")
const cors = require("cors")
const router = express.Router();
const app = express()
const database = require("./database")
const cookieParser = require('cookie-parser');
app.use(cookieParser());
require('dotenv').config();


app.use(express.json())
app.use(cors({ origin: ['http://127.0.0.1:5508','http://127.0.0.1:5501'],  credentials: true, }))

// PORT DECLARING
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log("port is now running", PORT)
})
// database connect 
database.connect()

// routing happens here
require("./routes/index")(app)


module.exports = { app, router }
