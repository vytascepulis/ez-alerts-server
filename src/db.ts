import mongoose, { ConnectOptions } from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const clientOptions: ConnectOptions = {
    dbName: process.env.MONGODB_DBNAME,
    serverApi: { version: '1', strict: true, deprecationErrors: true },
};

const connectDB = () => {
    if (process.env.MONGODB_URL) {
        mongoose
            .connect(process.env.MONGODB_URL, clientOptions)
            .catch((err) => {
                console.error(err);
                process.exit(1);
            });

        const dbConnection = mongoose.connection;

        dbConnection.once('open', () => {
            console.log(`Database connected`);
        });

        dbConnection.on('error', (err) => {
            console.error(`DB connection error: ${err}`);
        });

        return;
    }
};

export default connectDB;
