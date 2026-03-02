import mongoose from 'mongoose';
import pkg from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
pkg.config({ path: join(__dirname, '.env') });
import bcrypt from 'bcrypt';
import userModel from './models/userModel.js';
import connectDB from './config/mongodb.js';

const seedStaffUsers = async () => {
    try {
        await connectDB();

        const staffToCreate = [
            {
                name: process.env.SEED_HOD_NAME || "Head of Department",
                email: process.env.SEED_HOD_EMAIL,
                password: process.env.SEED_HOD_PASSWORD,
                userRole: "HOD"
            },
            {
                name: process.env.SEED_TO_NAME || "Inventory Technical Officer",
                email: process.env.SEED_TO_EMAIL,
                password: process.env.SEED_TO_PASSWORD,
                userRole: "INVENTORY_TO"
            }
        ];

        for (const staff of staffToCreate) {
            if (!staff.email || !staff.password) {
                console.log(`Skipping ${staff.userRole} creation: SEED_*_EMAIL or SEED_*_PASSWORD missing in environment.`);
                continue;
            }

            const exists = await userModel.findOne({ email: staff.email });
            if (exists) {
                console.log(`User ${staff.email} already exists. Updating role to ${staff.userRole}...`);
                await userModel.findByIdAndUpdate(exists._id, { userRole: staff.userRole });
                continue;
            }

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(staff.password, salt);

            await userModel.create({
                name: staff.name,
                email: staff.email,
                password: hashedPassword,
                userRole: staff.userRole,
                isActive: true
            });
            console.log(`Successfully created ${staff.userRole} user: ${staff.email}`);
        }

        console.log("Seed complete.");
        process.exit(0);
    } catch (error) {
        console.error("Seed failed:", error);
        process.exit(1);
    }
};

seedStaffUsers();
