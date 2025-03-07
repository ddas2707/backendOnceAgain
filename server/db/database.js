import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDb is Connected");
    } catch (err) {
        console.log(err, "Error in connecting to database");
    }
}
export default connectDB; 