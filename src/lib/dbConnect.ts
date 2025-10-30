import mongoose from "mongoose";

type ConnectionObject = {
    isConnected?: number
}

const connection: ConnectionObject = {};

async function dbConnect(): Promise<void> {
    if(connection.isConnected){
        console.log("Already connected to db")
        return
    }    

    try {
        

        const db = await mongoose.connect(process.env.MONGO_URI || "" )

        console.log(db);
        console.log(db.connections)
        connection.isConnected = db.connections[0].readyState;

        console.log("db connected successfully")
    } catch (error) {
        console.log("failed to connect to db" , error)
        process.exit(1);
    }
}

export default dbConnect;