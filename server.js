// Import the dotenv configuration file and the app module
import { config } from "dotenv";
import app from "./app.js";

// Import the function to establish a connection to the database
import connectionToDb from "./config/dbConnection.js";

// Load the environment variables from the .env file
config();

// Set the default port to 5000 or the value from the .env file
const PORT = process.env.PORT || 5000;

// Start the server and listen for incoming requests
app.listen(PORT, async () => {
    // Await the database connection before starting the server
    await connectionToDb();
    // Log a message to the console when the server is running
    console.log(`App is running at http://localhost:${PORT}`);
});