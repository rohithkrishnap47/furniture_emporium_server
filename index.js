const express = require("express")
const cors = require("cors")
const router = express.Router();
const app = express()
const database = require("./database")
require('dotenv').config();

app.use(express.json())
app.use(cors({ origin: "*" }))

// PORT DECLARING
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log("port is now running",PORT)
})
// database connect 
database.connect()

// routing happens here
require("./routes/index")(app)


module.exports = app 
