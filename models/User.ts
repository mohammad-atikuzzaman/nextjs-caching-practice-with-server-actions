
import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IUser extends Document {
    name: string;
    age: number;
    phone: string;
    createdAt: Date;
    updatedAt: Date;
}

const userSchema = new Schema<IUser>(
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
            minlength: [3, 'Name must be at least 3 characters'],
            maxlength: [50, 'Name cannot exceed 50 characters'],
            trim: true,
        },
        age: {
            type: Number,
            required: [true, 'Age is required'],
            min: [0, 'Age cannot be negative'],
            max: [150, 'Age cannot exceed 150'],
        },
        phone: {
            type: String,
            required: [true, 'Phone number is required'],
            trim: true,
        },
    },
    {
        timestamps: true, // Automatically manage createdAt and updatedAt
    }
);

// Prevent overwriting the model if it already exists (important for Next.js hot reloading)
const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', userSchema);

export default User;
