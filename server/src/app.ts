import express from "express";
import compression from "compression"; // compresses requests
import bodyParser from "body-parser";
import lusca from "lusca";
import dotenv from "dotenv";
import flash from "express-flash";
import expressValidator from "express-validator";
import { checkSchema } from "express-validator/check";

// Load environment variables from .env file, where API keys and passwords are configured
dotenv.config();

// Controllers (route handlers)
import * as orderController from "./controllers/order";

// Create Express server
const app = express();

// Express configuration
app.set("port", process.env.PORT || 3000);
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());
app.use(flash());
app.use(lusca.xframe("SAMEORIGIN"));
app.use(lusca.xssProtection(true));

/**
 * Primary app routes.
 */

const orderCheckSchema = checkSchema({
  items: {
    in: ["body"],
    isLength: {
      errorMessage: "El carrito debe contener al menos un objeto",
      options: { min: 1 },
    },
  },
  "items.*.id": {
    in: ["body"],
    isString: {
      errorMessage: "El identificador de un producto debe ser un string.",
    },
  },
  "items.*.colorId": {
    in: ["body"],
    isString: {
      errorMessage: "El identificador de un color debe ser un string.",
    },
  },
  "items.*.amount": {
    in: ["body"],
    isInt: {
      errorMessage: "El valor de amount debe ser numérico.",
    },
    toInt: true,
  },
});

app.get("/orders/get", orderController.allOrders);
app.post("/orders", orderCheckSchema, orderController.createOrder);

export default app;
