const mongoose = require("mongoose")

    exports.connect = async () => {
        try {
            mongoose.set('strictQuery', true);
            mongoose.connect(process.env.DB_CONNECTION);
            console.log('Successfully connected to mongoDB');
        } catch (error) {
            console.log(error);
        }
    }