import mongoose from "mongoose";
import config from "./config";
import app from "./app";

async function main() {
  try {
    // Use await without ".then()" to handle the promise
    await mongoose.connect(config.dbURL as string);
    console.log("Database connected");

    app.listen(config.port, () => {
      console.log(`Server running on port ${config.port}`);
    });
  } catch (error) {
    console.error("Error:", error);
  }
}

main();
