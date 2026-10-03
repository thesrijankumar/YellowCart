const mongoose = require('mongoose');

const connectDb = async() => {
    try {
        const db = await mongoose.connect(process.env.MONGODB_URI)
        if(db){
            console.log("Database Connection Successfully!!");
        }
    } catch (error) {
        console.log("MongoDB Connection Failed:", error.message);
        process.exit(1);
    }
}

module.exports = connectDb;