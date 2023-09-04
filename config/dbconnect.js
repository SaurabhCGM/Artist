const { default: mongoose } = require("mongoose")

const dbconnect = () => {
    try {
        mongoose.set('strictQuery', false)
        const conn = mongoose.connect(process.env.MONGODB_URL);
        console.log("Database Connected Successfully");
    } catch (error) {
        console.log("Database error");
    }
};
module.exports = dbconnect;





// Mondodb Username = saurabhcgm, Passworld = iAkwD5kX2PHZfKKw