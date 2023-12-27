import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

const config = {
  port: process.env.PORT || 3000, // Provide a default value (e.g., 5000) if PORT is not defined
  dbURL: process.env.DB_URL, // Provide a default URL if DB_URL is not defined
  jwtKey: process.env.JWT_KEY,
};

export default config;
