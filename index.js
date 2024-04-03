const express = require("express");
const cors = require("cors");
const router = express.Router();
const app = express();
const database = require("./database");
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
app.use(cookieParser());
app.use(bodyParser.json({ type: 'application/*+json' }));
require('dotenv').config();

app.use(express.json());

// Update CORS configuration to include specific origin
const corsOptions = {
  origin: ['https://furnitureemporium.vercel.app','https://adminfurnitureemporium.vercel.app'],
  credentials: true  // Allow credentials
};
app.use(cors(corsOptions));

// PORT DECLARING
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`port is now running`, PORT);
});

// database connect 
database.connect();

// routing happens here
require("./routes/index")(app);

module.exports = { app, router };
