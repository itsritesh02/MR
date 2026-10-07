import mongoose from "mongoose";

const connectDb = async()=>{
  try{
    mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB Connected");
    
  }

  catch(err){
    console.log("Mongo Error",err.message);
    process.exit(1)
    
  }
}
export default connectDb;