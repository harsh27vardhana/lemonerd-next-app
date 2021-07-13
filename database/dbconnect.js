import mongoose from 'mongoose';

const connection = {};

async function dbConnect() {

    if (connection.isConnected) {
        console.log(connection)
        return;
    }
    const db = await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    });
    
    connection.isConnected = db.connections[0].readyState;
    console.log(connection)
    

}

export default dbConnect;