const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const application = express();

// Application middleware
application.use(cors());
application.use(express.json());
application.use("/media", express.static(path.join(__dirname, "uploads")));

// Database connection configuration
const dbConfig = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};

// Establish database connection
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/college-activities", dbConfig)
.then(async () => {
    console.log("Database connection established");
    
    // Initialize core components
    const UserProfile = require('./models/User');
    const Activity = require('./models/Event');
    
    // Set up default administrator
    await UserProfile.initializeDefaultAdmin();
    
    // Retrieve administrator profile
    const adminProfile = await UserProfile.findOne({ contactEmail: 'alex@college.edu' });
    if (adminProfile) {
        await Activity.initializeSampleActivities(adminProfile._id);
    }
})
.catch(error => {
    console.error("Database connection error:", error);
});

// API endpoints
application.use("/api/authentication", require("./routes/auth"));
application.use("/api/activities", require("./routes/events"));

// Error handling
application.use((error, request, response, next) => {
    console.error("Application error:", error);
    response.status(500).json({ errorMessage: error.message });
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (error) => {
    console.error("Unhandled promise rejection:", error);
    process.exit(1);
});

const PORT = process.env.PORT || 5000;
application.listen(PORT, () => {
    console.log(`Application server running on port ${PORT}`);
}); 