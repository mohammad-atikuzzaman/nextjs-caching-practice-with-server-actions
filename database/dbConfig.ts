import mongoose from "mongoose";

// Connection state tracking
let isConnected = false;

export const connectDB = async () => {
  // যদি already connected থাকে, তাহলে আবার connect করার দরকার নেই
  if (isConnected && mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  try {
    // Environment variable validation
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI environment variable is not defined");
    }

    // Mongoose configuration options
    const options = {
      dbName: "nextCache",
      maxPoolSize: 10, // Connection pool size
      serverSelectionTimeoutMS: 5000, // Timeout for server selection
      socketTimeoutMS: 45000, // Socket timeout
    };

    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI, options);
    
    isConnected = true;
    console.log("MongoDB connected successfully!");
    
    return mongoose.connection;
  } catch (err) {
    console.error("Failed to connect to MongoDB:", err);
    isConnected = false;
    throw err;
  }
};

// Graceful shutdown
if (process.env.NODE_ENV !== "production") {
  mongoose.connection.on("disconnected", () => {
    console.log("MongoDB disconnected");
    isConnected = false;
  });
}