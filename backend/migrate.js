import mongoose from 'mongoose';
import pkg from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
pkg.config({ path: join(__dirname, '.env') });
import userModel from './models/userModel.js';
import connectDB from './config/mongodb.js';

const migrateUsers = async () => {
    try {
        await connectDB();

        // Update old "user" role to "STUDENT"
        const studentResult = await userModel.updateMany(
            { userRole: "user" },
            { $set: { userRole: "STUDENT", isActive: true } }
        );
        console.log(`Migrated ${studentResult.modifiedCount} accounts from 'user' to 'STUDENT'`);

        // Update old "admin" role to "INVENTORY_TO"
        const adminResult = await userModel.updateMany(
            { userRole: "admin" },
            { $set: { userRole: "INVENTORY_TO", isActive: true } }
        );
        console.log(`Migrated ${adminResult.modifiedCount} accounts from 'admin' to 'INVENTORY_TO'`);

        console.log("Migration complete.");
        process.exit(0);
    } catch (error) {
        console.error("Migration failed:", error);
        process.exit(1);
    }
};

migrateUsers();
