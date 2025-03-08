const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
require("dotenv").config();

// Import Routes
const authRoutes = require("./routes/auth");
const bookRoutes = require("./routes/books"); // ✅ Import books route

// Database Connections
const { mysqlPool } = require("./db"); // MySQL
// const connectMongoDB = require("./dbMongo"); // MongoDB (Optional)

// Initialize Express App
const app = express();

// Middleware
app.use(cors({ origin: "http://localhost:5173", credentials: true })); // ✅ Allow frontend requests
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.json()); // ✅ JSON Middleware

// Routes
app.use("/api/auth", authRoutes); // ✅ MySQL Authentication
app.use("/api/books", bookRoutes); // ✅ Books route (Ensure it's active)

// Test Route
app.get("/", (req, res) => {
    res.send("Library Management System Backend is Running!");
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
    console.log(`🚀 Server running on port ${PORT}`);

    // Optional: Connect MongoDB (only if you're using it)
    if (process.env.USE_MONGO === "true") {
        await connectMongoDB();
    }
});
