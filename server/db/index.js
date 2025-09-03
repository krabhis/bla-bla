import mongoose from "mongoose"
import {DB_NAME} from "../constant.js"

const connectDB = async ()=>{
    try {
        const response = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`);
        console.log("MongoDB connected ...");
    } catch (error) {
        console.error("Error connecting t0 mongoDB\n\n",error);
        process.exit(1);
        
    }
};

export default connectDB; 