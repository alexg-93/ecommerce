import mongoose from 'mongoose';
import colors from 'colors'

const connectDB = async () =>{
    try {
        const connect = await mongoose.connect(process.env.MONGO_URI,{
            useUnifiedTopology:true,
            useNewUrlParser:true,
            useCreateIndex:true
        });
        console.log(`MongoDB Connected to: ${connect.connection.name} Database!`.cyan )
    } catch (err) {
        console.error(`Error ${err.message}`.red.underline.bold)
        process.exit(1);
    }
}

export default connectDB;