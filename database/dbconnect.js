import mongoose from 'mongoose';

const connection = {};

async function dbConnect() {
    if (connection.isConnected) {
        return;
    }
    // console.log(connection)
    const db = await mongoose.connect('mongodb+srv://testbud:testbud@cluster0.rzgja.mongodb.net/POST?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    });

    connection.isConnected = db.connections[0].readyState;
    

}

export default dbConnect;