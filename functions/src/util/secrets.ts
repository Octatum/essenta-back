import logger from "./logger";
import dotenv from "dotenv";

logger.debug("Using .env file to supply config environment variables");
dotenv.config({ path: ".env" });

export const ENVIRONMENT = process.env.NODE_ENV;
const prod = ENVIRONMENT === "production"; // Anything else is treated as 'dev'

export const SESSION_SECRET = process.env["SESSION_SECRET"];

if (!SESSION_SECRET) {
  logger.error("No client secret. Set SESSION_SECRET environment variable.");
  process.exit(1);
}
