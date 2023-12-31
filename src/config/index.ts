import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

const config = {
  port: process.env.PORT || 3000,
  dbURL: process.env.DB_URL,
  jwtKey: process.env.JWT_KEY,
};

export default config;
