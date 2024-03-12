const mongoose = require("mongoose")

    exports.connect = async () => {
        try {
            await mongoose.set('strictQuery', true);
            await mongoose.connect(process.env.DB_CONNECTION);
            console.log('Successfully connected to mongoDB');
        } catch (error) {
            console.log(error);
        }
    }      